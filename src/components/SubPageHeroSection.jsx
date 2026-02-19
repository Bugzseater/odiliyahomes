import React from "react";
import PropTypes from "prop-types";
import "@/styles/SubPageHeroSection.css";

/**
 * SubPageHeroSection - Reusable two-column hero section component.
 * Can be used on any page with customizable image position, content, and styling.
 */
export default function SubPageHeroSection({
  image,
  video,
  videoPoster,
  mediaType = "image", // 'image' or 'video'
  title = "ODILIYA RESIDENCIES",
  heading = "WHY YOU INVEST OCEANISTA",
  description = "Lorem ipsum dolor sit amet consectetur, morper placerat purus cursus id felis dignism proin ugat. Pretium proin nulla armados et suspendisse non quam lorem ipsum dolor sit amet consectetur. Morper placerat purus cursus id felis dignism proin ugat. Pretium proin nulla armados et suspendisse non quam",
  imageAlt = "Residence Hero Image",
  imagePosition = "right", // 'left' or 'right'
  backgroundColor = "#D6D6D7",
  textColor = "#444",
  titleColor = "#ff9900",
  className = "",
  breadcrumb = "", // Breadcrumb path above title
  children,
}) {
  const sectionClass = `residence-hero-section${
    className ? ` ${className}` : ""
  }`;

  const mediaElement =
    mediaType === "video" ? (
      <div className="residence-hero-section__image residence-hero-section__video">
        <video
          className="residence-hero-section__video-element"
          autoPlay
          loop
          muted
          playsInline
          poster={videoPoster}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    ) : (
      <div
        className="residence-hero-section__image"
        style={{ backgroundImage: `url(${image})` }}
        aria-label={imageAlt}
      ></div>
    );

  const contentElement = (
    <div className="residence-hero-section__desc" style={{ backgroundColor }}>
      <div className="residence-hero-section__desc-content">
        {breadcrumb && (
          <div
            className="residence-hero-section__breadcrumb"
            style={{ color: textColor, fontSize: "14px", marginBottom: "8px" }}
          >
            {breadcrumb}
          </div>
        )}
        <span
          className="residence-hero-section__title"
          style={{ color: titleColor }}
        >
          {title}
        </span>
        <h2 className="residence-hero-section__heading">{heading}</h2>
        {Array.isArray(description) ? (
          <div
            className="residence-hero-section__text"
            style={{ color: textColor }}
          >
            {description.map((item, index) => {
              if (item.type === "title") {
                return (
                  <h3
                    key={index}
                    className="description-title"
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3em",
                      marginTop: index === 0 ? "0" : "1.5em",
                      marginBottom: "0.5em",
                      color: textColor,
                    }}
                  >
                    {item.text}
                  </h3>
                );
              } else if (item.type === "subtitle") {
                return (
                  <h4
                    key={index}
                    className="description-subtitle"
                    style={{
                      fontWeight: "600",
                      fontSize: "1.15em",
                      marginBottom: "1em",
                      color: textColor,
                      opacity: 0.95,
                    }}
                  >
                    {item.text}
                  </h4>
                );
              } else {
                return (
                  <p
                    key={index}
                    className="description-paragraph"
                    style={{
                      marginBottom: "1em",
                      lineHeight: "1.6",
                      color: textColor,
                    }}
                  >
                    {item.text}
                  </p>
                );
              }
            })}
          </div>
        ) : (
          <p
            className="residence-hero-section__text"
            style={{ color: textColor }}
          >
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );

  return (
    <section className={sectionClass}>
      {imagePosition === "left" ? (
        <>
          {mediaElement}
          {contentElement}
        </>
      ) : (
        <>
          {contentElement}
          {mediaElement}
        </>
      )}
    </section>
  );
}

SubPageHeroSection.propTypes = {
  image: PropTypes.string,
  video: PropTypes.string,
  videoPoster: PropTypes.string,
  mediaType: PropTypes.oneOf(["image", "video"]),
  title: PropTypes.string,
  heading: PropTypes.string,
  description: PropTypes.string,
  imageAlt: PropTypes.string,
  imagePosition: PropTypes.oneOf(["left", "right"]),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  titleColor: PropTypes.string,
  className: PropTypes.string,
  breadcrumb: PropTypes.string,
  children: PropTypes.node,
};
