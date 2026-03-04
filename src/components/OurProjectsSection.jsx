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
  limit = 3, // Add this line - default limit 3
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

  // Apply limit to filtered projects
  const displayedProjects = filteredProjects.slice(0, limit);

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
          {displayedProjects.map((project, index) => (
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
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show message if there are more projects */}
        {filteredProjects.length > limit && (
          <div className="text-center mt-4">
            <p className="text-gray-500">
              +{filteredProjects.length - limit} more projects
            </p>
          </div>
        )}
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
  limit: PropTypes.number, // Add this line
};