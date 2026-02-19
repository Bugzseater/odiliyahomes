import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "@/styles/HistoryVideo.css";

/**
 * HistoryVideo - Reusable video section component
 * Features title, description, video with play button overlay
 */
export default function HistoryVideo({
  title = "OVER 15 YEARS OF EXPERIENCE",
  description = "Lorem ipsum dolor sit amet consectetur, morper placerat purus cursus id felis dignism proin ugat. Pretium proin nulla armados et suspendisse non quam",
  videoSrc,
  posterImage,
  autoPlay = false,
  showControls = true,
  onVideoPlay,
  onVideoPause,
  className = "",
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoRef, setVideoRef] = useState(null);
  const sectionRef = useRef(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY.current;

          if (entry.isIntersecting && isScrollingDown) {
            entry.target.classList.add("animate-in");
          } else if (!entry.isIntersecting && !isScrollingDown) {
            // Remove animation class when scrolling up and element is out of view
            entry.target.classList.remove("animate-in");
          }

          lastScrollY.current = currentScrollY;
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  const handlePlayClick = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
        setIsPlaying(false);
        onVideoPause && onVideoPause();
      } else {
        videoRef.play();
        setIsPlaying(true);
        onVideoPlay && onVideoPlay();
      }
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section
      ref={sectionRef}
      className={`history-video${className ? ` ${className}` : ""}`}
    >
      <div className="history-video__container">
        {/* Text Content */}
        <div className="history-video__content">
          <h2 className="history-video__title">{title}</h2>
          <p className="history-video__description">{description}</p>
        </div>

        {/* Video Section */}
        <div className="history-video__video-container">
          <div className="history-video__video-wrapper">
            {videoSrc ? (
              <video
                ref={setVideoRef}
                className="history-video__video"
                poster={posterImage}
                controls={showControls && isPlaying}
                autoPlay={autoPlay}
                onEnded={handleVideoEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              posterImage && (
                <img
                  src={posterImage}
                  alt="Video thumbnail"
                  className="history-video__poster"
                />
              )
            )}

            {/* Play Button Overlay */}
            {!isPlaying && (
              <button
                className="history-video__play-button"
                onClick={handlePlayClick}
                aria-label="Play video"
              >
                <svg
                  className="history-video__play-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

HistoryVideo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  videoSrc: PropTypes.string,
  posterImage: PropTypes.string,
  autoPlay: PropTypes.bool,
  showControls: PropTypes.bool,
  onVideoPlay: PropTypes.func,
  onVideoPause: PropTypes.func,
  className: PropTypes.string,
};
