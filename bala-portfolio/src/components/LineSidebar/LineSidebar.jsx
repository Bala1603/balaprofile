import { useState, useEffect } from "react";
import "./LineSidebar.css";

export default function LineSidebar({ isOpen = false, onNavigate }) {
  const items = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Certificates", href: "#certificates" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const sectionEls = items
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    if (!sectionEls.length) return undefined;

    const updateActiveSection = () => {
      const viewportOffset = window.innerHeight * 0.38;

      let nextIndex = 0;
      let smallestDistance = Number.POSITIVE_INFINITY;

      sectionEls.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - viewportOffset);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          nextIndex = index;
        }
      });

      setActive((current) => (current === nextIndex ? current : nextIndex));
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [items]);

  return (
    <aside className={`lineSidebarContainer ${isOpen ? "mobile-open" : ""}`}>

      <nav className="lineSidebar">

        <ul>

          {items.map((item, i) => (

            <li
              key={item.label}
              onClick={() => {
                setActive(i);
              }}
              className={active === i ? "active" : ""}
            >

              <span className="lineMarker"></span>

              <a href={item.href}>
                {item.label}
              </a>

            </li>

          ))}

        </ul>

      </nav>

    </aside>
  );
}