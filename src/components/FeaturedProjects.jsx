import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "@/styles/FeaturedProjects.css";
import { projectDetailsData } from "@/data/projectsData";
import { landDetailsData } from "@/data/landsData";

/**
 * Utility function to create URL-friendly slugs from project names
 */
const createSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

// Featured project selection (same as before)
const featuredSelection = {
  Apartments: [
    { source: "projects", id: 18 },
    { source: "projects", id: 1 },
    { source: "projects", id: 2 },
    { source: "projects", id: 3 },
  ],
  Residencies: [
    { source: "projects", id: 13 },
    { source: "projects", id: 6 },
    { source: "projects", id: 4 },
    { source: "projects", id: 5 },
    { source: "projects", id: 7 },
    { source: "projects", id: 8 },
    { source: "projects", id: 9 },
    { source: "projects", id: 10 },
    { source: "projects", id: 11 },
    { source: "projects", id: 12 },
    { source: "projects", id: 14 },
    { source: "projects", id: 15 },
  ],
  Lands: [
    { source: "lands", id: 1 },
    { source: "lands", id: 2 },
    { source: "lands", id: 3 },
    { source: "lands", id: 4 },
    { source: "lands", id: 5 },
    { source: "lands", id: 6 },
    { source: "lands", id: 7 },
    { source: "lands", id: 8 },
    { source: "lands", id: 9 },
    { source: "lands", id: 10 },
    { source: "lands", id: 11 },
    { source: "lands", id: 12 },
    { source: "lands", id: 13 },
    { source: "lands", id: 14 },
    { source: "lands", id: 15 },
    { source: "lands", id: 16 },
    { source: "lands", id: 17 },
    { source: "lands", id: 18 },
    { source: "lands", id: 19 },
    { source: "lands", id: 20 },
    { source: "lands", id: 21 },
  ],
  "ROI Projects": [
    { source: "projects", id: 19 },
    { source: "projects", id: 16 },
    { source: "projects", id: 17 },
  ],
};

// Build unified project data
const buildProjectsData = () => {
  const projects = [];

  const selectedBySource = {
    projects: new Set(),
    lands: new Set(),
  };

  Object.values(featuredSelection).forEach((categoryItems) => {
    categoryItems.forEach(({ source, id }) => {
      selectedBySource[source].add(id);
    });
  });

  // Add projects with slug
  Object.values(projectDetailsData).forEach((project) => {
    if (selectedBySource.projects.has(project.id)) {
      projects.push({
        id: project.id,
        name: project.name,
        slug: project.slug || createSlug(project.name), // Use existing slug or create one
        category: project.category || "Apartments",
        description: project.description,
        image: project.images?.[0]?.src || project.image,
        completedDate: project.completedDate,
        units: project.units,
        city: project.city,
        source: "projects",
      });
    }
  });

  // Add lands with slug
  Object.values(landDetailsData).forEach((land) => {
    if (selectedBySource.lands.has(land.id)) {
      projects.push({
        id: land.id,
        name: land.name,
        slug: land.slug || createSlug(land.name), // Use existing slug or create one
        category: "Lands",
        description: land.description,
        image: land.images?.[0]?.src || land.image,
        completedDate: land.completedDate,
        units: land.units,
        city: land.location,
        source: "lands",
      });
    }
  });

  return projects;
};

const projectsData = buildProjectsData();

