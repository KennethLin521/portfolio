"use client";

import Link from "next/link";
import { optimizedPhotoUrl } from "../lib/restaurants";

// A single restaurant's page — blog-post vibes. Sheet data (name, price,
// notes) renders verbatim; if a review file exists in content/reviews/,
// its paragraphs and photo rows render below in order.
export default function RestaurantArticle({ city, restaurant, review }) {
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

        {/* Long-form review from content/reviews/<city>/<restaurant>.md */}
        {review && (
          <div className="review-body">
            {review.map((block, i) =>
              block.type === "images" ? (
                <div className="review-img-row" key={i}>
                  {block.items.map((img) => (
                    <figure key={img.src}>
                      <img
                        src={optimizedPhotoUrl(img.src)}
                        alt={img.caption || restaurant.name}
                        loading="lazy"
                      />
                      {img.caption && <figcaption>{img.caption}</figcaption>}
                    </figure>
                  ))}
                </div>
              ) : (
                <p key={i}>{block.text}</p>
              )
            )}
          </div>
        )}

        {/* Quick photos from the sheet's Photo Links column (optional) */}
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
