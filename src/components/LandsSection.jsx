// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "@/styles/LandsSection.css";
// import HikkaduwImage from "@/assets/images/hikkaduw.jpg";
// import Horana from "@/assets/images/horana.jpg";
// import Kasbewa from "@/assets/images/Kasbewa.jpg";
// import Kurunagala from "@/assets/images/kurunagala.jpg";
// import Meegoda from "@/assets/images/meegoda.jpg";

// /**
//  * Enterprise-level Lands Section Component
//  * Displays land projects with statistics, image gallery, and information cards
//  * Uses green theme with rotated text and modern layout
//  *
//  * @component LandsSection
//  * @author Senior Developer
//  * @version 1.0.0
//  */

// /**
//  * Combined data for projects with corresponding information cards
//  *
//  * NOTE: When clicking a land project, it will navigate to /lands page with project ID
//  * To add full project details:
//  * 1. Go to src/pages/Lands.jsx
//  * 2. Find the `landDetailsData` object
//  * 3. Add a new entry with the same ID as below
//  * 4. Include: name, description, images, location, mapEmbedUrl, etc.
//  *
//  * Example: If you add id: 5 here, create landDetailsData[5] in Lands.jsx
//  */
// const projectsWithInfo = [
//   {
//     id: 1,
//     name: "Lush",
//     image: HikkaduwImage,
//     location: "Kahathuduwa",
//     size: "2.5 acres",
//     infoTitle: "Kahathuduwa Land Project",
//     infoContent:
//       "Premium land for sale in peaceful surroundings with excellent highway access. Clear deeds, full utilities, and minimal down payment required.",
//   },
//   {
//     id: 3,
//     name: "Crystal",
//     image: Horana,
//     location: "Meegoda",
//     size: "1.8 acres",
//     infoTitle: "Meegoda Land Project",
//     infoContent:
//       "Land for sale in Meegoda at Crystal by Odiliya Homes. premium location with excellent highway connectivity and flexible payment plans.",
//   },
//   {
//     id: 6,
//     name: "Serenity 02",
//     image: Kasbewa,
//     location: "Horana",
//     size: "3.2 acres",
//     infoTitle: "Horana Land Project",
//     infoContent:
//       "Premium Horana Lands with Serene Views, Full Utilities, and Excellent Connectivity",
//   },
//   {
//     id: 2,
//     name: "Gloria",
//     image: Kurunagala,
//     location: "Gloria",
//     size: "4.1 acres",
//     infoTitle: "Kurunegala Land Project",
//     infoContent:
//       "Serene Lands with Modern Infrastructure and Strong Long-Term Value",
//   },
//   // {
//   //   id: 5,
//   //   name: "Valley Springs",
//   //   image: Meegoda,
//   //   location: "Nuwara Eliya",
//   //   size: "2.9 acres",
//   //   infoTitle: "Easy To Understand",
//   //   infoContent:
//   //     "At Aliquet Viverra Placerat Enim Semper Nulla Ut Auctor Habitasse. Urna Pretium .",
//   // },
// ];

// const LandsSection = () => {
//   const navigate = useNavigate();
//   const [isTitleVisible, setIsTitleVisible] = useState(false);
//   const [isStatsVisible, setIsStatsVisible] = useState(false);
//   const titleRef = useRef(null);
//   const statsRef = useRef(null);

//   useEffect(() => {
//     const observerOptions = {
//       threshold: 0.1,
//       rootMargin: "0px 0px -50px 0px", // Trigger a bit before it's fully gone
//     };

//     const observerCallback = (entries) => {
//       entries.forEach((entry) => {
//         if (entry.target === titleRef.current) {
//           setIsTitleVisible(entry.isIntersecting);
//         } else if (entry.target === statsRef.current) {
//           setIsStatsVisible(entry.isIntersecting);
//         }
//       });
//     };

//     const observer = new IntersectionObserver(
//       observerCallback,
//       observerOptions
//     );

//     const currentTitleRef = titleRef.current;
//     const currentStatsRef = statsRef.current;

//     if (currentTitleRef) {
//       observer.observe(currentTitleRef);
//     }
//     if (currentStatsRef) {
//       observer.observe(currentStatsRef);
//     }

//     return () => {
//       if (currentTitleRef) {
//         observer.unobserve(currentTitleRef);
//       }
//       if (currentStatsRef) {
//         observer.unobserve(currentStatsRef);
//       }
//     };
//   }, []);

//   // Handle land project click - navigate directly to land details page
//   const handleProjectClick = (projectId) => {
//     // Navigate directly to project details page with the land project ID
//     navigate(`/project-details/${projectId}`, {
//       state: {
//         source: "home-lands", // Track that user came from home page lands section
//         dataSource: "lands", // Tell ProjectDetails to read from landsData.js
//       },
//     });
//   };

