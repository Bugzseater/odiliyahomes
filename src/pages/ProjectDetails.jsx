import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import MainNavbar from "@/components/MainNavbar";
import ProjectDetailsHero from "@/components/ProjectDetailsHero";
import FlowPlan from "@/components/FlowPlan";
import VirtualTour from "@/components/VirtualTour";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectProgress from "@/components/ProjectProgress";
import FAQ from "@/components/FAQ";
import Inquiry from "@/components/Inquiry";
import Footer from "@/components/Footer";
import { projectDetailsData } from "../data/projectsData";
import { landDetailsData } from "../data/landsData";
import "@/styles/ProjectDetails.css";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    projectDetails,
    source,
    dataSource,
    projectId: stateProjectId,
  } = location.state || {};

  const findProjectBySlugOrId = (data, identifier) => {
    const bySlug = Object.values(data).find(
      (project) => project.slug === identifier,
    );
    if (bySlug) return bySlug;

    const numericId = Number(identifier);
    if (!isNaN(numericId)) {
      return data[numericId];
    }
    return null;
  };

  let currentProject;

  if (projectDetails) {
    currentProject = projectDetails;
  } else if (stateProjectId) {
    if (dataSource === "lands") {
      currentProject = landDetailsData[stateProjectId];
    } else if (dataSource === "projects") {
      currentProject = projectDetailsData[stateProjectId];
    }
  } else if (dataSource === "lands") {
    currentProject = findProjectBySlugOrId(landDetailsData, projectId);
  } else if (dataSource === "projects") {
    currentProject = findProjectBySlugOrId(projectDetailsData, projectId);
  } else {
    currentProject =
      findProjectBySlugOrId(projectDetailsData, projectId) ||
      findProjectBySlugOrId(landDetailsData, projectId) ||
      projectDetailsData[1];
  }

  const heroTitle = currentProject?.heroTitle || currentProject?.name || "";

  useEffect(() => {
    if (currentProject) {
      document.title = currentProject.name + " - Project Details | Odiliya";
    }
  }, [currentProject]);

  const handleBack = () => {
    if (source === "residence") navigate("/residence");
    else if (source === "lands") navigate("/lands");
    else navigate(-1);
  };

  if (!currentProject) return <div className="p-20 text-center">Loading Project Details...</div>;

  return (
    <>
      <MainNavbar />

      <div className="project-details-back-container">
        <button onClick={handleBack} className="project-details-back-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back
        </button>
      </div>

      <main className="project-details-main-container">
        <div className="project-details-hero-container">
          <ProjectDetailsHero
            title={heroTitle}
            images={currentProject.images || []}
            mapEmbedUrl={currentProject.mapEmbedUrl}
            propertyAdvisor={currentProject.propertyAdvisor}
            showThumbnails={true}
            imageAspectRatio="16/9"
          />
        </div>

        <section className="project-details-info-section">
          <div className="project-details-info-container">
            <div className="project-details-info-grid">
              
              {/* --- DESCRIPTION SECTION --- */}
              <div className="project-main-content">
                <h1 className="project-details-title">{currentProject.name}</h1>
                
                <div className="project-details-description">
                  {/* Backend එකේ තියෙන HTML විස්තරය මෙතනින් ලස්සනට render වෙනවා */}
                  <div 
                    className="rich-text-display"
                    style={{ 
                      whiteSpace: 'pre-line', // Backend එකේ වගේම Line breaks පෙන්වන්න
                      lineHeight: "1.8",
                      fontSize: "1.1rem",
                      color: "#374151" 
                    }}
                    dangerouslySetInnerHTML={{ __html: currentProject.description }} 
                  />
                </div>

                {/* Amenities */}
                {currentProject.amenities?.length > 0 && (
                  <div className="project-details-features" style={{ marginTop: "3rem" }}>
                    <h3 className="project-details-features-title">Features And Amenities</h3>
                    <ul className="amenity-pills">
                      {currentProject.amenities.map((amenity, idx) => (
                        <li className="amenity-pill" key={idx}>
                          <span className="icon">✓</span> {amenity.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* --- SIDEBAR INFO --- */}
              <div className="project-details-quick-info">
                <h3 className="project-details-quick-info-title">Project Information</h3>
                <div className="project-details-quick-info-content">
                  <div className="quick-info-item">
                    <strong className="quick-info-label">Location:</strong>
                    <p className="quick-info-value">{currentProject.location}</p>
                  </div>
                  {currentProject.price && (
                    <div className="quick-info-item">
                      <strong className="quick-info-label">Price:</strong>
                      <p className="quick-info-value quick-info-price" style={{ color: '#e67e22', fontWeight: 'bold' }}>
                        {currentProject.price}
                      </p>
                    </div>
                  )}
                  {currentProject.area && (
                    <div className="quick-info-item">
                      <strong className="quick-info-label">Area:</strong>
                      <p className="quick-info-value">{currentProject.area}</p>
                    </div>
                  )}
                  <div className="quick-info-item">
                    <strong className="quick-info-label">Status:</strong>
                    <p className="quick-info-value">{currentProject.availability}</p>
                  </div>
                </div>
                
                {currentProject.brochureUrl && (
                  <a href={currentProject.brochureUrl} target="_blank" rel="noreferrer" className="download-brochure-button" style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem', padding: '1rem', background: '#2563eb', color: '#fff', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
                    Download Brochure
                  </a>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {currentProject.images?.length > 0 && (
          <section style={{ padding: "4rem 1rem", background: "#f9fafb" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <ProjectGallery title="Project Gallery" images={currentProject.images} />
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {currentProject.faqs?.length > 0 && (
          <section style={{ padding: "4rem 1rem" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <FAQ faqs={currentProject.faqs} />
            </div>
          </section>
        )}

        {/* Inquiry Section */}
        <section style={{ padding: "4rem 1rem", background: "#f3f4f6" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <Inquiry projectName={currentProject.name} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}