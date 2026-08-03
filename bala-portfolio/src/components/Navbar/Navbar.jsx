
import { useEffect, useState } from "react";

import "./Navbar.css";
import LineSidebar from "../LineSidebar/LineSidebar";
import Decrypted from "../decrypted_text/decrypted";

const socialLinks = [
  { name: "GitHub", url: "https://github.com" },
  { name: "LinkedIn", url: "https://www.linkedin.com" },
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

  useEffect(() => {
    const updateActiveLink = () => {
      const hash = window.location.hash || "#home";
      setActiveLink(hash);
    };

    updateActiveLink();
    window.addEventListener("hashchange", updateActiveLink);
    return () => window.removeEventListener("hashchange", updateActiveLink);
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
        </div>
      </header>

      <LineSidebar />
    </>
  );
};

export default Navbar;