import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainNavbar from "@/components/MainNavbar";
import HeroImg from "@/assets/images/icon.png";
import IconHeroSection from "@/components/SubPageHeroSection";
import IconBody from "@/components/IconBody";
import OurProjectsSection from "@/components/OurProjectsSection";
import img1 from "@/assets/images/mirissa.png";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

import villa1 from "@/assets/images/projects/talpe/t_7.jpg";
import villa2 from "@/assets/images/projects/mirissa/m_12.jpg";
import villa3 from "@/assets/images/projects/mirissa/m_07.jpg";
import villa4 from "@/assets/images/projects/galle/g_06.jpeg";

import galleimg from "@/assets/images/projects/galle/g_01.jpeg";

export default function Icon() {
  useEffect(() => {
    document.title = "ICON by Odiliya Homes | Investment Plan | Real Estate Investment Opportunities";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Invest in Sri Lanka with Odiliya Homes. Unlock profitable real estate investment opportunities and a strategic investment plan to grow your wealth today.");
    }

    let metaKeywords = document.querySelector("meta[name='keywords']");
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "investment plan,real estate investment oppotunities";
  }, []);

  const navigate = useNavigate();

  const handleProjectClick = (project) => {
    navigate(`/residence?project=${project.id}&showDetails=true`);
  };

  const mainContentData = {
    title: "Investment Opportunity",
    description: "Exclusive wellness villas for sale by Odiliya Residencies. ICON offers luxurious villas with full management services and high ROI potential of 30-40%. Limited units available, secure your piece of luxury living and smart investment today.",
    statistics: [
      {
        label: "30% - 40% ROI",
        highlight: true,
      },
    ],
  };

  const managementData = {
    title: "100% MANAGE BY ODILIYA",
    description: "Operations and Marketing: Odiliya will handle all aspects of villa operations and marketing. This includes guest bookings, property management, housekeeping, and promotion of the villas to ensure high occupancy rates and maximum profitability.",
  };

  const profitSharingData = {
    title: "PROFIT MODEL - NET PROFIT SHARING",
    description: "After deducting all operational expenses, net profits will be shared between the company and villa owners as follows:",
    shares: [
      { label: "Villa Owner", percentage: "70%" },
      { label: "Management Company", percentage: "30%" },
    ],
  };

  const additionalContentData = [
    {
      title: "Projects",
      description: "ICON, premium investment properties in Sri Lanka's exclusive destinations. These exceptional developments combine luxury living with strong long-term returns, offering both elegance and financial growth. With ICON, you're not just owning property, you're securing a future of wellness, sophistication, and enduring value.",
    },
  ];

  const imagesData = [
    {
      src: villa1,
      alt: "Villa exterior view",
    },
    {
      src: villa2,
      alt: "Interior living space",
    },
    {
      src: villa3,
      alt: "Villa pool area",
    },
    {
      src: villa4,
      alt: "Bedroom interior",
    },
  ];

  const projectsData = [
    {
      id: 18,
      name: "ICON V TALPE",
      description: "Nestled along the southern coast, Icon V Talpe is a signature beachfront residence where luxury meets oceanfront serenity.",
      image: "#",
      category: "All Projects",
    },
    {
      id: 16,
      name: "ICON MIRISSA",
      description: "Exclusive villa for sale Sri Lanka at ICON Mirissa. Luxury coastal living with full management and strong rental returns.",
      image: img1,
      category: "All Projects",
    },
    {
      id: 17,
      name: "ICON GALLE",
      description: "Luxury villa for sale in Galle at ICON Galle. Riverfront wellness living from Rs. 29M with flexible payment plans and strong investment returns.",
      image: galleimg,
      category: "All Projects",
    },
  ];

  return (
    <>
      <MainNavbar />
      <main
        style={{
          paddingTop: "7rem",
          minHeight: "100vh",
          background: "#ffffffff",
        }}
        className="icon-page"
      >
        <IconHeroSection
          mediaType="video"
          video="#"
          title="ODILIYA ICON"
          heading="Where luxury meets lifestyle and wellness builds wealth."
          breadcrumb="Home > ICON"
          description="Odiliya presents ICON - a collection of wellness investment villas in Sri Lanka's top tourist destinations. Each ICON property blends luxury living with high investment value, offering stunning spaces professionally managed like a hotel for effortless ownership and steady returns.With ICON, you're not just investing in property, you're investing in a lifestyle of wellness, elegance, and enduring financial growth."
        />
        <IconBody
          mainContent={mainContentData}
          profitSharing={profitSharingData}
          additionalContent={[managementData, ...additionalContentData]}
          images={imagesData}
          showImageGallery={true}
          layout="default"
          contentAlignment="left"
          statisticsStyle="bordered"
          imageGalleryStyle="stacked"
          className="icon-page-content"
        />
        <OurProjectsSection
          title="ICON PROJECTS"
          categories={["All Projects"]}
          projects={projectsData}
          defaultCategory={0}
          className="icon-page-projects"
          onProjectClick={handleProjectClick}
        />
      </main>
      <ContactForm />
      <Footer />
    </>
  );
}