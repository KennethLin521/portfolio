import { notFound } from "next/navigation";
import { getRestaurants, buildCityIndex } from "../../../../lib/restaurants";
import { getReview } from "../../../../lib/reviews";
import RestaurantArticle from "../../../../components/RestaurantArticle";

export const revalidate = 3600;

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

async function findEntry(params) {
  const { city: cityParam, restaurant: restaurantParam } = await params;
  const citySlug = safeDecode(cityParam);
  const restSlug = safeDecode(restaurantParam);
  const { rows } = await getRestaurants();
  const city = buildCityIndex(rows).get(citySlug) ?? null;
  if (!city) return { city: null, restaurant: null };
  const restaurant = city.restaurants.find((r) => r.slug === restSlug) ?? null;
  return { city, restaurant };
}

export async function generateStaticParams() {
  const { rows } = await getRestaurants();
  const params = [];
  for (const city of buildCityIndex(rows).values()) {
    for (const r of city.restaurants) {
      params.push({ city: city.slug, restaurant: r.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { city, restaurant } = await findEntry(params);
  if (!restaurant) return { title: "Not found" };
  return {
    title: `${restaurant.name} — ${city.name}`,
    description:
      restaurant.notes ||
      `${restaurant.name}, one of Kenneth Lin's notable restaurants in ${city.name}.`,
  };
}

export default async function RestaurantPage({ params }) {
  const { city, restaurant } = await findEntry(params);
  if (!city || !restaurant) notFound();
  const review = getReview(city.slug, restaurant.slug);
  return (
    <RestaurantArticle city={city} restaurant={restaurant} review={review} />
  );
}
