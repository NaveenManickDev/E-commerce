import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import AsideFilter from "./AsideFilter"; // Sidebar
import useQuery from "../utils/useQuery";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({ category: "", price: 500, rating: 0 });
    const [loading, setLoading] = useState(true);

    // ✅ Get search term from query string
    const query = useQuery();
    const searchTerm = query.get("search") || "";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/products");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.error("❌ Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Handle filter change (from sidebar)
    const handleFilterChange = (newFilter) => {
        setFilters((prev) => ({ ...prev, ...newFilter }));
    };

    // ✅ Apply filters + search term
    const filteredProducts = products.filter((p) => {
        const matchesCategory =
            !filters.category ||
            p.category.toLowerCase() === filters.category.toLowerCase();

        const matchesPrice = p.price <= filters.price;
        const matchesRating = p.rating >= filters.rating;
        const matchesSearch =
            !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesCategory && matchesPrice && matchesRating && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row gap-6 p-6">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-white rounded-xl shadow-lg p-4 h-fit">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">
                    Filter Products
                </h2>
                <AsideFilter onFilterChange={handleFilterChange} />
            </aside>

            {/* Products Section */}
            <main className="flex-grow">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
                    {searchTerm && (
                        <span className="text-sm text-gray-500">
                            Showing results for "<b>{searchTerm}</b>"
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <p className="text-gray-500 animate-pulse">Loading products...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
                        <p className="text-gray-500">
                            No products found{" "}
                            {searchTerm && (
                                <>
                                    for "<b>{searchTerm}</b>"
                                </>
                            )}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {filteredProducts.map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
