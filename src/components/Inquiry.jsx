import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";
import "@/styles/Inquiry.css";

/**
 * Inquiry - Project inquiry form component
 * Displays a contact form for project-specific inquiries with validation
 */
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

  // GTM Data Layer push function
  const pushToDataLayer = (eventName, data) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: eventName,
      formType: "inquiry_form",
      formName: "Project Inquiry Form",
      formLocation: "Inquiry Section",
      ...data,
    });
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+]?[0-9\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // GTM - Form validation failed
      pushToDataLayer("form_validation_failed", {
        errors: Object.keys(errors).join(", "),
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await recaptchaRef.current.executeAsync();

      if (!recaptchaToken) {
        throw new Error("reCAPTCHA verification failed. Please try again.");
      }

      // GTM - Form submission start
      pushToDataLayer("form_submission_start", {
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        projectName: formData.projectName,
        hasMessage: !!formData.message,
      });

      // Prepare email data for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        reply_to: formData.email,
        phone: formData.phone,
        project_name: formData.projectName,
        message: formData.message || "No additional message provided",
        to_email: "info@odiliyaresidencies.lk",
      };

      console.log("Sending email with data:", templateParams);

      // Send email using EmailJS
      const result = await emailjs.send(
        "service_7fcy448", // Service ID
        "template_oir3jqm", // Template ID
        templateParams,
        "XgXOvkB7n-SEuKo4q" // Public Key
      );

      console.log("Email sent successfully:", result);

      // GTM - Form submission success
      pushToDataLayer("form_submission_success", {
        userName: formData.name,
        userEmail: formData.email,
        projectName: formData.projectName,
        hasMessage: !!formData.message,
      });

      // If custom onSubmit handler is provided, call it
      if (onSubmit) {
        await onSubmit(formData);
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectName: projectName,
        message: "",
      });

      // Reset reCAPTCHA
      recaptchaRef.current.reset();
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({
        submit: error.message || "Something went wrong. Please try again.",
      });

      // GTM - Form submission error
      pushToDataLayer("form_submission_error", {
        errorMessage: error.message || "Unknown error",
        errorText: error.text || "Email send failed",
      });

      // Reset reCAPTCHA on error
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setIsSubmitted(false);
    setErrors({});

    // GTM - Form reset
    pushToDataLayer("form_reset", {
      action: "send_another_inquiry",
    });
  };

  if (isSubmitted) {
    return (
      <div className={`inquiry-container ${className}`}>
        <div className="inquiry-success">
          <div className="inquiry-success-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h3 className="inquiry-success-title">Thank You!</h3>
          <p className="inquiry-success-message">{successMessage}</p>
          <button className="inquiry-reset-btn" onClick={resetForm}>
            Send Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`inquiry-container ${className}`}>
      {/* Inquiry Header */}
      <div className="inquiry-header">
        <h2 className="inquiry-title">{title}</h2>
        <p className="inquiry-subtitle">
          Get in touch with us for more information about{" "}
          {projectName || "this project"}
        </p>
      </div>

      {/* Inquiry Form */}
      <form className="inquiry-form" onSubmit={handleSubmit}>
        <div className="inquiry-form-grid">
          {/* Name Field */}
          <div className="inquiry-form-group">
            <label htmlFor="inquiry-name" className="inquiry-form-label">
              Your Name *
            </label>
            <input
              id="inquiry-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`inquiry-form-input ${
                errors.name ? "inquiry-form-input--error" : ""
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <span className="inquiry-form-error">{errors.name}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="inquiry-form-group">
            <label htmlFor="inquiry-email" className="inquiry-form-label">
              Email *
            </label>
            <input
              id="inquiry-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`inquiry-form-input ${
                errors.email ? "inquiry-form-input--error" : ""
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <span className="inquiry-form-error">{errors.email}</span>
            )}
          </div>

          {/* Phone Field */}
          <div className="inquiry-form-group">
            <label htmlFor="inquiry-phone" className="inquiry-form-label">
              Phone Number *
            </label>
            <input
              id="inquiry-phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`inquiry-form-input ${
                errors.phone ? "inquiry-form-input--error" : ""
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <span className="inquiry-form-error">{errors.phone}</span>
            )}
          </div>

          {/* Project Name Field */}
          <div className="inquiry-form-group">
            <label htmlFor="inquiry-project" className="inquiry-form-label">
              Project Name *
            </label>
            <input
              id="inquiry-project"
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleInputChange}
              className={`inquiry-form-input ${
                errors.projectName ? "inquiry-form-input--error" : ""
              }`}
              placeholder="Project you're interested in"
              readOnly={!!projectName}
            />
            {errors.projectName && (
              <span className="inquiry-form-error">{errors.projectName}</span>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div className="inquiry-form-group inquiry-message-group">
          <label htmlFor="inquiry-message" className="inquiry-form-label">
            Additional Message (Optional)
          </label>
          <textarea
            id="inquiry-message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="inquiry-form-textarea"
            placeholder="Tell us more about your requirements..."
            rows="4"
          />
        </div>

        {/* Google reCAPTCHA - Invisible */}
        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
        />

        {/* Submit Error */}
        {errors.submit && (
          <div className="inquiry-form-error inquiry-form-error--submit">
            {errors.submit}
          </div>
        )}

        {/* Submit Button */}
        <div className="inquiry-form-submit">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inquiry-submit-btn ${
              isSubmitting ? "inquiry-submit-btn--loading" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="inquiry-loading-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="32"
                    strokeDashoffset="32"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="32;0;32"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
                Submitting...
              </>
            ) : (
              submitButtonText
            )}
          </button>
        </div>
      </form>

      {/* Privacy Notice */}
      <div className="inquiry-privacy">
        <p className="inquiry-privacy-text">
          By submitting this form, you agree to our privacy policy and consent
          to being contacted about this project. Your information will be kept
          confidential and used only for providing you with relevant project
          information.
        </p>
      </div>
    </div>
  );
}

Inquiry.propTypes = {
  /** Inquiry section title */
  title: PropTypes.string,

  /** Pre-filled project name */
  projectName: PropTypes.string,

  /** Additional CSS classes */
  className: PropTypes.string,

  /** Custom submit handler */
  onSubmit: PropTypes.func,

  /** Submit button text */
  submitButtonText: PropTypes.string,

  /** Success message after submission */
  successMessage: PropTypes.string,
};
