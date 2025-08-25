import { Link } from "react-router-dom";
import { useCart } from "../contaxt/CartContext";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col border border-gray-100">
            {/* Image */}
            <div className="relative group">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Rating Badge */}
                <span className="absolute top-3 left-3 bg-yellow-400 text-black text-sm font-bold px-2 py-1 rounded-md shadow">
                    ★ {product.rating}
                </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2 flex-grow">
                    {product.description}
                </p>

                {/* Price */}
                <p className="font-bold text-xl mt-3 text-indigo-600">
                    ${product.price}
                </p>

                {/* Buttons */}
                <div className="flex gap-3 mt-5">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-indigo-700 transition"
                    >
                        Add to Cart
                    </button>
                    <Link
                        to={`/products/${product._id}`}
                        className="flex-1 bg-gray-100 text-gray-800 px-4 py-2 rounded-xl font-medium hover:bg-gray-200 transition text-center"
                    >
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}

