import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../styles/ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' හෝ 'error'
  const [statusMessage, setStatusMessage] = useState("");
  const recaptchaRef = useRef(null);

  // EmailJS Initialize (Public Key එක මෙතනත් දාන්න පුළුවන්)
  useEffect(() => {
    emailjs.init("XgXOvkB7n-SEuKo4q");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", projectName: "" });
    if (recaptchaRef.current) recaptchaRef.current.reset();
  };

  const validateForm = () => {
    const { name, email, phone, projectName } = formData;
    if (!name.trim() || !email.trim() || !phone.trim() || !projectName.trim()) {
      setSubmitStatus("error");
      setStatusMessage("Please fill all fields");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitStatus("error");
      setStatusMessage("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsSubmitting(true);
  setSubmitStatus(null);
  setStatusMessage("Processing...");

  try {
    console.log("1. Starting Submission...");

    // --- පියවර A: Email එක යැවීම ---
    // Firebase වල error එකක් තිබුණත් මුලින් email එක යනවාද බලන්න මේක උඩට දැම්මා
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      project_name: formData.projectName,
      to_email: "info@odiliyaresidencies.lk",
    };

    await emailjs.send(
      "service_7fcy448",
      "template_oir3jqm",
      templateParams,
      "XgXOvkB7n-SEuKo4q"
    );
    console.log("✅ EmailJS Success");

    // --- පියවර B: Firebase එකට Save කිරීම ---
    console.log("2. Attempting Firebase Save...");
    const docRef = await addDoc(collection(db, "contact_inquiries"), {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      projectName: formData.projectName,
      submittedAt: serverTimestamp(),
      status: "unread",
    });
    console.log("✅ Firebase Success, ID:", docRef.id);

    setSubmitStatus("success");
    setStatusMessage("✅ Success! Your inquiry has been sent.");
    resetForm();

  } catch (error) {
    console.error("❌ ERROR FOUND:", error);
    setSubmitStatus("error");
    
    // මෙතනින් තමයි අපිට ඇත්තම ලෙඩේ බලාගන්න පුළුවන් වෙන්නේ
    if (error.message.includes("network")) {
        setStatusMessage("❌ Network error. Check your internet.");
    } else if (error.code === "permission-denied") {
        setStatusMessage("❌ Firebase Rules Error: Permission Denied.");
    } else {
        setStatusMessage(`❌ Error: ${error.message}`);
    }
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="contact-form-section">
      <div className="contact-form-container">
        <div className="contact-form-wrapper">
          <h2 className="contact-form-title">Want More Information?</h2>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-grid">
              <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} className="contact-form-input" required disabled={isSubmitting} />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="contact-form-input" required disabled={isSubmitting} />
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="contact-form-input" required disabled={isSubmitting} />
              <input type="text" name="projectName" placeholder="Project Name" value={formData.projectName} onChange={handleInputChange} className="contact-form-input" required disabled={isSubmitting} />
            </div>

            <ReCAPTCHA
              ref={recaptchaRef}
              size="invisible"
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
            />

            <button type="submit" className="contact-form-submit" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Submit"}
            </button>

            {statusMessage && (
              <div 
                className={`status-message ${submitStatus}`}
                style={{
                  marginTop: "15px", padding: "12px", borderRadius: "5px", textAlign: "center", fontWeight: "500",
                  backgroundColor: submitStatus === "success" ? "#d4edda" : "#f8d7da",
                  color: submitStatus === "success" ? "#155724" : "#721c24",
                  border: `1px solid ${submitStatus === "success" ? "#c3e6cb" : "#f5c6cb"}`
                }}
              >
                {statusMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;