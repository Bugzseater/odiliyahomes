import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import "@/styles/WelcomePopup.css";

/**
 * WelcomePopup - Enterprise-level auto-show welcome modal
 * Displays on first visit with localStorage tracking
 * Features: backdrop click close, ESC key close, accessibility support
 */
export default function WelcomePopup({
  image,
  title,
  description,
  buttonText = "Get Started",
  onButtonClick,
  showOnFirstVisit = true,
  localStorageKey = "odiliya_welcome_popup_shown",
  autoShowDelay = 1000,
  enableBackdropClick = true,
  enableEscapeKey = true,
  imageOnly = false,
  bannerMode = false,
  className = "",
  navigateTo,
}) {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check if popup should be shown
  useEffect(() => {
    // If showOnFirstVisit is false, always show the popup
    if (!showOnFirstVisit) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
        document.body.style.overflow = "hidden";
      }, autoShowDelay);

      return () => clearTimeout(timer);
    }

    // If showOnFirstVisit is true, check localStorage
    const hasBeenShown = localStorage.getItem(localStorageKey);

    if (!hasBeenShown) {
      // Show popup after delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
        setIsAnimating(true);
        // Prevent body scroll when popup is open
        document.body.style.overflow = "hidden";
      }, autoShowDelay);

      return () => clearTimeout(timer);
    }
  }, [showOnFirstVisit, localStorageKey, autoShowDelay]);

  // Handle close popup
  const closePopup = useCallback(() => {
    setIsAnimating(false);

    // Wait for animation to complete before hiding
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";

      // Mark as shown in localStorage only if showOnFirstVisit is true
      if (showOnFirstVisit) {
        localStorage.setItem(localStorageKey, "true");
      }
    }, 300);
  }, [localStorageKey, showOnFirstVisit]);

  // Handle ESC key press
  useEffect(() => {
    if (!isVisible || !enableEscapeKey) return;

    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isVisible, enableEscapeKey, closePopup]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (enableBackdropClick && e.target === e.currentTarget) {
      closePopup();
    }
  };

  // Handle button click
  const handleButtonClick = () => {
    if (navigateTo) {
      navigate(navigateTo);
    }
    if (onButtonClick) {
      onButtonClick();
    }
    closePopup();
  };

  if (!isVisible) return null;

  return (
    <div
      className={`welcome-popup-overlay ${
        isAnimating ? "welcome-popup-overlay-active" : ""
      }`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-popup-title"
      aria-describedby="welcome-popup-description"
    >
      <div
        className={`welcome-popup-container ${
          isAnimating ? "welcome-popup-container-active" : ""
        } ${bannerMode ? "welcome-popup-banner" : ""} ${className}`}
      >
        {/* Close Button */}
        <button
          className="welcome-popup-close"
          onClick={closePopup}
          aria-label="Close welcome popup"
          type="button"
        >
          <IoMdClose size={36} />
        </button>

        {/* Popup Content */}
        <div className="welcome-popup-content">
          {/* Image Section */}
          {image && (
            <div
              className="welcome-popup-image-container"
              onClick={imageOnly || navigateTo ? handleButtonClick : undefined}
              style={{
                cursor: imageOnly || navigateTo ? "pointer" : "default",
              }}
            >
              <img
                src={image}
                alt={title || "Welcome"}
                className="welcome-popup-image"
                loading="eager"
              />
            </div>
          )}

          {/* Text Content */}
          {!imageOnly && (
            <div className="welcome-popup-body">
              {title && (
                <h2 id="welcome-popup-title" className="welcome-popup-title">
                  {title}
                </h2>
              )}

              {description && (
                <p
                  id="welcome-popup-description"
                  className="welcome-popup-description"
                >
                  {description}
                </p>
              )}

              {/* Action Button */}
              {buttonText && (
                <button
                  className="welcome-popup-button"
                  onClick={handleButtonClick}
                  type="button"
                >
                  {buttonText}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}

              {/* Optional: Don't show again link */}
              <button
                className="welcome-popup-dismiss"
                onClick={closePopup}
                type="button"
              >
                Continue to website
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

WelcomePopup.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  showOnFirstVisit: PropTypes.bool,
  localStorageKey: PropTypes.string,
  autoShowDelay: PropTypes.number,
  enableBackdropClick: PropTypes.bool,
  enableEscapeKey: PropTypes.bool,
  imageOnly: PropTypes.bool,
  bannerMode: PropTypes.bool,
  className: PropTypes.string,
  navigateTo: PropTypes.string,
};
