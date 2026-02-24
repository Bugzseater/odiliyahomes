import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "@/styles/FeaturedProjects.css";

/**
 * Utility function to create URL-friendly slugs from project names
 */
const createSlug = (name) => {
  if (!name) return "";
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const FeaturedProjects = ({
  activeFilter: propActiveFilter = "Apartments",
  onFilterChange,
  autoChange = true,
  autoChangeInterval = 4000,
  ...props
}) => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState(propActiveFilter);
  const [projectsList, setProjectsList] = useState([]);
  const [landsList, setLandsList] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Fetch projects from Firebase
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Fetch projects
        const projectsSnapshot = await getDocs(collection(db, "projectDetails"));
        const projects = projectsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "",
            slug: data.slug || createSlug(data.name || ""),
            category: data.category || "Apartments",
            description: data.description || "",
            image: data.images?.[0]?.src || data.image || "",
            location: data.location || "",
            price: data.price || "",
            area: data.area || "",
            availability: data.availability || "Available",
            source: "projects",
            createdAt: data.createdAt?.toDate?.() || new Date(),
            featured: data.featured || false,
            propertyAdvisor: data.propertyAdvisor || {}
          };
        });
        
        // Fetch lands
        const landsSnapshot = await getDocs(collection(db, "landProjects"));
        const lands = landsSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "",
            slug: data.slug || createSlug(data.name || ""),
            category: "Lands",
            description: data.description || "",
            image: data.images?.[0]?.src || data.image || "",
            location: data.location || "",
            price: data.price || "",
            area: data.area || "",
            availability: data.availability || "Available",
            source: "lands",
            createdAt: data.createdAt?.toDate?.() || new Date(),
            featured: data.featured || false,
            propertyAdvisor: data.propertyAdvisor || {}
          };
        });
        
        console.log("Projects loaded:", projects.length);
        console.log("Lands loaded:", lands.length);
        console.log("Sample project slug:", projects[0]?.slug);
        
        setProjectsList(projects);
        setLandsList(lands);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Combine all projects
  const allProjects = useMemo(() => {
    return [...projectsList, ...landsList];
  }, [projectsList, landsList]);

  // Filter projects based on active category
  const filteredProjects = useMemo(() => {
    if (!allProjects.length) return [];
    
    return allProjects.filter((project) => {
      const projectCategory = (project.category || "").toLowerCase().trim();
      const filterCategory = (activeFilter || "").toLowerCase().trim();
      
      // Special handling for Lands
      if (filterCategory === "lands") {
        return project.source === "lands";
      }
      
      return projectCategory === filterCategory;
    });
  }, [allProjects, activeFilter]);

  // Sort projects (newest first)
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [filteredProjects]);

  // Update active filter from URL or props
  useEffect(() => {
    setActiveFilter(propActiveFilter);
  }, [propActiveFilter]);

  useEffect(() => {
    const filterFromUrl = searchParams.get("category");
    if (filterFromUrl && filterCategories.includes(filterFromUrl)) {
      setActiveFilter(filterFromUrl);
    }
  }, [filterCategories, searchParams]);

  // Auto-change filter
  useEffect(() => {
    if (!isAutoChanging || userInteracted || !allProjects.length) return;

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
    allProjects.length
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

  // Intersection Observer for animations
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

  // Reset slide index when filter changes
  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [activeFilter]);

  const currentPageProjects = useMemo(() => {
    const startIndex = currentSlideIndex * projectsPerPage;
    return sortedProjects.slice(startIndex, startIndex + projectsPerPage);
  }, [sortedProjects, currentSlideIndex, projectsPerPage]);

  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);
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

  const handleViewDetails = (project) => {
    console.log("🔍 Navigating to project:", project);
    
    // Create slug if not exists
    const slug = project.slug || createSlug(project.name);
    
    if (!slug) {
      console.error("No slug available for project:", project);
      return;
    }
    
    console.log("🔍 Using slug:", slug);
    
    // Navigate to project details
    navigate(`/project-details/${slug}`, {
      state: {
        projectId: project.id,
        source: project.source === "lands" ? "lands" : "residence",
        dataSource: project.source,
        category: project.category,
        projectDetails: project // Pass full project data as fallback
      }
    });
  };

  // Loading state
  if (loading) {
    return (
      <section className="featured-projects" ref={sectionRef}>
        <div className="featured-projects__container">
          <div className="featured-projects__loading" style={{ textAlign: 'center', padding: '50px' }}>
            <div className="loader" style={{ 
              border: '4px solid #f3f3f3', 
              borderTop: '4px solid #3498db', 
              borderRadius: '50%', 
              width: '40px', 
              height: '40px', 
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <p>Loading projects...</p>
          </div>
        </div>
      </section>
    );
  }

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

        {sortedProjects.length === 0 ? (
          <div className="featured-projects__empty" style={{ textAlign: 'center', padding: '50px' }}>
            <p>No projects found in {activeFilter} category.</p>
          </div>
        ) : (
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
                  key={`${project.source}-${project.id}`}
                  project={project}
                  index={index}
                  onViewDetails={handleViewDetails}
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
        )}
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
      onClick={() => onViewDetails(project)}
    >
      <div className="project-card__image-container">
        {!imageError ? (
          <img
            src={project.image || 'https://via.placeholder.com/400x300?text=No+Image'}
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
          {project.location && (
            <p className="project-card__location">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              {project.location}
            </p>
          )}

          {project.price && (
            <p className="project-card__price">{project.price}</p>
          )}

          <button
            className="project-card__cta"
            aria-label={`View details for ${project.name}`}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(project);
            }}
          >
            VIEW DETAILS
          </button>
        </div>
      </div>
    </article>
  );
});

ProjectCard.displayName = "ProjectCard";

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

export default FeaturedProjects;