import "./App.css";

import ClickSpark from "./components/ClickSpark/ClickSpark";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import Certificates from "./components/Certificates/Certificates";
import Education from "./components/Education/Education";
import Contact from "./components/Contact/Contact";

function App() {
  return (
    <ClickSpark
      sparkColor="#ef4444"
      sparkSize={13}
      sparkRadius={50}
      sparkCount={17}
      duration={1400}
      easing="ease-out"
      extraScale={1}
    >
      <div className="portfolio-app">
        <Navbar />
        <section id="home">
          <Hero />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="certificates">
          <Certificates />
        </section>
        <section id="education">
          <Education />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
    </ClickSpark>
  );
}

export default App;