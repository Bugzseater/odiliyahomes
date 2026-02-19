import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "@/styles/AboutContent.css";

/**
 * AboutContent - Reusable content section with image and text
 * Features configurable layout (left/right), image positioning, and orange accent square
 */
export default function AboutContent({
  title = "OUR VISION",
  description = "Lorem ipsum dolor sit amet consectetur, morper placerat purus cursus id felis dignism proin ugat. Pretium proin nulla armados et suspendisse non quam",
  image,
  layout = "image-left", // "image-left" or "image-right"
  accentPosition = "right", // "left" or "right" - position of orange square
  imageStyle = "default", // "default", "rounded", "border"
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
      className={`about-content${className ? ` ${className}` : ""}`}
    >
      <div className="about-content__container">
        <div
          className={`about-content__wrapper about-content__wrapper--${layout}`}
        >
          {/* Image Section */}
          <div className="about-content__image-section">
            <div
              className={`about-content__image about-content__image--${imageStyle}`}
            >
              {image && (
                <img
                  src={image}
                  alt="About content visual"
                  className="about-content__img"
                />
              )}
            </div>

            {/* Orange Accent Square */}
            <div
              className={`about-content__accent about-content__accent--${accentPosition}`}
            ></div>
          </div>

          {/* Text Content */}
          <div className="about-content__text">
            <h2 className="about-content__title">{title}</h2>
            <p className="about-content__description">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

AboutContent.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  layout: PropTypes.oneOf(["image-left", "image-right"]),
  accentPosition: PropTypes.oneOf(["left", "right"]),
  imageStyle: PropTypes.oneOf(["default", "rounded", "border"]),
  className: PropTypes.string,
};
