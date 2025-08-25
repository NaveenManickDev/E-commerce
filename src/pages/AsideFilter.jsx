import { useState } from "react";

export default function AsideFilter({ onFilterChange }) {
    const [filters, setFilters] = useState({
        category: "",
        price: 500,
        rating: 0,
    });

    // 🔄 Update filter state & notify parent
    const updateFilters = (newValues) => {
        const updated = { ...filters, ...newValues };
        setFilters(updated);
        onFilterChange(updated); // ✅ send full filter object
    };

    // ✅ Handle category toggle
    const handleCategoryChange = (category) => {
        const newCategory = filters.category === category ? "" : category;
        updateFilters({ category: newCategory });
    };

    return (
        <aside className="w-full md:w-72 bg-gradient-to-b from-gray-50 to-gray-100 p-6 shadow-lg rounded-2xl mb-6 md:mb-0 border border-gray-200">
            <h3 className="text-xl font-extrabold text-gray-800 mb-6 tracking-wide">🔍 Filters</h3>

            {/* 🏷 Category Filter */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Category</h4>
                <div className="flex flex-col gap-2">
                    {["electronics", "fashion", "accessories"].map((cat) => (
                        <label
                            key={cat}
                            className={`flex items-center p-2 rounded-lg cursor-pointer transition ${filters.category === cat
                                    ? "bg-blue-100 text-blue-700 font-semibold"
                                    : "hover:bg-gray-200"
                                }`}
                        >
                            <input
                                type="checkbox"
                                checked={filters.category === cat}
                                className="mr-2"
                                onChange={() => handleCategoryChange(cat)}
                            />
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </label>
                    ))}
                </div>
            </div>

            {/* 💰 Price Range Filter */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Price</h4>
                <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.price}
                    className="w-full accent-blue-600"
                    onChange={(e) => updateFilters({ price: Number(e.target.value) })}
                />
                <p className="text-sm text-gray-600 mt-1">
                    💰 Up to <span className="font-bold">${filters.price}</span>
                </p>
            </div>

            {/* ⭐ Rating Filter */}
            <div>
                <h4 className="font-semibold text-gray-700 mb-3">Rating</h4>
                <select
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={filters.rating}
                    onChange={(e) => updateFilters({ rating: Number(e.target.value) })}
                >
                    <option value={0}>All Ratings</option>
                    <option value={4}>⭐ 4 & above</option>
                    <option value={3}>⭐ 3 & above</option>
                    <option value={2}>⭐ 2 & above</option>
                </select>
            </div>
        </aside>
    );
}

