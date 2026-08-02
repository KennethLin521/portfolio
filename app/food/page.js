import Link from "next/link";
import { profile } from "../../content/profile";

export const metadata = {
  title: "Food",
  description:
    "Kenneth Lin's food half — cooking content and a world restaurant list, heaviest in Taiwan and Vietnam.",
};

export default function FoodPage() {
  const { links } = profile;
  const socials = [
    ["TikTok", links.tiktok],
    ["Instagram", links.instagram],
    ["Beli", links.beli],
  ].filter(([, url]) => Boolean(url));

  return (
    <div className="container">
      <header className="page-header">
        <p className="kicker kicker--food">02 / FOOD</p>
        <h1>The other half.</h1>
        <p className="lede">{profile.foodBio}</p>
      </header>

      <div className="social-row">
        {socials.map(([label, url]) => (
          <a
            key={label}
            className="social-btn"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label} ↗
          </a>
        ))}
      </div>

      <section className="section">
        <div className="section-label">
          <span className="num">01</span>
          <h2>The Restaurant List</h2>
        </div>
        <Link href="/food/restaurants" className="restaurant-cta">
          <span className="kicker kicker--food">CONTINENT → COUNTRY → CITY</span>
          <h3>Every meal worth remembering.</h3>
          <p>
            A running list of notable restaurants around the world — browse by
            region, from Taipei night markets to New York delis.
          </p>
          <span className="path-arrow">→ browse the list</span>
        </Link>
      </section>

      <section className="section">
        <div className="section-label">
          <span className="num">02</span>
          <h2>From the Kitchen</h2>
        </div>
        <div className="gallery">
          <img src="/images/cooking_image_1.jpg" alt="A spread Kenneth cooked" />
          <img src="/images/cooking_image_2.jpg" alt="A spread Kenneth cooked" />
          <img src="/images/cooking_image_3.jpg" alt="A spread Kenneth cooked" />
        </div>
        <p className="gallery-caption">
          SOME SPREADS FROM THE COLLEGE YEARS — MORE ON TIKTOK.
        </p>
      </section>
    </div>
  );
}
