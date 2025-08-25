import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../contaxt/CartContext";
import toast from "react-hot-toast";

export default function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error("❌ Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 animate-pulse">Loading product...</p>
            </div>
        );

    if (!product)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 font-semibold">❌ Product not found</p>
            </div>
        );

    const handleAddToCart = () => {
        addToCart(product);
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <div className="min-h-96 bg-gray-50 p-6 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl bg-white shadow-lg rounded-2xl p-6">
                {/* Left: Image */}
                <div className="flex justify-center items-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="rounded-xl shadow-md w-full max-w-sm object-cover hover:scale-105 transition"
                    />
                </div>

                {/* Right: Details */}
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-3">
                            {product.name}
                        </h1>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            {product.description}
                        </p>

                        <div className="mb-6">
                            <p className="text-2xl font-bold text-indigo-600 mb-2">
                                ${product.price}
                            </p>
                            <p className="text-lg font-semibold text-yellow-500">
                                ⭐ {product.rating}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow hover:bg-indigo-700 transition"
                    >
                        Add to Cart 🛒
                    </button>
                </div>
            </div>
        </div>
    );
}
