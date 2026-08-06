
import { useEffect, useState } from "react";

import "./Navbar.css";
import LineSidebar from "../LineSidebar/LineSidebar";
import Decrypted from "../decrypted_text/decrypted";

const socialLinks = [
  { name: "GitHub", url: "https://github.com/Bala1603" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/baladata/" },
];

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Certificates", href: "#certificates" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("#home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const updateActiveLink = () => {
      const hash = window.location.hash || "#home";
      setActiveLink(hash);
    };

    updateActiveLink();
    window.addEventListener("hashchange", updateActiveLink);
    return () => window.removeEventListener("hashchange", updateActiveLink);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="navbar-shell">
        <div className="navbar-top">
          <a className="navbar-brand" href="#home">
            <Decrypted
              text="Bala Murugan"
              parentClassName="brand-text"
              className="decrypted-revealed"
              encryptedClassName="decrypted-encrypted"
              animateOn="inViewHover"
              sequential={true}
              revealDirection="start"
              speed={105}
              maxIterations={12}
            />
          </a>

          <div className="navbar-actions">
            <div className="navbar-socials">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill"
                >
                  {social.name}
                </a>
              ))}
            </div>

            <button
              type="button"
              className="navbar-list-toggle"
              aria-label="Open section navigation"
              aria-expanded={isSidebarOpen}
              onClick={() => setIsSidebarOpen((open) => !open)}
            >
              <span className="navbar-list-toggle-icon">☰</span>
              <span className="navbar-list-toggle-text">Menu</span>
            </button>
          </div>
        </div>
      </header>

      <LineSidebar isOpen={isSidebarOpen} />
    </>
  );
};

export default Navbar;