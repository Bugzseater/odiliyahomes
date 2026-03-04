import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "@/styles/ProjectGallery.css";

/**
 * ProjectGallery - Interactive project image gallery component
 * Displays project images in a grid with lightbox popup functionality
 */
export default function ProjectGallery({
  title = "Project Gallery",
  images = [],
  showThumbnails = true,
  className = "",
  columns = 4,
  aspectRatio = "1/1",
  showImageInfo = true,
}) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // Debug received props
  useEffect(() => {
    console.log("🖼️ [ProjectGallery] Received props:");
    console.log("   - title:", title);
    console.log("   - images array:", images);
    console.log("   - images length:", images?.length);
    if (images && images.length > 0) {
      console.log("   - first image:", images[0]);
      console.log("   - first image src:", images[0]?.src || images[0]);
    }
  }, [images, title]);

  // Handle lightbox navigation
  const openLightbox = (index) => {
    console.log("🔍 Opening lightbox at index:", index);
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeLightbox = () => {
    console.log("🔍 Closing lightbox");
    setIsLightboxOpen(false);
    setSelectedImageIndex(null);
    document.body.style.overflow = "unset"; // Restore scrolling
  };

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      const nextIndex = selectedImageIndex === images.length - 1 ? 0 : selectedImageIndex + 1;
      console.log("🔍 Next image:", nextIndex);
      setSelectedImageIndex(nextIndex);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      const prevIndex = selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
      console.log("🔍 Previous image:", prevIndex);
      setSelectedImageIndex(prevIndex);
    }
  };

  const goToImage = (index) => {
    console.log("🔍 Go to image:", index);
    setSelectedImageIndex(index);
  };

  const handleImageError = (imageUrl, type = 'gallery') => {
    console.log(`❌ [ProjectGallery] Image failed to load (${type}):`, imageUrl);
    setImageErrors(prev => ({ ...prev, [imageUrl]: true }));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isLightboxOpen) return;

      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isLightboxOpen, selectedImageIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!images || images.length === 0) {
    console.log("⚠️ [ProjectGallery] No images to display");
    return null;
  }

  const getImageUrl = (image) => {
    return image?.src || image || '';
  };

  const getImageAlt = (image, index) => {
    return image?.alt || image?.title || `Project image ${index + 1}`;
  };

  const currentImage = selectedImageIndex !== null ? images[selectedImageIndex] : null;
  const currentImageUrl = currentImage ? getImageUrl(currentImage) : '';

  return (
    <div className={`project-gallery-container ${className}`}>
      {/* Gallery Header */}
      <div className="project-gallery-header">
        <h2 className="project-gallery-title">{title}</h2>
        <div className="project-gallery-count">
          {images.length} {images.length === 1 ? "Image" : "Images"}
        </div>
      </div>

      {/* Image Grid */}
      <div 
        className="project-gallery-grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
        }}
      >
        {images.map((image, index) => {
          const imageUrl = getImageUrl(image);
          return (
            <div
              key={index}
              className="project-gallery-item"
              onClick={() => openLightbox(index)}
              style={{ aspectRatio }}
            >
              <div className="project-gallery-image-wrapper">
                <img
                  src={imageUrl}
                  alt={getImageAlt(image, index)}
                  className="project-gallery-image"
                  onError={(e) => {
                    console.log(`❌ Gallery image ${index} error:`, e.target.src);
                    e.target.src = 'https://via.placeholder.com/400x400?text=Image+Error';
                    handleImageError(imageUrl, 'gallery');
                  }}
                  onLoad={() => console.log(`✅ Gallery image ${index} loaded:`, imageUrl)}
                />
                <div className="project-gallery-overlay">
                  <div className="project-gallery-overlay-content">
                    <svg 
                      className="project-gallery-expand-icon" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none"
                    >
                      <path 
                        d="M15 3H21V9M14 10L20.2 3.8M21 14V21H15M10 14L16.2 20.2M9 21H3V15M10 10L3.8 3.8M3 10V3H9M14 14L7.8 20.2" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                
                {showImageInfo && (image.title || image.caption) && (
                  <div className="project-gallery-image-info">
                    {image.title && (
                      <span className="project-gallery-image-title">
                        {image.title}
                      </span>
                    )}
                    {image.caption && (
                      <span className="project-gallery-image-caption">
                        {image.caption}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && currentImage && (
        <div className="project-gallery-lightbox" onClick={closeLightbox}>
          <div className="project-gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button 
              className="project-gallery-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close gallery"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M18 6L6 18M6 6L18 18" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button 
                  className="project-gallery-lightbox-nav project-gallery-lightbox-prev"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
                  className="project-gallery-lightbox-nav project-gallery-lightbox-next"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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

            {/* Main Image */}
            <div className="project-gallery-lightbox-image-container">
              <img
                src={currentImageUrl}
                alt={getImageAlt(currentImage, selectedImageIndex)}
                className="project-gallery-lightbox-image"
                onError={(e) => {
                  console.log("❌ Lightbox image error:", e.target.src);
                  e.target.src = 'https://via.placeholder.com/800x800?text=Image+Error';
                }}
                onLoad={() => console.log("✅ Lightbox image loaded:", currentImageUrl)}
              />
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="project-gallery-lightbox-counter">
                {selectedImageIndex + 1} / {images.length}
              </div>
            )}

            {/* Image Information */}
            {showImageInfo && (currentImage.title || currentImage.caption || currentImage.description) && (
              <div className="project-gallery-lightbox-info">
                {currentImage.title && (
                  <h3 className="project-gallery-lightbox-title">
                    {currentImage.title}
                  </h3>
                )}
                {currentImage.caption && (
                  <p className="project-gallery-lightbox-caption">
                    {currentImage.caption}
                  </p>
                )}
                {currentImage.description && (
                  <p className="project-gallery-lightbox-description">
                    {currentImage.description}
                  </p>
                )}
              </div>
            )}

            {/* Thumbnail Navigation */}
            {showThumbnails && images.length > 1 && (
              <div className="project-gallery-lightbox-thumbnails">
                <div className="project-gallery-lightbox-thumbnails-scroll">
                  {images.map((image, index) => {
                    const thumbUrl = getImageUrl(image);
                    return (
                      <button
                        key={index}
                        className={`project-gallery-lightbox-thumbnail ${
                          index === selectedImageIndex ? "project-gallery-lightbox-thumbnail--active" : ""
                        }`}
                        onClick={() => goToImage(index)}
                        aria-label={`View image ${index + 1}`}
                      >
                        <img
                          src={thumbUrl}
                          alt={`Thumbnail ${index + 1}`}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

ProjectGallery.propTypes = {
  /** Gallery title */
  title: PropTypes.string,
  /** Array of image objects or URLs */
  images: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
        title: PropTypes.string,
        caption: PropTypes.string,
        description: PropTypes.string,
      }),
    ])
  ).isRequired,
  /** Show thumbnail navigation in lightbox */
  showThumbnails: PropTypes.bool,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Number of columns in the grid */
  columns: PropTypes.number,
  /** Aspect ratio for grid items */
  aspectRatio: PropTypes.string,
  /** Show image information */
  showImageInfo: PropTypes.bool,
};