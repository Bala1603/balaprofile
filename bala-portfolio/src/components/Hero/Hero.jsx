import "./Hero.css";

import profileImage from "../../assets/images/profile_image.png";
import resumeFile from "../../assets/resume/Bala_Resume.pdf";
import TextType from "../TextType/TextType";
import TechStack from "../TechStack/TechStack";

import {
  FaLinkedinIn,
  FaGithub,
  FaEye,
  FaCode,
  FaDatabase,
  FaShieldAlt,
  FaInstagram,
} from "react-icons/fa";

function Hero() {
  return (
    <>
      <main className="hero-section" id="home">
        <div className="hero-layout">

          {/* LEFT */}
          <div className="profile-card">
            <div className="profile-image-wrapper">
              <img
                src={profileImage}
                alt="Bala S"
                className="profile-image"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="hero-right-section">
            <section className="about-card" id="about">
              <div className="about-content">

                <span className="intro-badge">
                  Hello, I'm
                </span>

                <h1 className="hero-name">
                  Bala
                </h1>

                <h2 className="hero-role">
                  <TextType
                    text={[
                      "Python Backend Developer",
                      "Data Analyst",
                    ]}
                    typingSpeed={90}
                    deletingSpeed={45}
                    pauseDuration={1800}
                    showCursor
                    cursorCharacter="|"
                    loop
                  />
                </h2>

                <div className="title-line"></div>

                <p className="hero-description">
                  I build secure, scalable and efficient backend systems
                  using Python, Django and Django REST Framework.
                  I enjoy solving real-world problems and turning ideas
                  into powerful applications.
                </p>

                <div className="specialities">

                  <div className="speciality-item">
                    <FaCode />
                    <span>Backend Development</span>
                  </div>

                  <div className="speciality-divider"></div>

                  <div className="speciality-item">
                    <FaDatabase />
                    <span>Database Design</span>
                  </div>

                  <div className="speciality-divider"></div>

                  <div className="speciality-item">
                    <FaShieldAlt />
                    <span>RESTful APIs</span>
                  </div>

                </div>

                <a
                  href={resumeFile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-button"
                >
                  <FaEye />
                  <span>View Resume</span>
                </a>

              </div>
            </section>

            <div className="social-links">

              <a
                href="https://www.linkedin.com/in/baladata/"
                target="_blank"
                rel="noreferrer"
                className="social-button"
              >
                <FaLinkedinIn />
              </a>

              <span className="social-divider"></span>

              <a
                href="https://github.com/Bala1603"
                target="_blank"
                rel="noreferrer"
                className="social-button"
              >
                <FaGithub />
              </a>

              <span className="social-divider"></span>

              <a
                href="https://www.instagram.com/itzbala_22/?hl=en"
                target="_blank"
                rel="noreferrer"
                className="social-button"
              >
                <FaInstagram />
              </a>

            </div>

          </div>

        </div>
      </main>

      {/* Tech Stack moved outside Hero */}
      <TechStack />

    </>
  );
}

export default Hero;