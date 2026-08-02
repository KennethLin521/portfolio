import { notFound } from "next/navigation";
import { getRestaurants, buildCityIndex } from "../../../lib/restaurants";
import CityContent from "../../../components/CityContent";

export const revalidate = 3600;

async function findCity(params) {
  const { city } = await params;
  let slug = city;
  try {
    slug = decodeURIComponent(city);
  } catch {
    // leave as-is if it wasn't validly encoded
  }
  const { rows } = await getRestaurants();
  return buildCityIndex(rows).get(slug) ?? null;
}

export async function generateStaticParams() {
  const { rows } = await getRestaurants();
  return [...buildCityIndex(rows).keys()].map((city) => ({ city }));
}

export async function generateMetadata({ params }) {
  const city = await findCity(params);
  if (!city) return { title: "Not found" };
  return {
    title: `${city.name} — Restaurants`,
    description: `Kenneth Lin's notable restaurants in ${city.name}, ${city.country}.`,
  };
}

export default async function CityPage({ params }) {
  const city = await findCity(params);
  if (!city) notFound();
  return <CityContent city={city} />;
}
