import React, { useState, useEffect, useRef } from "react";
import "@/styles/CountersPanel.css";

/**
 * Enterprise-level Counters Panel Component
 * Features: Animated counters, real-time data calculation, accessibility
 * Displays project statistics with smooth animations
 *
 * @component CountersPanel
 * @author Senior Developer
 * @version 1.0.0
 */

/**
 * Custom hook for animated counter with smooth easing
 * @param {number} targetValue - The target value to animate to
 * @param {number} duration - Animation duration in milliseconds
 * @returns {number} Current animated value
 */
const useAnimatedCounter = (targetValue, duration = 1000) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const startValue = current;
    const difference = targetValue - startValue;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation (ease-out-cubic)
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const newValue = Math.round(startValue + difference * easeOutCubic);

      setCurrent(newValue);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [targetValue, duration, current]);

  return current;
};

/**
 * CountersPanel Component
 * @param {Object} props - Component props
 * @param {number} props.completedProjects - Manual count for completed projects
 * @param {number} props.awards - Manual count for awards
 * @param {number} props.completedUnits - Manual count for completed units
 * @param {number} props.cities - Manual count for cities
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} Rendered component
 */
const CountersPanel = ({
  completedProjects = 100,
  awards = 2,
  completedUnits = 500,
  cities = 10,
  className = "",
  ...props
}) => {
  const panelRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const currentPanel = panelRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (currentPanel) {
      observer.observe(currentPanel);
    }

    return () => {
      if (currentPanel) {
        observer.unobserve(currentPanel);
      }
    };
  }, []);

  // Animated counter values
  const animatedProjects = useAnimatedCounter(completedProjects);
  const animatedAwards = useAnimatedCounter(awards);
  const animatedUnits = useAnimatedCounter(completedUnits);
  const animatedCities = useAnimatedCounter(cities);

  return (
    <div
      ref={panelRef}
      className={`counters-panel ${
        isVisible ? "counters-panel--visible" : ""
      } ${className}`}
      role="region"
      aria-label="Project Statistics"
      {...props}
    >
      <div className="counter-item">
        <div className="counter-item__label">Completed Projects</div>
        <div className="counter-item__value" aria-live="polite">
          +{animatedProjects}
        </div>
      </div>

      <div className="counter-item">
        <div className="counter-item__label">Awards</div>
        <div className="counter-item__value" aria-live="polite">
          {animatedAwards}
        </div>
      </div>

      <div className="counter-item">
        <div className="counter-item__label">Completed Units</div>
        <div className="counter-item__value" aria-live="polite">
          {animatedUnits}
        </div>
      </div>

      <div className="counter-item">
        <div className="counter-item__label">Cities</div>
        <div className="counter-item__value" aria-live="polite">
          {animatedCities}
        </div>
      </div>
    </div>
  );
};

export default CountersPanel;
