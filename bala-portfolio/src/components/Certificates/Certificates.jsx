import "./Certificates.css";

import { useState } from "react";

import {
  FaEye,
  FaTimes,
  FaCertificate,
} from "react-icons/fa";

import linkedinCertificate from "../../assets/images/Certificates/Linkedin.png";
import letsupgradeCertificate from "../../assets/images/Certificates/Letsupgrade.jpg";
import upgradCertificate from "../../assets/images/Certificates/upgrad.jpg";
import tataCertificate from "../../assets/images/Certificates/Tata.jpg";
import tcsCertificate from "../../assets/images/Certificates/TCS.jpg";
import login360Certificate from "../../assets/images/Certificates/Login360.jpg";

import linkedinLogo from "../../assets/images/linkedin_logo.png";
import letsupgradeLogo from "../../assets/images/letsupgrad_logo.png";
import upgradLogo from "../../assets/images/upgrad_logo.png";
import tataLogo from "../../assets/images/tata_logo.png";
import tcsLogo from "../../assets/images/tcs_logo.png";
import login360Logo from "../../assets/images/login360_logo.jpg";

const certificatesData = [
  {
    id: 1,
    title: "Career Skills in Data Analytics",
    icon: linkedinLogo,
    organization: "LinkedIn Learning",
    image: linkedinCertificate,
    skills: [
      "Data Analytics",
      "Career Skills",
      "Business",
    ],
  },

  {
    id: 2,
    title: "Excel & Power BI Bootcamp",
    icon: letsupgradeLogo,
    organization: "LetsUpgrade",
    image: letsupgradeCertificate,
    skills: [
      "Excel",
      "Power BI",
      "Dashboard",
    ],
  },

  {
    id: 3,
    title: "Data Analysis using SQL",
    icon: upgradLogo,
    organization: "upGrad",
    image: upgradCertificate,
    skills: [
      "SQL",
      "Database",
      "Analysis",
    ],
  },

  {
    id: 4,
    title: "GenAI Powered Data Analytics",
    icon: tataLogo,
    organization: "TATA",
    image: tataCertificate,
    skills: [
      "GenAI",
      "Analytics",
      "AI",
    ],
  },

  {
    id: 5,
    title: "Career Edge Young Professional",
    icon: tcsLogo,
    organization: "TCS iON",
    image: tcsCertificate,
    skills: [
      "Professional Skills",
      "Communication",
      "IT",
    ],
  },

  {
    id: 6,
    title: "Data Analyst",
    icon: login360Logo,
    organization: "Login360",
    image: login360Certificate,
    skills: [
      "Python",
      "SQL",
      "Power BI",
    ],
  },
];

function Certificates() {
  const [selectedCertificate, setSelectedCertificate] =
    useState(null);

  return (
    <section
      className="certificates-section"
      id="certificates"
    >
      <div className="certificates-container">

        <div className="certificates-heading">

          <p className="certificates-label">
            Professional Certifications
          </p>

          <h2>
            My <span>Certificates</span>
          </h2>

          <div className="certificates-line"></div>

          <p className="certificates-introduction">
            These certifications represent my continuous learning
            journey in data analytics, backend development,
            databases, business intelligence and emerging AI
            technologies.
          </p>

        </div>

        <div className="certificates-grid">

          {certificatesData.map((certificate) => (

            <div
              className="certificate-card"
              key={certificate.id}
            >

              <div className="certificate-top">

                <FaCertificate className="certificate-icon"/>

                <button
                  className="view-button"
                  onClick={() =>
                    setSelectedCertificate(certificate.image)
                  }
                >
                  <FaEye />
                </button>

              </div>
              <img
                src={certificate.icon}
                alt={certificate.organization}
                className="certificate-logo"
              />

              <h3>
                {certificate.title}
              </h3>

              <p className="certificate-company">
                {certificate.organization}
              </p>

              <div className="certificate-skills">

                {certificate.skills.map((skill) => (

                  <span
                    className="certificate-skill"
                    key={skill}
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>

      {selectedCertificate && (

        <div
          className="certificate-modal"
          onClick={() =>
            setSelectedCertificate(null)
          }
        >

          <div
            className="certificate-modal-content"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-button"
              onClick={() =>
                setSelectedCertificate(null)
              }
            >
              <FaTimes />
            </button>

            <img
              src={selectedCertificate}
              alt="Certificate"
            />

          </div>

        </div>

      )}

    </section>
  );
}

export default Certificates;