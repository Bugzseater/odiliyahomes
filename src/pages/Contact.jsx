import React, { useMemo, useEffect } from "react";
import MainNavbar from "@/components/MainNavbar";
import ContactHeroSection from "@/components/ContactHeroSection";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import ContactFormWithImage from "@/components/ContactFormWithImage";
// import towerImage from "@/assets/images/img2_10.JPG";

export default function Contact() {
  //heading tittle
  useEffect(() => {
    document.title = "Real Estate Agency | Contact Us | Odiliya Homes";
    const metadescription = document.querySelector('meta[name="description"]');
    if (metadescription) {
      metadescription.setAttribute(
        "content",
        "Contact Odiliya Homes today - your reliable real estate agency in Sri Lanka, assisting with property purchases, sales, and investment opportunities.",
      );
    }

    // Set meta keywords
    let metaKeywords = document.querySelector("meta[name='keywords']");
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "real estate agency";
  }, []);

  // Social media links configuration
  const socialLinks = [
    {
      platform: "instagram",
      url: "https://www.instagram.com/odiliya_homes?igsh=MWhqZjhyM21oeDk5Zg%3D%3D&utm_source=qr",
    },
    {
      platform: "whatsapp",
      url: "https://wa.me/94704888152",
    },
    {
      platform: "facebook",
      url: "https://www.facebook.com/odiliyahomes",
    },
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/company/13625057/admin/dashboard/",
    },
    {
      platform: "tiktok",
      url: "https://www.tiktok.com/@odiliyagroup/",
    },
    {
      platform: "youtube",
      url: "https://www.youtube.com/channel/UC2n2upw9kXZYo9qpk7K_qCg",
    },
    {
      platform: "pintrest",
      url: "https://www.pinterest.com/odiliyahomessm/",
    },
  ];

  const contactInfo = useMemo(
    () => [
      {
        type: "phone",
        label: "Phone Number",
        value: "+94 11 294 9700",
      },
      {
        type: "email",
        label: "Email Address",
        value: "info@odiliyaresidencies.lk",
      },
      {
        type: "address",
        label: "Address",
        value: "No.29, Negombo Road,\nWattala, Sri Lanka.",
      },
    ],
    [],
  );

  return (
    <>
      <MainNavbar />
      <main
        style={{ paddingTop: "1rem", minHeight: "100vh" }}
        className="contact-page"
      >
        <ContactHeroSection
          title="CONTACT US"
          socialLinks={socialLinks}
          showGradient={true}
        />

        <Map
          title="VISIT OUR COMPANY"
          mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.311937524844!2d79.8852876!3d6.9751764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25876cd0feff1%3A0xdae5e984e9cac9b0!2sOdiliya%20Homes!5e0!3m2!1sen!2slk!4v1234567890123!5m2!1sen!2slk"
          location={{
            name: "Odiliya Homes",
            address: "No 29, Negombo Road, Wattala, Sri Lanka 11300",
          }}
          contactInfo={contactInfo}
        />

        {/* Debug info - remove this after testing */}
        {/* <div
          style={{
            padding: "1rem",
            background: "#f0f0f0",
            margin: "1rem",
            borderRadius: "8px",
            fontSize: "12px",
            fontFamily: "monospace",
          }}
        > */}
        {/* <strong>Debug Info:</strong>
          <br />
          API Key exists: {apiKey ? "Yes" : "No"}
          <br />
          API Key length: {apiKey?.length || 0}
          <br />
          API Key preview:{" "}
          {apiKey ? apiKey.substring(0, 10) + "..." : "Not found"}
        </div> */}

        {/* Contact Form with Image */}
        <ContactFormWithImage
          title="TALK TO US"
          subtitle="Tell us about your project and we'll get back to you within 24 hours."
          imageSrc="https://pub-9bd45192d22f4f0e895c52adcfb2460a.r2.dev/img1_0_xyeveu%20(1).jpg"
          imageAlt="Odiliya Homes"
          onSubmit={async (formData) => {
            // Handle form submission - replace with your API call
            console.log("Contact form submitted:", formData);
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }}
          onSuccess={(formData) => {
            console.log("Form submission successful:", formData);
          }}
          onError={(error) => {
            console.error("Form submission failed:", error);
          }}
        />
      </main>
      <Footer />
    </>
  );
}