//   return (
//     <section className="lands-section" aria-labelledby="lands-section-title">
//       {/* Main Title - Above everything */}
//       <h2
//         id="lands-section-title"
//         ref={titleRef}
//         className={`lands-section__main-title ${
//           isTitleVisible ? "lands-section__main-title--visible" : ""
//         }`}
//       >
//         Browse Our Latest Land Projects
//       </h2>

//       <div className="lands-section__container">
//         {/* Left Panel - Statistics */}
//         <div
//           ref={statsRef}
//           className={`lands-section__stats ${
//             isStatsVisible ? "lands-section__stats--visible" : ""
//           }`}
//         >
//           <div className="lands-section__stats-content">
//             <div className="lands-section__main-stat">
//               {/* <span className="lands-section__number">25+</span> */}
//               {/* <span className="lands-section__stat-label">Lands</span> */}
//             </div>

//             {/* <div className="lands-section__sold-out">
//               <span className="lands-section__sold-text">Sold Outs</span>
//             </div> */}

//             <div className="lands-section__brand">
//               <span className="lands-section__brand-text">
//                 1000+ Lands <br /> Sold Out
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Combined Panel - Projects with Information */}
//         <div className="lands-section__combined">
//           <div className="lands-section__projects-list">
//             <div className="lands-section__projects-scroll-inner">
//               {projectsWithInfo.map((item, index) => (
//                 <div
//                   key={item.id}
//                   className="lands-section__project-row"
//                   style={{
//                     "--animation-delay": `${index * 0.1}s`,
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleProjectClick(item.id)}
//                   role="button"
//                   tabIndex={0}
//                   onKeyPress={(e) => {
//                     if (e.key === "Enter" || e.key === " ") {
//                       handleProjectClick(item.id);
//                     }
//                   }}
//                 >
//                   {/* Project Image */}
//                   <div className="lands-section__project-card">
//                     <div className="lands-section__project-image">
//                       <img src={item.image} alt={item.name} loading="lazy" />
//                     </div>
//                     <div className="lands-section__project-overlay">
//                       <h3 className="lands-section__project-name">
//                         {item.name}
//                       </h3>
//                       <p className="lands-section__project-location">
//                         {item.location}
//                       </p>
//                       <span className="lands-section__project-size">
//                         {item.size}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Information Card */}
//                   <div className="lands-section__info-card">
//                     <h3 className="lands-section__info-title">
//                       {item.infoTitle}
//                     </h3>
//                     <p className="lands-section__info-description">
//                       {item.infoContent}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//               {/* Duplicate for infinite scroll */}
//               {projectsWithInfo.map((item, index) => (
//                 <div
//                   key={`duplicate-${item.id}`}
//                   className="lands-section__project-row"
//                   style={{
//                     "--animation-delay": `${index * 0.1}s`,
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleProjectClick(item.id)}
//                   role="button"
//                   tabIndex={0}
//                   onKeyPress={(e) => {
//                     if (e.key === "Enter" || e.key === " ") {
//                       handleProjectClick(item.id);
//                     }
//                   }}
//                 >
//                   {/* Project Image */}
//                   <div className="lands-section__project-card">
//                     <div className="lands-section__project-image">
//                       <img src={item.image} alt={item.name} loading="lazy" />
//                     </div>
//                     <div className="lands-section__project-overlay">
//                       <h3 className="lands-section__project-name">
//                         {item.name}
//                       </h3>
//                       <p className="lands-section__project-location">
//                         {item.location}
//                       </p>
//                       <span className="lands-section__project-size">
//                         {item.size}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Information Card */}
//                   <div className="lands-section__info-card">
//                     <h3 className="lands-section__info-title">
//                       {item.infoTitle}
//                     </h3>
//                     <p className="lands-section__info-description">
//                       {item.infoContent}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LandsSection;
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/LandsSection.css";
import HikkaduwImage from "@/assets/images/hikkaduw.jpg";
import Horana from "@/assets/images/horana.jpg";
import Kasbewa from "@/assets/images/Kasbewa.jpg";
import Kurunagala from "@/assets/images/kurunagala.jpg";
import Meegoda from "@/assets/images/meegoda.jpg";

/**
 * Utility function to create URL-friendly slugs from project names
 * Example: "Lush Garden" -> "lush-garden"
 */
const createSlug = (name) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
};

