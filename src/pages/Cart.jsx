import { useCart } from "../contaxt/CartContext";
import { useAuth } from "../contaxt/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getTotal } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (!user) {
            navigate("/login");
        } else {
            navigate("/checkout");
        }
    };

    if (cart.length === 0) {
        return (
            <div className="text-center mt-16">
                <h2 className="text-2xl font-bold mb-4">🛒 Your cart is empty</h2>
                <Link
                    to="/products"
                    className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition-transform"
                >
                    Shop Now
                </Link>
            </div>
        );
    }

    return (
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                    <div
                        key={item._id}
                        className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition"
                    >
                        {/* Image + Details */}
                        <div className="flex items-center space-x-4">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-md border"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <p className="text-gray-500">${item.price}</p>
                            </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() =>
                                    updateQuantity(item._id, Math.max(item.quantity - 1, 1))
                                }
                                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                            >
                                −
                            </button>
                            <span className="px-3 font-medium">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                            >
                                +
                            </button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex flex-col items-end space-y-2">
                            <p className="font-semibold text-lg">
                                ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                                onClick={() => removeFromCart(item._id)}
                                className="text-sm text-red-600 hover:text-red-800 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Checkout Summary */}
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-20 h-fit">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <p className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>${getTotal().toFixed(2)}</span>
                </p>
                <p className="flex justify-between mb-2">
                    <span>Shipping:</span>
                    <span className="text-green-600">Free</span>
                </p>
                <hr className="my-3" />
                <p className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${getTotal().toFixed(2)}</span>
                </p>
                <button
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-gradient-to-r from-green-500 to-green-700 text-white py-3 rounded-lg shadow hover:scale-105 transition-transform"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}
