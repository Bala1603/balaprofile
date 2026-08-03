import "./Projects.css";

import {
  FaPython,
  FaDatabase,
  FaGitAlt,
  FaGithub,
  FaFileExcel,
  FaChartBar,
} from "react-icons/fa";

import {
  SiDjango,
  SiMysql,
  SiPostman,
  SiPandas,
  SiNumpy,
  SiJupyter,
} from "react-icons/si";

const projects = [
  {
    id: 1,
    title: "Construction ERP Backend System",
    category: "Current Company Project",
    featured: true,
    description:
      "Currently developing a Construction ERP backend system using Python, Django REST Framework and MySQL. The application manages construction projects, project budgets, budget requests, resources and multi-level approval workflows. My work includes designing REST APIs, implementing role-based permissions and building scalable backend business logic for users, administrators and super administrators.",
    technologies: [
      { name: "Python", icon: <FaPython /> },
      { name: "Django", icon: <SiDjango /> },
      { name: "DRF", icon: <SiDjango /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "Postman", icon: <SiPostman /> },
      { name: "Git", icon: <FaGitAlt /> },
    ],
    githubUrl: "",
  },
  {
    id: 2,
    title: "Hospital Management System",
    category: "Backend Development",
    featured: false,
    description:
      "Developed a role-based Hospital Management System using Django REST Framework and MySQL. The application supports doctors, nurses, patients and administrative users with secure access. It includes patient registration, hospital admission, prescription management, staff recruitment and role-specific update permissions through REST APIs.",
    technologies: [
      { name: "Python", icon: <FaPython /> },
      { name: "Django", icon: <SiDjango /> },
      { name: "DRF", icon: <SiDjango /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "Postman", icon: <SiPostman /> },
    ],
    githubUrl: "",
  },
  {
    id: 3,
    title: "Tesla Sales and Production Dashboard",
    category: "Power BI Data Analysis",
    featured: false,
    description:
      "Developed an interactive Power BI dashboard to analyze Tesla sales performance, production trends, revenue and key business metrics. Cleaned and transformed the dataset using Power Query and created calculated measures using DAX. Designed KPI cards, bar charts and trend visualizations to support data-driven insights.",
    technologies: [
      { name: "Power BI", icon: <FaChartBar /> },
      { name: "Power Query", icon: <FaDatabase /> },
      { name: "DAX", icon: <FaChartBar /> },
      { name: "Excel", icon: <FaFileExcel /> },
    ],
    githubUrl:
      "https://github.com/Bala1603/Tesla-Sales-and-Production-Report",
  },
  {
    id: 4,
    title: "Sports Players Data Analysis",
    category: "Python Data Analysis",
    featured: false,
    description:
      "Performed data cleaning and preprocessing to handle missing values and inconsistent player records. Applied filtering, grouping and aggregation techniques to summarize player statistics. Conducted exploratory data analysis using Pandas and NumPy to identify performance patterns and meaningful insights.",
    technologies: [
      { name: "Python", icon: <FaPython /> },
      { name: "Pandas", icon: <SiPandas /> },
      { name: "NumPy", icon: <SiNumpy /> },
      { name: "Jupyter", icon: <SiJupyter /> },
    ],
    githubUrl: "https://github.com/Bala1603/SPORTS-DATA",
  },
  {
    id: 5,
    title: "Road Accidents Data Analysis",
    category: "Excel Data Analysis",
    featured: false,
    description:
      "Developed an interactive Excel dashboard to analyze road accident patterns and important trends. Used data cleaning, Pivot Tables, Pivot Charts and Slicers to build dynamic filters and visual reports. The dashboard converts raw accident data into clear and actionable insights.",
    technologies: [
      { name: "Excel", icon: <FaFileExcel /> },
      { name: "Pivot Tables", icon: <FaDatabase /> },
      { name: "Charts", icon: <FaChartBar /> },
      { name: "Dashboard", icon: <FaChartBar /> },
    ],
    githubUrl: "https://github.com/Bala1603/Road-Accident-Excel",
  },
];

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <div className="projects-heading">
          <p className="projects-label">My development journey</p>

          <h2>
            Featured <span>Projects</span>
          </h2>

          <div className="projects-heading-line"></div>

          <p className="projects-introduction">
            A collection of backend-development and data-analysis projects that
            demonstrate my experience in API development, database design,
            business logic, data processing and dashboard creation.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`project-card ${
                project.featured ? "featured-project" : ""
              }`}
            >
              <div className="project-top">
                <div>
                  <span className="project-number">
                    {String(project.id).padStart(2, "0")}
                  </span>

                  <p className="project-category">{project.category}</p>
                </div>

                {project.featured && (
                  <span className="working-badge">Currently Working</span>
                )}
              </div>

              <h3>{project.title}</h3>

              <p className="project-description">{project.description}</p>

              <div className="project-line"></div>

              <div className="technology-list">
                {project.technologies.map((technology) => (
                  <div
                    className="technology"
                    key={`${project.id}-${technology.name}`}
                  >
                    <span className="technology-icon">{technology.icon}</span>
                    <span>{technology.name}</span>
                  </div>
                ))}
              </div>

              <div className="project-actions">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="github-link"
                  >
                    <FaGithub />
                    View GitHub
                  </a>
                ) : (
                  <span className="github-link github-disabled">
                    <FaGithub />
                    GitHub Soon
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;