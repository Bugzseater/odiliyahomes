import React from "react";
import PropTypes from "prop-types";
import "@/styles/ProjectCard.css";

/**
 * ProjectCard - Reusable project card component
 * Displays project image, details, price, and location info
 */
export default function ProjectCard({
  image,
  title,
  // description,
  // location,
  area,
  price,
  availability = "Available",
  onMoreInfo,
  className = "",
}) {
  return (
    <div className={`project-card${className ? ` ${className}` : ""}`}>
      {/* Project Image */}
      <div className="project-card__image project-card__image--static">
        <img
          src={image}
          alt={title}
          className="project-card__image-photo"
          loading="lazy"
        />
        <div className="project-card__overlay">
          {/* <h3 className="project-card__title">{title}</h3> */}
          {/* <p className="project-card__description">{description}</p> */}
        </div>
      </div>

      {/* Project Details */}
      <div className="project-card__details">
        <div className="project-card__header">
          <h6 className="project-card__location">{title}</h6>
          <span
            className={`project-card__availability project-card__availability--${availability.toLowerCase()}`}
          >
            {availability}
          </span>
        </div>

        <div className="project-card__info">
          <div className="project-card__area">
            <span className="project-card__label">{area}</span>
          </div>
          <div className="project-card__price">
            <span className="project-card__label">Unit Starting Price</span>
            <span className="project-card__amount"> {price}</span>
          </div>
        </div>

        <button className="project-card__button" onClick={onMoreInfo}>
          More Info...
        </button>
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  location: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  availability: PropTypes.string,
  onMoreInfo: PropTypes.func,
  className: PropTypes.string,
};
