import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">EcomStore</h3>
            <p className="text-gray-300 text-sm">
              Your one-stop shop for all your needs. Quality products at
              competitive prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/product"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Special Deals
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-300 hover:text-white text-sm"
                >
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 text-gray-900 rounded-md text-sm flex-1"
              />
              <button
                type="submit"
                className="bg-indigo-600 px-4 py-2 rounded-md text-sm hover:bg-indigo-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300 text-sm">
          <p>© 2024 EcomStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
