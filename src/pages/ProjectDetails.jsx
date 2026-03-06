import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
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
  const [firestoreData, setFirestoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

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

  // Fetch actual Firestore data
  useEffect(() => {
    const fetchFirestoreData = async () => {
      try {
        if (currentProject?.id) {
          console.log("🔍 Fetching Firestore data for ID:", currentProject.id);
          const docRef = doc(db, "projectDetails", currentProject.id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("🔥 Firestore Raw Data:", docSnap.data());
            setFirestoreData(docSnap.data());
          } else {
            console.log("❌ No Firestore document found");
          }
        }
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFirestoreData();
  }, [currentProject]);

  const heroTitle = currentProject?.heroTitle || currentProject?.name || "";

  // Use Firestore data if available
  const displayProject = firestoreData || currentProject;

  // Debug images
  useEffect(() => {
    if (displayProject) {
      console.log("📸 Display Project:", displayProject.name);
      console.log("📸 Main Image:", displayProject.image);
      console.log("📸 Gallery Images:", displayProject.images);
      console.log("📸 Floor Plans:", displayProject.floorPlans);

      // Test main image
      if (displayProject.image) {
        console.log("Testing main image:", displayProject.image);
        const img = new Image();
        img.onload = () => console.log("✅ Main image loaded");
        img.onerror = () => console.log("❌ Main image failed to load");
        img.src = displayProject.image;
      }

      // Test gallery images
      if (displayProject.images && displayProject.images.length > 0) {
        displayProject.images.forEach((img, index) => {
          console.log(`Testing gallery image ${index}:`, img.src || img);
          const testImg = new Image();
          testImg.onload = () =>
            console.log(`✅ Gallery image ${index} loaded`);
          testImg.onerror = () =>
            console.log(`❌ Gallery image ${index} failed to load`);
          testImg.src = img.src || img;
        });
      }
    }
  }, [displayProject]);

  // Transform floor plans data for FlowPlan component
  const transformedFloorPlans = displayProject?.floorPlans?.map((plan) => ({
    title: plan.name,
    image: plan.image,
  }));

  console.log("Original Floor Plans:", displayProject?.floorPlans);
  console.log("Transformed Floor Plans:", transformedFloorPlans);

  // Set page title and meta description
  useEffect(() => {
    if (displayProject) {
      const metaTitle =
        displayProject.metaTitle ||
        `${displayProject.name} - Project Details | Odiliya`;
      const metaDescriptionText =
        displayProject.metaDescription ||
        (typeof displayProject.description === "string"
          ? displayProject.description
          : `${displayProject.name} project details at Odiliya.`);
      document.title = metaTitle;
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = metaDescriptionText;
    }
    return () => {
      document.title = "Odiliya";
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.content = "Odiliya - Real Estate Projects";
      }
    };
  }, [displayProject]);

  // Contact buttons configuration
  const contactButtons = [
    {
      label: "WhatsApp",
      url: `https://wa.me/${(
        displayProject?.propertyAdvisor?.whatsapp ||
        displayProject?.propertyAdvisor?.phone ||
        ""
      ).replace(/[^0-9]/g, "")}?text=Hi, I'm interested in ${
        displayProject?.name || ""
      }`,
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
      url: `tel:${displayProject?.propertyAdvisor?.phone || ""}`,
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

  const handleBack = () => {
    if (source === "residence" || source === "residence-url") {
      navigate("/residence");
    } else if (source === "lands") {
      navigate("/lands");
    } else if (source === "home-lands") {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  const handleImageError = (imageUrl, type = "image") => {
    console.log(`❌ ${type} failed to load:`, imageUrl);
    setImageErrors((prev) => ({ ...prev, [imageUrl]: true }));
    // Return fallback image URL
    return "https://via.placeholder.com/800x600?text=Image+Not+Available";
  };

  if (!displayProject)
    return <div className="p-20 text-center">Loading Project Details...</div>;

  return (
    <>
      <MainNavbar />

      <div className="project-details-back-container">
        <button onClick={handleBack} className="project-details-back-button">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Back to{" "}
          {source === "lands"
            ? "Lands"
            : source === "home-lands"
              ? "Home"
              : "Residence"}
        </button>
      </div>

      <main className="project-details-main-container">
        <div className="project-details-hero-container">
          <ProjectDetailsHero
            title={heroTitle}
            images={displayProject.images || []}
            mapEmbedUrl={displayProject.mapEmbedUrl}
            propertyAdvisor={displayProject.propertyAdvisor}
            contactButtons={contactButtons}
            showThumbnails={true}
            showNavigation={true}
            imageAspectRatio="16/9"
            className="project-details-main"
            onImageError={handleImageError}
          />
        </div>

        <section className="project-details-info-section">
          <div className="project-details-info-container">
            <div className="project-details-info-grid">
              {/* --- DESCRIPTION SECTION --- */}
              <div className="project-main-content">
                <h1 className="project-details-title">{displayProject.name}</h1>

                <div className="project-details-description">
                  {/* Support both array format (old) and HTML format (new) */}
                  {Array.isArray(displayProject.description) ? (
                    <div>
                      {displayProject.description.map((item, index) => {
                        if (item.type === "title") {
                          return (
                            <h3
                              key={index}
                              className="description-title"
                              style={{
                                fontWeight: "bold",
                                fontSize: "1.3em",
                                marginTop: index === 0 ? "0" : "1.5em",
                                marginBottom: "0.5em",
                              }}
                            >
                              {item.text}
                            </h3>
                          );
                        } else if (item.type === "subtitle") {
                          return (
                            <h4
                              key={index}
                              className="description-subtitle"
                              style={{
                                fontWeight: "600",
                                fontSize: "1.15em",
                                marginBottom: "1em",
                                opacity: 0.95,
                              }}
                            >
                              {item.text}
                            </h4>
                          );
                        } else {
                          return (
                            <p
                              key={index}
                              className="description-paragraph"
                              style={{
                                marginBottom: "1em",
                                lineHeight: "1.6",
                              }}
                            >
                              {item.text}
                            </p>
                          );
                        }
                      })}
                    </div>
                  ) : (
                    /* HTML format from admin panel */
                    <div
                      className="rich-text-display"
                      style={{
                        whiteSpace: "pre-line",
                        lineHeight: "1.8",
                        fontSize: "1.1rem",
                        color: "#374151",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: displayProject.description,
                      }}
                    />
                  )}
                </div>

                {/* Amenities */}
                {displayProject.amenities?.length > 0 && (
                  <div
                    className="project-details-features"
                    style={{ marginTop: "3rem" }}
                  >
                    <h3 className="project-details-features-title">
                      Features And Amenities
                    </h3>
                    <ul className="amenity-pills">
                      {displayProject.amenities.map((amenity, idx) => (
                        <li className="amenity-pill" key={idx}>
                          <span className="icon">{amenity.icon || "✓"}</span>{" "}
                          {amenity.name || amenity.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* --- SIDEBAR INFO --- */}
              <div className="project-details-quick-info">
                <h3 className="project-details-quick-info-title">
                  Project Information
                </h3>
                <div className="project-details-quick-info-content">
                  <div className="quick-info-item">
                    <strong className="quick-info-label">Location:</strong>
                    <p className="quick-info-value">
                      {displayProject.location}
                    </p>
                  </div>
                  {displayProject.area && (
                    <div className="quick-info-item">
                      <strong className="quick-info-label">Area:</strong>
                      <p className="quick-info-value">{displayProject.area}</p>
                    </div>
                  )}
                  {displayProject.availability && (
                    <div className="quick-info-item">
                      <strong className="quick-info-label">
                        Availability:
                      </strong>
                      <p className="quick-info-value">
                        {displayProject.availability}
                      </p>
                    </div>
                  )}
                  {displayProject.price && (
                    <div className="quick-info-item">
                      <strong className="quick-info-label">
                        Starting Price:
                      </strong>
                      <p
                        className="quick-info-value quick-info-price"
                        style={{ color: "#e67e22", fontWeight: "bold" }}
                      >
                        {displayProject.price}
                      </p>
                    </div>
                  )}
                </div>

                {displayProject.brochureUrl && (
                  <div className="download-brochure-container">
                    <a
                      href={displayProject.brochureUrl}
                      download
                      className="download-brochure-button"
                      style={{
                        display: "block",
                        textAlign: "center",
                        marginTop: "1.5rem",
                        padding: "1rem",
                        background: "#2563eb",
                        color: "#fff",
                        borderRadius: "12px",
                        textDecoration: "none",
                        fontWeight: "bold",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        style={{ display: "inline", marginRight: "8px" }}
                      >
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                      </svg>
                      Download Brochure
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Floor Plans Section - Using transformed data */}
        {transformedFloorPlans && transformedFloorPlans.length > 0 && (
          <section style={{ padding: "3rem 1rem", background: "#f8f9fa" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "2rem",
                  color: "#333",
                }}
              >
                Floor Plans
              </h2>

              <FlowPlan
                title="Floor Plans"
                plans={transformedFloorPlans}
                defaultPlan={0}
                showNavigation={true}
                className="project-details-floor-plans"
              />
            </div>
          </section>
        )}

        {/* Virtual Tour Section */}
        {displayProject.virtualTours &&
          displayProject.virtualTours.length > 0 && (
            <section style={{ padding: "3rem 1rem", background: "#ffffff" }}>
              <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <VirtualTour
                  title="Virtual Tour"
                  thumbnails="https://pub-9bd45192d22f4f0e895c52adcfb2460a.r2.dev/img1_0_xyeveu%20(1).jpg"
                  tours={displayProject.virtualTours}
                  autoPlay={false}
                  showControls={true}
                  className="project-details-virtual-tour"
                />
              </div>
            </section>
          )}

        {/* Project Gallery Section */}
        {(displayProject.galleryImages || displayProject.images) &&
          (displayProject.galleryImages || displayProject.images).length >
            0 && (
            <section style={{ padding: "3rem 1rem", background: "#f8f9fa" }}>
              <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <ProjectGallery
                  title="Project Gallery"
                  images={displayProject.galleryImages || displayProject.images}
                  showThumbnails={true}
                  autoSlide={false}
                  className="project-details-gallery"
                />
              </div>
            </section>
          )}

        {/* Project Progress Section */}
        {displayProject.progressImages &&
          displayProject.progressImages.length > 0 && (
            <section style={{ padding: "3rem 1rem", background: "#f8f9fa" }}>
              <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <ProjectProgress
                  title="Project Progress"
                  images={displayProject.progressImages}
                />
              </div>
            </section>
          )}

        {/* FAQ Section */}
        {displayProject.faqs?.length > 0 && (
          <section style={{ padding: "3rem 1rem", background: "#ffffff" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <FAQ
                title="Frequently Asked Questions"
                faqs={displayProject.faqs}
                defaultExpanded={0}
                allowMultiple={false}
                className="project-details-faq"
              />
            </div>
          </section>
        )}

        {/* Inquiry Section */}
        <section style={{ padding: "3rem 1rem", background: "#f8f9fa" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <Inquiry
              title="Project Inquiry"
              projectName={displayProject.name}
              showDownloadOptions={true}
              submitButtonText="Submit Inquiry"
              successMessage="Thank you for your inquiry! Our team will contact you within 24 hours with detailed information about this project."
              className="project-details-inquiry"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
