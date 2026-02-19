import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "@/styles/OurProjectsSection.css";

/**
 * OurProjectsSection - Reusable projects section with category filtering.
 * Displays projects in a grid with tabs for different categories.
 */
export default function OurProjectsSection({
  title = "OUR PROJECTS",
  categories = ["Apartments", "Houses", "Villas"],
  projects = [],
  defaultCategory = 0,
  className = "",
  onProjectClick,
  onCategoryChange,
}) {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  // Sync with parent component's category changes
  useEffect(() => {
    setActiveCategory(defaultCategory);
  }, [defaultCategory]);

  // Handle category change
  const handleCategoryChange = (index) => {
    setActiveCategory(index);
    // Notify parent component
    if (onCategoryChange) {
      onCategoryChange(index);
    }
  };

  const filteredProjects = projects.filter(
    (project) => project.category === categories[activeCategory],
  );

  return (
    <section
      className={`our-projects-section${className ? ` ${className}` : ""}`}
    >
      <div className="our-projects-container">
        {/* Header with title and tabs in a row */}
        <div className="our-projects-header">
          <h2 className="our-projects-title">{title}</h2>

          {/* Category Tabs */}
          <div className="our-projects-tabs">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`our-projects-tab${
                  activeCategory === index ? " our-projects-tab--active" : ""
                }`}
                onClick={() => handleCategoryChange(index)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="our-projects-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id || index}
              className="our-projects-card"
              onClick={() => onProjectClick && onProjectClick(project)}
              style={{ cursor: onProjectClick ? "pointer" : "default" }}
            >
              <div
                className="our-projects-card-image"
                style={{ backgroundImage: `url(${project.image})` }}
              >
                <div className="our-projects-card-overlay">
                  <h3 className="our-projects-card-title">{project.name}</h3>
                  <p
                    className="our-projects-card-desc"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  ></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

OurProjectsSection.propTypes = {
  title: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string),
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }),
  ),
  defaultCategory: PropTypes.number,
  className: PropTypes.string,
  onProjectClick: PropTypes.func,
  onCategoryChange: PropTypes.func,
};
