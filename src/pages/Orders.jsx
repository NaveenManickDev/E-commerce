import { useOrders } from "../contaxt/OrderContext";

export default function Orders() {
    const { orders } = useOrders();

    if (orders.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600 text-lg">🛒 No orders found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-extrabold text-center text-indigo-700 mb-8">
                My Orders
            </h1>

            <div className="max-w-3xl mx-auto space-y-6">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transition"
                    >
                        <div className="flex justify-between items-center border-b pb-3 mb-3">
                            <span className="text-sm text-gray-500">
                                Order ID:{" "}
                                <span className="font-medium text-gray-700">
                                    {order.id}
                                </span>
                            </span>
                            <span className="text-sm text-gray-500">
                                {order.date}
                            </span>
                        </div>

                        <div className="space-y-1 text-gray-700">
                            <p>
                                <strong>Name:</strong> {order.customer.name}
                            </p>
                            <p>
                                <strong>Address:</strong> {order.customer.address}
                            </p>
                            <p>
                                <strong>Payment:</strong> {order.customer.payment}
                            </p>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-bold text-gray-800 mb-2">
                                Items
                            </h3>
                            <ul className="space-y-2">
                                {order.items.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex justify-between border-b pb-1 text-sm text-gray-600"
                                    >
                                        <span>
                                            {item.name} × {item.quantity}
                                        </span>
                                        <span className="font-medium">
                                            ₹{item.price}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
