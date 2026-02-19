import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import closeIcon from "@/assets/close.svg";
import "@/styles/LeadershipPopup.css";

/**
 * LeadershipPopup - Enterprise-level modal for displaying leadership details
 *
 * Features:
 * - Responsive design with mobile optimization
 * - Keyboard navigation and accessibility
 * - Smooth animations and transitions
 * - Click outside to close functionality
 * - Social media links integration
 * - Image lazy loading and optimization
 *
 * @component
 * @example
 * <LeadershipPopup
 *   isOpen={showPopup}
 *   onClose={handleClose}
 *   leader={selectedLeader}
 * />
 */
export default function LeadershipPopup({
  isOpen = false,
  onClose,
  leader = null,
  className = "",
  showSocialLinks = true,
  imageSize = "607 × 419",
}) {
  // Handle escape key press
  const handleEscapeKey = useCallback(
    (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose?.();
      }
    },
    [isOpen, onClose]
  );

  // Handle click outside modal
  const handleOverlayClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        onClose?.();
      }
    },
    [onClose]
  );

  // Add/remove event listeners
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden"; // Prevent background scroll

      // Focus trap for accessibility
      const modal = document.querySelector(".leadership-popup__modal");
      if (modal) {
        modal.focus();
      }
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscapeKey]);

  // Don't render if not open or no leader data
  if (!isOpen || !leader) {
    return null;
  }

  // Default social media icons
  const getSocialIcon = (platform) => {
    const icons = {
      linkedin: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      instagram: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      twitter: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    };
    return icons[platform] || null;
  };

  return (
    <div
      className={`leadership-popup ${className}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="leadership-popup-title"
      aria-describedby="leadership-popup-description"
    >
      {/* Overlay */}
      <div
        className="leadership-popup__overlay"
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="leadership-popup__modal" tabIndex="-1" role="document">
        {/* Close Button */}
        <button
          className="leadership-popup__close"
          onClick={onClose}
          aria-label="Close leadership details"
          type="button"
        >
          <img src={closeIcon} alt="Close" width="15" height="15" />
        </button>

        {/* Content Container */}
        <div className="leadership-popup__content">
          {/* Image Section */}
          <div className="leadership-popup__image-section">
            <div className="leadership-popup__image-container">
              <img
                src={leader.image || leader.photo || leader.avatar}
                alt={`${leader.name} - ${
                  leader.position || leader.title || leader.role
                }`}
                className="leadership-popup__image"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                  const fallbackElement = e.target.nextSibling;
                  if (fallbackElement) {
                    fallbackElement.style.display = "flex";
                  }
                }}
              />
              {/* Fallback avatar */}
              <div
                className="leadership-popup__image-fallback"
                style={{ display: "none" }}
              >
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>

            {/* Image Size Indicator */}
            <div className="leadership-popup__image-size">{imageSize}</div>

            {/* Social Media Links */}
            {showSocialLinks && leader.socialLinks && (
              <div className="leadership-popup__social-links">
                {leader.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="leadership-popup__social-link"
                    aria-label={`${leader.name}'s ${link.platform} profile`}
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="leadership-popup__details">
            <div className="leadership-popup__header">
              <h2
                id="leadership-popup-title"
                className="leadership-popup__name"
              >
                {leader.name}
              </h2>
              <p className="leadership-popup__position">
                {leader.position || leader.title || leader.role}
              </p>
            </div>

            <div
              id="leadership-popup-description"
              className="leadership-popup__description"
            >
              {typeof leader.description === "string" ? (
                <p>{leader.description}</p>
              ) : Array.isArray(leader.description) ? (
                leader.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p>
                  {leader.bio || leader.about || "No description available."}
                </p>
              )}
            </div>

            {/* Additional Information */}
            {(leader.experience || leader.education || leader.achievements) && (
              <div className="leadership-popup__additional-info">
                {leader.experience && (
                  <div className="leadership-popup__info-section">
                    <h3>Experience</h3>
                    <p>{leader.experience}</p>
                  </div>
                )}

                {leader.education && (
                  <div className="leadership-popup__info-section">
                    <h3>Education</h3>
                    <p>{leader.education}</p>
                  </div>
                )}

                {leader.achievements && (
                  <div className="leadership-popup__info-section">
                    <h3>Key Achievements</h3>
                    {Array.isArray(leader.achievements) ? (
                      <ul>
                        {leader.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{leader.achievements}</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Enterprise-level PropTypes validation
LeadershipPopup.propTypes = {
  /** Whether the popup is open */
  isOpen: PropTypes.bool,

  /** Function to call when closing the popup */
  onClose: PropTypes.func.isRequired,

  /** Leader data object */
  leader: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.string,
    title: PropTypes.string,
    role: PropTypes.string,
    image: PropTypes.string,
    photo: PropTypes.string,
    avatar: PropTypes.string,
    description: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    bio: PropTypes.string,
    about: PropTypes.string,
    experience: PropTypes.string,
    education: PropTypes.string,
    achievements: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    socialLinks: PropTypes.arrayOf(
      PropTypes.shape({
        platform: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
  }),

  /** Additional CSS classes */
  className: PropTypes.string,

  /** Whether to show social media links */
  showSocialLinks: PropTypes.bool,

  /** Image size indicator text */
  imageSize: PropTypes.string,
};
