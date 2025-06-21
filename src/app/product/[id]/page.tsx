"use client";

import { useEffect, useState } from "react";
import { getProductById } from "@/action/product.action";
import Link from "next/link";
import Loader from "@/components/Loader";
import { useParams } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  created_at: string;
}

export default function ProductDetails() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(params.id as string);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product details");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loader />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              {error || "Product not found"}
            </h1>
            <Link
              href="/product"
              className="text-indigo-600 hover:text-indigo-800"
            >
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-gray-500">
              <li>
                <Link href="/" className="hover:text-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link href="/product" className="hover:text-gray-700">
                  Products
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-900 font-medium">{product.name}</li>
            </ol>
          </nav>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-w-3 aspect-h-2">
              <img
                src={product.image_url || "/placeholder.jpg"}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center justify-between mb-6">
                <p className="text-2xl font-bold text-indigo-600">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Added on{" "}
                  {new Date(product.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-y-4">
                <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Add to Cart
                </button>
                <Link
                  href="/product"
                  className="block text-center w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-200"
                >
                  Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
