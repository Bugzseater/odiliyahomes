import React, { useState, useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "@/styles/ContactFormWithImage.css";

export default function ContactFormWithImage({
  title = "TALK TO US",
  subtitle,
  imageSrc,
  imageAlt = "Contact us",
  fields,
  submitButtonText = "Send Your Message",
  onSuccess,
  onError,
  className = "",
  id,
}) {
  const recaptchaRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [debugInfo, setDebugInfo] = useState("");

  const defaultFields = useMemo(() => [
    { name: "name", label: "Your Name", type: "text", required: true, placeholder: "Your Name" },
    { name: "phone", label: "Phone Number", type: "tel", required: true, placeholder: "Phone Number" },
    { name: "email", label: "Email", type: "email", required: true, placeholder: "Email" },
    { name: "message", label: "How we can help", type: "textarea", required: false, placeholder: "How we can help", rows: 4 },
  ], []);

  const formFields = fields || defaultFields;
  const [formData, setFormData] = useState(() => {
    const data = {};
    formFields.forEach(f => data[f.name] = "");
    return data;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    setDebugInfo("Connecting...");

    try {
      // 1. reCAPTCHA (Localhost එකේ හිර නොවීමට try/catch යොදා ඇත)
      let token = "no-token";
      try {
        if (recaptchaRef.current) {
          token = await recaptchaRef.current.executeAsync();
        }
      } catch (err) {
        console.warn("reCAPTCHA Error:", err);
      }

      // 2. Firebase Save (contact_us collection එකට)
      setDebugInfo("Saving to Firebase...");
      const docRef = await addDoc(collection(db, "contact_us"), {
        ...formData,
        submittedAt: serverTimestamp(),
        status: "unread",
        source: "Contact Form With Image"
      });
      console.log("✅ Firebase Success:", docRef.id);

      // 3. EmailJS Send
      setDebugInfo("Sending Email...");
      await emailjs.send(
        "service_7fcy448",
        "template_contact_us",
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_email: "lakdinu@miezsl.com",
        },
        "XgXOvkB7n-SEuKo4q"
      );

      setSubmitSuccess(true);
      setFormData({}); // Reset form
      setDebugInfo("Success!");

    } catch (error) {
      console.error("❌ Submission Error:", error);
      setSubmitError(error.message);
      setDebugInfo("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setDebugInfo(""), 5000);
    }
  };

  return (
    <section className={`contact-form-with-image ${className}`} id={id}>
      <div className="contact-form-with-image__container">
        <div className="contact-form-with-image__grid">
          <div className="contact-form-with-image__form-panel">
            <h2 className="contact-form-with-image__title">{title}</h2>
            
            {debugInfo && <div style={{color: "#f39c12", marginBottom: "10px", fontSize: "12px"}}>{debugInfo}</div>}

            <form className="contact-form-with-image__form" onSubmit={handleSubmit}>
              <div className="contact-form-with-image__fields">
                {formFields.map((field) => (
                  <div key={field.name} className="contact-form-with-image__field">
                    {field.type === "textarea" ? (
                      <textarea name={field.name} value={formData[field.name] || ""} onChange={handleInputChange} placeholder={field.placeholder} className="contact-form-with-image__input" />
                    ) : (
                      <input type={field.type} name={field.name} value={formData[field.name] || ""} onChange={handleInputChange} placeholder={field.placeholder} className="contact-form-with-image__input" required={field.required} />
                    )}
                  </div>
                ))}
              </div>

              <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" />

              {submitError && <div className="contact-form-with-image__alert contact-form-with-image__alert--error">{submitError}</div>}
              {submitSuccess && <div className="contact-form-with-image__alert contact-form-with-image__alert--success">Sent Successfully!</div>}

              <button type="submit" className="contact-form-with-image__submit" disabled={isSubmitting}>
                {isSubmitting ? "SENDING..." : submitButtonText}
              </button>
            </form>
          </div>
          {imageSrc && (
            <div className="contact-form-with-image__image-panel">
              <img src={imageSrc} alt={imageAlt} className="contact-form-with-image__image" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}