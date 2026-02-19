import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "@/components/MainNavbar";
import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import CategoryButtons from "@/components/CategoryButtons";
import SocialMediaLinks from "@/components/SocialMediaLinks";
import WhoAreWe from "@/components/WhoAreWe";
import ProjectsContainer from "@/components/ProjectsContainer";
import LandsSection from "@/components/LandsSection";
import Gallery from "@/components/Gallery";
import NewsSection from "@/components/NewsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import WelcomePopup from "@/components/WelcomePopup";
import welcomeImage from "@/assets/images/welcome.jpg";

export default function Home() {
  const navigate = useNavigate();

  //Meta tags for SEO
  useEffect(() => {
    // Set page title
    document.title =
      "Odiliya Home | Apartments for Sale in Colombo | Real Estate Companies";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explore modern apartments for sale in Colombo and investment properties with Odiliya Homes, one of Sri Lanka’s trusted real estate companies offering value."
      );
    }

    // Set meta keywords
    let metaKeywords = document.querySelector("meta[name='keywords']");
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content =
      "apartments for sale in colombo,real estate companies";
  }, []);

  const handleNewsButtonClick = () => {
    // Navigate to news page with specific news ID (id: 1 - the featured news)
    navigate("/news?newsId=1");
  };

  const handleCategoryChange = (categoryLabel, categoryData) => {
    console.log("Category changed to:", categoryLabel, categoryData);
    // Add any additional logic for category changes (analytics, state updates, etc.)
  };

  return (
    <>
      {/* Welcome Popup - Shows on every visit */}
      <WelcomePopup
        image={welcomeImage}
        imageOnly={true}
        bannerMode={true}
        navigateTo="/project-details/icon-v-talpe"
        autoShowDelay={1500}
        showOnFirstVisit={false}
      />

      <MainNavbar />
      <HeroSection
        onCategoryChange={handleCategoryChange}
        initialCategory="Land"
        showContent={true}
        className="home-hero"
      >
        <CategoryButtons />
        {/* <SearchBar /> */}
      </HeroSection>
      <WhoAreWe />
      <ProjectsContainer />
      <LandsSection />
      <Gallery />
      <NewsSection
        image="https://res.cloudinary.com/dswr94sjy/image/upload/v1766306704/img1_0_xyeveu.jpg"
        title="Upcoming News"
        newsTitle="Odiliya Groundbreaking"
        description="ICON Galle Breaks Ground : A Landmark of Luxury and Wellness Living by Odiliya Residencies."
        buttonText="More Info"
        onButtonClick={handleNewsButtonClick}
      />
      <SocialMediaLinks />
      <ContactForm />
      <Footer />
    </>
  );
}
