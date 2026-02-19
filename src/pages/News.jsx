import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, onSnapshot, doc, getDoc } from "firebase/firestore";
import MainNavbar from "@/components/MainNavbar";
import NewsLayout from "@/components/NewsLayout";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set page title and meta tags
  useEffect(() => {
    document.title = "Real Estate Sri Lanka | News | Odiliya Homes";
    
    // Set meta keywords
    let metaKeywords = document.querySelector("meta[name='keywords']");
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "real estate sri lanka, property news, odiliya homes, luxury real estate";
  }, []);

  // Fetch news from Firebase
  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      // Create query to get news ordered by date (newest first)
      const q = query(
        collection(db, "news"),
        orderBy("createdAt", "desc")
      );

      // Real-time listener for news updates
      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const news = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Convert Firestore timestamp to Date if needed
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate(),
          }));

          console.log("Fetched news:", news);
          setNewsData(news);
          
          // Set first news as selected if available
          if (news.length > 0 && !selectedNews) {
            setSelectedNews(news[0]);
          }
          
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching news:", error);
          setError("Failed to load news. Please try again later.");
          setLoading(false);
        }
      );

      // Cleanup listener on unmount
      return () => unsubscribe();

    } catch (err) {
      console.error("Error setting up news listener:", err);
      setError("Failed to load news. Please try again later.");
      setLoading(false);
    }
  }, []);

  // Handle URL params on initial load
  useEffect(() => {
    const loadNewsFromUrl = async () => {
      // Check URL for newsId parameter
      const urlParams = new URLSearchParams(window.location.search);
      const newsId = urlParams.get('newsId');

      if (newsId) {
        try {
          const newsDoc = await getDoc(doc(db, "news", newsId));
          if (newsDoc.exists()) {
            setSelectedNews({
              id: newsDoc.id,
              ...newsDoc.data(),
            });
          }
        } catch (err) {
          console.error("Error loading news from URL:", err);
        }
      }
    };

    loadNewsFromUrl();
  }, []);

  // Handle news selection
  const handleNewsSelect = (news) => {
    setSelectedNews(news);

    // Update URL with news ID without page reload
    const url = news ? `/news?newsId=${news.id}` : '/news';
    window.history.pushState(null, "", url);

    // Scroll to main content
    const mainSection = document.querySelector(".news-layout__main");
    if (mainSection) {
      mainSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Format content for display (handle HTML content)
  const formatContent = (content) => {
    if (!content) return "";
    return content;
  };

  return (
    <>
      <MainNavbar />
      <div className="news-page">
        {/* Page Header */}
        <header className="news-page__header">
          <div className="container">
            <h1 className="news-page__title">Latest News & Updates</h1>
            <p className="news-page__subtitle">
              Stay informed with the latest developments from Odiliya Group
            </p>
          </div>
        </header>

        {/* Error Message */}
        {error && (
          <div className="news-page__error">
            <div className="container">
              <div className="error-message">{error}</div>
            </div>
          </div>
        )}

        {/* News Layout Component */}
        <NewsLayout
          mainNews={selectedNews}
          newsList={newsData}
          onNewsSelect={handleNewsSelect}
          loading={loading}
          showAuthor={true}
          showCategory={true}
          showReadTime={true}
          dateFormat="long"
          maxSidebarItems={20}
          className="news-page__content"
        />

        {/* No News Message */}
        {!loading && newsData.length === 0 && !error && (
          <div className="news-page__empty">
            <div className="container">
              <p>No news articles available at the moment. Please check back later.</p>
            </div>
          </div>
        )}
      </div>

      <ContactForm />
      <Footer />

      <style jsx>{`
        .news-page {
          min-height: 100vh;
          background: #f8f9fa;
          padding-top: 6rem;
        }

        .news-page__header {
          background: white;
          color: black;
          padding: 4rem 0 3rem 0;
          text-align: left;
        }

        .news-page__header .container {
          max-width: 1200px;
          margin-left: 4vw;
          padding: 0 2rem;
        }

        .news-page__title {
          font-size: 3rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }

        .news-page__subtitle {
          font-size: 1.25rem;
          text-align: left;
          opacity: 0.9;
          margin: 0;
          max-width: 600px;
        }

        .news-page__content {
          margin-top: -2rem;
          position: relative;
          z-index: 1;
        }

        .news-page__error,
        .news-page__empty {
          padding: 2rem 0;
          text-align: center;
        }

        .error-message {
          background: #fee;
          color: #c00;
          padding: 1rem;
          border-radius: 8px;
          display: inline-block;
        }

        .news-page__empty p {
          color: #666;
          font-size: 1.1rem;
          padding: 3rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        @media (max-width: 768px) {
          .news-page__header {
            padding: 3rem 0 2rem 0;
          }

          .news-page__title {
            font-size: 2rem;
          }

          .news-page__subtitle {
            font-size: 1rem;
          }

          .news-page__content {
            margin-top: -1rem;
          }

          .news-page__header .container {
            margin-left: 1rem;
            padding: 0 1rem;
          }
        }
      `}</style>
    </>
  );
}