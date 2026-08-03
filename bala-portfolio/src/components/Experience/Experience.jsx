import "./Experience.css";

import {
  FaPython,
  FaDatabase,
  FaChartBar,
  FaShieldAlt,
  FaBuilding,
} from "react-icons/fa";

import {
  SiMysql,
  SiDjango,
  SiPostman,
} from "react-icons/si";

import vyasticsLogo from "../../assets/images/vyastics_logo.jpg";
import edgeniusLogo from "../../assets/images/edgenius_logo.png";

const experiences = [
  {
    id: 1,

    company: "Vyatics Technologies",

    role: "Python-Django Developer Intern (On-site)",

    duration: "June 2025 - Present",

    description: [
      "Working on real-world software development projects involving backend development, REST APIs, databases and data processing.",

      "Developing scalable web applications using Django REST Framework while gaining practical experience with software architecture and industry development workflows.",

      "Collaborating with senior developers to understand frontend integration, API development, database design and software engineering best practices.",
    ],

    technologies: [
      {
        name: "Python",
        icon: <FaPython />,
      },
      {
        name: "Django",
        icon: <SiDjango />,
      },
      {
        name: "MySQL",
        icon: <SiMysql />,
      },
      {
        name: "REST API",
        icon: <FaShieldAlt />,
      },
      {
        name: "Postman",
        icon: <SiPostman />,
      },
    ],
  },

  {
    id: 2,

    company: "Edgenius Skillfied Mentor Pvt. Ltd.",

    role: "Data Analyst Intern",

    duration: "May 2025",

    description: [
      "Analyzed banking marketing campaign datasets to identify customer behavior patterns and evaluate campaign performance.",

      "Wrote SQL queries to retrieve and preprocess datasets for exploratory data analysis and business reporting.",

      "Built interactive dashboards and visual reports to identify factors influencing customer term-deposit subscriptions.",
    ],

    technologies: [
      {
        name: "SQL",
        icon: <FaDatabase />,
      },
      {
        name: "Python",
        icon: <FaPython />,
      },
      {
        name: "Power BI",
        icon: <FaChartBar />,
      },
      {
        name: "Excel",
        icon: <FaChartBar />,
      },
    ],
  },
];

function Experience() {
  return (
    <section className="experience-section" id="experience">
      <div className="experience-container">

        <div className="experience-heading">

          <p className="experience-label">
            Professional Journey
          </p>

          <h2>
            Work <span>Experience</span>
          </h2>

          <div className="experience-line"></div>

          <p className="experience-introduction">
            My internship experience has provided practical exposure
            to backend development, data analysis, API development,
            databases and collaborative software engineering practices.
          </p>

        </div>

        <div className="experience-grid">

          {experiences.map((experience) => (

            <div
              className="experience-card"
              key={experience.id}
            >

              <div className="experience-top">

                <div>

                <h3 className="company-title">
                    <img
                      src={experience.id === 2 ? edgeniusLogo : vyasticsLogo}
                      alt={experience.company}
                      className="company-icon"
                    />
                    {experience.company}
                </h3>

                  <p className="experience-role">
                    {experience.role}
                  </p>

                </div>

                <span className="experience-duration">
                  {experience.duration}
                </span>

              </div>

              <ul className="experience-points">

                {experience.description.map((point, index) => (

                  <li key={index}>
                    {point}
                  </li>

                ))}

              </ul>

              <div className="experience-technologies">

                {experience.technologies.map((technology) => (

                  <div
                    className="experience-tech"
                    key={technology.name}
                  >

                    <span>
                      {technology.icon}
                    </span>

                    {technology.name}

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Experience;