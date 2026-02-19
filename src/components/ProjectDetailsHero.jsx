import React, { useState } from "react";
import PropTypes from "prop-types";
import "@/styles/ProjectDetailsHero.css";

/**
 * ProjectDetailsHero - Reusable project details hero section component
 * Displays project images with navigation, map, and contact information
 */
export default function ProjectDetailsHero({
  title = "",
  images = [],
  mapEmbedUrl = "",
  mapImageUrl = "",
  propertyAdvisor = {},
  contactButtons = [],
  className = "",
  imageAspectRatio = "16/9",
  showThumbnails = true,
  showNavigation = true,
  mapStyle = "embed", // "embed" or "image"
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <section
      className={`project-details-hero${className ? ` ${className}` : ""}`}
    >
      {title && (
        <div className="project-details-hero__header">
          <h1 className="project-details-hero__title">{title}</h1>
        </div>
      )}

      <div className="project-details-container">
        {/* Left Side - Image Gallery */}
        <div className="project-details-gallery">
          {/* Main Image Display */}
          <div className="project-main-image-container">
            {images.length > 0 && (
              <div
                className="project-main-image"
                style={{
                  backgroundImage: `url(${
                    images[currentImageIndex]?.src || images[currentImageIndex]
                  })`,
                  aspectRatio: imageAspectRatio,
                }}
              >
                {showNavigation && images.length > 1 && (
                  <>
                    {/* Navigation Arrows */}
                    <button
                      className="project-nav-arrow project-nav-prev"
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M15 18L9 12L15 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <button
                      className="project-nav-arrow project-nav-next"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {showThumbnails && images.length > 1 && (
            <div className="project-thumbnails">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`project-thumbnail${
                    index === currentImageIndex
                      ? " project-thumbnail--active"
                      : ""
                  }`}
                  onClick={() => goToImage(index)}
                  style={{
                    backgroundImage: `url(${image.src || image})`,
                  }}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Side - Map and Contact */}
        <div className="project-details-sidebar">
          {/* Map Section */}
          <div className="project-map-section">
            {mapStyle === "embed" && mapEmbedUrl ? (
              <iframe
                src={mapEmbedUrl}
                className="project-map-embed"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Project Location Map"
              />
            ) : mapImageUrl ? (
              <div
                className="project-map-image"
                style={{ backgroundImage: `url(${mapImageUrl})` }}
              />
            ) : (
              <div className="project-map-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5 7 1 12 1S21 5 21 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <p>Map Location</p>
              </div>
            )}
          </div>

          {/* Property Advisor Section WITH contact buttons inside */}
          {propertyAdvisor.name && (
            <div className="project-advisor-section">
              <div className="project-advisor-info">
                {propertyAdvisor.avatar && (
                  <div className="project-advisor-avatar">
                    <img
                      src={propertyAdvisor.avatar}
                      alt={propertyAdvisor.name}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="project-advisor-avatar-fallback">
                      {propertyAdvisor.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                )}

                <div className="project-advisor-details">
                  <h3 className="project-advisor-name">
                    {propertyAdvisor.name}
                  </h3>
                  {propertyAdvisor.title && (
                    <p className="project-advisor-title">
                      {propertyAdvisor.title}
                    </p>
                  )}
                  {propertyAdvisor.phone && (
                    <p className="project-advisor-phone">
                      {propertyAdvisor.phone}
                    </p>
                  )}
                  {propertyAdvisor.email && (
                    <p className="project-advisor-email">
                      {propertyAdvisor.email}
                    </p>
                  )}
                </div>
              </div>

              {contactButtons.length > 0 && (
                <div className="project-advisor-actions">
                  {contactButtons.map((button, index) => (
                    <a
                      key={index}
                      href={button.url}
                      target={button.external ? "_blank" : "_self"}
                      rel={button.external ? "noopener noreferrer" : ""}
                      className={`project-contact-btn${
                        button.className ? ` ${button.className}` : ""
                      }`}
                      style={button.style}
                    >
                      {button.icon && (
                        <span className="project-contact-btn-icon">
                          {typeof button.icon === "string" ? (
                            <img src={button.icon} alt="" />
                          ) : (
                            button.icon
                          )}
                        </span>
                      )}
                      <span className="project-contact-btn-text">
                        {button.label}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Removed separate contact buttons block */}
        </div>
      </div>
    </section>
  );
}

ProjectDetailsHero.propTypes = {
  /** Optional title displayed above the hero */
  title: PropTypes.string,

  /** Array of image objects or URLs */
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
        caption: PropTypes.string,
      }),
    ])
  ),

  /** Google Maps embed URL */
  mapEmbedUrl: PropTypes.string,

  /** Static map image URL (alternative to embed) */
  mapImageUrl: PropTypes.string,

  /** Property advisor information */
  propertyAdvisor: PropTypes.shape({
    name: PropTypes.string,
    title: PropTypes.string,
    avatar: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),

  /** Array of contact buttons */
  contactButtons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      className: PropTypes.string,
      style: PropTypes.object,
      external: PropTypes.bool,
    })
  ),

  /** Additional CSS classes */
  className: PropTypes.string,

  /** Image aspect ratio */
  imageAspectRatio: PropTypes.string,

  /** Show thumbnail navigation */
  showThumbnails: PropTypes.bool,

  /** Show navigation arrows */
  showNavigation: PropTypes.bool,

  /** Map display style - "embed" or "image" */
  mapStyle: PropTypes.oneOf(["embed", "image"]),
};
