import { Link } from "react-router-dom";
import Products from "./Products";

export default function HomePage() {
    return (
        <div className="mt-12">
            {/* Hero Banner */}
            <section className="text-center mb-14">
                <h1 className="text-5xl font-extrabold text-indigo-700 mb-5">
                    Discover Trendy Deals 🛍️
                </h1>
                <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
                    Explore top-quality products at pocket-friendly prices. Shop smart, live better!
                </p>
                <Link
                    to="/products"
                    className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full shadow-md hover:bg-indigo-700 transition"
                >
                    Start Shopping
                </Link>
            </section>

            {/* Featured Products */}
            <section className="px-6">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
                    🌟 Featured Picks
                </h2>
                <Products />
            </section>
        </div>
    );
}
