"use client";

import { useEffect, useState } from "react";
import { getAllProducts } from "@/action/product.action";
import Link from "next/link";
import Loader from "./Loader";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.slice(0, 4)); // Only show first 4 products
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg">
                <img
                  src={product.image_url || "/placeholder.jpg"}
                  alt={product.name}
                  className="h-48 w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
                <Link
                  href={`/product/${product.id}`}
                  className="mt-4 block text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/product"
            className="inline-block bg-white text-indigo-600 px-6 py-3 border border-indigo-600 rounded-md hover:bg-indigo-50"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
