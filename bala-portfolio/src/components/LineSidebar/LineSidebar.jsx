import { useRef, useState, useEffect, useCallback } from "react";
import "./LineSidebar.css";

const CURVES = {
  linear: (p) => p,
  smooth: (p) => p * p * (3 - 2 * p),
};

export default function LineSidebar() {
  const items = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Certificates", href: "#certificates" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const targetRef = useRef([]);
  const currentRef = useRef([]);
  const raf = useRef(null);
  const activeRef = useRef(0);

  const [active, setActive] = useState(0);

  const animate = useCallback(() => {
    let moving = false;

    itemRefs.current.forEach((item, i) => {
      if (!item) return;

      const target = Math.max(targetRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const current = currentRef.current[i] || 0;
      const next = current + (target - current) * 0.14;

      currentRef.current[i] = next;
      item.style.setProperty("--effect", next.toFixed(4));

      if (Math.abs(target - next) > 0.003) {
        moving = true;
      }
    });

    if (moving) {
      raf.current = requestAnimationFrame(animate);
    } else {
      raf.current = null;
    }
  }, []);

  const start = () => {
    if (!raf.current) {
      raf.current = requestAnimationFrame(animate);
    }
  };

  const onMove = (e) => {
    const rect = listRef.current.getBoundingClientRect();
    const pointer = e.touches ? e.touches[0] : e;
    const y = pointer.clientY - rect.top;
    const motionRadius = Math.max(72, Math.min(128, window.innerWidth * 0.1));

    itemRefs.current.forEach((item, i) => {
      const center = item.offsetTop + item.offsetHeight / 2;
      const distance = Math.abs(y - center);

      targetRef.current[i] = CURVES.smooth(
        Math.max(0, 1 - distance / motionRadius)
      );
    });

    start();
  };

  const onLeave = () => {
    targetRef.current = targetRef.current.map(() => 0);
    start();
  };

  useEffect(() => {
    activeRef.current = active;
    start();
  }, [active]);

  useEffect(() => {
    const sectionEls = items
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const onScroll = () => {
      const scrollCenter = window.scrollY + window.innerHeight * 0.35;
      let nextIndex = activeRef.current;

      sectionEls.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollCenter >= top && scrollCenter < bottom) {
          nextIndex = index;
        }
      });

      if (nextIndex !== activeRef.current) {
        activeRef.current = nextIndex;
        setActive(nextIndex);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <aside className="lineSidebarContainer">

      <nav className="lineSidebar">

        <ul
          ref={listRef}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          onTouchMove={onMove}
        >

          {items.map((item, i) => (

            <li
              key={item.label}
              ref={(el) => (itemRefs.current[i] = el)}
              onClick={() => setActive(i)}
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