const FeaturedProjects = ({
  activeFilter: propActiveFilter = "ROI Projects",
  onFilterChange,
  autoChange = true,
  autoChangeInterval = 4000,
  ...props
}) => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(propActiveFilter);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [isAutoChanging, setIsAutoChanging] = useState(autoChange);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState("");
  const [isSliding, setIsSliding] = useState(false);
  const projectsPerPage = 3;

  const filterCategories = useMemo(
    () => ["Apartments", "Residencies", "Lands", "ROI Projects"],
    []
  );

  const filteredProjects = useMemo(() => {
    const selectionOrder = featuredSelection[activeFilter] || [];
    const filtered = projectsData.filter((project) => {
      const projectCategory = (project.category || "").toLowerCase();
      const filterCategory = (activeFilter || "").toLowerCase();
      return projectCategory === filterCategory;
    });

    filtered.sort((a, b) => {
      const indexA = selectionOrder.findIndex(
        (item) => item.source === a.source && item.id === a.id
      );
      const indexB = selectionOrder.findIndex(
        (item) => item.source === b.source && item.id === b.id
      );
      return indexA - indexB;
    });

    return filtered;
  }, [activeFilter]);

  useEffect(() => {
    setActiveFilter(propActiveFilter);
  }, [propActiveFilter]);

  useEffect(() => {
    const filterFromUrl = searchParams.get("category");
    if (filterFromUrl && filterCategories.includes(filterFromUrl)) {
      setActiveFilter(filterFromUrl);
    }
  }, [filterCategories, searchParams]);

  useEffect(() => {
    if (!isAutoChanging || userInteracted) return;

    const interval = setInterval(() => {
      setActiveFilter((currentFilter) => {
        const currentIndex = filterCategories.indexOf(currentFilter);
        const nextIndex = (currentIndex + 1) % filterCategories.length;
        const nextFilter = filterCategories[nextIndex];

        if (onFilterChange) {
          onFilterChange(nextFilter);
        }

        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("category", nextFilter);
        setSearchParams(newSearchParams, { replace: true });

        return nextFilter;
      });
    }, autoChangeInterval);

    return () => clearInterval(interval);
  }, [
    isAutoChanging,
    userInteracted,
    filterCategories,
    autoChangeInterval,
    onFilterChange,
    searchParams,
    setSearchParams,
  ]);

  const handleUserInteraction = useCallback(() => {
    setUserInteracted(true);
    setIsAutoChanging(false);

    const timer = setTimeout(() => {
      setUserInteracted(false);
      setIsAutoChanging(autoChange);
    }, 10000);

    return () => clearTimeout(timer);
  }, [autoChange]);

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
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

  useEffect(() => {
    setDisplayedProjects(filteredProjects);
    setCurrentSlideIndex(0);
  }, [filteredProjects]);

  const currentPageProjects = useMemo(() => {
    const startIndex = currentSlideIndex * projectsPerPage;
    return filteredProjects.slice(startIndex, startIndex + projectsPerPage);
  }, [filteredProjects, currentSlideIndex, projectsPerPage]);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const canGoPrev = currentSlideIndex > 0;
  const canGoNext = currentSlideIndex < totalPages - 1;

  const handleFilterChange = useCallback(
    (category) => {
      handleUserInteraction();
      setActiveFilter(category);

      if (onFilterChange) {
        onFilterChange(category);
      }

      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("category", category);
      setSearchParams(newSearchParams, { replace: true });

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "filter_change", {
          event_category: "Featured Projects",
          event_label: category,
        });
      }
    },
    [searchParams, setSearchParams, onFilterChange, handleUserInteraction]
  );

  const handlePrevious = useCallback(() => {
    handleUserInteraction();
    if (canGoPrev && !isSliding) {
      setSlideDirection("slide-right");
      setIsSliding(true);
      setTimeout(() => {
        setCurrentSlideIndex((prev) => prev - 1);
        setTimeout(() => {
          setSlideDirection("");
          setIsSliding(false);
        }, 50);
      }, 300);
    }
  }, [canGoPrev, handleUserInteraction, isSliding]);

  const handleNext = useCallback(() => {
    handleUserInteraction();
    if (canGoNext && !isSliding) {
      setSlideDirection("slide-left");
      setIsSliding(true);
      setTimeout(() => {
        setCurrentSlideIndex((prev) => prev + 1);
        setTimeout(() => {
          setSlideDirection("");
          setIsSliding(false);
        }, 50);
      }, 300);
    }
  }, [canGoNext, handleUserInteraction, isSliding]);

  return (
    <section
      ref={sectionRef}
      className={`featured-projects ${
        isVisible ? "featured-projects--visible" : ""
      }`}
      aria-labelledby="featured-projects-title"
      {...props}
    >
      <div className="featured-projects__container">
        <div className="featured-projects__header">
          <div className="featured-projects__title-section">
            <h2
              id="featured-projects-title"
              className="featured-projects__title"
            >
              FEATURED PROJECTS
            </h2>
          </div>
        </div>

        <div
          className="featured-projects__filters"
          role="tablist"
          aria-label="Project Categories"
        >
          {filterCategories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${
                activeFilter === category ? "filter-btn--active" : ""
              } ${
                isAutoChanging && activeFilter === category
                  ? "filter-btn--auto-changing"
                  : ""
              }`}
              onClick={() => handleFilterChange(category)}
              role="tab"
              aria-selected={activeFilter === category}
              aria-controls="projects-grid"
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        <div className="featured-projects__grid-wrapper">
          <button
            className={`featured-projects__arrow featured-projects__arrow--left ${
              !canGoPrev ? "featured-projects__arrow--disabled" : ""
            }`}
            onClick={handlePrevious}
            aria-label="Previous projects"
            type="button"
            disabled={!canGoPrev}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            id="projects-grid"
            className={`featured-projects__grid ${
              slideDirection === "slide-left" ? "slide-out-left" : ""
            } ${slideDirection === "slide-right" ? "slide-out-right" : ""}`}
            role="tabpanel"
            aria-labelledby="featured-projects-title"
          >
            {currentPageProjects.map((project, index) => (
              <ProjectCard
                key={`${project.category}-${project.id}`}
                project={project}
                index={index}
                onViewDetails={(project) => {
                  // Navigate using slug instead of ID
                  navigate(`/project-details/${project.slug}`, {
                    state: {
                      projectId: project.id, // Pass ID for data lookup
                      source: "featured-projects",
                      dataSource: project.source,
                      category: project.category,
                    },
                  });
                }}
              />
            ))}
          </div>

          <button
            className={`featured-projects__arrow featured-projects__arrow--right ${
              !canGoNext ? "featured-projects__arrow--disabled" : ""
            }`}
            onClick={handleNext}
            aria-label="Next projects"
            type="button"
            disabled={!canGoNext}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = React.memo(({ project, index, onViewDetails }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  return (
    <article
      className="project-card"
      style={{ "--animation-delay": `${index * 0.1}s` }}
    >
      <div className="project-card__image-container">
        {!imageError ? (
          <img
            src={project.image}
            alt={`${project.name} project showcase`}
            className={`project-card__image ${
              imageLoaded ? "project-card__image--loaded" : ""
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="project-card__image-fallback">
            <span>Image not available</span>
          </div>
        )}
        <div className="project-card__overlay"></div>
      </div>

      <div className="project-card__content">
        <h3 className="project-card__title">{project.name}</h3>

        <div className="project-card__bottom-content">
          <div className="project-card__meta">
            <span className="project-card__category">{project.category}</span>
          </div>

          <button
            className="project-card__cta"
            aria-label={`View details for ${project.name}`}
            onClick={() => onViewDetails(project)}
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
});

ProjectCard.displayName = "ProjectCard";

export default FeaturedProjects;
