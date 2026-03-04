import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; 
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import "../styles/Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadErrors, setLoadErrors] = useState({});
  const [usePlaceholder, setUsePlaceholder] = useState(false);

  useEffect(() => {
    console.log("🖼️ Gallery: Fetching images from Firestore...");
    
    const q = query(collection(db, "gallery"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const imageData = snapshot.docs.map(doc => ({
        id: doc.id,
        url: doc.data().url,
        name: doc.data().name,
        storagePath: doc.data().storagePath
      }));
      
      console.log(`📸 Gallery: Found ${imageData.length} images`);
      
      if (imageData.length > 0) {
        console.log("📸 First image URL:", imageData[0].url);
        console.log("📸 Storage path:", imageData[0].storagePath);
      }
      
      setImages(imageData);
      setLoading(false);
    }, (error) => {
      console.error("❌ Firestore error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Placeholder images (R2 images වැඩ නොකළොත් පෙන්වන්න)
  const placeholderImages = [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1073&q=80",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  ];

  // පින්තූර URLs array එක හදා ගැනීම
  const imageUrls = usePlaceholder 
    ? placeholderImages 
    : (images.length > 0 ? images.map(img => img.url) : []);

  console.log("🎯 Displaying images:", imageUrls.length > 0 ? imageUrls : "No images to display");

  const handleImageError = (e, imageUrl, index) => {
    console.log(`❌ Image ${index} failed to load:`, imageUrl);
    setLoadErrors(prev => ({ ...prev, [imageUrl]: true }));
    
    // Try to load from a different source or use placeholder
    if (!usePlaceholder) {
      // Check if this is from R2
      if (imageUrl.includes('r2.dev')) {
        console.log("⚠️ R2 image failed, trying alternative...");
        // You could try a fallback URL structure here
        e.target.src = placeholderImages[index % placeholderImages.length];
      } else {
        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
      }
    } else {
      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
    }
  };

  const handleImageLoad = (index, imageUrl) => {
    console.log(`✅ Image ${index} loaded successfully:`, imageUrl);
  };

  // Check if all images are from R2 and not working, then use placeholder
  useEffect(() => {
    if (images.length > 0 && !usePlaceholder) {
      const allR2Images = images.every(img => img.url.includes('r2.dev'));
      const errorCount = Object.keys(loadErrors).length;
      
      if (allR2Images && errorCount > 0 && errorCount === images.length) {
        console.log("⚠️ All R2 images failed to load, switching to placeholder");
        setUsePlaceholder(true);
      }
    }
  }, [loadErrors, images, usePlaceholder]);

  // Seamless loop එක සඳහා images ප්‍රමාණය බෙදා ගැනීම
  const displayUrls = imageUrls.length > 0 ? imageUrls : placeholderImages;
  const half = Math.ceil(displayUrls.length / 2);
  const topRowImages = displayUrls.slice(0, half);
  const bottomRowImages = displayUrls.slice(half);

  // එකම පින්තූරය දෙපාරක් පෙන්වීමෙන් loop එක සෑදීම
  const topRowLoop = [...topRowImages, ...topRowImages];
  const bottomRowLoop = [...bottomRowImages, ...bottomRowImages];

  if (loading) {
    return (
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="gallery-header">
            <h2 className="gallery-title">Our Gallery</h2>
            <p className="gallery-subtitle">Loading stunning images...</p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-4 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="gallery-section">
      <div className="gallery-container">
        <div className="gallery-header">
          <h2 className="gallery-title">Our Gallery</h2>
          <p className="gallery-subtitle">
            {usePlaceholder 
              ? "Discover our stunning properties"
              : images.length > 0 
                ? `Discover ${images.length} stunning images from our projects`
                : "Discover stunning spaces and amenities"}
          </p>
          {usePlaceholder && (
            <p className="text-xs text-amber-600 mt-2">
              ⚡ Images are being updated. Please check back soon!
            </p>
          )}
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
                      onError={(e) => handleImageError(e, image, `top-${index}`)}
                      onLoad={() => handleImageLoad(`top-${index}`, image)}
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
                      onError={(e) => handleImageError(e, image, `bottom-${index}`)}
                      onLoad={() => handleImageLoad(`bottom-${index}`, image)}
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