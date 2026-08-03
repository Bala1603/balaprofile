import "./TechStack.css";

import {
  SiPython,
  SiDjango,
  SiMysql,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiPandas,
  SiNumpy,
  SiPostman,
} from "react-icons/si";

import {
  FaBrain,
  FaDatabase,
  FaMicrosoft,
  FaFileExcel,
} from "react-icons/fa";

import { FaCss3Alt } from "react-icons/fa";
import { IoLogoTableau } from "react-icons/io5";

const row1 = [
  { icon: <SiPython />, name: "Python" },
  { icon: <SiDjango />, name: "Django" },
  { icon: <SiMysql />, name: "MySQL" },
  { icon: <FaDatabase />, name: "SQL" },
  { icon: <SiGit />, name: "Git" },
  { icon: <SiGithub />, name: "GitHub" },
  { icon: <SiPostman />, name: "Postman" },
  { icon: <FaBrain />, name: "Machine Learning" },
];

const row2 = [
  { icon: <FaFileExcel />, name: "Excel" },
  { icon: <FaMicrosoft />, name: "Power BI" },
  { icon: <IoLogoTableau />, name: "Tableau" },
  { icon: <SiPandas />, name: "Pandas" },
  { icon: <SiNumpy />, name: "NumPy" },
  { icon: <SiHtml5 />, name: "HTML" },
  { icon: <FaCss3Alt />, name: "CSS" },
  { icon: <SiJavascript />, name: "JavaScript" },
];

function SkillRow({ skills, reverse }) {
  return (
    <div className={`skill-row ${reverse ? "reverse" : ""}`}>
      <div className="skill-track">
        {[...skills, ...skills].map((skill, index) => (
          <div className="skill-card" key={index}>
            {skill.icon}
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechStack() {
  return (
    <section className="tech-stack-section">

      <p className="section-subtitle">SKILLS</p>

      <h2 className="section-title">
        Technologies I Work With
      </h2>

      <SkillRow skills={row1} />
      <SkillRow skills={row2} reverse />

    </section>
  );
}

export default TechStack;