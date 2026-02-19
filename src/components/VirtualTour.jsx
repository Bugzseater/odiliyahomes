import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import "@/styles/VirtualTour.css";

/**
 * VirtualTour - Interactive virtual tour video component
 * Displays virtual tour videos with navigation and controls
 */
export default function VirtualTour({
  title = "Virtual Tour",
  tours = [],
  showNavigation = true,
  autoPlay = false,
  className = "",
  showThumbnails = true,
  controls = true,
  muted = true,
}) {
  const [currentTourIndex, setCurrentTourIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Helper function to check if video is a YouTube link
  const isYouTubeVideo = (url) => {
    return url?.includes("youtube.com") || url?.includes("youtu.be");
  };

  // Helper function to extract YouTube video ID and convert to embed URL
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;

    let videoId = null;

    // Handle youtube.com/watch?v=VIDEO_ID
    if (url.includes("youtube.com/watch")) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get("v");
    }
    // Handle youtu.be/VIDEO_ID
    else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0];
    }
    // Handle youtube.com/embed/VIDEO_ID (already in embed format)
    else if (url.includes("youtube.com/embed/")) {
      return url;
    }

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=${
          autoPlay ? 1 : 0
        }&mute=${muted ? 1 : 0}`
      : null;
  };

  // Handle tour navigation
  const nextTour = () => {
    setCurrentTourIndex((prev) => (prev === tours.length - 1 ? 0 : prev + 1));
    setIsPlaying(false);
  };

  const prevTour = () => {
    setCurrentTourIndex((prev) => (prev === 0 ? tours.length - 1 : prev - 1));
    setIsPlaying(false);
  };

  const goToTour = (index) => {
    setCurrentTourIndex(index);
    setIsPlaying(false);
  };

  // Handle video play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle video events
  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoPause = () => setIsPlaying(false);
  const handleVideoEnded = () => setIsPlaying(false);

  if (!tours || tours.length === 0) {
    return null;
  }

  const currentTour = tours[currentTourIndex];
  const isYouTube = isYouTubeVideo(currentTour.video);
  const embedUrl = isYouTube ? getYouTubeEmbedUrl(currentTour.video) : null;

  return (
    <div className={`virtual-tour-container ${className}`}>
      {/* Title */}
      <div className="virtual-tour-header">
        <h2 className="virtual-tour-title">{title}</h2>
        {tours.length > 1 && (
          <div className="virtual-tour-counter">
            {currentTourIndex + 1} / {tours.length}
          </div>
        )}
      </div>

      {/* Main Video Player */}
      <div className="virtual-tour-player">
        <div className="virtual-tour-video-container">
          {isYouTube && embedUrl ? (
            // YouTube iframe player
            <iframe
              className="virtual-tour-video"
              src={embedUrl}
              title={currentTour.name || "Virtual Tour"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            // Regular video player
            <>
              <video
                ref={videoRef}
                className="virtual-tour-video"
                src={currentTour.video}
                poster={currentTour.thumbnail || currentTour.poster}
                controls={controls}
                muted={muted}
                autoPlay={autoPlay}
                onPlay={handleVideoPlay}
                onPause={handleVideoPause}
                onEnded={handleVideoEnded}
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>

              {/* Custom Play Button Overlay - only for regular videos */}
              {!isPlaying && (
                <div className="virtual-tour-play-overlay" onClick={togglePlay}>
                  <button
                    className="virtual-tour-play-btn"
                    aria-label="Play video"
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Tour Information */}
        {currentTour.name && (
          <div className="virtual-tour-info">
            <h3 className="virtual-tour-name">{currentTour.name}</h3>
            {currentTour.description && (
              <p className="virtual-tour-description">
                {currentTour.description}
              </p>
            )}
          </div>
        )}

        {/* Tour Details */}
        {currentTour.details && currentTour.details.length > 0 && (
          <div className="virtual-tour-details">
            <ul className="virtual-tour-details-list">
              {currentTour.details.map((detail, idx) => (
                <li key={idx} className="virtual-tour-detail-item">
                  {detail.icon && (
                    <span className="virtual-tour-detail-icon">
                      {detail.icon}
                    </span>
                  )}
                  <span className="virtual-tour-detail-text">
                    {detail.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      {showNavigation && tours.length > 1 && (
        <div className="virtual-tour-navigation">
          <button
            className="virtual-tour-nav-btn virtual-tour-prev-btn"
            onClick={prevTour}
            aria-label="Previous tour"
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

          {/* Thumbnails */}
          {showThumbnails && (
            <div className="virtual-tour-thumbnails">
              {tours.map((tour, idx) => (
                <button
                  key={idx}
                  className={`virtual-tour-thumbnail ${
                    idx === currentTourIndex
                      ? "virtual-tour-thumbnail-active"
                      : ""
                  }`}
                  onClick={() => goToTour(idx)}
                  aria-label={`Go to tour ${idx + 1}`}
                >
                  <img
                    src={tour.thumbnail || tour.poster}
                    alt={tour.name || `Tour ${idx + 1}`}
                    className="virtual-tour-thumbnail-img"
                  />
                  {tour.duration && (
                    <span className="virtual-tour-thumbnail-duration">
                      {tour.duration}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          <button
            className="virtual-tour-nav-btn virtual-tour-next-btn"
            onClick={nextTour}
            aria-label="Next tour"
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
        </div>
      )}
    </div>
  );
}

VirtualTour.propTypes = {
  title: PropTypes.string,
  tours: PropTypes.arrayOf(
    PropTypes.shape({
      video: PropTypes.string.isRequired,
      name: PropTypes.string,
      description: PropTypes.string,
      thumbnail: PropTypes.string,
      poster: PropTypes.string,
      duration: PropTypes.string,
      details: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.node,
          text: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  showNavigation: PropTypes.bool,
  autoPlay: PropTypes.bool,
  className: PropTypes.string,
  showThumbnails: PropTypes.bool,
  controls: PropTypes.bool,
  muted: PropTypes.bool,
};
