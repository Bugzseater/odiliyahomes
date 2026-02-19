import React from "react";
import PropTypes from "prop-types";
import "@/styles/CategoryButtons.css";
import villaIcon from "@/assets/icons/villa.png";
import apartmentIcon from "@/assets/icons/apartments.png";
import homes from "@/assets/icons/homes.png";
import lands from "@/assets/icons/lands.png";

/**
 * CategoryButtons - Enterprise-level category selection component
 * Integrates with HeroSection for dynamic background changes
 */
export default function CategoryButtons({
  activeCategory = "Residence",
  onCategoryChange,
  categories,
  className = "",
  variant = "default",
}) {
  // Icon components for each category
  const categoryIcons = {
    "ROI Projects": (
      <img
        src={villaIcon}
        alt="Villa"
        className="category-icon category-icon-img"
      />
    ),
    Apartments: (
      <img
        src={apartmentIcon}
        alt="Apartment"
        className="category-icon category-icon-img"
      />
    ),
    Land: (
      <img src={lands} alt="Land" className="category-icon category-icon-img" />
    ),
    Residencies: (
      <img
        src={homes}
        alt="Homes"
        className="category-icon category-icon-img"
      />
    ),
    // Residence: (
    //   <svg
    //     className="category-icon"
    //     width="20"
    //     height="20"
    //     viewBox="0 0 24 24"
    //     fill="none"
    //     stroke="currentColor"
    //     strokeWidth="2"
    //   >
    //     <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    //     <polyline points="9 22 9 12 15 12 15 22" />
    //   </svg>
    // ),
  };

  // Default categories if none provided
  const defaultCategories = [
    { id: "residence", label: "Residence" },
    { id: "land", label: "Land" },
    { id: "homes", label: "Residences" },
    { id: "villas", label: "ROI Projects" },
  ];

  const categoryList = categories || defaultCategories;

  // Handle category click with enterprise-level event handling
  const handleCategoryClick = (category) => {
    // Prevent unnecessary re-renders
    if (category.label === activeCategory) return;

    // Call parent handler if provided
    if (onCategoryChange) {
      onCategoryChange(category.label, category);
    }

    // Analytics tracking (enterprise feature)
    if (window.gtag) {
      window.gtag("event", "category_change", {
        event_category: "Hero Section",
        event_label: category.label,
        value: 1,
      });
    }

    // Custom event for other components to listen
    window.dispatchEvent(
      new CustomEvent("heroCategroyChange", {
        detail: { category: category.label, data: category },
      })
    );
  };

  return (
    <div
      className={`category-buttons${
        className ? ` ${className}` : ""
      } category-buttons--${variant}`}
      role="tablist"
      aria-label="Property category selection"
    >
      {categoryList.map((category) => (
        <button
          key={category.id}
          className={`category-button ${
            activeCategory === category.label ? "category-button--active" : ""
          }`}
          onClick={() => handleCategoryClick(category)}
          role="tab"
          aria-selected={activeCategory === category.label}
          aria-controls={`hero-content-${category.id}`}
          title={`View ${category.label} properties`}
        >
          {categoryIcons[category.label] && (
            <span className="category-button__icon">
              {categoryIcons[category.label]}
            </span>
          )}
          <span className="category-button__text">{category.label}</span>
          {activeCategory === category.label && (
            <span className="category-button__indicator" aria-hidden="true" />
          )}
        </button>
      ))}
    </div>
  );
}

CategoryButtons.propTypes = {
  /** Currently active category */
  activeCategory: PropTypes.string,

  /** Callback function when category changes */
  onCategoryChange: PropTypes.func,

  /** Array of category objects */
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),

  /** Additional CSS classes */
  className: PropTypes.string,

  /** Visual variant of the component */
  variant: PropTypes.oneOf(["default", "minimal", "outlined"]),
};
