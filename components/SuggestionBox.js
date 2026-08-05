"use client";

// Restaurant suggestion box → Google Apps Script → the Suggestions tab of
// Kenneth's spreadsheet. The endpoint URL lives in NEXT_PUBLIC_SUGGEST_URL
// (set in Vercel; requires one redeploy to take effect).
//
// The fetch uses no-cors + a plain-text body: that's the standard Apps
// Script pattern — no preflight, fire-and-forget, optimistic success.
import { useState } from "react";
import { useLang, pick } from "../lib/i18n";
import { ui } from "../content/strings";

const ENDPOINT = process.env.NEXT_PUBLIC_SUGGEST_URL;

export default function SuggestionBox() {
  const { lang } = useLang();
  const t = ui.food.suggest;
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // Honeypot: real visitors never see or fill this field
    if (form.get("website")) return;

    if (!ENDPOINT) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          restaurant: form.get("restaurant") || "",
          location: form.get("location") || "",
          note: form.get("note") || "",
          lang,
        }),
      });
      setStatus("done");
      e.target.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section">
      <div className="section-label">
        <span className="num">03</span>
        <h2>{pick(t.title, lang)}</h2>
      </div>
      <p className="list-blurb">{pick(t.blurb, lang)}</p>

      {status === "done" ? (
        <p className="suggest-done">{pick(t.done, lang)}</p>
      ) : (
        <form className="suggest-form" onSubmit={onSubmit}>
          <input
            type="text"
            name="restaurant"
            required
            maxLength={120}
            placeholder={pick(t.restaurant, lang)}
            aria-label={pick(t.restaurant, lang)}
          />
          <input
            type="text"
            name="location"
            maxLength={120}
            placeholder={pick(t.location, lang)}
            aria-label={pick(t.location, lang)}
          />
          <textarea
            name="note"
            rows={3}
            maxLength={500}
            placeholder={pick(t.note, lang)}
            aria-label={pick(t.note, lang)}
          />
          {/* Honeypot — hidden from humans, tempting to bots */}
          <input
            type="text"
            name="website"
            className="hp"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <button
            type="submit"
            className="suggest-btn"
            disabled={status === "sending"}
          >
            {status === "sending" ? pick(t.sending, lang) : pick(t.button, lang)}
          </button>
          {status === "error" && (
            <p className="suggest-error">{pick(t.error, lang)}</p>
          )}
        </form>
      )}
    </section>
  );
}
