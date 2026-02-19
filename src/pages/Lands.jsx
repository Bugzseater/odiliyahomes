// import React, { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import MainNavbar from "@/components/MainNavbar";
// import LandHeroSection from "@/components/SubPageHeroSection";
// import ProjectDetailsHero from "@/components/ProjectDetailsHero";
// import HeroImg from "@/assets/images/hikkaduw.jpg";
// import logo from "@/assets/Odiliyalogo.png";
// import OurProjectsSection from "@/components/OurProjectsSection";
// import ProjectsWithSearchSection from "@/components/ProjectsWithSearchSection";
// import ContactForm from "@/components/ContactForm";
// import Footer from "@/components/Footer";
// import {
//   landDetailsData,
//   landsProjectsData,
//   LandProjects,
// } from "@/data/landsData";

// export default function Lands() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();

//   // State to manage which view to show
//   const [showProjectDetails, setShowProjectDetails] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);

//   // State for filtered land projects
//   const [filteredProjects, setFilteredProjects] = useState(LandProjects);

//   // Set page title and meta description
//   useEffect(() => {
//     if (showProjectDetails && selectedProject) {
//       document.title = `${selectedProject.name} | Odiliya`;
//       const metaDescription = document.querySelector(
//         'meta[name="description"]'
//       );
//       if (metaDescription) {
//         metaDescription.setAttribute(
//           "content",
//           selectedProject.description ||
//             "Discover premium land projects and investment opportunities with Odiliya Homes."
//         );
//       }
//     } else {
//       document.title =
//         "Land for Sale | Land Projects | Odiliya Homes Sri Lanka";
//       let metaDescription = document.querySelector('meta[name="description"]');
//       if (!metaDescription) {
//         metaDescription = document.createElement("meta");
//         metaDescription.name = "description";
//         document.head.appendChild(metaDescription);
//       }
//       metaDescription.setAttribute(
//         "content",
//         "Odiliya Homes offers land for sale across Sri Lanka. Discover the perfect land project for your next investment today."
//       );
//     }
//   }, [showProjectDetails, selectedProject]);

//   // Check URL parameters on component mount
//   useEffect(() => {
//     const projectId = searchParams.get("project");
//     const shouldShowDetails = searchParams.get("showDetails") === "true";

//     if (projectId && shouldShowDetails) {
//       const projectDetails = landDetailsData[projectId];
//       if (projectDetails) {
//         setSelectedProject(projectDetails);
//         setShowProjectDetails(true);
//       }
//     }
//   }, [searchParams]);

//   // Handle project click
//   const handleProjectClick = (project) => {
//     console.log("Land project clicked:", project); // Debug log

//     // Navigate to ProjectDetails page with project ID
//     navigate(`/project-details/${project.id}`, {
//       state: {
//         project: project,
//         projectDetails: landDetailsData[project.id] || null,
//         source: "lands", // Track where user came from
//       },
//     });
//   };

//   // Handle back to projects list
//   const handleBackToProjects = () => {
//     setShowProjectDetails(false);
//     setSelectedProject(null);
//     // Clear URL parameters
//     setSearchParams({});
//   };

//   // Handle project more info from featured projects
//   const handleProjectMoreInfo = (project) => {
//     handleProjectClick(project);
//   };

//   // Handle search filtering
//   const handleSearch = (searchData) => {
//     console.log("Search data:", searchData); // Debug log

//     let filtered = [...LandProjects];

//     // Filter by status (availability)
//     if (searchData.status) {
//       filtered = filtered.filter(
//         (project) =>
//           project.availability &&
//           project.availability.toLowerCase() === searchData.status.toLowerCase()
//       );
//     }

//     // Filter by location
//     if (searchData.location) {
//       filtered = filtered.filter(
//         (project) =>
//           project.location &&
//           project.location
//             .toLowerCase()
//             .includes(searchData.location.toLowerCase())
//       );
//     }

//     // Filter by project name
//     if (searchData.projectName) {
//       filtered = filtered.filter(
//         (project) =>
//           project.title &&
//           project.title
//             .toLowerCase()
//             .includes(searchData.projectName.toLowerCase())
//       );
//     }

