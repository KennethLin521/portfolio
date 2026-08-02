import { getRestaurants, buildCityIndex, buildTree } from "../../lib/restaurants";
import FoodContent from "../../components/FoodContent";

export const revalidate = 3600;

export const metadata = {
  title: "Food",
  description:
    "Kenneth Lin's food half — cooking content and a world restaurant list, heaviest in Taiwan and Vietnam.",
};

export default async function FoodPage() {
  const { rows, source } = await getRestaurants();
  const cityIndex = buildCityIndex(rows);
  const tree = buildTree(cityIndex);

  const stats = {
    restaurants: rows.length,
    cities: cityIndex.size,
    // distinct country names — a country spanning two continents (or a row
    // with a blank Continent cell) must not be counted twice
    countries: new Set([...cityIndex.values()].map((c) => c.country)).size,
  };

  return <FoodContent tree={tree} source={source} stats={stats} />;
}
