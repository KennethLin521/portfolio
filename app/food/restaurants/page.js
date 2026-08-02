import { getRestaurants, groupRestaurants } from "../../../lib/restaurants";
import RestaurantExplorer from "../../../components/RestaurantExplorer";

export const metadata = {
  title: "Restaurants",
  description:
    "Kenneth Lin's world restaurant list — every notable meal, browsable by continent, country, and city.",
};

export default async function RestaurantsPage() {
  const { rows, source } = await getRestaurants();
  const tree = groupRestaurants(rows);

  const cityCount = tree.reduce(
    (n, cont) => n + cont.countries.reduce((m, c) => m + c.cities.length, 0),
    0
  );
  const countryCount = tree.reduce((n, cont) => n + cont.countries.length, 0);

  return (
    <div className="container">
      <header className="page-header">
        <p className="kicker kicker--food">02 / FOOD / RESTAURANTS</p>
        <h1>Every meal worth remembering.</h1>
        <p className="stats-line">
          {rows.length} RESTAURANTS · {cityCount} CITIES · {countryCount}{" "}
          COUNTRIES
        </p>
        {source === "sample" && (
          <div className="sample-banner">
            Showing sample data — the real list is coming soon. (Kenneth: set{" "}
            <code>RESTAURANTS_CSV_URL</code> in Vercel to connect the Google
            Sheet.)
          </div>
        )}
      </header>

      <RestaurantExplorer tree={tree} />
    </div>
  );
}
