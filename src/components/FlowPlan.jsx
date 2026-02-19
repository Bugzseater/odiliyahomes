import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import "@/styles/FlowPlan.css";

const FlowPlan = ({
  title = "Floor Plans",
  plans = [],
  className = "",
  showNavigation = true,
  autoSlide = false,
  autoSlideInterval = 5000,
}) => {
  const [currentPlanIndex, setCurrentPlanIndex] = useState(0);

  const nextPlan = useCallback(() => {
    setCurrentPlanIndex((prev) => (prev === plans.length - 1 ? 0 : prev + 1));
  }, [plans.length]);

  const prevPlan = () => {
    setCurrentPlanIndex((prev) => (prev === 0 ? plans.length - 1 : prev - 1));
  };

  const goToPlan = (index) => {
    setCurrentPlanIndex(index);
  };

  // Auto slide functionality
  React.useEffect(() => {
    if (autoSlide && plans.length > 1) {
      const interval = setInterval(nextPlan, autoSlideInterval);
      return () => clearInterval(interval);
    }
  }, [autoSlide, autoSlideInterval, plans.length, nextPlan]);

  if (!plans || plans.length === 0) {
    return null; // Don't render if no plans
  }

  const currentPlan = plans[currentPlanIndex];

  return (
    <div className={`flow-plan-container ${className}`}>
      {/* Title */}
      {title && (
        <div className="flow-plan-header">
          <h3 className="flow-plan-title">{title}</h3>
        </div>
      )}

      {/* Main Floor Plan Display */}
      <div className="flow-plan-main">
        <div className="flow-plan-image-container">
          <img
            src={currentPlan.image}
            alt={currentPlan.name || `Floor Plan ${currentPlanIndex + 1}`}
            className="flow-plan-image"
            loading="lazy"
          />

          {/* Navigation Arrows */}
          {showNavigation && plans.length > 1 && (
            <>
              <button
                className="flow-plan-nav-arrow flow-plan-nav-prev"
                onClick={prevPlan}
                aria-label="Previous floor plan"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M15 18L9 12L15 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                className="flow-plan-nav-arrow flow-plan-nav-next"
                onClick={nextPlan}
                aria-label="Next floor plan"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Plan Information */}
        {currentPlan && (
          <div className="flow-plan-info">
            {currentPlan.name && (
              <h4 className="flow-plan-name">{currentPlan.name}</h4>
            )}

            {currentPlan.description && (
              <p className="flow-plan-description">{currentPlan.description}</p>
            )}

            {/* Plan Details */}
            {currentPlan.details && currentPlan.details.length > 0 && (
              <div className="flow-plan-details">
                {currentPlan.details.map((detail, index) => (
                  <div key={index} className="flow-plan-detail-item">
                    {detail.icon && (
                      <span className="flow-plan-detail-icon">
                        {typeof detail.icon === "string" ? (
                          <img src={detail.icon} alt="" />
                        ) : (
                          detail.icon
                        )}
                      </span>
                    )}
                    <span className="flow-plan-detail-text">{detail.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Plan Indicators/Thumbnails */}
      {plans.length > 1 && (
        <div className="flow-plan-indicators">
          {plans.map((plan, index) => (
            <button
              key={index}
              className={`flow-plan-indicator ${
                index === currentPlanIndex ? "flow-plan-indicator--active" : ""
              }`}
              onClick={() => goToPlan(index)}
              aria-label={`View ${plan.name || `Floor Plan ${index + 1}`}`}
            >
              {plan.thumbnail ? (
                <img
                  src={plan.thumbnail}
                  alt={plan.name || `Floor Plan ${index + 1}`}
                  className="flow-plan-indicator-image"
                />
              ) : (
                <span className="flow-plan-indicator-number">{index + 1}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

FlowPlan.propTypes = {
  title: PropTypes.string,
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      details: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
          text: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  className: PropTypes.string,
  showNavigation: PropTypes.bool,
  autoSlide: PropTypes.bool,
  autoSlideInterval: PropTypes.number,
};

export default FlowPlan;
