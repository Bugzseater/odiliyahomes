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
    // Collection name එක "landProjects" විය යුතුයි
    const q = query(collection(db, "landProjects"), limit(4));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const landsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLands(landsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleProjectClick = (project) => {
    const slug = project.name.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
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
      <h2 ref={titleRef} className="lands-section__main-title lands-section__main-title--visible">
        Browse Our Latest Land Projects
      </h2>

      <div className="lands-section__container">
        {/* 1000+ Lands Sold Out කොටස - දැන් Animation එකක් නැති නිසා අනිවාර්යයෙන් පේනවා */}
        <div className="lands-section__stats lands-section__stats--visible">
          <div className="lands-section__stats-content">
            <div className="lands-section__main-stat"></div>
            <div className="lands-section__brand" style={{ visibility: 'visible', opacity: 1 }}>
              <span className="lands-section__brand-text">
                1000+ Lands <br /> Sold Out
              </span>
            </div>
          </div>
        </div>

        <div className="lands-section__combined">
          <div className="lands-section__projects-list">
            <div className="lands-section__projects-scroll-inner">
              
              {/* දත්ත පෙන්වන ප්‍රධාන Loop එක */}
              {lands.map((item, index) => (
                <div
                  key={item.id}
                  className="lands-section__project-row"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleProjectClick(item)}
                >
                  <div className="lands-section__project-card">
                    <div className="lands-section__project-image">
                      <img src={item.image} alt={item.name} loading="lazy" />
                    </div>
                    <div className="lands-section__project-overlay">
                      <h3 className="lands-section__project-name">{item.name}</h3>
                      <p className="lands-section__project-location">{item.location}</p>
                      <span className="lands-section__project-size">{item.availability}</span>
                    </div>
                  </div>

                  <div className="lands-section__info-card">
                    <h3 className="lands-section__info-title">{item.name}</h3>
                    <p className="lands-section__info-description">
                      {item.description?.substring(0, 120)}...
                    </p>
                  </div>
                </div>
              ))}

              {/* මෙහි තිබූ Duplicate loop එක අයින් කළා. 
                  දත්ත 3කට වඩා තිබුණොත් විතරක් Infinite scroll එක දාන එක තමයි හොඳ. 
              */}
              {lands.length > 2 && lands.map((item) => (
                <div key={`dup-${item.id}`} className="lands-section__project-row" onClick={() => handleProjectClick(item)}>
                   <div className="lands-section__project-card">
                    <div className="lands-section__project-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="lands-section__project-overlay">
                      <h3 className="lands-section__project-name">{item.name}</h3>
                      <p className="lands-section__project-location">{item.location}</p>
                    </div>
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