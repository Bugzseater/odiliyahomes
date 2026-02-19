import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "@/styles/History.css";

/**
 * History - Reusable history section component
 * Features title, description, and overlapping images layout
 */
export default function History({
  title = "OUR HISTORY",
  description = "Lorem ipsum dolor sit amet consectetur, morper placerat purus cursus id felis dignism proin ugat. Pretium proin nulla armados et suspendisse non quam Lorem ipsum dolor sit amet consectetur, morper placerat purus cursus id felis dignism proin ugat. Pretium proin nulla armados et suspendisse non quam",
  primaryImage,
  secondaryImage,
  layout = "image-left", // "image-left" or "image-right"
  className = "",
}) {
  const sectionRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY.current;

          if (entry.isIntersecting && isScrollingDown) {
            entry.target.classList.add("animate-in");
          } else if (!entry.isIntersecting && !isScrollingDown) {
            // Remove animation class when scrolling up and element is out of view
            entry.target.classList.remove("animate-in");
          }

          lastScrollY.current = currentScrollY;
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`history${className ? ` ${className}` : ""}`}
    >
      <div className="history__container">
        <div className={`history__wrapper history__wrapper--${layout}`}>
          {/* Images Section */}
          <div className="history__images">
            {/* Primary Image */}
            <div className="history__image-primary">
              {primaryImage && (
                <img
                  src={primaryImage}
                  alt="History primary visual"
                  className="history__img-primary"
                />
              )}
            </div>

            {/* Secondary Image (overlapping) */}
            <div className="history__image-secondary">
              {secondaryImage && (
                <img
                  src={secondaryImage}
                  alt="History secondary visual"
                  className="history__img-secondary"
                />
              )}
            </div>
          </div>

          {/* Text Content */}
          <div className="history__content">
            <h2 className="history__title">{title}</h2>
            <div className="history__divider"></div>
            <p className="history__description">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

History.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  primaryImage: PropTypes.string,
  secondaryImage: PropTypes.string,
  layout: PropTypes.oneOf(["image-left", "image-right"]),
  className: PropTypes.string,
};
