import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSearch, FaUser } from "react-icons/fa";
import { useAuth } from "../contaxt/AuthContext";
import { useCart } from "../contaxt/CartContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [profileOpen, setProfileOpen] = useState(false);

    const profileRef = useRef(null);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = () => {
        logout();
        closeMenus();
        navigate("/login");
    };

    const submitSearch = (e) => {
        e.preventDefault();
        navigate(query.trim() ? `/products?search=${query}` : "/products");
        setQuery("");
        closeMenus();
    };

    const closeMenus = () => {
        setMenuOpen(false);
        setProfileOpen(false);
    };

    // Reusable Profile Menu
    const ProfileMenu = () => (
        <div
            className="absolute right-0 mt-3 w-48 bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden"
            role="menu"
        >
            {user ? (
                <>
                    <Link
                        to="/account"
                        onClick={closeMenus}
                        className="block px-5 py-2 hover:bg-gray-100"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/orders"
                        onClick={closeMenus}
                        className="block px-5 py-2 hover:bg-gray-100"
                    >
                        My Orders
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-5 py-2 text-red-600 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <Link
                    to="/login"
                    onClick={closeMenus}
                    className="block px-5 py-2 hover:bg-gray-100"
                >
                    Login
                </Link>
            )}
        </div>
    );

    return (
        <header className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-6 py-3">
                {/* Brand */}
                <Link
                    to="/"
                    className="text-3xl font-extrabold tracking-wide"
                    onClick={closeMenus}
                >
                    ShopEase
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link to="/" onClick={closeMenus} className="hover:text-yellow-300 transition">Home</Link>
                    <Link to="/products" onClick={closeMenus} className="hover:text-yellow-300 transition">Products</Link>
                    <Link to="/cart" onClick={closeMenus} className="hover:text-yellow-300 transition">
                        Cart <span className="ml-1 bg-yellow-400 text-black px-2 py-0.5 rounded-full text-xs">{cart?.length || 0}</span>
                    </Link>

                    {/* Search */}
                    <form onSubmit={submitSearch} className="relative flex items-center">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search products..."
                            className="rounded-full px-5 py-2 text-black w-52 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                        />
                        <button
                            type="submit"
                            aria-label="Search products"
                            className="absolute right-2 bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-300"
                        >
                            <FaSearch />
                        </button>
                    </form>

                    {/* Profile */}
                    <div className="relative" ref={profileRef}>
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-xl shadow hover:bg-gray-200"
                        >
                            <FaUser />
                            {user ? "Account" : "Login"}
                        </button>

                        {profileOpen && <ProfileMenu />}
                    </div>
                </nav>

                {/* Mobile button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    className="md:hidden text-2xl focus:outline-none"
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden bg-purple-800 text-white shadow-inner px-6 py-4 space-y-4">
                    <Link to="/" onClick={closeMenus} className="block hover:text-yellow-300">Home</Link>
                    <Link to="/products" onClick={closeMenus} className="block hover:text-yellow-300">Products</Link>
                    <Link to="/cart" onClick={closeMenus} className="block hover:text-yellow-300">
                        Cart ({cart?.length || 0})
                    </Link>

                    {/* Mobile search */}
                    <form onSubmit={submitSearch} className="relative">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search..."
                            className="w-full rounded-full px-4 py-2 text-black focus:ring-2 focus:ring-yellow-400"
                        />
                        <button
                            type="submit"
                            aria-label="Search products"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-400 text-black p-2 rounded-full"
                        >
                            <FaSearch />
                        </button>
                    </form>

                    {/* Mobile profile menu */}
                    <div className="bg-white text-gray-800 rounded-xl shadow-md p-2">
                        <ProfileMenu />
                    </div>
                </div>
            )}
        </header>
    );
}






