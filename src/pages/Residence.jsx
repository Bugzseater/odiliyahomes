import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

import MainNavbar from "@/components/MainNavbar";
import ResidenceHeroSection from "@/components/SubPageHeroSection";
import OurProjectsSection from "@/components/OurProjectsSection";
import ProjectsWithSearchSection from "@/components/ProjectsWithSearchSection";
import ProjectDetailsHero from "@/components/ProjectDetailsHero";
import heroImg from "@/assets/images/panadura01.png";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import avatar from "@/assets/Odiliyalogo.png";

const createSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const CATEGORIES = ["Apartments", "Residencies", "ROI Projects"];

const CATEGORY_HERO_MEDIA = {
  0: { type: "video", src: "#" },
  1: { type: "video", src: "#" },
  2: { type: "video", src: "#" },
};

export default function Residence() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // ========== FIREBASE STATES ==========
  const [allProjects, setAllProjects] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [projectDetailsMap, setProjectDetailsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // ========== UI STATES ==========
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchFilters, setSearchFilters] = useState({
    projectName: "",
    location: "",
    status: "",
  });

  // ========== FETCH DATA FROM FIREBASE ==========
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setFetchError(null);
        
        const querySnapshot = await getDocs(collection(db, "projectDetails"));
        
        const projectsList = [];
        const featuredList = [];
        const detailsMap = {};
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Check if project is "ICON V - Talpe" (exact match)
          const isIconVTalpe = data.name && data.name.trim() === "ICON V - Talpe";
          
          const formattedProject = {
            id: doc.id,
            name: data.name || "Untitled",
            title: data.name || "Untitled",
            description: data.description || "",
            image: data.images?.[0]?.src || data.image || heroImg,
            category: data.category || "Apartments",
            location: data.location || "",
            price: data.price || "",
            area: data.area || "",
            availability: data.availability || "Available",
            images: data.images || [],
            mapEmbedUrl: data.mapEmbedUrl || "",
            propertyAdvisor: data.propertyAdvisor || {
              name: "Odiliya Agent",
              title: "Property Advisor",
              phone: "94717508899",
              email: "info@odiliya.lk",
              avatar: avatar
            },
            amenities: data.amenities || [],
            faqs: data.faqs || [],
            virtualTours: data.virtualTours || [],
            brochureUrl: data.brochureUrl || "",
            heroTitle: data.heroTitle || data.name || "",
            isIconVTalpe: isIconVTalpe  // Changed from isIcon to isIconVTalpe
          };
          
          projectsList.push(formattedProject);
          featuredList.push(formattedProject);
          
          detailsMap[doc.id] = {
            ...formattedProject,
            slug: data.slug || createSlug(data.name || "")
          };
        });
        
        setAllProjects(projectsList);
        setFeaturedProjects(featuredList);
        setProjectDetailsMap(detailsMap);
        
        console.log(`✅ Loaded ${projectsList.length} projects from Firebase`);
        console.log("ICON V - Talpe Project:", projectsList.filter(p => p.isIconVTalpe).length);
        
      } catch (error) {
        console.error("Error fetching projects:", error);
        setFetchError(error.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  // ========== FILTERED PROJECTS FOR OUR PROJECTS SECTION ==========
  const ourProjectsFiltered = useMemo(() => {
    if (allProjects.length === 0) return [];
    
    const categoryName = CATEGORIES[activeCategory];
    
    console.log(`🎯 Active Category: ${categoryName}`);
    
    return allProjects.filter((project) => {
      // Check if project name is exactly "ICON V - Talpe"
      const isIconVTalpe = project.name && project.name.trim() === "ICON V - Talpe";
      
      // APARTMENTS category
      if (categoryName === "Apartments") {
        // Show ALL projects that are:
        // 1. Category is "Apartments", OR
        // 2. Name is exactly "ICON V - Talpe" (regardless of category)
        return project.category === "Apartments" || isIconVTalpe;
      }
      
      // RESIDENCIES category
      if (categoryName === "Residencies") {
        // Show ONLY projects with category "Residencies" AND NOT "ICON V - Talpe"
        return project.category === "Residencies" && !isIconVTalpe;
      }
      
      // ROI PROJECTS category
      if (categoryName === "ROI Projects") {
        // Show only ROI Projects
        return project.category === "ROI Projects";
      }
      
      // Default: show by category
      return project.category === categoryName;
    });
  }, [allProjects, activeCategory]);

  // ========== FILTERED PROJECTS FOR SEARCH SECTION ==========
  const filteredFeaturedProjects = useMemo(() => {
    if (featuredProjects.length === 0) return [];
    
    const categoryName = CATEGORIES[activeCategory];
    
    // First filter by category and special rules
    const baseProjects = featuredProjects.filter((project) => {
      const isIconVTalpe = project.name && project.name.trim() === "ICON V - Talpe";
      
      if (categoryName === "Apartments") {
        return project.category === "Apartments" || isIconVTalpe;
      }
      
      if (categoryName === "Residencies") {
        return project.category === "Residencies" && !isIconVTalpe;
      }
      
      if (categoryName === "ROI Projects") {
        return project.category === "ROI Projects";
      }
      
      return project.category === categoryName;
    });

    // Then apply search filters
    const { projectName, location, status } = searchFilters;
    const normalizedName = projectName.trim().toLowerCase();
    const normalizedLocation = location.trim().toLowerCase();
    const normalizedStatus = status.trim().toLowerCase();

    return baseProjects.filter((project) => {
      const title = (project.title || project.name || "").toLowerCase();
      const projectLocation = (project.location || "").toLowerCase();
      const projectStatus = (project.availability || "").toLowerCase();

      const nameMatches = normalizedName
        ? title.includes(normalizedName)
        : true;
      const locationMatches = normalizedLocation
        ? projectLocation.includes(normalizedLocation)
        : true;
      const statusMatches = normalizedStatus
        ? projectStatus === normalizedStatus
        : true;

      return nameMatches && locationMatches && statusMatches;
    });
  }, [activeCategory, searchFilters, featuredProjects]);

  // ========== SEARCH OPTIONS ==========
  const searchOptions = useMemo(() => {
    if (featuredProjects.length === 0) {
      return { status: [], location: [], projectName: [] };
    }
    
    const categoryName = CATEGORIES[activeCategory];
    
    // Apply same filtering for search options
    const categoryProjects = featuredProjects.filter((project) => {
      const isIconVTalpe = project.name && project.name.trim() === "ICON V - Talpe";
      
      if (categoryName === "Apartments") {
        return project.category === "Apartments" || isIconVTalpe;
      }
      
      if (categoryName === "Residencies") {
        return project.category === "Residencies" && !isIconVTalpe;
      }
      
      if (categoryName === "ROI Projects") {
        return project.category === "ROI Projects";
      }
      
      return project.category === categoryName;
    });

    const unique = (items) =>
      Array.from(new Set(items.filter((item) => item && item.trim())));

    return {
      status: unique(categoryProjects.map((project) => project.availability)),
      location: unique(categoryProjects.map((project) => project.location)),
      projectName: unique(
        categoryProjects.map((project) => project.title || project.name || "")
      ),
    };
  }, [activeCategory, featuredProjects]);

  // ========== URL PARAMETERS CHECK ==========
  useEffect(() => {
    const projectId = searchParams.get("project");
    const shouldShowDetails = searchParams.get("showDetails") === "true";

    if (projectId && shouldShowDetails && projectDetailsMap[projectId]) {
      const projectDetails = projectDetailsMap[projectId];
      const slug = projectDetails.slug || createSlug(projectDetails.name);
      
      navigate(`/project-details/${slug}`, {
        state: {
          projectId: projectId,
          project: { id: projectId },
          projectDetails: projectDetails,
          source: "residence-url",
          dataSource: "firebase",
        },
      });
    }
  }, [searchParams, navigate, projectDetailsMap]);

  // ========== HANDLE PROJECT CLICK ==========
  const handleProjectClick = (project) => {
    if (!project || !project.id) {
      console.error("Invalid project data:", project);
      return;
    }

    console.log("Project clicked:", project);
    setIsLoading(true);

    const projectDetails = projectDetailsMap[project.id];
    const slug =
      projectDetails?.slug ||
      project.slug ||
      createSlug(project.name || projectDetails?.name);

    setTimeout(() => {
      navigate(`/project-details/${slug}`, {
        state: {
          projectId: project.id,
          project: project,
          projectDetails: projectDetails || null,
          source: "residence",
          dataSource: "firebase",
        },
      });
      setIsLoading(false);
    }, 300);
  };

  const handleBackToProjects = () => {
    setShowProjectDetails(false);
    setSelectedProject(null);
    setSearchParams({});
  };

  // ========== CONTACT BUTTONS ==========
  const getContactButtons = (advisor) => [
    {
      label: "WhatsApp",
      url: `https://wa.me/${(advisor.whatsappPhone || advisor.phone).replace(/[^0-9]/g, "")}?text=Hi, I'm interested in ${selectedProject?.name || "this project"}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488" />
        </svg>
      ),
      className: "whatsapp",
      external: true,
    },
    {
      label: "Call Now",
      url: `tel:${advisor.phone}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      ),
      className: "call",
      external: true,
    },
    {
      label: "Contact Us",
      url: "/contact",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
      className: "contact",
    },
  ];

  const handleCategoryChange = (categoryIndex) => {
    setActiveCategory(categoryIndex);
    setSearchFilters({
      projectName: "",
      location: "",
      status: "",
    });
  };

  const handleSearch = (searchData) => {
    setSearchFilters({
      projectName: searchData.projectName || "",
      location: searchData.location || "",
      status: searchData.status || "",
    });
  };

  const handleProjectMoreInfo = (project) => {
    if (!project) {
      console.error("No project data provided");
      return;
    }
    handleProjectClick(project);
  };

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <>
        <MainNavbar />
        <main className="residence-page">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-4 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Loading projects...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ========== ERROR STATE ==========
  if (fetchError) {
    return (
      <>
        <MainNavbar />
        <main className="residence-page">
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="text-center bg-red-50 p-8 rounded-2xl">
              <p className="text-red-600 text-xl mb-2">❌ Error loading data</p>
              <p className="text-gray-600">{fetchError}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Try Again
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <MainNavbar />
      <main className="residence-page">
        {/* Hero Section */}
        <ResidenceHeroSection
          key={activeCategory}
          mediaType={CATEGORY_HERO_MEDIA[activeCategory]?.type || "image"}
          image={
            CATEGORY_HERO_MEDIA[activeCategory]?.type === "image"
              ? CATEGORY_HERO_MEDIA[activeCategory]?.src
              : heroImg
          }
          video={
            CATEGORY_HERO_MEDIA[activeCategory]?.type === "video"
              ? CATEGORY_HERO_MEDIA[activeCategory]?.src
              : undefined
          }
          videoPoster={CATEGORY_HERO_MEDIA[activeCategory]?.poster}
          title="ODILIYA RESIDENCIES"
          heading="Your perfect investment starts here."
          breadcrumb={`Home > Residence > ${CATEGORIES[activeCategory]}`}
          description="Residencies by Odiliya, Shaping the future of luxury investment living in Sri Lanka. Our premium apartments are designed to deliver unparalleled living experiences combined with long-term financial growth. With Odiliya Residencies, you're not just buying property, you're investing in a future of wellness, lifestyle, and income."
        />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="residence-loading-overlay">
            <div className="residence-loading-content">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "4px solid #f3f3f3",
                  borderTop: "4px solid #ff9900",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
              <p style={{ margin: 0, color: "#333", fontSize: "1.1rem" }}>
                Loading project details...
              </p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!showProjectDetails ? (
          <>
            {/* Our Projects Section */}
            {ourProjectsFiltered.length > 0 ? (
              <OurProjectsSection
                title="OUR PROJECTS"
                categories={CATEGORIES}
                projects={ourProjectsFiltered}
                defaultCategory={activeCategory}
                onProjectClick={handleProjectClick}
                onCategoryChange={handleCategoryChange}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No projects available in this category</p>
              </div>
            )}

            {/* Search Section */}
            {filteredFeaturedProjects.length > 0 ? (
              <ProjectsWithSearchSection
                projects={filteredFeaturedProjects}
                searchProps={{
                  title: `Find Your ${CATEGORIES[activeCategory]}...`,
                  searchOptions,
                  contactInfo: {
                    name: "Odiliya Agent",
                    role: "Property Advisor",
                    avatar: avatar,
                  },
                }}
                onSearch={handleSearch}
                onProjectMoreInfo={handleProjectMoreInfo}
              />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No projects match your search criteria</p>
              </div>
            )}
          </>
        ) : (
          /* Project Details View */
          selectedProject && (
            <div className="residence-project-details-container">
              <div className="residence-back-button-wrapper">
                <button
                  onClick={handleBackToProjects}
                  disabled={isLoading}
                  className="residence-back-button"
                  style={{
                    opacity: isLoading ? 0.7 : 1,
                  }}
                  onMouseOver={(e) => {
                    if (!isLoading) {
                      e.target.style.background = "#e68800";
                      e.target.style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isLoading) {
                      e.target.style.background = "#ff9900";
                      e.target.style.transform = "translateY(0)";
                    }
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                  </svg>
                  {isLoading ? "Loading..." : "Back to Projects"}
                </button>
              </div>

              {/* Project Details Hero */}
              <ProjectDetailsHero
                images={selectedProject.images || []}
                mapEmbedUrl={selectedProject.mapEmbedUrl}
                propertyAdvisor={selectedProject.propertyAdvisor}
                contactButtons={getContactButtons(
                  selectedProject.propertyAdvisor,
                )}
                showThumbnails={true}
                showNavigation={true}
                imageAspectRatio="16/9"
                className="residence-project-details"
              />

              {/* Project Info Section */}
              <section className="residence-project-info-section">
                <div className="residence-project-info-container">
                  <div className="residence-project-info-grid">
                    {/* Left Column */}
                    <div>
                      <h1 className="residence-project-title">
                        {selectedProject.name}
                      </h1>
                      
                      <div 
                        className="residence-project-description prose max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: selectedProject.description || 'No description available' 
                        }} 
                      />

                      {selectedProject.amenities && selectedProject.amenities.length > 0 && (
                        <div className="residence-project-features">
                          <h3 className="residence-project-features-title">
                            Features And Amenities
                          </h3>
                          <ul className="amenity-pills">
                            {selectedProject.amenities.map((item, idx) => (
                              <li key={idx} className="amenity-pill">
                                <span className="icon">✓</span> {item.name || item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedProject.virtualTours && selectedProject.virtualTours.length > 0 && (
                        <div className="residence-project-virtual-tours mt-8">
                          <h3 className="text-xl font-bold mb-4">Virtual Tours</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedProject.virtualTours.map((tour, idx) => (
                              <div key={idx} className="bg-gray-50 rounded-xl p-4">
                                {tour.thumbnail && (
                                  <img 
                                    src={tour.thumbnail} 
                                    alt={tour.description}
                                    className="w-full h-40 object-cover rounded-lg mb-3"
                                  />
                                )}
                                <h4 className="font-semibold mb-2">{tour.description}</h4>
                                <p className="text-sm text-gray-600 mb-2">Duration: {tour.duration}</p>
                                <a 
                                  href={tour.video}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline text-sm"
                                >
                                  Watch Video →
                                </a>
                                {tour.details && tour.details.length > 0 && (
                                  <ul className="mt-2 text-sm text-gray-600">
                                    {tour.details.map((detail, i) => (
                                      <li key={i}>• {detail.text}</li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Quick Info */}
                    <div className="residence-project-quick-info">
                      <h3 className="residence-project-quick-info-title">
                        Project Information
                      </h3>
                      <div className="residence-project-info-list">
                        <div className="residence-project-info-item">
                          <strong>Location:</strong>
                          <p>{selectedProject.location || "N/A"}</p>
                        </div>
                        <div className="residence-project-info-item">
                          <strong>Property Type:</strong>
                          <p>{selectedProject.category || "Residential Development"}</p>
                        </div>
                        <div className="residence-project-info-item">
                          <strong>Units Available:</strong>
                          <p>Multiple Options</p>
                        </div>
                        <div className="residence-project-info-item">
                          <strong>Starting Price:</strong>
                          <p
                            style={{
                              color: "#ff9900",
                              fontSize: "1.1rem",
                              fontWeight: "600",
                            }}
                          >
                            {selectedProject.price || "Contact for Pricing"}
                          </p>
                        </div>
                        {selectedProject.area && (
                          <div className="residence-project-info-item">
                            <strong>Area:</strong>
                            <p>{selectedProject.area}</p>
                          </div>
                        )}
                        {selectedProject.availability && (
                          <div className="residence-project-info-item">
                            <strong>Availability:</strong>
                            <p
                              style={{
                                color: selectedProject.availability === "Available"
                                  ? "#28a745"
                                  : "#666",
                                fontWeight: selectedProject.availability === "Available"
                                  ? "600"
                                  : "normal",
                              }}
                            >
                              {selectedProject.availability}
                            </p>
                          </div>
                        )}
                        {selectedProject.brochureUrl && (
                          <div className="residence-project-info-item">
                            <strong>Brochure:</strong>
                            <a 
                              href={selectedProject.brochureUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline block mt-1"
                            >
                              Download Brochure
                            </a>
                          </div>
                        )}
                      </div>

                      {selectedProject.faqs && selectedProject.faqs.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-semibold mb-3">Frequently Asked Questions</h4>
                          <div className="space-y-3">
                            {selectedProject.faqs.map((faq, idx) => (
                              <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                                <p className="font-medium text-sm mb-1">Q: {faq.question}</p>
                                <p className="text-sm text-gray-600">A: {faq.answer}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )
        )}
      </main>
      <ContactForm />
      <Footer />
    </>
  );
}