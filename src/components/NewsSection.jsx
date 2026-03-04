import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // ඔයාගේ firebase path එක නිවැරදිදැයි බලන්න
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/NewsSection.css";

const NewsSection = () => {
  const [latestNews, setLatestNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Firestore එකෙන් අලුත්ම news එක විතරක් ගේනවා
    const q = query(
      collection(db, "news"), 
      orderBy("createdAt", "desc"), 
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setLatestNews({ id: doc.id, ...doc.data() });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Button එක Click කළාම News Page එකට යනවා (ID එකත් එක්ක)
  const handleMoreInfo = () => {
    if (latestNews) {
      navigate(`/news?newsId=${latestNews.id}`);
    }
  };

  if (loading) return null; // Load වෙන වෙලාවට හිස්ව තබයි

  // දත්ත නැතිනම් පෙන්වන Default දත්ත
  const displayData = latestNews || {
    image: "#",
    title: "Latest News",
    newsTitle: "No news published yet.",
    excerpt: "Check back later for our latest updates and stories.",
  };

  return (
    <section className="news-section">
      <div className="news-container">
        {/* Left Side - Image */}
        <div className="news-image-side">
          <div className="news-image-container">
            <img 
              src={displayData.image} 
              alt="News announcement" 
              className="news-image" 
            />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="news-content-side">
          <div className="news-content">
            <h2 className="news-section-title">Latest News</h2>

            <div className="news-card">
              <h3 className="news-title">{displayData.title || displayData.newsTitle}</h3>
              <p className="news-description">
                {displayData.excerpt || displayData.description}
              </p>
              <button className="news-button" onClick={handleMoreInfo}>
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;