//     console.log("Filtered projects:", filtered); // Debug log
//     setFilteredProjects(filtered);
//   };

//   // Extract unique locations from LandProjects for search options
//   const getUniqueLocations = () => {
//     const locations = LandProjects.map((project) => project.location).filter(
//       Boolean
//     );
//     return [...new Set(locations)].sort();
//   };

//   // Contact buttons for project details
//   const getContactButtons = (advisor) => [
//     {
//       label: "WhatsApp",
//       url: `https://wa.me/${(advisor.whatsappPhone || advisor.phone).replace(
//         /[^0-9]/g,
//         ""
//       )}?text=Hi, I'm interested in ${selectedProject?.name}`,
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
//       url: `tel:${advisor.phone}`,
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

//   return (
//     <>
//       <MainNavbar />
//       <main
//         style={{
//           paddingTop: "7rem",
//           minHeight: "100vh",
//           background: "#f8f9fa",
//         }}
//       >
//         <LandHeroSection
//           video="https://res.cloudinary.com/dswr94sjy/video/upload/v1763439041/envato_video_gen_Nov_17_2025_11_37_19.mp4"
//           // videoPoster={HeroImg}
//           mediaType="video"
//           title="ODILIYA LANDS"
//           heading="Your ideal land investment awaits"
//           breadcrumb="Home > Lands"
//           description={
//             "At Odiliya Homes, we offer premium land in essential locations - the ideal foundation for building your future or securing a lasting investment.With carefully selected sites, safe neighborhoods, and excellent connectivity, every property is designed for growth, comfort, and long-term value."
//           }
//         />

//         {/* Conditional rendering based on showProjectDetails state */}
//         {!showProjectDetails ? (
//           <>
//             {/* Show project sections when not viewing details */}
//             <OurProjectsSection
//               title="OUR LAND PROJECTS"
//               categories={["Lands"]}
//               projects={landsProjectsData}
//               defaultCategory={0}
//               className="lands-projects"
//               onProjectClick={handleProjectClick}
//             />

//             <ProjectsWithSearchSection
//               title="SEARCH LAND PROJECTS"
//               searchProps={{
//                 title: "Find Your Perfect Land...",
//                 searchOptions: {
//                   status: ["Available", "Sold Out"],
//                   location: getUniqueLocations(),
//                   projectName: [],
//                 },
//                 contactInfo: {
//                   name: "Odiliya Agent",
//                   role: "Land Development Advisor",
//                   avatar: logo,
//                   phone: "94717508899",
//                 },
//               }}
//               projects={filteredProjects}
//               className="lands-projects-search"
//               onProjectMoreInfo={handleProjectMoreInfo}
//               onSearch={handleSearch}
//             />
//           </>
//         ) : (
//           <>
//             {/* Show project details when a land project is selected */}
//             <div
//               style={{
//                 marginTop: "-200px",
//                 padding: "1.375rem 1rem",
//                 background: "#ffffff",
//               }}
//             >
//               {/* Back button */}
//               <div style={{ maxWidth: "1400px", margin: "0 auto 0 auto" }}>
//                 <button
//                   onClick={handleBackToProjects}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                     padding: "0.75rem 1.5rem",
//                     background: "#ff9900",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "8px",
//                     fontSize: "1rem",
//                     fontWeight: "600",
//                     cursor: "pointer",
//                     transition: "all 0.3s ease",
//                   }}
//                   onMouseOver={(e) => {
//                     e.target.style.background = "#e68800";
//                     e.target.style.transform = "translateY(-1px)";
//                   }}
//                   onMouseOut={(e) => {
//                     e.target.style.background = "#ff9900";
//                     e.target.style.transform = "translateY(0)";
//                   }}
//                 >
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="currentColor"
//                   >
//                     <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
//                   </svg>
//                   Back to Land Projects
//                 </button>
//               </div>

//               {/* Project Details Hero */}
//               {selectedProject && (
//                 <ProjectDetailsHero
//                   images={selectedProject.images}
//                   mapEmbedUrl={selectedProject.mapEmbedUrl}
//                   propertyAdvisor={selectedProject.propertyAdvisor}
//                   contactButtons={getContactButtons(
//                     selectedProject.propertyAdvisor
//                   )}
//                   showThumbnails={true}
//                   showNavigation={true}
//                   imageAspectRatio="16/9"
//                   className="lands-project-details"
//                 />
//               )}

