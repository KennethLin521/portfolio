"use client";

// Easter egg: click "Kenneth Lin" in the nav 5 times and a picture of Ollie
// slowly fades in over the whole site (90 seconds). For the first half the
// site stays clickable underneath; past ~50% opacity Ollie is "on top of"
// every button and the only way out is reloading the page.
import { useEffect, useRef, useState } from "react";

const CLICKS_NEEDED = 5;
const FADE_SECONDS = 90;

export default function OllieTakeover() {
  const [phase, setPhase] = useState("idle"); // idle → fading → blocking
  const clicks = useRef(0);

  useEffect(() => {
    const onNameClick = () => {
      clicks.current += 1;
      if (clicks.current >= CLICKS_NEEDED) {
        setPhase((p) => (p === "idle" ? "fading" : p));
      }
    };
    window.addEventListener("kl-name-click", onNameClick);
    return () => window.removeEventListener("kl-name-click", onNameClick);
  }, []);

  // At the halfway point Ollie starts intercepting clicks.
  useEffect(() => {
    if (phase !== "fading") return;
    const t = setTimeout(
      () => setPhase("blocking"),
      (FADE_SECONDS / 2) * 1000
    );
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "idle") return null;
  return (
    <div
      className={`ollie-takeover${phase === "blocking" ? " is-blocking" : ""}`}
      aria-hidden="true"
    />
  );
}