const projectsWithInfo = [
  {
    id: 1,
    name: "Lush",
    slug: "kahathuduwa-lush", // Add slug field
    image: HikkaduwImage,
    location: "Kahathuduwa",
    size: "2.5 acres",
    infoTitle: "Kahathuduwa Land Project",
    infoContent:
      "Premium land for sale in peaceful surroundings with excellent highway access. Clear deeds, full utilities, and minimal down payment required.",
  },
  {
    id: 3,
    name: "Crystal",
    slug: "meegoda-crystal",
    image: Horana,
    location: "Meegoda",
    size: "1.8 acres",
    infoTitle: "Meegoda Land Project",
    infoContent:
      "Land for sale in Meegoda at Crystal by Odiliya Homes. premium location with excellent highway connectivity and flexible payment plans.",
  },
  {
    id: 6,
    name: "Serenity 02",
    slug: "horana-serenity-2",
    image: Kasbewa,
    location: "Horana",
    size: "3.2 acres",
    infoTitle: "Horana Land Project",
    infoContent:
      "Premium Horana Lands with Serene Views, Full Utilities, and Excellent Connectivity",
  },
  {
    id: 2,
    name: "Gloria",
    slug: "kurunagala-gloria",
    image: Kurunagala,
    location: "Gloria",
    size: "4.1 acres",
    infoTitle: "Kurunegala Land Project",
    infoContent:
      "Serene Lands with Modern Infrastructure and Strong Long-Term Value",
  },
];

const LandsSection = () => {
  const navigate = useNavigate();
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const titleRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.target === titleRef.current) {
          setIsTitleVisible(entry.isIntersecting);
        } else if (entry.target === statsRef.current) {
          setIsStatsVisible(entry.isIntersecting);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    const currentTitleRef = titleRef.current;
    const currentStatsRef = statsRef.current;

    if (currentTitleRef) {
      observer.observe(currentTitleRef);
    }
    if (currentStatsRef) {
      observer.observe(currentStatsRef);
    }

    return () => {
      if (currentTitleRef) {
        observer.unobserve(currentTitleRef);
      }
      if (currentStatsRef) {
        observer.unobserve(currentStatsRef);
      }
    };
  }, []);

  // Updated: Handle land project click with slug instead of ID
  const handleProjectClick = (project) => {
    // Navigate using slug in URL, but pass ID in state for data lookup
    navigate(`/project-details/${project.slug}`, {
      state: {
        projectId: project.id, // Pass ID for data lookup
        source: "home-lands",
        dataSource: "lands",
      },
    });
  };

  return (
    <section className="lands-section" aria-labelledby="lands-section-title">
      <h2
        id="lands-section-title"
        ref={titleRef}
        className={`lands-section__main-title ${
          isTitleVisible ? "lands-section__main-title--visible" : ""
        }`}
      >
        Browse Our Latest Land Projects
      </h2>

      <div className="lands-section__container">
        <div
          ref={statsRef}
          className={`lands-section__stats ${
            isStatsVisible ? "lands-section__stats--visible" : ""
          }`}
        >
          <div className="lands-section__stats-content">
            <div className="lands-section__main-stat"></div>
            <div className="lands-section__brand">
              <span className="lands-section__brand-text">
                1000+ Lands <br /> Sold Out
              </span>
            </div>
          </div>
        </div>

        <div className="lands-section__combined">
          <div className="lands-section__projects-list">
            <div className="lands-section__projects-scroll-inner">
              {projectsWithInfo.map((item, index) => (
                <div
                  key={item.id}
                  className="lands-section__project-row"
                  style={{
                    "--animation-delay": `${index * 0.1}s`,
                    cursor: "pointer",
                  }}
                  onClick={() => handleProjectClick(item)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleProjectClick(item);
                    }
                  }}
                >
                  <div className="lands-section__project-card">
                    <div className="lands-section__project-image">
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>
                    <div className="lands-section__project-overlay">
                      <h3 className="lands-section__project-name">
                        {item.name}
                      </h3>
                      <p className="lands-section__project-location">
                        {item.location}
                      </p>
                      <span className="lands-section__project-size">
                        {item.size}
                      </span>
                    </div>
                  </div>

                  <div className="lands-section__info-card">
                    <h3 className="lands-section__info-title">
                      {item.infoTitle}
                    </h3>
                    <p className="lands-section__info-description">
                      {item.infoContent}
                    </p>
                  </div>
                </div>
              ))}
              {/* Duplicate for infinite scroll */}
              {projectsWithInfo.map((item, index) => (
                <div
                  key={`duplicate-${item.id}`}
                  className="lands-section__project-row"
                  style={{
                    "--animation-delay": `${index * 0.1}s`,
                    cursor: "pointer",
                  }}
                  onClick={() => handleProjectClick(item)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleProjectClick(item);
                    }
                  }}
                >
                  <div className="lands-section__project-card">
                    <div className="lands-section__project-image">
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>
                    <div className="lands-section__project-overlay">
                      <h3 className="lands-section__project-name">
                        {item.name}
                      </h3>
                      <p className="lands-section__project-location">
                        {item.location}
                      </p>
                      <span className="lands-section__project-size">
                        {item.size}
                      </span>
                    </div>
                  </div>

                  <div className="lands-section__info-card">
                    <h3 className="lands-section__info-title">
                      {item.infoTitle}
                    </h3>
                    <p className="lands-section__info-description">
                      {item.infoContent}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandsSection;
