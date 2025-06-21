"use client";

import ProductList from "@/components/ProductList";

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Product Management
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Add, edit, or remove products from your store
          </p>
        </div>
        <div className="mt-12">
          <ProductList />
        </div>
      </div>
    </div>
  );
}
