import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/NewsLayout.css";

/**
 * NewsLayout - Enterprise-level news component with main news and sidebar
 *
 * Features:
 * - Two-column layout (main news + sidebar list)
 * - Click to view full news details
 * - Responsive design with mobile optimization
 * - State management for selected news
 * - Image lazy loading and optimization
 * - Accessibility compliant
 * - Date formatting and author display
 * - Category tags and read time estimation
 *
 * @component
 * @example
 * <NewsLayout
 *   mainNews={featuredNews}
 *   newsList={allNews}
 *   onNewsSelect={handleNewsSelect}
 *   loading={false}
 * />
 */
export default function NewsLayout({
  mainNews = null,
  newsList = [],
  onNewsSelect,
  loading = false,
  showAuthor = true,
  showCategory = true,
  showReadTime = true,
  dateFormat = "long",
  className = "",
  maxSidebarItems = 10,
}) {
  const [selectedNews, setSelectedNews] = useState(mainNews);

  // Handle news selection from sidebar
  const handleNewsClick = (news) => {
    setSelectedNews(news);
    onNewsSelect?.(news);
  };

  // Format date based on preference
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      long: { year: "numeric", month: "long", day: "numeric" },
      short: { year: "numeric", month: "short", day: "numeric" },
      compact: { month: "short", day: "numeric" },
    };
    return date.toLocaleDateString("en-US", options[dateFormat]);
  };

  // Calculate estimated read time
  const calculateReadTime = (content) => {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const wordCount = content.split(" ").length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Loading state
  if (loading) {
    return (
      <div className={`news-layout news-layout--loading ${className}`}>
        <div className="news-layout__container">
          <div className="news-layout__main">
            <div className="news-layout__skeleton news-layout__skeleton--main">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-line skeleton-line--title"></div>
                <div className="skeleton-line skeleton-line--subtitle"></div>
                <div className="skeleton-line skeleton-line--text"></div>
                <div className="skeleton-line skeleton-line--text"></div>
              </div>
            </div>
          </div>
          <div className="news-layout__sidebar">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="news-layout__skeleton news-layout__skeleton--sidebar"
              >
                <div className="skeleton-image skeleton-image--small"></div>
                <div className="skeleton-content">
                  <div className="skeleton-line skeleton-line--small"></div>
                  <div className="skeleton-line skeleton-line--tiny"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentNews = selectedNews || mainNews;

  return (
    <div className={`news-layout ${className}`}>
      <div className="news-layout__container">
        {/* Main News Section */}
        <div className="news-layout__main">
          {currentNews ? (
            <article className="news-card">
              {/* News Image */}
              {currentNews.image && (
                <div className="news-card__image-wrapper">
                  <img
                    src={currentNews.image}
                    alt={currentNews.title}
                    className="news-card__image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = "none";
                      const fallback = e.target.nextSibling;
                      if (fallback) {
                        fallback.style.display = "flex";
                      }
                    }}
                  />
                  {/* Image Fallback */}
                  <div
                    className="news-card__image-fallback"
                    style={{ display: "none" }}
                  >
                    <svg
                      width="60"
                      height="60"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                    </svg>
                  </div>
                </div>
              )}

              {/* News Content */}
              <div className="news-card__content">
                {/* Meta Information */}
                <div className="news-card__meta">
                  {showCategory && currentNews.category && (
                    <span className="news-card__category">
                      {currentNews.category}
                    </span>
                  )}
                  <time className="news-card__date" dateTime={currentNews.date}>
                    {formatDate(currentNews.date)}
                  </time>
                  {showReadTime && currentNews.content && (
                    <span className="news-card__read-time">
                      {calculateReadTime(currentNews.content)} min read
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="news-card__title">{currentNews.title}</h1>

                {/* Excerpt */}
                {currentNews.excerpt && (
                  <p className="news-card__excerpt">{currentNews.excerpt}</p>
                )}

                {/* Author */}
                {showAuthor && currentNews.author && (
                  <div className="news-card__author">
                    {currentNews.author.avatar && (
                      <img
                        src={currentNews.author.avatar}
                        alt={currentNews.author.name}
                        className="news-card__author-avatar"
                      />
                    )}
                    <div className="news-card__author-info">
                      <span className="news-card__author-name">
                        {currentNews.author.name}
                      </span>
                      {currentNews.author.title && (
                        <span className="news-card__author-title">
                          {currentNews.author.title}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Full Content */}
                {currentNews.content && (
                  <div className="news-card__full-content">
                    {typeof currentNews.content === "string" ? (
                      <div
                        className="news-card__content-text"
                        dangerouslySetInnerHTML={{
                          __html: currentNews.content,
                        }}
                      />
                    ) : (
                      <div className="news-card__content-text">
                        {currentNews.content}
                      </div>
                    )}
                  </div>
                )}

                {/* Tags */}
                {currentNews.tags && currentNews.tags.length > 0 && (
                  <div className="news-card__tags">
                    {currentNews.tags.map((tag, index) => (
                      <span key={index} className="news-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ) : (
            <div className="news-layout__empty">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
              <h3>No News Selected</h3>
              <p>Select a news article from the list to view details</p>
            </div>
          )}
        </div>

        {/* Sidebar News List */}
        <aside className="news-layout__sidebar">
          <div className="news-sidebar">
            <h2 className="news-sidebar__title">Latest News</h2>

            {newsList.length > 0 ? (
              <div className="news-sidebar__list">
                {newsList.slice(0, maxSidebarItems).map((news, index) => (
                  <article
                    key={news.id || index}
                    className={`news-list-item ${
                      selectedNews?.id === news.id
                        ? "news-list-item--active"
                        : ""
                    }`}
                    onClick={() => handleNewsClick(news)}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleNewsClick(news);
                      }
                    }}
                    aria-label={`Read ${news.title}`}
                  >
                    {/* Thumbnail */}
                    {news.image && (
                      <div className="news-list-item__thumbnail">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="news-list-item__image"
                          loading="lazy"
                          onError={(e) => {
                            e.target.style.display = "none";
                            const fallback = e.target.nextSibling;
                            if (fallback) {
                              fallback.style.display = "flex";
                            }
                          }}
                        />
                        <div
                          className="news-list-item__image-fallback"
                          style={{ display: "none" }}
                        >
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="news-list-item__content">
                      <h3 className="news-list-item__title">{news.title}</h3>

                      <div className="news-list-item__meta">
                        <time
                          className="news-list-item__date"
                          dateTime={news.date}
                        >
                          {formatDate(news.date)}
                        </time>
                        {showCategory && news.category && (
                          <span className="news-list-item__category">
                            {news.category}
                          </span>
                        )}
                      </div>

                      {news.excerpt && (
                        <p className="news-list-item__excerpt">
                          {news.excerpt}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="news-sidebar__empty">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
                <p>No news articles available</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

NewsLayout.propTypes = {
  /** Main featured news article */
  mainNews: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    image: PropTypes.string,
    date: PropTypes.string.isRequired,
    category: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string,
      avatar: PropTypes.string,
    }),
    tags: PropTypes.arrayOf(PropTypes.string),
  }),

  /** Array of news articles for sidebar */
  newsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      excerpt: PropTypes.string,
      content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      image: PropTypes.string,
      date: PropTypes.string.isRequired,
      category: PropTypes.string,
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        title: PropTypes.string,
        avatar: PropTypes.string,
      }),
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,

  /** Callback when news is selected */
  onNewsSelect: PropTypes.func,

  /** Loading state */
  loading: PropTypes.bool,

  /** Show author information */
  showAuthor: PropTypes.bool,

  /** Show category tags */
  showCategory: PropTypes.bool,

  /** Show estimated read time */
  showReadTime: PropTypes.bool,

  /** Date format preference */
  dateFormat: PropTypes.oneOf(["long", "short", "compact"]),

  /** Additional CSS classes */
  className: PropTypes.string,

  /** Maximum items to show in sidebar */
  maxSidebarItems: PropTypes.number,
};
