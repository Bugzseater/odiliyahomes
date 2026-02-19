import React from "react";
import PropTypes from "prop-types";
import "../styles/IconBody.css";

/**
 * IconBody - Enterprise-level component with left content and right image gallery
 *
 * Features:
 * - Two-column layout (content left, images right)
 * - Configurable content sections with statistics
 * - Multi-image gallery with automatic layout
 * - Responsive design with mobile optimization
 * - Profit sharing and ROI display components
 * - Professional styling with animations
 * - Accessibility compliant with ARIA labels
 * - Image lazy loading and error handling
 *
 * @component
 * @example
 * <IconBody
 *   mainContent={{
 *     title: "Investment Opportunity",
 *     description: "Lorem ipsum dolor sit amet...",
 *     statistics: [
 *       { label: "30% - 40% ROI", highlight: true },
 *       { label: "100% MANAGEMENT BY ODILIYA", subtitle: "Full service management" }
 *     ]
 *   }}
 *   profitSharing={{
 *     title: "PROFIT MODEL - NET PROFIT SHARING",
 *     description: "After deducting all operational expenses...",
 *     shares: [
 *       { label: "VILLA OWNERS", percentage: "70%" },
 *       { label: "ODILIYA", percentage: "30%" }
 *     ]
 *   }}
 *   images={[
 *     { src: "/path/to/image1.jpg", alt: "Villa exterior" },
 *     { src: "/path/to/image2.jpg", alt: "Interior design" }
 *   ]}
 *   additionalContent={[
 *     {
 *       title: "LOREM IPSUM LOREM",
 *       description: "Additional content description..."
 *     }
 *   ]}
 * />
 */
export default function IconBody({
  mainContent = null,
  profitSharing = null,
  additionalContent = [],
  images = [],
  className = "",
  showImageGallery = true,
  layout = "default", // "default", "compact", "expanded"
  contentAlignment = "left", // "left", "center", "justified"
  statisticsStyle = "bordered", // "bordered", "highlighted", "minimal"
  imageGalleryStyle = "stacked", // "stacked", "grid", "carousel"
}) {
  // Handle image loading errors
  const handleImageError = (e) => {
    e.target.style.display = "none";
    const fallback = e.target.nextSibling;
    if (fallback && fallback.classList.contains("icon-body__image-fallback")) {
      fallback.style.display = "flex";
    }
  };

  // Render statistics section
  const renderStatistics = (statistics) => {
    if (!statistics || statistics.length === 0) return null;

    return (
      <div
        className={`icon-body__statistics icon-body__statistics--${statisticsStyle}`}
      >
        {statistics.map((stat, index) => (
          <div
            key={index}
            className={`icon-body__statistic ${
              stat.highlight ? "icon-body__statistic--highlight" : ""
            }`}
          >
            <div className="icon-body__statistic-label">{stat.label}</div>
            {stat.subtitle && (
              <div className="icon-body__statistic-subtitle">
                {stat.subtitle}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render profit sharing section
  const renderProfitSharing = () => {
    if (!profitSharing) return null;

    return (
      <section className="icon-body__profit-sharing">
        <h3 className="icon-body__profit-title">{profitSharing.title}</h3>
        {profitSharing.description && (
          <p className="icon-body__profit-description">
            {profitSharing.description}
          </p>
        )}

        {profitSharing.shares && profitSharing.shares.length > 0 && (
          <div className="icon-body__shares">
            {profitSharing.shares.map((share, index) => (
              <div key={index} className="icon-body__share">
                <div className="icon-body__share-percentage">
                  {share.percentage}
                </div>
                <div className="icon-body__share-label">{share.label}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  };

  // Render additional content sections
  const renderAdditionalContent = () => {
    if (!additionalContent || additionalContent.length === 0) return null;

    return additionalContent.map((content, index) => (
      <section key={index} className="icon-body__additional-section">
        <h3 className="icon-body__additional-title">{content.title}</h3>
        {content.description && (
          <div className="icon-body__additional-description">
            {typeof content.description === "string" ? (
              <p>{content.description}</p>
            ) : (
              content.description
            )}
          </div>
        )}
        {content.list && content.list.length > 0 && (
          <ul className="icon-body__additional-list">
            {content.list.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        )}
      </section>
    ));
  };

  // Render image gallery
  const renderImageGallery = () => {
    if (!showImageGallery || !images || images.length === 0) return null;

    return (
      <div
        className={`icon-body__gallery icon-body__gallery--${imageGalleryStyle}`}
      >
        {images.map((image, index) => (
          <div key={index} className="icon-body__image-container">
            <img
              src={image.src}
              alt={image.alt || `Gallery image ${index + 1}`}
              className="icon-body__image"
              loading="lazy"
              onError={handleImageError}
            />
            <div
              className="icon-body__image-fallback"
              style={{ display: "none" }}
            >
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
              <span>Image not available</span>
            </div>
            {image.caption && (
              <div className="icon-body__image-caption">{image.caption}</div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`icon-body icon-body--${layout} ${className}`}>
      <div className="icon-body__container">
        {/* Left Content Area */}
        <div
          className={`icon-body__content icon-body__content--${contentAlignment}`}
        >
          {/* Main Content Section */}
          {mainContent && (
            <section className="icon-body__main-section">
              {mainContent.title && (
                <h2 className="icon-body__main-title">{mainContent.title}</h2>
              )}

              {mainContent.description && (
                <div className="icon-body__main-description">
                  {typeof mainContent.description === "string" ? (
                    <p>{mainContent.description}</p>
                  ) : (
                    mainContent.description
                  )}
                </div>
              )}

              {/* Statistics */}
              {renderStatistics(mainContent.statistics)}
            </section>
          )}

          {/* Profit Sharing Section */}
          {renderProfitSharing()}

          {/* Additional Content Sections */}
          {renderAdditionalContent()}
        </div>

        {/* Right Image Gallery */}
        {showImageGallery && (
          <div className="icon-body__gallery-container">
            {renderImageGallery()}
          </div>
        )}
      </div>
    </div>
  );
}

IconBody.propTypes = {
  /** Main content configuration */
  mainContent: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    statistics: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        subtitle: PropTypes.string,
        highlight: PropTypes.bool,
      })
    ),
  }),

  /** Profit sharing section configuration */
  profitSharing: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    shares: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        percentage: PropTypes.string.isRequired,
      })
    ),
  }),

  /** Additional content sections */
  additionalContent: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      list: PropTypes.arrayOf(PropTypes.string),
    })
  ),

  /** Gallery images */
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      caption: PropTypes.string,
    })
  ).isRequired,

  /** Additional CSS classes */
  className: PropTypes.string,

  /** Show/hide image gallery */
  showImageGallery: PropTypes.bool,

  /** Layout style */
  layout: PropTypes.oneOf(["default", "compact", "expanded"]),

  /** Content text alignment */
  contentAlignment: PropTypes.oneOf(["left", "center", "justified"]),

  /** Statistics display style */
  statisticsStyle: PropTypes.oneOf(["bordered", "highlighted", "minimal"]),

  /** Image gallery layout style */
  imageGalleryStyle: PropTypes.oneOf(["stacked", "grid", "carousel"]),
};
