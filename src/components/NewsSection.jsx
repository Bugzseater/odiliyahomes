import React from "react";
import "../styles/NewsSection.css";

/**
 * NewsSection Component
 *
 * To customize which news shows on home page:
 * 1. Go to src/pages/Home.jsx
 * 2. Update handleNewsButtonClick() with the news ID you want
 * 3. Example: navigate("/news?newsId=2") for news with id: 2
 * 4. The news data is in src/pages/News.jsx (sampleNewsData array)
 */
const NewsSection = ({
  image = "https://res.cloudinary.com/dswr94sjy/image/upload/v1760434760/Altezza-Apartments-Wattala-Completed-03_xkbory.jpg",
  title = "Latest News",
  newsTitle = "Phasellus Elit Facilisis Volutpat Etiam.",
  description = "At Aliquet Viverra Placerat Enim Semper Nulla Ut Auctor Habitasse. Urna Pretium Cursus Commodo Cursus Phasellus Elit Facilisis Volutpat Etiam.",
  buttonText = "More Info",
  onButtonClick,
}) => {
  return (
    <section className="news-section">
      <div className="news-container">
        {/* Left Side - Image */}
        <div className="news-image-side">
          <div className="news-image-container">
            <img src={image} alt="News announcement" className="news-image" />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="news-content-side">
          <div className="news-content">
            <h2 className="news-section-title">{title}</h2>

            <div className="news-card">
              <h3 className="news-title">{newsTitle}</h3>
              <p className="news-description">{description}</p>
              <button className="news-button" onClick={onButtonClick}>
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
