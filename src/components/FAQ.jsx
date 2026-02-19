import React, { useState } from "react";
import PropTypes from "prop-types";
import "@/styles/FAQ.css";

/**
 * FAQ - Interactive FAQ component with expandable questions and answers
 * Displays project-specific frequently asked questions in an accordion format
 */
export default function FAQ({
  title = "Frequently Asked Questions",
  faqs = [],
  className = "",
  allowMultipleOpen = false,
  showNumbers = true,
  initialOpenIndex = null,
}) {
  const [openItems, setOpenItems] = useState(() => {
    if (initialOpenIndex !== null) {
      return allowMultipleOpen ? [initialOpenIndex] : initialOpenIndex;
    }
    return allowMultipleOpen ? [] : null;
  });

  // Toggle individual FAQ item
  const toggleFAQ = (index) => {
    if (allowMultipleOpen) {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev => prev === index ? null : index);
    }
  };

  // Check if FAQ item is open
  const isOpen = (index) => {
    return allowMultipleOpen 
      ? openItems.includes(index)
      : openItems === index;
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className={`faq-container ${className}`}>
      {/* FAQ Header */}
      <div className="faq-header">
        <h2 className="faq-title">{title}</h2>
        <div className="faq-count">
          {faqs.length} {faqs.length === 1 ? "Question" : "Questions"}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${isOpen(index) ? "faq-item--open" : ""}`}
          >
            {/* Question */}
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              aria-expanded={isOpen(index)}
              aria-controls={`faq-answer-${index}`}
            >
              <div className="faq-question-content">
                {showNumbers && (
                  <span className="faq-question-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}
                <span className="faq-question-text">{faq.question}</span>
              </div>
              
              <div className="faq-question-icon">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  className={`faq-chevron ${isOpen(index) ? "faq-chevron--open" : ""}`}
                >
                  <path 
                    d="M6 9L12 15L18 9" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            {/* Answer */}
            <div
              id={`faq-answer-${index}`}
              className={`faq-answer ${isOpen(index) ? "faq-answer--open" : ""}`}
              style={{
                maxHeight: isOpen(index) ? "1000px" : "0",
              }}
            >
              <div className="faq-answer-content">
                {typeof faq.answer === 'string' ? (
                  <p className="faq-answer-text">{faq.answer}</p>
                ) : (
                  <div className="faq-answer-html">{faq.answer}</div>
                )}
                
                {/* Additional content like links, lists, etc. */}
                {faq.links && faq.links.length > 0 && (
                  <div className="faq-answer-links">
                    <h4 className="faq-links-title">Related Links:</h4>
                    <ul className="faq-links-list">
                      {faq.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a 
                            href={link.url}
                            target={link.external ? "_blank" : "_self"}
                            rel={link.external ? "noopener noreferrer" : ""}
                            className="faq-link"
                          >
                            {link.text}
                            {link.external && (
                              <svg 
                                width="16" 
                                height="16" 
                                viewBox="0 0 24 24" 
                                fill="none"
                                className="faq-external-icon"
                              >
                                <path 
                                  d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11M15 3H21V9M10 14L21 3" 
                                  stroke="currentColor" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags or categories */}
                {faq.tags && faq.tags.length > 0 && (
                  <div className="faq-answer-tags">
                    {faq.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="faq-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Footer */}
      {faqs.length > 0 && (
        <div className="faq-footer">
          <div className="faq-footer-content">
            <p className="faq-footer-text">
              Still have questions? 
              <a href="/contact" className="faq-contact-link">
                Contact our team for more information
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

FAQ.propTypes = {
  /** FAQ section title */
  title: PropTypes.string,

  /** Array of FAQ objects */
  faqs: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
          external: PropTypes.bool,
        })
      ),
      tags: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,

  /** Additional CSS classes */
  className: PropTypes.string,

  /** Allow multiple FAQ items to be open at once */
  allowMultipleOpen: PropTypes.bool,

  /** Show question numbers */
  showNumbers: PropTypes.bool,

  /** Index of initially open FAQ item */
  initialOpenIndex: PropTypes.number,
};