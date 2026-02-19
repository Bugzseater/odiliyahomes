import React, { useEffect } from "react";
import MainNavbar from "@/components/MainNavbar";
import AboutHeroSection from "@/components/AboutHeroSection";
import AboutContent from "@/components/AboutContent";
import History from "@/components/History";
import heroImg from "@/assets/images/heroimg.png";
import HistoryVideo from "@/components/HistoryVideo";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

import vision from "@/assets/images/vision.jpg";
import mission from "@/assets/images/mission.png";
import goal from "@/assets/images/goal.webp";
import history1 from "@/assets/images/img1_9.jpg";
import history2 from "@/assets/images/history2.jpg";

export default function About() {
  //heading tittle
  useEffect(() => {
    document.title =
      "Real Estate Companies in Sri Lanka | Overview | Odiliya Homes";
    const metadescription = document.querySelector('meta[name="description"]');
    if (metadescription) {
      metadescription.setAttribute(
        "content",
        "Discover why Odiliya Homes stands among the leading real estate companies in Sri Lanka - trusted for innovation, quality, and lasting value."
      );
    }

    // Set meta keywords
    let metaKeywords = document.querySelector("meta[name='keywords']");
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "real estate companies in sri lanka";
  }, []);

  return (
    <>
      <MainNavbar />
      <main
        style={{
          paddingTop: "1rem",
          minHeight: "100vh",
          background: "#ffffffff",
        }}
      >
        <AboutHeroSection
          breadcrumb="Home > About Us > Overview"
          subtitle="OVERVIEW"
          title="WHAT IS ODILIYA"
          description="Odiliya Homes is one of the leading real estate companies in Sri Lanka with 12+ years of expertise. We create premium residential spaces that blend elegance, innovation, and trust, while offering seamless property and land sales services. Rooted in integrity, we deliver lasting value for homeowners and investors alike."
          image={heroImg}
          stats={[
            { number: "100+", label: "Completed Projects" },
            { number: "20+", label: "Ongoing Projects" },
            { number: "100+", label: "Sold Out Projects" },
            { number: "13+", label: "Years Of Trust" },
          ]}
        />

        {/* Mission Section - Image Left, Orange Square Right */}
        <AboutContent
          title="OUR MISSION"
          description="To be Sri Lanka’s most trusted real estate brand, delivering luxury and semi-luxury living with excellent service and operational excellence.
We aim to enhance quality of life, uphold ethical values, and create lasting value for all through innovation, integrity, and customer care."
          image={mission}
          layout="image-left"
          accentPosition="right"
          imageStyle="default"
        />

        {/* Vision Section - Image Right, Orange Square Left */}
        <AboutContent
          title="OUR VISION"
          description="To provide a permanent solution for the housing needs of enterprising individuals by offering luxury and semi-luxury condominium units at reasonable prices.
                      We strive to deliver excellent service, high-quality products, and a superior living environment at affordable prices.
                      Our goal is to create unique, facility-rich communities that support modern lifestyles and elevate the living experience for our clients."
          image={vision}
          layout="image-right"
          accentPosition="left"
          imageStyle="rounded"
        />

        {/* Goal Section - Image Left, Orange Square Right */}
        <AboutContent
          title="OUR GOAL"
          description="Our goal then and now is to provide quality projects.
As a process transformation company, we rethink and rebuild processes for the digital age by combining the speed and insight of design thinking with the scale and accuracy of data analytics.
Our aim is to provide permanent solutions for the housing needs of enterprising people who seek our services. We facilitate modern lifestyles in unique environments with comprehensive facilities by offering luxury and semi-luxury condominium units at reasonable prices."
          image={goal}
          layout="image-left"
          accentPosition="right"
          imageStyle="default"
        />

        {/* History Section */}
        <History
          title="OUR HISTORY"
          description="The Group began in 2013 with a bold vision: to make real estate accessible to every Sri Lankan family. From affordable lands to luxury residences, the Group has redefined modern living while building a reputation for trust and reliability. Today, Odiliya stands as a diversified business powerhouse, with ventures in real estate, education, and ICT, driven by innovation and resilience. Recognized as “The Most Resilient Company in Sri Lanka” at the 2023 Business ICON Awards, Odiliya continues to push boundaries, inspire confidence, and shape the future of Sri Lanka’s business landscape."
          primaryImage={history2}
          secondaryImage={history1}
          layout="image-left"
        />

        <HistoryVideo
          title="Over 13+ years of experience"
          description="Explore our journey and see how we transform visions into reality through premium residencies, premium lands, and innovative property solutions."
          videoSrc="https://res.cloudinary.com/dtyx8tfbl/video/upload/v1766050284/WhatsApp_Video_2025-11-18_at_16.03.55_zp8bct.mp4"
          posterSrc="/path/to/poster-image.jpg"
          autoplay={false}
          controls={true}
          onPlay={() => console.log("Video started playing")}
        />
      </main>
      <ContactForm />
      <Footer />
    </>
  );
}
