export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300 mt-14 pt-14 pb-8 shadow-inner">
            <div className="max-w-7xl mx-auto px-6 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

                {/* 🛍️ Brand Section */}
                <div>
                    <h2 className="text-3xl font-extrabold text-indigo-400 mb-4">ShopEase</h2>
                    <p className="text-sm leading-relaxed text-gray-400">
                        Where style meets affordability. Explore the latest trends and enjoy shopping made easy.
                    </p>
                </div>

                {/* 📂 Categories */}
                <div>
                    <h3 className="text-lg font-semibold text-indigo-300 mb-4">Categories</h3>
                    <ul className="space-y-2">
                        <li><a href="/products?category=men" className="hover:text-white transition">👔 Men’s Fashion</a></li>
                        <li><a href="/products?category=women" className="hover:text-white transition">👗 Women’s Wear</a></li>
                        <li><a href="/products?category=kids" className="hover:text-white transition">🧒 Kids Collection</a></li>
                        <li><a href="/products?category=accessories" className="hover:text-white transition">🎒 Accessories</a></li>
                    </ul>
                </div>

                {/* 🛠️ Support */}
                <div>
                    <h3 className="text-lg font-semibold text-indigo-300 mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li><a href="/account" className="hover:text-white transition">👤 My Account</a></li>
                        <li><a href="/orders" className="hover:text-white transition">📦 Order Tracking</a></li>
                        <li><a href="/returns" className="hover:text-white transition">↩️ Returns & Refunds</a></li>
                        <li><a href="/help" className="hover:text-white transition">❓ Help Center</a></li>
                    </ul>
                </div>

                {/* 🌐 Social Media */}
                <div>
                    <h3 className="text-lg font-semibold text-indigo-300 mb-4">Stay Connected</h3>
                    <div className="flex gap-4 text-2xl">
                        <a href="#" className="hover:text-blue-500 transition">📘</a>
                        <a href="#" className="hover:text-pink-500 transition">📸</a>
                        <a href="#" className="hover:text-sky-400 transition">🐦</a>
                    </div>
                </div>
            </div>

            {/* 🔻 Bottom */}
            <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
                &copy; {year} <span className="text-indigo-400 font-semibold">ShopEase</span>. Designed with 💜 All Rights Reserved.
            </div>
        </footer>
    );
}

