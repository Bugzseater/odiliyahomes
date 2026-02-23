import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; // ඔයාගේ firebase path එක බලන්න
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import "../styles/Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firestore එකෙන් images load කර ගැනීම
  useEffect(() => {
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const imageUrls = snapshot.docs.map(doc => doc.data().url);
      setImages(imageUrls);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // දත්ත ලැබෙන තුරු පෙන්වන placeholder images (දත්ත නැතිනම් පමණක්)
  const placeholderImages = [
    "https://img.freepik.com/free-photo/plowed-field-after-harvesting-grain-crops-arable-land-resting-bright-sunny-afternoon-valley-mountains-concept-farm-work-growing-natural-products_166373-8670.jpg?w=740"
  ];

  const displayImages = images.length > 0 ? images : placeholderImages;

  // Images ප්‍රමාණය අනුව පේළි දෙකට බෙදා ගැනීම
  const half = Math.ceil(displayImages.length / 2);
  const topRowImages = displayImages.slice(0, half);
  const bottomRowImages = displayImages.slice(half);

  // Seamless loop එක සඳහා images double කිරීම
  const topRowLoop = [...topRowImages, ...topRowImages];
  const bottomRowLoop = [...bottomRowImages, ...bottomRowImages];

  if (loading && images.length === 0) {
    return <div className="gallery-section text-center py-20 text-gray-400">Loading Gallery...</div>;
  }

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
                      loading="lazy"
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
                      loading="lazy"
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