
import { useEffect, useState } from "react";
import { getMenus } from "../services/api";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Search } from "lucide-react";

function Menu() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await getMenus();

console.log("Menu Response:", response);

setMenus(response.data || []);
      } catch (error) {
        console.error("Menu loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  // Get Categories
  const categories = [
    "All",
    ...new Set(menus.map((item) => item.category)),
  ];

  // Search, Filter and Sort
  const filteredMenus = menus
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      category === "All" ? true : item.category === category
    )
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  if (loading) {
    return <p className="p-8">Loading menu...</p>;
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h1 className="mb-6 text-3xl font-bold text-orange-700">
        Our Cafe Menu
      </h1>

      {/* Search and Filters */}
      <div className="mb-8 grid gap-4 md:grid-cols-3">

        {/* Search */}
        <div className="flex items-center gap-2 rounded-lg bg-white px-4 shadow">
          <Search className="text-gray-500" size={20} />

          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 outline-none"
          />
        </div>

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg bg-white p-3 shadow outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Price Sorting */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg bg-white p-3 shadow outline-none"
        >
          <option value="">Sort By Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      {/* Menu Cards */}
      {filteredMenus.length === 0 ? (
        <p className="py-10 text-center text-gray-500">
          No menu items found.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMenus.map((item) => (
            <div
              key={item._id}
              className="rounded-xl bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
            >
           
<img
  src={item.image || "https://placehold.co/400x250?text=Cafe+Food"}
  alt={item.name}
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://placehold.co/400x250?text=Image+Not+Available";
  }}
  className="mb-4 h-48 w-full rounded-lg object-cover"
/>


              <h2 className="text-xl font-bold">
                {item.name}
              </h2>

              <p className="mt-2 text-gray-600">
                {item.description}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                {item.category}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold text-orange-600">
                  ₹{item.price}
                </span>

                <button
                  onClick={() => addToCart(item)}
                  disabled={!item.available}
                  className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  <ShoppingCart size={18} />
                  {item.available ? "Add to Cart" : "Unavailable"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
