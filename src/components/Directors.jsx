import React, { useState } from "react";
import PropTypes from "prop-types";
import LeadershipPopup from "./LeadershipPopup";
import "@/styles/Directors.css";

export default function Directors({
  title = "DIRECTORS",
  directors = [],
  layout = "grid", // "grid" or "featured"
  showSocialIcons = true,
}) {
  const [selectedDirector, setSelectedDirector] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleDirectorClick = (director) => {
    // Transform socialLinks object to array format for LeadershipPopup
    const transformedDirector = {
      ...director,
      socialLinks: director.socialLinks
        ? Object.entries(director.socialLinks)
            .filter(([, url]) => url) // Only include platforms with URLs
            .map(([platform, url]) => ({ platform, url }))
        : [],
    };

    setSelectedDirector(transformedDirector);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedDirector(null);
  };

  return (
    <section className="directors">
      <div className="directors__container">
        <div className="directors__header">
          <h2 className="directors__title">{title}</h2>
        </div>

        <div className={`directors__content directors__content--${layout}`}>
          {directors.map((director, index) => (
            <div
              key={index}
              className={`director-card ${
                index === 0 && layout === "featured"
                  ? "director-card--featured"
                  : ""
              }`}
              onClick={() => handleDirectorClick(director)}
              style={{ cursor: "pointer" }}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleDirectorClick(director);
                }
              }}
              aria-label={`View details for ${director.name}`}
            >
              <div className="director-card__image-wrapper">
                <img
                  src={director.image}
                  alt={director.name}
                  className="director-card__image"
                />
                {showSocialIcons && director.socialLinks && (
                  <div className="director-card__social">
                    {director.socialLinks.linkedin && (
                      <a
                        href={director.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="director-card__social-link"
                        aria-label={`${director.name} LinkedIn`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                    {director.socialLinks.instagram && (
                      <a
                        href={director.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="director-card__social-link"
                        aria-label={`${director.name} Instagram`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </a>
                    )}
                    {director.socialLinks.twitter && (
                      <a
                        href={director.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="director-card__social-link"
                        aria-label={`${director.name} Twitter`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="director-card__content">
                <h3 className="director-card__name">{director.name}</h3>
                <p className="director-card__position">{director.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership Popup */}
      <LeadershipPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        leader={selectedDirector}
        showSocialLinks={showSocialIcons}
      />
    </section>
  );
}

Directors.propTypes = {
  title: PropTypes.string,
  directors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string,
      socialLinks: PropTypes.shape({
        linkedin: PropTypes.string,
        instagram: PropTypes.string,
        twitter: PropTypes.string,
      }),
    })
  ).isRequired,
  layout: PropTypes.oneOf(["grid", "featured"]),
  showSocialIcons: PropTypes.bool,
};
