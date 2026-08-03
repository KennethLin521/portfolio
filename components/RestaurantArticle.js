"use client";

import Link from "next/link";
import { optimizedPhotoUrl } from "../lib/restaurants";

// A single restaurant's page — blog-post vibes. Everything on this page is
// sheet data, rendered verbatim in whatever language it was written.
// Photos render as a captioned gallery; Cloudinary URLs are served as
// auto-optimized renditions.
export default function RestaurantArticle({ city, restaurant }) {
  return (
    <div className="container casual">
      <article className="restaurant-article">
        <header className="page-header">
          <Link href={`/food/${city.slug}`} className="back-link">
            ← {city.name}
          </Link>
          <p className="kicker kicker--food">
            {city.continent} / {city.country} / {city.name}
          </p>
          <h1>{restaurant.name}</h1>
          {restaurant.price && (
            <p className="stats-line price-line">{restaurant.price}</p>
          )}
        </header>

        {restaurant.notes && <p className="article-notes">{restaurant.notes}</p>}

        {restaurant.photos.length > 0 && (
          <div className="photo-gallery">
            {restaurant.photos.map((photo, i) => (
              <figure key={`${photo.url}-${i}`}>
                <img
                  src={optimizedPhotoUrl(photo.url)}
                  alt={photo.caption || restaurant.name}
                  loading="lazy"
                />
                {photo.caption && <figcaption>{photo.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
