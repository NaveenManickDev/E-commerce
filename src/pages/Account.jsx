import { useAuth } from "../contaxt/AuthContext";

export default function Account() {
    const { user } = useAuth();

    return (
        <div className="bg-white p-6 rounded shadow max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-4">My Account</h1>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name || "No name"}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <hr className="my-4" />
                    <h2 className="text-xl font-bold mb-2">Order History</h2>
                    <p>No orders yet.</p>
                </div>
            ) : (
                <p>You are not logged in.</p>
            )}
        </div>
    );
}