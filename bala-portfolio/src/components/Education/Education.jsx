import "./Education.css";

import {
  FaGraduationCap,
  FaSchool,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStar,
} from "react-icons/fa";

import AnnamalaiUniversityLogo from "../../assets/images/annamalai_university_logo.png";
import PushpalathaSchoolLogo from "../../assets/images/pushpalatha_school_logo.png";

const education = [
  {
    id: 1,
    icon: <img src={AnnamalaiUniversityLogo} alt="Annamalai University Logo" />,
    degree: "Bachelor of Technology (Mechanical Engineering)",
    institution: "Annamalai University (FEAT)",
    location: "Cuddalore",
    duration: "2021 – 2025",
    scoreLabel: "CGPA",
    score: "8.78",
  },

  {
    id: 2,
    icon: <img src={PushpalathaSchoolLogo} alt="Pushpalatha School Logo" />,
    degree: "Higher Secondary Course (Computer Science)",
    institution: "Pushpalatha School",
    location: "Tirunelveli",
    duration: "2020 – 2021",
    scoreLabel: "Percentage",
    score: "83%",
  },
];

function Education() {
  return (
    <section
      className="education-section"
      id="education"
    >
      <div className="education-container">

        <div className="education-heading">

          <p className="education-label">
            Academic Background
          </p>

          <h2>
            My <span>Education</span>
          </h2>

          <div className="education-line"></div>

          <p className="education-introduction">
            My academic journey has provided a strong foundation
            in analytical thinking, problem-solving and technical
            skills, supporting my transition into software
            development and data analytics.
          </p>

        </div>

        <div className="education-timeline">

          {education.map((item) => (

            <div
              className="education-card"
              key={item.id}
            >

              <div className="education-icon">

                {item.icon}

              </div>

              <div className="education-content">

                <h3>{item.degree}</h3>

                <p className="institution">
                  {item.institution}
                </p>

                <div className="education-info">

                  <span>

                    <FaMapMarkerAlt />

                    {item.location}

                  </span>

                  <span>

                    <FaCalendarAlt />

                    {item.duration}

                  </span>

                </div>

                <div className="education-score">

                  <FaStar />

                  <strong>{item.scoreLabel}</strong>

                  <span>{item.score}</span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Education;