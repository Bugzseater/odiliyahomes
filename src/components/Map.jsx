import React from "react";
import PropTypes from "prop-types";
import "@/styles/Map.css";

/**
 * Map - Enterprise-level Map component with contact information
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Section title
 * @param {string} props.mapEmbedUrl - Google Maps embed URL
 * @param {Object} props.location - Location details
 * @param {Array} props.contactInfo - Contact information array
 * @param {string} props.className - Additional CSS classes
 */
export default function Map({
  title = "VISIT OUR COMPANY",
  mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798464605152!2d79.89051287475633!3d6.927102993063489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bcf1c3b5c8d%3A0x5f5e5f5e5f5e5f5e!2sOdiliya%20Residences!5e0!3m2!1sen!2slk!4v1234567890123!5m2!1sen!2slk",
  location = {
    name: "Odiliya Residencies",
    address: "No 29, Negombo Road, Wattala, Sri Lanka 11300",
  },
  contactInfo = [],
  className = "",
  ariaLabel,
  id,
}) {
  // Default contact information
  const defaultContactInfo = [
    {
      type: "phone",
      label: "Phone Number",
      value: "+94 71 000 0000",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      ),
    },
    {
      type: "email",
      label: "Email Address",
      value: "info@odiliyaresidencies.lk",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
    {
      type: "address",
      label: "Address",
      value: "NO 29, NEGOMBO ROAD, WATTALA, SRI LANKA 11300",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      ),
    },
  ];

  const contactData = contactInfo.length > 0 ? contactInfo : defaultContactInfo;

  const handleContactClick = (contact) => {
    switch (contact.type) {
      case "phone":
        window.open(`tel:${contact.value}`, "_self");
        break;
      case "email":
        window.open(`mailto:${contact.value}`, "_self");
        break;
      case "address":
        // Open in Google Maps
        window.open(
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            location.address
          )}`,
          "_blank"
        );
        break;
      default:
        break;
    }
  };

  return (
    <section
      className={`map-section ${className}`}
      aria-label={
        ariaLabel ||
        `Interactive map showing ${location.name} location with contact information`
      }
      id={id}
    >
      <div className="map-section__container">
        <div className="map-section__header">
          <h2 className="map-section__title">{title}</h2>
        </div>

        <div className="map-section__content">
          <div className="map-section__map-container">
            <iframe
              src={mapEmbedUrl}
              className="map-section__map"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${location.name} location`}
              role="application"
              aria-label="Interactive Google Map"
            />
          </div>

          <div className="map-section__contact">
            <div className="map-section__contact-grid">
              {contactData.map((contact, index) => (
                <div
                  key={index}
                  className="map-section__contact-item"
                  onClick={() => handleContactClick(contact)}
                  role="button"
                  tabIndex="0"
                  aria-label={`${contact.label}: ${contact.value}`}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleContactClick(contact);
                    }
                  }}
                >
                  <div className="map-section__contact-icon">
                    {contact.icon}
                  </div>
                  <div className="map-section__contact-content">
                    <h3 className="map-section__contact-label">
                      {contact.label}
                    </h3>
                    <p className="map-section__contact-value">
                      {contact.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// PropTypes validation
Map.propTypes = {
  /** Section title */
  title: PropTypes.string,

  /** Google Maps embed URL */
  mapEmbedUrl: PropTypes.string,

  /** Location details */
  location: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
  }),

  /** Contact information array */
  contactInfo: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["phone", "email", "address", "custom"]).isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      icon: PropTypes.node,
    })
  ),

  /** Additional CSS classes */
  className: PropTypes.string,

  /** ARIA label for accessibility */
  ariaLabel: PropTypes.string,

  /** Element ID */
  id: PropTypes.string,
};
