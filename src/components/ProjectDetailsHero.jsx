import React, { useState, useEffect } from "react";
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
  onImageError = null,
  maxImages = 4, // ✅ Default value 4
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  // ✅ Limit images to maxImages (default 4)
  const limitedImages = images.slice(0, maxImages);
  const totalImages = images.length;

  // Debug received props
  useEffect(() => {
    console.log("🎯 [ProjectDetailsHero] Received props:");
    console.log("   - title:", title);
    console.log("   - total images:", totalImages);
    console.log("   - showing images:", limitedImages.length);
    console.log("   - maxImages:", maxImages);
    if (limitedImages && limitedImages.length > 0) {
      console.log("   - first image:", limitedImages[0]);
    }
  }, [images, limitedImages, title, maxImages, totalImages]);

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === limitedImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? limitedImages.length - 1 : prev - 1));
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  const handleImageError = (imageUrl, type = 'main') => {
    console.log(`❌ [ProjectDetailsHero] Image failed to load (${type}):`, imageUrl);
    setImageErrors(prev => ({ ...prev, [imageUrl]: true }));
    
    // Call parent error handler if provided
    if (onImageError) {
      onImageError(imageUrl, type);
    }
  };

  const getImageUrl = (image) => {
    return image?.src || image || '';
  };

  if (!limitedImages || limitedImages.length === 0) {
    console.log("⚠️ [ProjectDetailsHero] No images provided");
    return (
      <section className={`project-details-hero${className ? ` ${className}` : ""}`}>
        <div className="project-details-container">
          <div className="project-details-gallery">
            <div className="project-main-image-container">
              <div className="project-main-image project-main-image--empty">
                <p>No images available</p>
              </div>
            </div>
          </div>
          <div className="project-details-sidebar">
            {/* Map and contact sections remain */}
          </div>
        </div>
      </section>
    );
  }

  const currentImageUrl = getImageUrl(limitedImages[currentImageIndex]);

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
            {limitedImages.length > 0 && (
              <div className="project-main-image-wrapper">
                <img
                  src={currentImageUrl}
                  alt={limitedImages[currentImageIndex]?.alt || `Project image ${currentImageIndex + 1}`}
                  className="project-main-image"
                  style={{ aspectRatio: imageAspectRatio }}
                  onError={(e) => {
                    console.log("❌ Main image error:", e.target.src);
                    e.target.src = 'https://via.placeholder.com/800x450?text=Image+Not+Available';
                    handleImageError(currentImageUrl, 'main');
                  }}
                  onLoad={() => console.log("✅ Main image loaded:", currentImageUrl)}
                />
                
                {showNavigation && limitedImages.length > 1 && (
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

          {/* Thumbnail Navigation - Show only limited images */}
          {showThumbnails && limitedImages.length > 1 && (
            <div className="project-thumbnails">
              {limitedImages.map((image, index) => {
                const thumbUrl = getImageUrl(image);
                return (
                  <button
                    key={index}
                    className={`project-thumbnail ${
                      index === currentImageIndex
                        ? "project-thumbnail--active"
                        : ""
                    }`}
                    onClick={() => goToImage(index)}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={thumbUrl}
                      alt={`Thumbnail ${index + 1}`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.background = '#f0f0f0';
                      }}
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* ✅ Image counter showing how many more images */}
          {totalImages > maxImages && (
            <div className="project-image-counter">
              <span>+{totalImages - maxImages} more images in gallery</span>
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
              <img
                src={mapImageUrl}
                alt="Project location map"
                className="project-map-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
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
          {propertyAdvisor?.name && (
            <div className="project-advisor-section">
              <div className="project-advisor-info">
                {propertyAdvisor.avatar && (
                  <div className="project-advisor-avatar">
                    <img
                      src={propertyAdvisor.avatar}
                      alt={propertyAdvisor.name}
                      onError={(e) => {
                        e.target.style.display = "none";
                        if (e.target.nextSibling) {
                          e.target.nextSibling.style.display = "flex";
                        }
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
  /** Image error callback */
  onImageError: PropTypes.func,
  /** Maximum number of images to display (default: 4) */
  maxImages: PropTypes.number,
};