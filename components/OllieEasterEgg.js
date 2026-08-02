"use client";

// Easter egg: type "ollie" anywhere on the site and Ollie runs across the
// bottom of the screen. Invisible unless summoned.
import { useEffect, useRef, useState } from "react";

export default function OllieEasterEgg() {
  const [running, setRunning] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    let buffer = "";
    const onKey = (e) => {
      const tag = e.target && e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const key = (e.key || "").toLowerCase();
      if (key.length !== 1) return;
      buffer = (buffer + key).slice(-5);
      if (buffer === "ollie") {
        buffer = "";
        setRunning(false);
        // restart the animation even if he's already mid-run
        requestAnimationFrame(() => {
          setRunning(true);
          clearTimeout(timer.current);
          timer.current = setTimeout(() => setRunning(false), 4200);
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer.current);
    };
  }, []);

  if (!running) return null;
  return (
    <img
      className="ollie-runner"
      src="/images/olie.jpg"
      alt="Ollie, summoned"
      title="woof"
    />
  );
}
