import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contaxt/CartContext";
import { useOrders } from "../contaxt/OrderContext";

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();
    const { addOrder } = useOrders();
    const navigate = useNavigate();

    const [details, setDetails] = useState({
        fullName: "",
        shippingAddress: "",
        paymentType: "card",
    });

    const updateField = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({ ...prev, [name]: value }));
    };

    const placeOrder = (e) => {
        e.preventDefault();
        const orderData = {
            id: Date.now(),
            items: cart,
            customer: details,
            date: new Date().toLocaleString(),
        };
        addOrder(orderData);
        alert("✅ Your order has been placed!");
        clearCart();
        navigate("/orders");
    };

    if (cart.length === 0) {
        return (
            <p className="text-center text-gray-600 text-lg mt-8">
                🛒 Your cart is empty. Add something before checking out!
            </p>
        );
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-gray-50 rounded-2xl shadow-lg mt-6">
            <h1 className="text-3xl font-semibold text-indigo-700 mb-6 text-center">
                Checkout
            </h1>
            <form onSubmit={placeOrder} className="space-y-5">
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={details.fullName}
                        onChange={updateField}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Shipping Address</label>
                    <textarea
                        name="shippingAddress"
                        value={details.shippingAddress}
                        onChange={updateField}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Payment Method</label>
                    <select
                        name="paymentType"
                        value={details.paymentType}
                        onChange={updateField}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="card">💳 Credit/Debit Card</option>
                        <option value="cod">💵 Cash on Delivery</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg font-medium transition"
                >
                    Confirm & Place Order
                </button>
            </form>
        </div>
    );
}
