// import React, { useEffect } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import MainNavbar from "@/components/MainNavbar";
// import ProjectDetailsHero from "@/components/ProjectDetailsHero";
// import FlowPlan from "@/components/FlowPlan";
// import VirtualTour from "@/components/VirtualTour";
// import ProjectGallery from "@/components/ProjectGallery";
// import ProjectProgress from "@/components/ProjectProgress";
// import FAQ from "@/components/FAQ";
// import Inquiry from "@/components/Inquiry";
// import Footer from "@/components/Footer";
// // import ContactForm from "@/components/ContactForm";
// import { projectDetailsData } from "../data/projectsData";
// import { landDetailsData } from "../data/landsData";
// import "@/styles/ProjectDetails.css";

// /**
//  * ProjectDetails Page - Displays detailed information about a specific project
//  * Can handle both residence projects and land projects
//  * Uses ProjectDetailsHero component for the main content area
//  */

// export default function ProjectDetails() {
//   const { projectId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Get project data from navigation state (passed from FeaturedProjects/Residence/Lands page)
//   const { projectDetails, source, dataSource } = location.state || {};

//   // Convert projectId to number for correct lookup
//   const numericProjectId = Number(projectId);

//   // Select the correct data source based on dataSource parameter
//   let currentProject;

//   if (projectDetails) {
//     // Use project data passed directly from navigation state
//     currentProject = projectDetails;
//   } else if (dataSource === "lands") {
//     // Look up in landDetailsData for lands
//     currentProject = landDetailsData[numericProjectId];
//   } else if (dataSource === "projects") {
//     // Look up in projectDetailsData for projects
//     currentProject = projectDetailsData[numericProjectId];
//   } else {
//     // Fallback: try projects first, then lands
//     currentProject =
//       projectDetailsData[numericProjectId] ||
//       landDetailsData[numericProjectId] ||
//       projectDetailsData[1];
//   }

//   const heroTitle = currentProject?.heroTitle || currentProject?.name || "";

//   // Set page title and meta description using separate variables
//   useEffect(() => {
//     if (currentProject) {
//       const metaTitle =
//         currentProject.metaTitle ||
//         `${currentProject.name} - Project Details | Odiliya`;
//       const metaDescriptionText =
//         currentProject.metaDescription ||
//         currentProject.description ||
//         `${currentProject.name} project details at Odiliya.`;
//       document.title = metaTitle;
//       let metaDescription = document.querySelector('meta[name="description"]');
//       if (!metaDescription) {
//         metaDescription = document.createElement("meta");
//         metaDescription.name = "description";
//         document.head.appendChild(metaDescription);
//       }
//       metaDescription.content = metaDescriptionText;
//     }
//     return () => {
//       document.title = "Odiliya";
//       let metaDescription = document.querySelector('meta[name="description"]');
//       if (metaDescription) {
//         metaDescription.content = "Odiliya - Real Estate Projects";
//       }
//     };
//   }, [currentProject]);

//   // Contact buttons configuration
//   const contactButtons = [
//     {
//       label: "WhatsApp",
//       url: `https://wa.me/${currentProject.propertyAdvisor.phone.replace(
//         /[^0-9]/g,
//         ""
//       )}?text=Hi, I'm interested in ${currentProject.name}`,
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488" />
//         </svg>
//       ),
//       className: "whatsapp",
//       external: true,
//     },
//     {
//       label: "Call Now",
//       url: `tel:${currentProject.propertyAdvisor.phone}`,
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
//         </svg>
//       ),
//       className: "call",
//       external: true,
//     },
//     {
//       label: "Contact Us",
//       url: "/contact",
//       icon: (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
//         </svg>
//       ),
//       className: "contact",
//     },
//   ];

//   // Handle back navigation
//   const handleBack = () => {
//     if (source === "residence" || source === "residence-url") {
//       navigate("/residence");
//     } else if (source === "lands") {
//       navigate("/lands");
//     } else if (source === "home-lands") {
//       navigate("/"); // Go back to home page
//     } else {
//       navigate(-1); // Go back to previous page
//     }
//   };

//   return (
//     <>
//       <MainNavbar />

//       {/* Back Navigation */}
//       <div className="project-details-back-container">
//         <button onClick={handleBack} className="project-details-back-button">
//           <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
//           </svg>
//           Back to{" "}
//           {source === "lands"
//             ? "Lands"
//             : source === "home-lands"
//             ? "Home"
//             : "Residence"}
//         </button>
//       </div>