//               {/* Additional Land Project Information */}
//               {selectedProject && (
//                 <section style={{ padding: "2rem 0", background: "#ffffff" }}>
//                   <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//                     <div
//                       style={{
//                         display: "grid",
//                         gridTemplateColumns: "2fr 1fr",
//                         gap: "2rem",
//                         alignItems: "start",
//                       }}
//                     >
//                       {/* Project Description */}
//                       <div>
//                         <h1
//                           style={{
//                             fontSize: "2.5rem",
//                             fontWeight: "600",
//                             color: "#333",
//                             marginBottom: "1rem",
//                             fontFamily: "Playfair Display, serif",
//                           }}
//                         >
//                           {selectedProject.name}
//                         </h1>
//                         <p
//                           style={{
//                             fontSize: "1.1rem",
//                             lineHeight: "1.8",
//                             color: "#666",
//                             marginBottom: "2rem",
//                           }}
//                         >
//                           {selectedProject.description}
//                         </p>

//                         {/* Land Features */}
//                         <div style={{ marginTop: "2rem" }}>
//                           <h3
//                             style={{
//                               fontSize: "1.5rem",
//                               fontWeight: "600",
//                               color: "#333",
//                               marginBottom: "1rem",
//                             }}
//                           >
//                             Land Features & Benefits
//                           </h3>
//                           <ul
//                             style={{
//                               listStyle: "none",
//                               padding: 0,
//                               display: "grid",
//                               gridTemplateColumns:
//                                 "repeat(auto-fit, minmax(250px, 1fr))",
//                               gap: "0.75rem",
//                             }}
//                           >
//                             <li
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                               }}
//                             >
//                               <span
//                                 style={{ color: "#ff9900", fontSize: "1.2rem" }}
//                               >
//                                 ✓
//                               </span>
//                               Clear title deeds
//                             </li>
//                             <li
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                               }}
//                             >
//                               <span
//                                 style={{ color: "#ff9900", fontSize: "1.2rem" }}
//                               >
//                                 ✓
//                               </span>
//                               All utilities available
//                             </li>
//                             <li
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                               }}
//                             >
//                               <span
//                                 style={{ color: "#ff9900", fontSize: "1.2rem" }}
//                               >
//                                 ✓
//                               </span>
//                               Approved sub-divisions
//                             </li>
//                             <li
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                               }}
//                             >
//                               <span
//                                 style={{ color: "#ff9900", fontSize: "1.2rem" }}
//                               >
//                                 ✓
//                               </span>
//                               Road access guaranteed
//                             </li>
//                             <li
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                               }}
//                             >
//                               <span
//                                 style={{ color: "#ff9900", fontSize: "1.2rem" }}
//                               >
//                                 ✓
//                               </span>
//                               High appreciation potential
//                             </li>
//                             <li
//                               style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "0.5rem",
//                               }}
//                             >
//                               <span
//                                 style={{ color: "#ff9900", fontSize: "1.2rem" }}
//                               >
//                                 ✓
//                               </span>
//                               Investment friendly location
//                             </li>
//                           </ul>
//                         </div>
//                       </div>

