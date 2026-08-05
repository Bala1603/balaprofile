import { useRef, useState, useEffect } from "react";
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

  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sectionEls = items
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    if (!sectionEls.length) return undefined;

    const rootMargin = window.innerWidth <= 560
      ? "-18% 0px -48% 0px"
      : "-25% 0px -45% 0px";

    const observer = new IntersectionObserver((entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) return;

      const nextIndex = sectionEls.indexOf(visibleEntry.target);

      if (nextIndex !== -1 && nextIndex !== activeRef.current) {
        activeRef.current = nextIndex;
        setActive(nextIndex);
      }
    }, {
      threshold: [0.18, 0.38, 0.55, 0.72],
      rootMargin,
    });

    sectionEls.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
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
                onNavigate?.();
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