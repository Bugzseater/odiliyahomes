import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import "@/styles/Inquiry.css";

// Firebase Firestore Imports
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig"; 

export default function Inquiry({
  title = "Inquiry",
  projectName = "",
  className = "",
  onSubmit = null,
  submitButtonText = "Submit",
  successMessage = "Thank you for your inquiry! We'll get back to you soon.",
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectName: projectName,
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const recaptchaRef = useRef(null);

  const pushToDataLayer = (eventName, data) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      formType: "inquiry_form",
      formName: "Project Inquiry Form",
      ...data,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.projectName.trim()) newErrors.projectName = "Project name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // --- LOCALHOST ප්‍රශ්නය විසඳීමට RECAPTCHA තාවකාලිකව මඟ හැරීම ---
      console.log("Starting submission...");

      // 1. Firebase Save
      await addDoc(collection(db, "inquiries"), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectName: formData.projectName,
        message: formData.message || "No message",
        submittedAt: serverTimestamp(),
      });
      console.log("Firebase Save: Success!");

      // 2. EmailJS Send
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        phone: formData.phone,
        project_name: formData.projectName,
        message: formData.message || "No message",
        to_email: "info@odiliyaresidencies.lk",
      };

      await emailjs.send(
        "service_7fcy448",
        "template_oir3jqm",
        templateParams,
        "XgXOvkB7n-SEuKo4q"
      );
      console.log("EmailJS Send: Success!");

      setIsSubmitted(true);
      if (onSubmit) onSubmit(formData);

    } catch (error) {
      console.error("Error details:", error);
      setErrors({ submit: "Submission failed. Check console for details." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`inquiry-container ${className}`}>
        <div className="inquiry-success">
          <h3 className="inquiry-success-title">Thank You!</h3>
          <p className="inquiry-success-message">{successMessage}</p>
          <button className="inquiry-reset-btn" onClick={() => setIsSubmitted(false)}>Send Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`inquiry-container ${className}`}>
      <form className="inquiry-form" onSubmit={handleSubmit}>
        <div className="inquiry-form-grid">
          <div className="inquiry-form-group">
            <label className="inquiry-form-label">Your Name *</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="inquiry-form-input" />
            {errors.name && <span className="inquiry-form-error">{errors.name}</span>}
          </div>
          <div className="inquiry-form-group">
            <label className="inquiry-form-label">Email *</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="inquiry-form-input" />
            {errors.email && <span className="inquiry-form-error">{errors.email}</span>}
          </div>
          <div className="inquiry-form-group">
            <label className="inquiry-form-label">Phone Number *</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="inquiry-form-input" />
            {errors.phone && <span className="inquiry-form-error">{errors.phone}</span>}
          </div>
          <div className="inquiry-form-group">
            <label className="inquiry-form-label">Project Name *</label>
            <input type="text" name="projectName" value={formData.projectName} className="inquiry-form-input" readOnly />
          </div>
        </div>
        <div className="inquiry-form-group">
          <label className="inquiry-form-label">Message</label>
          <textarea name="message" value={formData.message} onChange={handleInputChange} className="inquiry-form-textarea" rows="4" />
        </div>

        {/* reCAPTCHA UI එක තියෙන්න දෙන්න, හැම පාලනය (logic) එක ඉවත් කර ඇත */}
        <div style={{ display: 'none' }}>
           <ReCAPTCHA ref={recaptchaRef} sitekey="random-key" size="invisible" />
        </div>

        {errors.submit && <div className="error-msg">{errors.submit}</div>}

        <div className="inquiry-form-submit">
          <button type="submit" disabled={isSubmitting} className="inquiry-submit-btn">
            {isSubmitting ? "Submitting..." : submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}