import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, query, limit, onSnapshot } from "firebase/firestore";
import "@/styles/LandsSection.css";

const LandsSection = () => {
  const navigate = useNavigate();
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const titleRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "landProjects"), limit(5));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const landsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLands(landsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleProjectClick = (project) => {
    const slug =
      project.name
        ?.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-") || "project";
    navigate(`/project-details/${slug}`, {
      state: {
        projectId: project.id,
        projectDetails: project,
        source: "home-lands",
        dataSource: "lands-firebase",
      },
    });
  };

  if (loading) return null;

  return (
    <section className="lands-section">
      <h2
        ref={titleRef}
        className="lands-section__main-title lands-section__main-title--visible"
      >
        Browse Our Latest Land Projects
      </h2>

      <div className="lands-section__container">
        {/* Left Panel - 1000+ LANDS SOLD OUT */}
        <div className="lands-section__stats lands-section__stats--visible">
          {/* <div className="lands-section__stats-content">
            <div className="lands-section__main-stat">
              <span className="lands-section__number">1000+</span>
              <span className="lands-section__stat-label">LANDS</span>
            </div>
            <div className="lands-section__sold-out">
              <span className="lands-section__sold-text">SOLD OUT</span>
            </div>
          </div> */}
          <div className="lands-section__stats-content">
            <div className="lands-section__main-stat"></div>
            <div className="lands-section__brand">
              <span className="lands-section__brand-text">
                1000+ Lands <br /> Sold Out
              </span>
            </div>
          </div>
        </div>

        {/* Right Panel - Projects List */}
        <div className="lands-section__combined">
          <div className="lands-section__projects-list">
            <div className="lands-section__projects-scroll-inner">
              {/* Main Project Rows */}
              {lands.map((item, index) => (
                <div
                  key={item.id}
                  className="lands-section__project-row"
                  onClick={() => handleProjectClick(item)}
                >
                  {/* Image Card */}
                  <div className="lands-section__project-card">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="lands-section__project-image"
                      loading="lazy"
                    />
                  </div>

                  {/* Info Card */}
                  <div className="lands-section__info-card">
                    <h3 className="lands-section__info-title">{item.name}</h3>
                    <p className="lands-section__info-description">
                      {item.description?.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              ))}

              {/* Duplicate for Infinite Scroll (only if more than 2 items) */}
              {lands.length > 2 &&
                lands.map((item) => (
                  <div
                    key={`dup-${item.id}`}
                    className="lands-section__project-row"
                    onClick={() => handleProjectClick(item)}
                  >
                    <div className="lands-section__project-card">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="lands-section__project-image"
                      />
                      {/* <div className="lands-section__project-label">
                        {item.location || "New Project"}
                      </div> */}
                    </div>

                    <div className="lands-section__info-card">
                      <h3 className="lands-section__info-title">{item.name}</h3>
                      <p className="lands-section__info-description">
                        {item.description?.substring(0, 100)}...
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
