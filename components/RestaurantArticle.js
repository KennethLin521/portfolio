"use client";

import Link from "next/link";

// A single restaurant's page — blog-post vibes. Everything on this page is
// sheet data, rendered verbatim in whatever language it was written.
export default function RestaurantArticle({ city, restaurant }) {
  return (
    <div className="container">
      <article className="restaurant-article">
        <header className="page-header">
          <Link href={`/food/${city.slug}`} className="back-link">
            ← {city.name}
          </Link>
          <p className="kicker kicker--food">
            {city.continent} / {city.country} / {city.name.toUpperCase()}
          </p>
          <h1>{restaurant.name}</h1>
          {restaurant.price && (
            <p className="stats-line price-line">{restaurant.price}</p>
          )}
        </header>

        {restaurant.notes && <p className="article-notes">{restaurant.notes}</p>}

        {restaurant.photos.length > 0 && (
          <div className="photo-links">
            {restaurant.photos.map((url, i) => (
              <a
                key={`${url}-${i}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                photos {i + 1} ↗
              </a>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
