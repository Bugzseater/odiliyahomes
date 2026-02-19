import React from "react";
import "../styles/Gallery.css";

const Gallery = () => {
  // Flat array of all gallery images
  const allImages = [
    "https://img.freepik.com/free-photo/plowed-field-after-harvesting-grain-crops-arable-land-resting-bright-sunny-afternoon-valley-mountains-concept-farm-work-growing-natural-products_166373-8670.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/free-photo/plowed-field-after-harvesting-grain-crops-arable-land-resting-bright-sunny-afternoon-valley-mountains-concept-farm-work-growing-natural-products_166373-8670.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/free-photo/plowed-field-after-harvesting-grain-crops-arable-land-resting-bright-sunny-afternoon-valley-mountains-concept-farm-work-growing-natural-products_166373-8670.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/free-photo/plowed-field-after-harvesting-grain-crops-arable-land-resting-bright-sunny-afternoon-valley-mountains-concept-farm-work-growing-natural-products_166373-8670.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/free-photo/plowed-field-after-harvesting-grain-crops-arable-land-resting-bright-sunny-afternoon-valley-mountains-concept-farm-work-growing-natural-products_166373-8670.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/free-photo/plowed-field-after-harvesting-grain-crops-arable-land-resting-bright-sunny-afternoon-valley-mountains-concept-farm-work-growing-natural-products_166373-8670.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/free-photo/plowed-field-after-harvesting-grain-crops-arable-land-resting-bright-sunny-afternoon-valley-mountains-concept-farm-work-growing-natural-products_166373-8670.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/free-photo/plowed-field-after-harvesting-grain-crops-arable-land-resting-bright-sunny-afternoon-valley-mountains-concept-farm-work-growing-natural-products_166373-8670.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/free-photo/plowed-field-after-harvesting-grain-crops-arable-land-resting-bright-sunny-afternoon-valley-mountains-concept-farm-work-growing-natural-products_166373-8670.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/free-photo/plowed-field-after-harvesting-grain-crops-arable-land-resting-bright-sunny-afternoon-valley-mountains-concept-farm-work-growing-natural-products_166373-8670.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/free-photo/plowed-field-after-harvesting-grain-crops-arable-land-resting-bright-sunny-afternoon-valley-mountains-concept-farm-work-growing-natural-products_166373-8670.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/free-photo/plowed-field-after-harvesting-grain-crops-arable-land-resting-bright-sunny-afternoon-valley-mountains-concept-farm-work-growing-natural-products_166373-8670.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/free-photo/plowed-field-after-harvesting-grain-crops-arable-land-resting-bright-sunny-afternoon-valley-mountains-concept-farm-work-growing-natural-products_166373-8670.jpg?semt=ais_hybrid&w=740&q=80",
    "https://img.freepik.com/free-photo/plowed-field-after-harvesting-grain-crops-arable-land-resting-bright-sunny-afternoon-valley-mountains-concept-farm-work-growing-natural-products_166373-8670.jpg?semt=ais_hybrid&w=740&q=80",
  ];

  // Split into two rows - top and bottom
  const topRowImages = allImages.slice(0, 10);
  const bottomRowImages = allImages.slice(10);

  // Duplicate for seamless loop
  const topRowLoop = [...topRowImages, ...topRowImages];
  const bottomRowLoop = [...bottomRowImages, ...bottomRowImages];

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2 className="gallery-title">Our Gallery</h2>
          <p className="gallery-subtitle">
            Discover stunning spaces and amenities
          </p>
        </div>

        {/* Top Row - Left to Right */}
        <div className="gallery-row">
          <div className="gallery-marquee gallery-marquee-ltr">
            <div className="gallery-track gallery-track-ltr">
              {topRowLoop.map((image, index) => (
                <div className="gallery-image-item" key={`top-${index}`}>
                  <div className="gallery-image-container">
                    <img
                      src={image}
                      alt={`Gallery top ${index + 1}`}
                      className="gallery-image"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row - Right to Left */}
        <div className="gallery-row">
          <div className="gallery-marquee gallery-marquee-rtl">
            <div className="gallery-track gallery-track-rtl">
              {bottomRowLoop.map((image, index) => (
                <div className="gallery-image-item" key={`bottom-${index}`}>
                  <div className="gallery-image-container">
                    <img
                      src={image}
                      alt={`Gallery bottom ${index + 1}`}
                      className="gallery-image"
                    />
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

export default Gallery;
