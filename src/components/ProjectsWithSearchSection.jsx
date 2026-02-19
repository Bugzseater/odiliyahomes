import React from "react";
import PropTypes from "prop-types";
import ProjectCard from "./ProjectCard";
import SearchForm from "./SearchForm";
import "@/styles/ProjectsWithSearchSection.css";

/**
 * ProjectsWithSearchSection - Section combining project cards with search form
 * Displays a grid of project cards alongside a search form
 */
export default function ProjectsWithSearchSection({
  projects = [],
  searchProps = {},
  onProjectMoreInfo,
  onSearch,
  className = "",
}) {
  return (
    <section
      className={`projects-with-search${className ? ` ${className}` : ""}`}
    >
      <div className="projects-with-search__container">
        <div className="projects-with-search__content">
          {/* Projects Grid */}
          <div className="projects-with-search__projects">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id || index}
                image={project.image}
                title={project.title}
                description={project.description}
                location={project.location}
                area={project.area}
                price={project.price}
                availability={project.availability}
                onMoreInfo={() =>
                  onProjectMoreInfo && onProjectMoreInfo(project)
                }
              />
            ))}
          </div>

          {/* Search Form */}
          <div className="projects-with-search__search">
            <SearchForm {...searchProps} onSearch={onSearch} />
          </div>
        </div>
      </div>
    </section>
  );
}

ProjectsWithSearchSection.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      location: PropTypes.string.isRequired,
      area: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      availability: PropTypes.string,
    })
  ),
  searchProps: PropTypes.object,
  onProjectMoreInfo: PropTypes.func,
  onSearch: PropTypes.func,
  className: PropTypes.string,
};
