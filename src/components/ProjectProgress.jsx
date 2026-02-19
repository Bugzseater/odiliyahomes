import { useState } from "react";
import PropTypes from "prop-types";
import "../styles/ProjectProgress.css";

/**
 * ProjectProgress Component
 * Displays project progress with a main viewer and thumbnail grid
 * @component
 * @param {Object} props - Component props
 * @param {string} props.title - Section title (default: "Project Progress")
 * @param {Array} props.images - Array of image objects with src, alt, and caption
 */
const ProjectProgress = ({ title = "Project Progress", images = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState({});

  /**
   * Handle thumbnail click
   * @param {number} index - Image index
   */
  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  /**
   * Handle image load error
   * @param {number} index - Image index
   */
  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  if (!images || images.length === 0) {
    return (
      <section className="project-progress">
        <div className="project-progress__container">
          <h2 className="project-progress__title">{title}</h2>
          <div className="project-progress__empty">
            <p>No progress images available</p>
          </div>
        </div>
      </section>
    );
  }

  const currentImage = images[selectedIndex];

  return (
    <section className="project-progress">
      <div className="project-progress__container">
        <h2 className="project-progress__title">{title}</h2>

        <div className="project-progress__layout">
          {/* Thumbnail Grid - Left Side */}
          {images.length > 1 && (
            <div className="project-progress__thumbnails">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`project-progress__thumbnail ${
                    index === selectedIndex
                      ? "project-progress__thumbnail--active"
                      : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleThumbnailClick(index);
                    }
                  }}
                  aria-label={`View ${image.alt || `image ${index + 1}`}`}
                >
                  {!imageErrors[index] ? (
                    <img
                      src={image.src}
                      alt={image.alt || `Thumbnail ${index + 1}`}
                      className="project-progress__thumbnail-image"
                      loading="lazy"
                      onError={() => handleImageError(index)}
                    />
                  ) : (
                    <div className="project-progress__placeholder">
                      <svg
                        className="project-progress__placeholder-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Main Image Viewer - Right Side */}
          <div className="project-progress__main-viewer">
            {!imageErrors[selectedIndex] ? (
              <img
                src={currentImage.src}
                alt={
                  currentImage.alt || `Project progress ${selectedIndex + 1}`
                }
                className="project-progress__main-image"
                onError={() => handleImageError(selectedIndex)}
              />
            ) : (
              <div className="project-progress__placeholder project-progress__placeholder--main">
                <svg
                  className="project-progress__placeholder-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p>Image unavailable</p>
              </div>
            )}

            {currentImage.caption && (
              <div className="project-progress__main-caption">
                {currentImage.caption}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

ProjectProgress.propTypes = {
  title: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string,
      caption: PropTypes.string,
    })
  ).isRequired,
};

export default ProjectProgress;
