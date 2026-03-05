import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
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
import history1 from "@/assets/images/img1_9.JPG";
import history2 from "@/assets/images/history2.jpg";

export default function About() {
  // useState හි <any> ඉවත් කර ඇත
  const [liveData, setLiveData] = useState(null);

  useEffect(() => {
    const docRef = doc(db, "settings", "aboutPage");
    const unsub = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setLiveData(docSnap.data());
      }
    });

    document.title = "Real Estate Companies in Sri Lanka | Overview | Odiliya Homes";
    return () => unsub();
  }, []);

  return (
    <>
      <MainNavbar />
      <main style={{ paddingTop: "1rem", minHeight: "100vh", background: "#ffffff" }}>
        <AboutHeroSection
          breadcrumb="Home > About Us > Overview"
          subtitle="OVERVIEW"
          title="WHAT IS ODILIYA"
          description={liveData?.description || "Odiliya Homes is one of the leading real estate companies in Sri Lanka with 12+ years of expertise. We create premium residential spaces that blend elegance, innovation, and trust."}
          image={heroImg}
          stats={[
            { number: liveData?.completedProjects + "+" || "100+", label: "Completed Projects" },
            { number: liveData?.ongoingProjects +"+" || "20+", label: "Ongoing Projects" },
            { number: liveData?.soldOutProjects +"+" || "100+", label: "Sold Out Projects" },
            { number: liveData?.yearsOfTrust +"+" || "13+", label: "Years Of Trust" },
          ]}
        />

        <AboutContent
          title="OUR MISSION"
          description="To be Sri Lanka’s most trusted real estate brand, delivering luxury and semi-luxury living with excellent service and operational excellence."
          image={mission}
          layout="image-left"
          accentPosition="right"
          imageStyle="default"
        />

        <AboutContent
          title="OUR VISION"
          description="To provide a permanent solution for the housing needs of enterprising individuals by offering luxury and semi-luxury condominium units at reasonable prices."
          image={vision}
          layout="image-right"
          accentPosition="left"
          imageStyle="rounded"
        />

        <AboutContent
          title="OUR GOAL"
          description="Our goal then and now is to provide quality projects. As a process transformation company, we rethink and rebuild processes for the digital age."
          image={goal}
          layout="image-left"
          accentPosition="right"
          imageStyle="default"
        />

        <History
          title="OUR HISTORY"
          description="The Group began in 2013 with a bold vision: to make real estate accessible to every Sri Lankan family. From affordable lands to luxury residences."
          primaryImage={history2}
          secondaryImage={history1}
          layout="image-left"
        />

        <HistoryVideo
          title="Over 13+ years of experience"
          description="Explore our journey and see how we transform visions into reality through premium residencies."
          videoSrc="https://res.cloudinary.com/dtyx8tfbl/video/upload/v1766050284/WhatsApp_Video_2025-11-18_at_16.03.55_zp8bct.mp4"
          posterSrc="/path/to/poster-image.jpg"
          autoplay={false}
          controls={true}
        />
      </main>
      <ContactForm />
      <Footer />
    </>
  );
}