//       <main className="project-details-main-container">
//         {/* Project Details Hero Section */}
//         <div className="project-details-hero-container">
//           <ProjectDetailsHero
//             title={heroTitle}
//             images={currentProject.images}
//             mapEmbedUrl={currentProject.mapEmbedUrl}
//             propertyAdvisor={currentProject.propertyAdvisor}
//             contactButtons={contactButtons}
//             showThumbnails={true}
//             showNavigation={true}
//             imageAspectRatio="16/9"
//             className="project-details-main"
//           />
//         </div>

//         {/* Additional Project Information Section */}
//         <section className="project-details-info-section">
//           <div className="project-details-info-container">
//             <div className="project-details-info-grid">
//               {/* Project Description */}
//               <div>
//                 <h1 className="project-details-title">{currentProject.name}</h1>
//                 <p className="project-details-description">
//                   {currentProject.description}
//                 </p>

//                 {/* Project Features */}
//                 <div className="project-details-features">
//                   <h3 className="project-details-features-title">
//                     Features And Amenities
//                   </h3>
//                   <ul className="amenity-pills">
//                     {currentProject.amenities &&
//                     currentProject.amenities.length > 0 ? (
//                       currentProject.amenities.map((amenity, idx) => (
//                         <li className="amenity-pill" key={idx}>
//                           <span className="icon">{amenity.icon || "□"}</span>{" "}
//                           {amenity.name || amenity.title}
//                         </li>
//                       ))
//                     ) : (
//                       <li className="amenity-pill">
//                         No amenities listed for this project.
//                       </li>
//                     )}
//                   </ul>
//                 </div>
//               </div>

//               {/* Project Quick Info */}
//               <div className="project-details-quick-info">
//                 <h3 className="project-details-quick-info-title">
//                   Project Information
//                 </h3>
//                 <div className="project-details-quick-info-content">
//                   <div className="quick-info-item">
//                     <strong className="quick-info-label">Location:</strong>
//                     <p className="quick-info-value">
//                       {currentProject.location}
//                     </p>
//                   </div>
//                   {currentProject.area && (
//                     <div className="quick-info-item">
//                       <strong className="quick-info-label">Area:</strong>
//                       <p className="quick-info-value">{currentProject.area}</p>
//                     </div>
//                   )}
//                   {currentProject.availability && (
//                     <div className="quick-info-item">
//                       <strong className="quick-info-label">
//                         Availability:
//                       </strong>
//                       <p className="quick-info-value">
//                         {currentProject.availability}
//                       </p>
//                     </div>
//                   )}
//                   {currentProject.price && (
//                     <div className="quick-info-item">
//                       <strong className="quick-info-label">
//                         Starting Price:
//                       </strong>
//                       <p className="quick-info-value quick-info-price">
//                         {currentProject.price}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Floor Plans Section */}
//         {currentProject &&
//           currentProject.floorPlans &&
//           currentProject.floorPlans.length > 0 && (
//             <section style={{ padding: "3rem 1rem", background: "#f8f9fa" }}>
//               <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//                 <FlowPlan
//                   title="Floor Plans"
//                   plans={currentProject.floorPlans}
//                   defaultPlan={0}
//                   showNavigation={true}
//                   className="project-details-floor-plans"
//                 />
//               </div>
//             </section>
//           )}

//         {/* Virtual Tour Section */}
//         {currentProject &&
//           currentProject.virtualTours &&
//           currentProject.virtualTours.length > 0 && (
//             <section style={{ padding: "3rem 1rem", background: "#ffffff" }}>
//               <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//                 <VirtualTour
//                   title="Virtual Tour"
//                   tours={currentProject.virtualTours}
//                   autoPlay={false}
//                   showControls={true}
//                   className="project-details-virtual-tour"
//                 />
//               </div>
//             </section>
//           )}

//         {/* Project Gallery Section */}
//         {currentProject &&
//           (currentProject.galleryImages || currentProject.images) &&
//           (currentProject.galleryImages || currentProject.images).length >
//             0 && (
//             <section style={{ padding: "3rem 1rem", background: "#f8f9fa" }}>
//               <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//                 <ProjectGallery
//                   title="Project Gallery"
//                   images={currentProject.galleryImages || currentProject.images}
//                   showThumbnails={true}
//                   autoSlide={false}
//                   className="project-details-gallery"
//                 />
//               </div>
//             </section>
//           )}

//         {/* Project Progress Section */}
//         {currentProject &&
//           currentProject.progressImages &&
//           currentProject.progressImages.length > 0 && (
//             <section style={{ padding: "3rem 1rem", background: "#f8f9fa" }}>
//               <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//                 <ProjectProgress
//                   title="Project Progress"
//                   images={currentProject.progressImages}
//                 />
//               </div>
//             </section>
//           )}

