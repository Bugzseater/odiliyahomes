import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "@/styles/AboutHeroSection.css";
// import logoImg from "@/assets/odiliyalogo.png";

/**
 * AboutHeroSection - Reusable hero section with overview content
 * Features breadcrumb, title, description, stats counters, and side image
 */
export default function AboutHeroSection({
  breadcrumb = "Home > About Us > Overview",
  subtitle = "OVERVIEW",
  title = "WHAT IS ODILIYA",
  description = "Lorem ipsum dolor sit amet consectetur, morper placerat purus cursus id felis dignism proin ugat. Pretium proin nulla armados et suspendisse non quam",
  image,
  stats = [
    { number: "100+", label: "Completed Projects" },
    { number: "20+", label: "Ongoing Projects" },
    { number: "100+", label: "Sold Out Projects" },
    { number: "13+", label: "Years Of Trust" },
  ],
  className = "",
}) {
  const sectionRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const currentSection = sectionRef.current;

    // Always animate hero section on mount with a small delay
    if (currentSection) {
      // Use requestAnimationFrame for better timing
      requestAnimationFrame(() => {
        setTimeout(() => {
          currentSection.classList.add("animate-in");
        }, 50);
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY.current;

          // Only trigger if scrolling down and not already animated
          if (
            entry.isIntersecting &&
            isScrollingDown &&
            !entry.target.classList.contains("animate-in")
          ) {
            entry.target.classList.add("animate-in");
          } else if (!entry.isIntersecting && !isScrollingDown) {
            // Remove animation class when scrolling up and element is out of view
            entry.target.classList.remove("animate-in");
          }

          lastScrollY.current = currentScrollY;
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
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
      className={`about-hero-section${className ? ` ${className}` : ""}`}
    >
      <div className="about-hero-section__container">
        <div className="about-hero-section__content">
          {/* Left Side - Content */}
          <div className="about-hero-section__text">
            {/* Breadcrumb */}
            <nav className="about-hero-section__breadcrumb">{breadcrumb}</nav>

            {/* Subtitle with orange circle */}
            <div className="about-hero-section__subtitle">
              <span className="about-hero-section__subtitle-circle"></span>
              {subtitle}
            </div>

            {/* Main Title */}
            <h1 className="about-hero-section__title">{title}</h1>

            {/* Description */}
            <p className="about-hero-section__description">{description}</p>

            {/* Stats Section */}
            <div className="about-hero-section__stats">
              {stats.map((stat, index) => (
                <div key={index} className="about-hero-section__stat">
                  <span className="about-hero-section__stat-number">
                    {stat.number}
                  </span>
                  <span className="about-hero-section__stat-label">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="about-hero-section__image">
            {image && (
              <img
                src={image}
                alt="About section visual"
                className="about-hero-section__img"
              />
            )}
            {/* Logo overlay */}
            {/* <div className="about-hero-section__logo">
              <img
                src={logoImg}
                alt="Odiliya Logo"
                className="about-hero-section__logo-symbol"
              />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

AboutHeroSection.propTypes = {
  breadcrumb: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
};
