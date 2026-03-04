import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "@/styles/HeroSection.css";
import CategoryButtons from "@/components/CategoryButtons";

// import residenceImg from "@/assets/images/panadura01.png";
0; // import landImg from "@/assets/images/hikkaduw.jpg";
// import homesImg from "@/assets/images/homes.jpg";
// import villasImg from "@/assets/images/mirissa.png";

/**
 * HeroSection - Enterprise-level dynamic hero section with category-based backgrounds
 * Features smooth transitions, accessibility support, and responsive design
 */
export default function HeroSection({
  children,
  onCategoryChange,
  initialCategory = "ROI Projects",
  customCategories,
  showContent = true,
  className = "",
  autoSlideInterval = 2000, // 2 seconds default
  enableAutoSlide = true,
}) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(0);

  // Default category configuration with enterprise-level data structure
  const defaultCategories = {
    Apartments: {
      id: "apartments",
      label: "Apartments",
      backgroundImage:
        "#",
      backgroundVideo:
        "https://pub-9bd45192d22f4f0e895c52adcfb2460a.r2.dev/apartmentcompress_ri23bo.mp4",
      // backgroundImage: { apartmentImg },
      title: "EXCLUSIVE APARTMENTS",
      description:
        "Indulge in luxury apartments living with private amenities, scenic views, and sophisticated design elements.",
      ctaText: "Discover Apartments",
      ctaLink: "/residence",
    },
    Residencies: {
      id: "houses",
      label: "Residencies",
      backgroundImage:
        "#",
      backgroundVideo:
        "https://pub-9bd45192d22f4f0e895c52adcfb2460a.r2.dev/envato_video_gen_Nov_11_2025_4_50_21_duessc.mp4",
      // backgroundImage: { houseImg },
      title: "DREAM RESIDENCIES",
      description:
        "Find your perfect residence with our curated collection of beautiful properties designed for modern family living.",
      ctaText: "Find Your Residencies",
      ctaLink: "/residence",
    },
    Land: {
      id: "land",
      label: "Land",
      backgroundImage:
        "#",
      backgroundVideo:
        "https://pub-9bd45192d22f4f0e895c52adcfb2460a.r2.dev/envato_video_gen_Nov_17_2025_11_37_19.mp4",
      title: "PREMIUM LAND PLOTS",
      description:
        "Invest in premium land parcels with excellent growth potential and strategic locations. Build your future on solid foundations.",
      ctaText: "View Land Options",
      ctaLink: "/lands",
    },
    "ROI Projects": {
      id: "villas",
      label: "ROI Projects",
      backgroundImage:
        "#",
      backgroundVideo:
        "https://pub-9bd45192d22f4f0e895c52adcfb2460a.r2.dev/envato_video_gen_Jan_08_2026_6_04_57_1_zgk0zs.mp4",
      title: "LUXURY ROI PROJECTS",
      description:
        "Discover premium residential developments with world-class amenities and stunning architectural design. Experience modern living at its finest.",
      ctaText: "Explore ROI Projects",
      ctaLink: "/residence",
    },
  };

  // Use custom categories if provided, otherwise use defaults
  const categories = customCategories || defaultCategories;
  const currentCategory = categories[activeCategory];
  const categoryKeys = Object.keys(categories);

  // Auto-slide functionality with smooth transitions
  useEffect(() => {
    if (!enableAutoSlide || isPaused || isTransitioning) return;

    const interval = setInterval(() => {
      setActiveCategory((prevCategory) => {
        const currentIndex = categoryKeys.indexOf(prevCategory);
        const nextIndex = (currentIndex + 1) % categoryKeys.length;
        const nextCategory = categoryKeys[nextIndex];

        // Trigger sliding animation
        setIsTransitioning(true);
        setNextImageIndex(nextIndex);

        setTimeout(() => {
          setCurrentImageIndex(nextIndex);
          setTimeout(() => {
            setIsTransitioning(false);
          }, 600);
        }, 50);

        // Notify parent component of category change
        if (onCategoryChange) {
          onCategoryChange(nextCategory, categories[nextCategory]);
        }

        return nextCategory;
      });
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [
    enableAutoSlide,
    isPaused,
    isTransitioning,
    autoSlideInterval,
    categoryKeys,
    categories,
    onCategoryChange,
  ]);

  // Initialize current image index
  useEffect(() => {
    const initialIndex = categoryKeys.indexOf(activeCategory);
    setCurrentImageIndex(initialIndex >= 0 ? initialIndex : 0);
  }, [activeCategory, categoryKeys]);

  // Handle category change with smooth sliding transition
  const handleCategoryChange = (categoryLabel) => {
    if (categoryLabel === activeCategory || isTransitioning) return;

    // Pause auto-slide when user manually changes category
    setIsPaused(true);

    // Resume auto-slide after 10 seconds of inactivity
    setTimeout(() => {
      setIsPaused(false);
    }, 10000);

    setIsTransitioning(true);

    // Get the new image index
    const newIndex = categoryKeys.indexOf(categoryLabel);
    setNextImageIndex(newIndex);

    // Start the sliding animation
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setActiveCategory(categoryLabel);

      // End transition after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 600); // Match CSS animation duration

      // Notify parent component of category change
      if (onCategoryChange) {
        onCategoryChange(categoryLabel, categories[categoryLabel]);
      }
    }, 50);
  };

  // Handle CTA button click with category-specific navigation
  const handleCtaClick = () => {
    if (currentCategory?.ctaLink) {
      // Special handling for residence page with category selection
      if (currentCategory.ctaLink === "/residence") {
        // Map categories to residence page category indices
        const categoryMapping = {
          "ROI Projects": 2,
          Apartments: 0,
          Residencies: 1,
        };

        const categoryIndex = categoryMapping[currentCategory.label];

        if (categoryIndex !== undefined) {
          // Navigate to residence page with category parameter
          navigate(`/residence?category=${categoryIndex}`);
        } else {
          navigate(currentCategory.ctaLink);
        }
      } else {
        // Navigate to other pages normally
        navigate(currentCategory.ctaLink);
      }
    }
  };

  return (
    <section
      className={`hero-section${className ? ` ${className}` : ""}${
        isTransitioning ? " transitioning" : ""
      }`}
      role="banner"
      aria-label="Hero section with dynamic backgrounds"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images Container with Sliding Animation */}
      <div className="hero-backgrounds">
        {categoryKeys.map((categoryKey, index) => {
          const category = categories[categoryKey];
          const hasVideo = category?.backgroundVideo;

          return (
            <div
              key={categoryKey}
              className={`hero-background ${
                index === currentImageIndex ? "hero-background--active" : ""
              } ${
                index === nextImageIndex && isTransitioning
                  ? "hero-background--next"
                  : ""
              }`}
              style={{
                backgroundImage: hasVideo
                  ? "none"
                  : `url(${category?.backgroundImage})`,
                transform: `translateX(${
                  index === currentImageIndex
                    ? "0%"
                    : index === nextImageIndex && isTransitioning
                      ? "0%"
                      : index < currentImageIndex
                        ? "-100%"
                        : "100%"
                })`,
                transition: isTransitioning
                  ? "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                  : "none",
              }}
            >
              {hasVideo && (
                <video
                  className="hero-background__video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster={category.backgroundImage}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                >
                  <source src={category.backgroundVideo} type="video/mp4" />
                  {/* Fallback to background image if video fails */}
                </video>
              )}
            </div>
          );
        })}
      </div>
      <div className="hero-overlay">
        {showContent && currentCategory && (
          <div className="hero-content">
            <h1 className="hero-title" key={`title-${activeCategory}`}>
              {currentCategory.title}
            </h1>
            <p className="hero-description" key={`desc-${activeCategory}`}>
              {currentCategory.description}
            </p>
            <button
              className="hero-cta"
              onClick={handleCtaClick}
              aria-label={`${currentCategory.ctaText} - Navigate to ${currentCategory.label} section`}
            >
              {currentCategory.ctaText}
            </button>
          </div>
        )}

        {/* Enhanced children with category change handler */}
        {React.Children.map(children, (child) => {
          const isCategoryButtonsComponent =
            React.isValidElement(child) &&
            (child.type === CategoryButtons ||
              child.type?.displayName === "CategoryButtons" ||
              child.props?.role === "tablist");

          if (isCategoryButtonsComponent) {
            return React.cloneElement(child, {
              activeCategory,
              onCategoryChange: handleCategoryChange,
              categories: Object.values(categories),
            });
          }
          return child;
        })}
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  /** Child components to render inside the hero section */
  children: PropTypes.node,

  /** Callback function when category changes */
  onCategoryChange: PropTypes.func,

  /** Initial category to display */
  initialCategory: PropTypes.string,

  /** Custom categories configuration */
  customCategories: PropTypes.object,

  /** Whether to show hero content (title, description, CTA) */
  showContent: PropTypes.bool,

  /** Additional CSS classes */
  className: PropTypes.string,

  /** Auto-slide interval in milliseconds */
  autoSlideInterval: PropTypes.number,

  /** Whether to enable automatic sliding */
  enableAutoSlide: PropTypes.bool,
};