//         {/* FAQ Section */}
//         {currentProject &&
//           currentProject.faqs &&
//           currentProject.faqs.length > 0 && (
//             <section style={{ padding: "3rem 1rem", background: "#ffffff" }}>
//               <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//                 <FAQ
//                   title="Frequently Asked Questions"
//                   faqs={currentProject.faqs}
//                   defaultExpanded={0}
//                   allowMultiple={false}
//                   className="project-details-faq"
//                 />
//               </div>
//             </section>
//           )}

//         {/* Inquiry Section */}
//         <section style={{ padding: "3rem 1rem", background: "#f8f9fa" }}>
//           <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
//             <Inquiry
//               title="Project Inquiry"
//               projectName={currentProject.name}
//               showDownloadOptions={true}
//               submitButtonText="Submit Inquiry"
//               successMessage="Thank you for your inquiry! Our team will contact you within 24 hours with detailed information about this project."
//               className="project-details-inquiry"
//             />
//           </div>
//         </section>
//       </main>

//       <Footer />
//     </>
//   );
// }

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

/**
 * ProjectDetails Page - Displays detailed information about a specific project
 * Can handle both residence projects and land projects
 * Now supports URL slugs (e.g., /project-details/lush) instead of just IDs
 */

export default function ProjectDetails() {
  const { projectId } = useParams(); // This now contains the slug
  const location = useLocation();
  const navigate = useNavigate();

  // Get project data from navigation state
  const {
    projectDetails,
    source,
    dataSource,
    projectId: stateProjectId,
  } = location.state || {};

  /**
   * Find project by slug or ID
   * Searches through the data to match either slug or ID
   */
  const findProjectBySlugOrId = (data, identifier) => {
    // First, try to find by slug
    const bySlug = Object.values(data).find(
      (project) => project.slug === identifier,
    );
    if (bySlug) return bySlug;

    // If not found by slug, try by ID (for backwards compatibility)
    const numericId = Number(identifier);
    if (!isNaN(numericId)) {
      return data[numericId];
    }

    return null;
  };

  // Select the correct data source and find the project
  let currentProject;

  if (projectDetails) {
    // Use project data passed directly from navigation state
    currentProject = projectDetails;
  } else if (stateProjectId) {
    // If projectId is passed in state (from LandsSection), use that for lookup
    if (dataSource === "lands") {
      currentProject = landDetailsData[stateProjectId];
    } else if (dataSource === "projects") {
      currentProject = projectDetailsData[stateProjectId];
    }
  } else if (dataSource === "lands") {
    // Look up in landDetailsData using slug or ID
    currentProject = findProjectBySlugOrId(landDetailsData, projectId);
  } else if (dataSource === "projects") {
    // Look up in projectDetailsData using slug or ID
    currentProject = findProjectBySlugOrId(projectDetailsData, projectId);
  } else {
    // Fallback: try projects first, then lands
    currentProject =
      findProjectBySlugOrId(projectDetailsData, projectId) ||
      findProjectBySlugOrId(landDetailsData, projectId) ||
      projectDetailsData[1];
  }

  const heroTitle = currentProject?.heroTitle || currentProject?.name || "";

  // Set page title and meta description
  useEffect(() => {
    if (currentProject) {
      const metaTitle =
        currentProject.metaTitle ||
        `${currentProject.name} - Project Details | Odiliya`;
      const metaDescriptionText =
        currentProject.metaDescription ||
        currentProject.description ||
        `${currentProject.name} project details at Odiliya.`;
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
  }, [currentProject]);

  // Contact buttons configuration
  const contactButtons = [
    {
      label: "WhatsApp",
      url: `https://wa.me/${(
        currentProject.propertyAdvisor.whatsapp ||
        currentProject.propertyAdvisor.phone
      ).replace(/[^0-9]/g, "")}?text=Hi, I'm interested in ${
        currentProject.name
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
      url: `tel:${currentProject.propertyAdvisor.phone}`,
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

  // Handle back navigation
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

  return (
    <>
      <MainNavbar />

      {/* Back Navigation */}
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
        {/* Project Details Hero Section */}
        <div className="project-details-hero-container">
          <ProjectDetailsHero
            title={heroTitle}
            images={currentProject.images}
            mapEmbedUrl={currentProject.mapEmbedUrl}
            propertyAdvisor={currentProject.propertyAdvisor}
            contactButtons={contactButtons}
            showThumbnails={true}
            showNavigation={true}
            imageAspectRatio="16/9"
            className="project-details-main"
          />
        </div>

        {/* Additional Project Information Section */}
        <section className="project-details-info-section">
          <div className="project-details-info-container">
            <div className="project-details-info-grid">
              {/* Project Description */}
              <div>
                <h1 className="project-details-title">{currentProject.name}</h1>
                {Array.isArray(currentProject.description) ? (
                  <div className="project-details-description">
                    {currentProject.description.map((item, index) => {
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
                  <p className="project-details-description">
                    {currentProject.description}
                  </p>
                )}

                {/* Project Features */}
                <div className="project-details-features">
                  <h3 className="project-details-features-title">
                    Features And Amenities
                  </h3>
                  <ul className="amenity-pills">
                    {currentProject.amenities &&
                    currentProject.amenities.length > 0 ? (
                      currentProject.amenities.map((amenity, idx) => (
                        <li className="amenity-pill" key={idx}>
                          <span className="icon">{amenity.icon || "□"}</span>{" "}
                          {amenity.name || amenity.title}
                        </li>
                      ))
                    ) : (
                      <li className="amenity-pill">
                        No amenities listed for this project.
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Project Quick Info */}
              <div className="project-details-quick-info">
                <h3 className="project-details-quick-info-title">
                  Project Information
                </h3>
                <div className="project-details-quick-info-content">
                  <div className="quick-info-item">
                    <strong className="quick-info-label">Location:</strong>
                    <p className="quick-info-value">
                      {currentProject.location}
                    </p>
                  </div>
                  {currentProject.area && (
                    <div className="quick-info-item">
                      <strong className="quick-info-label">Area:</strong>
                      <p className="quick-info-value">{currentProject.area}</p>
                    </div>
                  )}
                  {currentProject.availability && (
                    <div className="quick-info-item">
                      <strong className="quick-info-label">
                        Availability:
                      </strong>
                      <p className="quick-info-value">
                        {currentProject.availability}
                      </p>
                    </div>
                  )}
                  {currentProject.price && (
                    <div className="quick-info-item">
                      <strong className="quick-info-label">
                        Starting Price:
                      </strong>
                      <p className="quick-info-value quick-info-price">
                        {currentProject.price}
                      </p>
                    </div>
                  )}
                </div>

                {/* Download Brochure Button */}
                {currentProject.brochureUrl && (
                  <div className="download-brochure-container">
                    <a
                      href={currentProject.brochureUrl}
                      download
                      className="download-brochure-button"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
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

        {/* Floor Plans Section */}
        {currentProject &&
          currentProject.floorPlans &&
          currentProject.floorPlans.length > 0 && (
            <section style={{ padding: "3rem 1rem", background: "#f8f9fa" }}>
              <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <FlowPlan
                  title="Floor Plans"
                  plans={currentProject.floorPlans}
                  defaultPlan={0}
                  showNavigation={true}
                  className="project-details-floor-plans"
                />
              </div>
            </section>
          )}

        {/* Virtual Tour Section */}
        {currentProject &&
          currentProject.virtualTours &&
          currentProject.virtualTours.length > 0 && (
            <section style={{ padding: "3rem 1rem", background: "#ffffff" }}>
              <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <VirtualTour
                  title="Virtual Tour"
                  tours={currentProject.virtualTours}
                  autoPlay={false}
                  showControls={true}
                  className="project-details-virtual-tour"
                />
              </div>
            </section>
          )}

        {/* Project Gallery Section */}
        {currentProject &&
          (currentProject.galleryImages || currentProject.images) &&
          (currentProject.galleryImages || currentProject.images).length >
            0 && (
            <section style={{ padding: "3rem 1rem", background: "#f8f9fa" }}>
              <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <ProjectGallery
                  title="Project Gallery"
                  images={currentProject.galleryImages || currentProject.images}
                  showThumbnails={true}
                  autoSlide={false}
                  className="project-details-gallery"
                />
              </div>
            </section>
          )}

        {/* Project Progress Section */}
        {currentProject &&
          currentProject.progressImages &&
          currentProject.progressImages.length > 0 && (
            <section style={{ padding: "3rem 1rem", background: "#f8f9fa" }}>
              <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <ProjectProgress
                  title="Project Progress"
                  images={currentProject.progressImages}
                />
              </div>
            </section>
          )}

        {/* FAQ Section */}
        {currentProject &&
          currentProject.faqs &&
          currentProject.faqs.length > 0 && (
            <section style={{ padding: "3rem 1rem", background: "#ffffff" }}>
              <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <FAQ
                  title="Frequently Asked Questions"
                  faqs={currentProject.faqs}
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
              projectName={currentProject.name}
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
