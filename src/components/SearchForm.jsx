import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "@/styles/SearchForm.css";

/**
 * SearchForm - Reusable search form component
 * Allows users to search for properties with filters
 */
export default function SearchForm({
  title = "Find Your...",
  onSearch,
  searchOptions = {
    status: ["Available", "Sold Out"],
    location: ["Colombo", "Galle", "Kandy", "Negombo", "Panadura", "Wattala"],
    projectName: [],
  },
  contactInfo = {
    name: "Odiliya Agent",
    role: "Property Advisor",
    avatar: null,
  },
  className = "",
}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    status: "",
    location: "",
    projectName: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(formData);
    }
  };

  const handleWhatsAppClick = () => {
    // WhatsApp number without + or spaces
    const phoneNumber = "94710977888";
    const message = encodeURIComponent(
      `Hi! I'm interested in your properties. Can you provide more information?`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleContactUsClick = () => {
    navigate("/contact");
  };

  const handleAgentClick = () => {
    // Use phone from contactInfo or default WhatsApp number
    const phoneNumber = contactInfo.phone || "94717508899";
    const message = encodeURIComponent(
      `Hi! I'm interested in your land projects. Can you provide more information?`
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  // Helper: derive initials for avatar fallback
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((p) => p[0].toUpperCase()).join("");
  };

  return (
    <div className={`search-form${className ? ` ${className}` : ""}`}>
      <div className="search-form__header">
        <h3 className="search-form__title">{title}</h3>
      </div>

      <div className="search-form__fields">
        {/* Project Status */}
        <div className="search-form__field">
          <select
            className="search-form__select"
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          >
            <option value="">Project Status</option>
            {searchOptions.status.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="search-form__field">
          <select
            className="search-form__select"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          >
            <option value="">Location</option>
            {searchOptions.location.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Project Name */}
        <div className="search-form__field">
          <input
            type="text"
            className="search-form__input"
            placeholder="Project Name..."
            value={formData.projectName}
            onChange={(e) => handleInputChange("projectName", e.target.value)}
          />
        </div>

        {/* Search Button */}
        <button className="search-form__button" onClick={handleSearch}>
          Search
        </button>

        {/* Contact Info */}
        <div className="search-form__contact">
          <span className="search-form__contact-text">Contact Our Agent</span>
        </div>
      </div>

      {/* Agent Info - Clickable to WhatsApp */}
      <div
        className="search-form__agent"
        onClick={handleAgentClick}
        style={{ cursor: "pointer" }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleAgentClick();
          }
        }}
        aria-label="Contact agent on WhatsApp"
      >
        {contactInfo.avatar ? (
          <img
            src={contactInfo.avatar}
            alt={contactInfo.name}
            className="search-form__avatar"
          />
        ) : (
          <div className="search-form__avatar search-form__avatar--fallback">
            {getInitials(contactInfo.name)}
          </div>
        )}
        <div className="search-form__agent-info">
          <h4 className="search-form__agent-name">{contactInfo.name}</h4>
          <p className="search-form__agent-role">{contactInfo.role}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="search-form__actions">
        <button
          className="search-form__whatsapp"
          onClick={handleWhatsAppClick}
          aria-label="Contact us on WhatsApp"
        >
          Whatsapp
        </button>
        <button
          className="search-form__contact-btn"
          onClick={handleContactUsClick}
          aria-label="Go to Contact Us page"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
}

SearchForm.propTypes = {
  title: PropTypes.string,
  onSearch: PropTypes.func,
  searchOptions: PropTypes.shape({
    status: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.arrayOf(PropTypes.string),
    projectName: PropTypes.arrayOf(PropTypes.string),
  }),
  contactInfo: PropTypes.shape({
    name: PropTypes.string,
    role: PropTypes.string,
    avatar: PropTypes.string,
    phone: PropTypes.string,
  }),
  className: PropTypes.string,
};
