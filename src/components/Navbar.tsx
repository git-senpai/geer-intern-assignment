"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600">
                EcomStore
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-indigo-600">
              Home
            </Link>
            <Link
              href="/product"
              className="text-gray-700 hover:text-indigo-600"
            >
              Products
            </Link>
            {/* <Link
              href="/categories"
              className="text-gray-700 hover:text-indigo-600"
            >
              Categories
            </Link>
            <Link href="/deals" className="text-gray-700 hover:text-indigo-600">
              Special Deals
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-indigo-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/product"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/deals"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Special Deals
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