//                       {/* Project Quick Info */}
//                       <div
//                         style={{
//                           background: "#f8f9fa",
//                           padding: "2rem",
//                           borderRadius: "12px",
//                           border: "1px solid #e9ecef",
//                         }}
//                       >
//                         <h3
//                           style={{
//                             fontSize: "1.25rem",
//                             fontWeight: "600",
//                             color: "#333",
//                             marginBottom: "1.5rem",
//                           }}
//                         >
//                           Land Information
//                         </h3>
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: "1rem",
//                           }}
//                         >
//                           <div>
//                             <strong style={{ color: "#333" }}>Location:</strong>
//                             <p style={{ margin: "0.25rem 0", color: "#666" }}>
//                               {selectedProject.location}
//                             </p>
//                           </div>
//                           <div>
//                             <strong style={{ color: "#333" }}>
//                               Land Type:
//                             </strong>
//                             <p style={{ margin: "0.25rem 0", color: "#666" }}>
//                               Residential Development
//                             </p>
//                           </div>
//                           <div>
//                             <strong style={{ color: "#333" }}>
//                               Available Sizes:
//                             </strong>
//                             <p style={{ margin: "0.25rem 0", color: "#666" }}>
//                               Multiple Plot Sizes
//                             </p>
//                           </div>
//                           <div>
//                             <strong style={{ color: "#333" }}>
//                               Development Status:
//                             </strong>
//                             <p style={{ margin: "0.25rem 0", color: "#666" }}>
//                               Ready for Construction
//                             </p>
//                           </div>
//                           <div>
//                             <strong style={{ color: "#333" }}>
//                               Starting Price:
//                             </strong>
//                             <p
//                               style={{
//                                 margin: "0.25rem 0",
//                                 color: "#ff9900",
//                                 fontSize: "1.1rem",
//                                 fontWeight: "600",
//                               }}
//                             >
//                               Contact for Pricing
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </section>
//               )}
//             </div>
//           </>
//         )}
//       </main>
//       <ContactForm />
//       <Footer />
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MainNavbar from "@/components/MainNavbar";
import LandHeroSection from "@/components/SubPageHeroSection";
import ProjectDetailsHero from "@/components/ProjectDetailsHero";
import HeroImg from "@/assets/images/hikkaduw.jpg";
import logo from "@/assets/Odiliyalogo.png";
import OurProjectsSection from "@/components/OurProjectsSection";
import ProjectsWithSearchSection from "@/components/ProjectsWithSearchSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import {
  landDetailsData,
  landsProjectsData,
  LandProjects,
} from "@/data/landsData";

/**
 * Utility function to create URL-friendly slugs
 */
const createSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export default function Lands() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(LandProjects);

  // Set page title and meta description
  useEffect(() => {
    if (showProjectDetails && selectedProject) {
      document.title = `${selectedProject.name} | Odiliya`;
      const metaDescription = document.querySelector(
        'meta[name="description"]',
      );
      if (metaDescription) {
        metaDescription.setAttribute(
          "content",
          selectedProject.description ||
            "Discover premium land projects and investment opportunities with Odiliya Homes.",
        );
      }
    } else {
      document.title =
        "Land for Sale | Land Sale Companies in Sri Lanka | Odiliya Homes";
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute(
        "content",
        "As one of the leading land sale companies in Sri Lanka, Odiliya Homes offers premium land for sale nationwide. Find the perfect project for your investment.",
      );
    }
  }, [showProjectDetails, selectedProject]);

  // Check URL parameters on component mount
  useEffect(() => {
    const projectId = searchParams.get("project");
    const shouldShowDetails = searchParams.get("showDetails") === "true";

    if (projectId && shouldShowDetails) {
      const projectDetails = landDetailsData[projectId];
      if (projectDetails) {
        // Get slug from project or create one
        const slug = projectDetails.slug || createSlug(projectDetails.name);

        // Navigate to ProjectDetails page with slug
        navigate(`/project-details/${slug}`, {
          state: {
            projectId: projectId, // Pass ID for data lookup
            project: { id: projectId },
            projectDetails: projectDetails,
            source: "lands",
            dataSource: "lands",
          },
        });
      }
    }
  }, [searchParams, navigate]);

  // Handle project click - now uses slug
  const handleProjectClick = (project) => {
    console.log("Land project clicked:", project);

    if (!project || !project.id) {
      console.error("Invalid project data:", project);
      return;
    }

    // Get the full project details
    const projectDetails = landDetailsData[project.id];

    // Get slug from project data or create one
    const slug =
      projectDetails?.slug ||
      project.slug ||
      createSlug(project.title || project.name || projectDetails?.name);

    // Navigate to ProjectDetails page with slug
    navigate(`/project-details/${slug}`, {
      state: {
        projectId: project.id, // Pass ID for data lookup
        project: project,
        projectDetails: projectDetails || null,
        source: "lands",
        dataSource: "lands",
      },
    });
  };

  // Handle back to projects list
  const handleBackToProjects = () => {
    setShowProjectDetails(false);
    setSelectedProject(null);
    setSearchParams({});
  };

  // Handle project more info from featured projects
  const handleProjectMoreInfo = (project) => {
    handleProjectClick(project);
  };

  // Handle search filtering
  const handleSearch = (searchData) => {
    console.log("Search data:", searchData);

    let filtered = [...LandProjects];

    // Filter by status (availability)
    if (searchData.status) {
      filtered = filtered.filter(
        (project) =>
          project.availability &&
          project.availability.toLowerCase() ===
            searchData.status.toLowerCase(),
      );
    }

    // Filter by location
    if (searchData.location) {
      filtered = filtered.filter(
        (project) =>
          project.location &&
          project.location
            .toLowerCase()
            .includes(searchData.location.toLowerCase()),
      );
    }

    // Filter by project name
    if (searchData.projectName) {
      filtered = filtered.filter(
        (project) =>
          project.title &&
          project.title
            .toLowerCase()
            .includes(searchData.projectName.toLowerCase()),
      );
    }

    console.log("Filtered projects:", filtered);
    setFilteredProjects(filtered);
  };

  // Extract unique locations from LandProjects for search options
  const getUniqueLocations = () => {
    const locations = LandProjects.map((project) => project.location).filter(
      Boolean,
    );
    return [...new Set(locations)].sort();
  };

  // Contact buttons for project details
  const getContactButtons = (advisor) => [
    {
      label: "WhatsApp",
      url: `https://wa.me/${(advisor.whatsappPhone || advisor.phone).replace(
        /[^0-9]/g,
        "",
      )}?text=Hi, I'm interested in ${selectedProject?.name}`,
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

  return (
    <>
      <MainNavbar />
      <main
        style={{
          paddingTop: "7rem",
          minHeight: "100vh",
          background: "#f8f9fa",
        }}
      >
        <LandHeroSection
          video="#"
          mediaType="video"
          title="ODILIYA LANDS"
          heading="Your ideal land investment awaits"
          breadcrumb="Home > Lands"
          description={
            "At Odiliya Homes, we offer premium land in essential locations - the ideal foundation for building your future or securing a lasting investment. With carefully selected sites, safe neighborhoods, and excellent connectivity, every property is designed for growth, comfort, and long-term value."
          }
        />

        {!showProjectDetails ? (
          <>
            <OurProjectsSection
              title="OUR LAND PROJECTS"
              categories={["Lands"]}
              projects={landsProjectsData}
              defaultCategory={0}
              className="lands-projects"
              onProjectClick={handleProjectClick}
            />

            <ProjectsWithSearchSection
              title="SEARCH LAND PROJECTS"
              searchProps={{
                title: "Find Your Perfect Land...",
                searchOptions: {
                  status: ["Available", "Sold Out"],
                  location: getUniqueLocations(),
                  projectName: [],
                },
                contactInfo: {
                  name: "Odiliya Agent",
                  role: "Land Development Advisor",
                  avatar: logo,
                  phone: "94717508899",
                },
              }}
              projects={filteredProjects}
              className="lands-projects-search"
              onProjectMoreInfo={handleProjectMoreInfo}
              onSearch={handleSearch}
            />
          </>
        ) : (
          <>
            <div
              style={{
                marginTop: "-200px",
                padding: "1.375rem 1rem",
                background: "#ffffff",
              }}
            >
              <div style={{ maxWidth: "1400px", margin: "0 auto 0 auto" }}>
                <button
                  onClick={handleBackToProjects}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    background: "#ff9900",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = "#e68800";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = "#ff9900";
                    e.target.style.transform = "translateY(0)";
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
                  Back to Land Projects
                </button>
              </div>

              {selectedProject && (
                <ProjectDetailsHero
                  images={selectedProject.images}
                  mapEmbedUrl={selectedProject.mapEmbedUrl}
                  propertyAdvisor={selectedProject.propertyAdvisor}
                  contactButtons={getContactButtons(
                    selectedProject.propertyAdvisor,
                  )}
                  showThumbnails={true}
                  showNavigation={true}
                  imageAspectRatio="16/9"
                  className="lands-project-details"
                />
              )}

              {selectedProject && (
                <section style={{ padding: "2rem 0", background: "#ffffff" }}>
                  <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr",
                        gap: "2rem",
                        alignItems: "start",
                      }}
                    >
                      <div>
                        <h1
                          style={{
                            fontSize: "2.5rem",
                            fontWeight: "600",
                            color: "#333",
                            marginBottom: "1rem",
                            fontFamily: "Playfair Display, serif",
                          }}
                        >
                          {selectedProject.name}
                        </h1>
                        <p
                          style={{
                            fontSize: "1.1rem",
                            lineHeight: "1.8",
                            color: "#666",
                            marginBottom: "2rem",
                          }}
                        >
                          {selectedProject.description}
                        </p>

                        <div style={{ marginTop: "2rem" }}>
                          <h3
                            style={{
                              fontSize: "1.5rem",
                              fontWeight: "600",
                              color: "#333",
                              marginBottom: "1rem",
                            }}
                          >
                            Land Features & Benefits
                          </h3>
                          <ul
                            style={{
                              listStyle: "none",
                              padding: 0,
                              display: "grid",
                              gridTemplateColumns:
                                "repeat(auto-fit, minmax(250px, 1fr))",
                              gap: "0.75rem",
                            }}
                          >
                            <li
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <span
                                style={{ color: "#ff9900", fontSize: "1.2rem" }}
                              >
                                ✓
                              </span>
                              Clear title deeds
                            </li>
                            <li
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <span
                                style={{ color: "#ff9900", fontSize: "1.2rem" }}
                              >
                                ✓
                              </span>
                              All utilities available
                            </li>
                            <li
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <span
                                style={{ color: "#ff9900", fontSize: "1.2rem" }}
                              >
                                ✓
                              </span>
                              Approved sub-divisions
                            </li>
                            <li
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <span
                                style={{ color: "#ff9900", fontSize: "1.2rem" }}
                              >
                                ✓
                              </span>
                              Road access guaranteed
                            </li>
                            <li
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <span
                                style={{ color: "#ff9900", fontSize: "1.2rem" }}
                              >
                                ✓
                              </span>
                              High appreciation potential
                            </li>
                            <li
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <span
                                style={{ color: "#ff9900", fontSize: "1.2rem" }}
                              >
                                ✓
                              </span>
                              Investment friendly location
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div
                        style={{
                          background: "#f8f9fa",
                          padding: "2rem",
                          borderRadius: "12px",
                          border: "1px solid #e9ecef",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "1.25rem",
                            fontWeight: "600",
                            color: "#333",
                            marginBottom: "1.5rem",
                          }}
                        >
                          Land Information
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                          }}
                        >
                          <div>
                            <strong style={{ color: "#333" }}>Location:</strong>
                            <p style={{ margin: "0.25rem 0", color: "#666" }}>
                              {selectedProject.location}
                            </p>
                          </div>
                          <div>
                            <strong style={{ color: "#333" }}>
                              Land Type:
                            </strong>
                            <p style={{ margin: "0.25rem 0", color: "#666" }}>
                              Residential Development
                            </p>
                          </div>
                          <div>
                            <strong style={{ color: "#333" }}>
                              Available Sizes:
                            </strong>
                            <p style={{ margin: "0.25rem 0", color: "#666" }}>
                              Multiple Plot Sizes
                            </p>
                          </div>
                          <div>
                            <strong style={{ color: "#333" }}>
                              Development Status:
                            </strong>
                            <p style={{ margin: "0.25rem 0", color: "#666" }}>
                              Ready for Construction
                            </p>
                          </div>
                          <div>
                            <strong style={{ color: "#333" }}>
                              Starting Price:
                            </strong>
                            <p
                              style={{
                                margin: "0.25rem 0",
                                color: "#ff9900",
                                fontSize: "1.1rem",
                                fontWeight: "600",
                              }}
                            >
                              Contact for Pricing
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </>
        )}
      </main>
      <ContactForm />
      <Footer />
    </>
  );
}
