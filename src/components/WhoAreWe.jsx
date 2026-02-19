import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/WhoAreWe.css";

const WhoAreWe = () => {
  const navigate = useNavigate();

  const handleAboutUsClick = useCallback(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "click", {
        event_category: "CTA",
        event_label: "Who Are We - About Us Button",
      });
    }

    navigate("/about");
  }, [navigate]);

  return (
    <section
      className="who-are-we"
      aria-labelledby="who-are-we-title"
      role="region"
    >
      <div className="who-are-we__container">
        <h2 id="who-are-we-title" className="who-are-we__title">
          WHO ARE WE?
        </h2>
        <p className="who-are-we__description">
          At Odiliya Homes, we believe your best investment is in your
          lifestyle. With premium developments including apartments for sale in
          Colombo and suburbs, from wellness-focused villas to premium
          residencies and land plots, our properties bring together health,
          comfort, and financial security. Among trusted real estate companies,
          we continue to create spaces that enrich lives and safeguard
          investments.
        </p>
        <button
          className="who-are-we__cta-button"
          onClick={handleAboutUsClick}
          aria-label="Learn more about our company"
          type="button"
        >
          About Us
        </button>
      </div>
    </section>
  );
};

export default WhoAreWe;
