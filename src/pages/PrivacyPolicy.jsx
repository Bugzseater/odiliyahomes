import React, { useEffect } from "react";
import MainNavbar from "@/components/MainNavbar";
import Footer from "@/components/Footer";
import "@/styles/PrivacyPolicy.css";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy - Odiliya Homes";
  }, []);

  return (
    <>
      <MainNavbar />
      <div className="privacy-page">
        <div className="privacy-container">
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-subtitle">Odiliyahomes.lk</p>

          {/* Introduction */}
          <section className="privacy-section">
            <p>
              At Odiliya Homes, your privacy is our priority. We are committed
              to safeguarding your personal information and ensuring
              transparency in how it is handled. This Privacy Policy outlines
              the ways in which we collect, use, disclose, and protect your data
              when you visit our website:{" "}
              <a
                href="https://odiliyaresidencies.lk"
                className="privacy-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://odiliyaresidencies.lk
              </a>
              . By accessing or using our website, you acknowledge and agree to
              the practices described in this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="privacy-section">
            <h2>Information We Collect</h2>
            <p>
              We may collect and process the following types of information to
              provide and improve our services:
            </p>

            <h3>1. Personal Identification Information</h3>
            <p>
              This includes your name, email address, phone number, and any
              other details you provide when submitting contact forms,
              subscribing to our newsletter, or otherwise interacting with our
              website.
            </p>

            <h3>2. Usage Data</h3>
            <p>
              We may automatically collect information about how you use our
              website, including your IP address, browser type, pages visited,
              and the date and time of your visit. This data helps us enhance
              user experience and maintain website functionality.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section className="privacy-section">
            <h2>How We Use Your Information</h2>
            <p>
              The information we collect is used for the following purposes:
            </p>
            <ul>
              <li>
                <strong>To Provide and Maintain Our Services:</strong> Ensuring
                our website operates effectively and delivers a seamless
                experience tailored to your needs.
              </li>
              <li>
                <strong>To Improve Our Website:</strong> Analyzing user
                interactions and behavior to enhance functionality, performance,
                and overall user experience.
              </li>
              <li>
                <strong>To Communicate with You:</strong> Responding to
                inquiries, providing updates, and sharing promotional materials
                if you have opted in to receive them.
              </li>
            </ul>
          </section>

          {/* Data Sharing and Disclosure */}
          <section className="privacy-section">
            <h2>Data Sharing and Disclosure</h2>
            <p>
              We respect your privacy and do not sell, trade, or otherwise
              transfer your personal information to third parties without your
              consent, except in the following circumstances:
            </p>

            <h3>Service Providers</h3>
            <p>
              We may share information with trusted third-party companies that
              assist us in operating our website or conducting our business.
              These providers are obligated to maintain the confidentiality of
              your information.
            </p>

            <h3>Legal Requirements</h3>
            <p>
              We may disclose your information if required to do so by law,
              regulation, or legal process.
            </p>
          </section>

          {/* Data Security */}
          <section className="privacy-section">
            <h2>Data Security</h2>
            <p>
              We implement robust security measures to protect your personal
              information from unauthorized access, alteration, disclosure, or
              destruction. While we strive to safeguard your data, please note
              that no method of transmission over the internet or electronic
              storage is completely secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          {/* Your Data Protection Rights */}
          <section className="privacy-section">
            <h2>Your Data Protection Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the following rights
              regarding your personal data:
            </p>
            <ul>
              <li>
                <strong>Access:</strong> Request access to copies of the
                personal data we hold about you.
              </li>
              <li>
                <strong>Rectification:</strong> Request correction of any
                inaccurate or incomplete information.
              </li>
              <li>
                <strong>Erasure:</strong> Request deletion of your personal
                data, subject to applicable conditions.
              </li>
              <li>
                <strong>Restriction:</strong> Request that we restrict the
                processing of your personal data in certain circumstances.
              </li>
              <li>
                <strong>Objection:</strong> Object to the processing of your
                personal data under specific conditions.
              </li>
              <li>
                <strong>Data Portability:</strong> Request transfer of your
                personal data to another organization or directly to you, where
                applicable.
              </li>
            </ul>
          </section>

          {/* Third-Party Links */}
          <section className="privacy-section">
            <h2>Third-Party Links</h2>
            <p>
              Our website may include links to external websites. Please note
              that we are not responsible for the privacy practices or content
              of these third-party sites. We encourage you to review their
              privacy policies before providing any personal information.
            </p>
          </section>

          {/* Contact Information */}
          <section className="privacy-section">
            <h2>Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please feel free to contact us:
            </p>
            <ul>
              <li>
                <strong>Email:</strong> info@odiliyaresidencies.lk
              </li>
              <li>
                <strong>Phone:</strong> (+94) 11 2 949 700
              </li>
              <li>
                <strong>Address:</strong> No 29, Negombo Road, Wattala, Sri
                Lanka 1300
              </li>
            </ul>
          </section>

          {/* Last Updated */}
          <section className="privacy-section">
            <p
              style={{ fontStyle: "italic", color: "#666", marginTop: "2rem" }}
            >
              Last Updated: October 23, 2025
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
