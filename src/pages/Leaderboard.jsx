import React, { useEffect } from "react";
import MainNavbar from "@/components/MainNavbar";
import AboutHeroSection from "@/components/AboutHeroSection";
import Directors from "@/components/Directors";
import Footer from "@/components/Footer";
import heroImg from "@/assets/images/heroimg.png";

export default function Leaderboard() {
  //heading tittle
  useEffect(() => {
    document.title =
      "Real Estate Agents in Sri Lanka | Leadership | Odiliya Homes";
    const metadescription = document.querySelector('meta[name="description"]');
    if (metadescription) {
      metadescription.setAttribute(
        "content",
        "Meet the visionary leaders behind Odiliya Homes - one of Sri Lanka’s leading real estate agents shaping the nation’s property landscape.",
      );
    }

    // Set meta keywords
    let metaKeywords = document.querySelector("meta[name='keywords']");
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "real estate agents in sri lanka";
  }, []);

  // Sample director data - you can replace with actual data
  const directorsData = [
    {
      name: "Mr. Janath Rohitha Abeygunarathne",
      position: "Director / Managing Director",
      image:
        "https://res.cloudinary.com/dswr94sjy/image/upload/v1762506353/IMG_4471_goruo3.jpg", // Replace with actual image path
      description:
        "A visionary entrepreneur and transformative leader, Mr. Rohitha Abeygunaratne stands at the helm of The Odiliya Group, one of Sri Lanka’s fastest-growing diversified conglomerates. As Co-Founder and Chairman, his leadership has been instrumental in redefining the real estate landscape of the nation and steering Odiliya toward a future of innovation, resilience, and sustainable growth. Beginning his journey in 2013 with a clear purpose to make real estate accessible and affordable to all, Mr. Abeygunaratne co-founded Odiliya Homes (Pvt) Ltd, setting a new standard for reliability and trust in the housing sector. His commitment to empowering families through secure and value-driven property solutions quickly established Odiliya as a trusted household name.In 2016, under his strategic vision, Odiliya expanded into the premium segment with the launch of Odiliya Residencies (Pvt) Ltd, bringing contemporary luxury, elegance, and sophistication to Sri Lanka’s urban lifestyle. A defining moment came in 2020, when Mr. Abeygunaratne became the 100% owner of the company, transforming Odiliya from a real estate enterprise into a diversified conglomerate ''The Odiliya Group''. Guided by his foresight, the Group successfully ventured into new sectors including education and information technology, creating a balanced and future-ready business ecosystem.",
      socialLinks: {
        linkedin:
          "https://www.linkedin.com/in/rohitha-abeygunaratne-31912a157/",
        instagram:
          "https://www.instagram.com/abeygunarathne?igsh=MTcyNDg2NGs4cGdzcA==",
      },
    },
    {
      name: "Mr. K.A.U. Priyanga Jayasekara",
      position: "Director / CHIEF operating officer",
      image:
        "https://res.cloudinary.com/dswr94sjy/image/upload/v1762504848/IMG_1046_ipxkww.jpg", // Replace with actual image path
      description:
        "Mr .Priyanga read for his Bachelor’s Degree of (Bio) Science (Hons), from University of Kelaniya, Sri Lanka and Obtained Diploma in Management from Open University of Sri Lanka,Subsequently, Completed the Post Graduate Diploma in Business Management from the University of Colombo, Sri Lanka and Masters in Business Administration specialized in HumanResources from University of Colombo, Sri Lanka. He embarked his Carrier as Management Trainee at Manufacturing Sector promoted and performed as Head of Human Resources in Healthcare, Finance, Insurance, Microfinance, andProperty Management Listed Conglomerate in Sri Lanka. He was the sole Sri Lanka winner of Prestigious Japanese Scholarship in 2014, for the leadership development programme under the Overseas Human Resources and Industry Development(HIDA), Osaka, Japan, He was awarded with Certificate of recognition for facilitation the achievement of prestigious Silver Award at SLITAD People Development in 2014 and National HR excellence Silver Awardby CIPM Sri Lanka in 2016.Further, He was awarded with certificate of recognition the achievement of SLITAD People Development Gold award in 2015 and 2017 and Employer brand award in 2016 and 2017 Internationally, he was recognized and awarded Asia HR leadership Award at Asia’s BestEmployer Brand Award at LE Meridian, Sentosa, Singapore in year 2017. Further, He was recognized and awarded 100 most influential Global HR leadership award atWorld HRD Congress Silver Jubilee in 2017 and 2018 Consecutively at Taj Land, Mumbai India. Addition to that , He Perform as HR & Management consultant in various organization in SriLanka",

      // socialLinks: {
      //   linkedin: "https://linkedin.com/in/rohitha-abeygunarathne",
      //   instagram: "https://instagram.com/rohitha.abeygunarathne",
      // },
    },
    // {
    //   name: "Rohitha Abeygunarathne",
    //   position: "Founder Chairman / Managing Director",
    //   image: "/src/assets/images/director-placeholder.jpg", // Replace with actual image path
    //   socialLinks: {
    //     linkedin: "https://linkedin.com/in/rohitha-abeygunarathne",
    //     instagram: "https://instagram.com/rohitha.abeygunarathne",
    //   },
    // },
    // {
    //   name: "Rohitha Abeygunarathne",
    //   position: "Founder Chairman / Managing Director",
    //   image: "/src/assets/images/director-placeholder.jpg", // Replace with actual image path
    //   socialLinks: {
    //     linkedin: "https://linkedin.com/in/rohitha-abeygunarathne",
    //     instagram: "https://instagram.com/rohitha.abeygunarathne",
    //   },
    // },
    // {
    //   name: "Rohitha Abeygunarathne",
    //   position: "Founder Chairman / Managing Director",
    //   image: "/src/assets/images/director-placeholder.jpg", // Replace with actual image path
    //   socialLinks: {
    //     linkedin: "https://linkedin.com/in/rohitha-abeygunarathne",
    //     instagram: "https://instagram.com/rohitha.abeygunarathne",
    //   },
    // },
    // {
    //   name: "Rohitha Abeygunarathne",
    //   position: "Founder Chairman / Managing Director",
    //   image: "/src/assets/images/director-placeholder.jpg", // Replace with actual image path
    //   socialLinks: {
    //     linkedin: "https://linkedin.com/in/rohitha-abeygunarathne",
    //     instagram: "https://instagram.com/rohitha.abeygunarathne",
    //   },
    // },
  ];

  // const managementData = [
  //   {
  //     name: "Rohitha Abeygunarathne",
  //     position: "Founder Chairman / Managing Director",
  //     image: "/src/assets/images/director-placeholder.jpg", // Replace with actual image path
  //     socialLinks: {
  //       linkedin: "https://linkedin.com/in/rohitha-abeygunarathne",
  //       instagram: "https://instagram.com/rohitha.abeygunarathne",
  //     },
  //   },
  //   {
  //     name: "Rohitha Abeygunarathne",
  //     position: "Founder Chairman / Managing Director",
  //     image: "/src/assets/images/director-placeholder.jpg", // Replace with actual image path
  //     socialLinks: {
  //       linkedin: "https://linkedin.com/in/rohitha-abeygunarathne",
  //       instagram: "https://instagram.com/rohitha.abeygunarathne",
  //     },
  //   },
  //   {
  //     name: "Rohitha Abeygunarathne",
  //     position: "Founder Chairman / Managing Director",
  //     image: "/src/assets/images/director-placeholder.jpg", // Replace with actual image path
  //     socialLinks: {
  //       linkedin: "https://linkedin.com/in/rohitha-abeygunarathne",
  //       instagram: "https://instagram.com/rohitha.abeygunarathne",
  //     },
  //   },
  //   {
  //     name: "Rohitha Abeygunarathne",
  //     position: "Founder Chairman / Managing Director",
  //     image: "/src/assets/images/director-placeholder.jpg", // Replace with actual image path
  //     socialLinks: {
  //       linkedin: "https://linkedin.com/in/rohitha-abeygunarathne",
  //       instagram: "https://instagram.com/rohitha.abeygunarathne",
  //     },
  //   },
  // ];

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
          breadcrumb="Home > About Us > Leadership"
          subtitle="Leadership"
          title="Excellence in Sri Lankan Properties"
          description="Introducing the team driving Odiliya Homes to create exceptional residencies and high-value lands nationwide."
          image={heroImg}
        />

        <Directors
          title="DIRECTORS"
          directors={directorsData}
          layout="featured"
          showSocialIcons={true}
        />

        {/* <Directors
          title="GROUP MANAGEMENT COMMITTEE"
          directors={managementData}
          layout="featured"
          showSocialIcons={true}
        /> */}
      </main>
      <Footer />
    </>
  );
}
