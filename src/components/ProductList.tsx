"use client";

import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "@/action/product.action";
import ProductForm from "./ProductForm";
import Modal from "./Modal";
import Link from "next/link";
import Loader from "./Loader";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error fetching products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again.");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* Add Product Button */}
      <div className="mb-8 flex justify-end">
        <button
          onClick={handleAddNew}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Product
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
          >
            <div className="aspect-w-1 aspect-h-1 w-full mb-4">
              <img
                src={product.image_url || "/placeholder.jpg"}
                alt={product.name}
                className="h-48 w-full object-cover rounded-md"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors text-sm"
              >
                Delete
              </button>
              <Link
                href={`/product/${product.id}`}
                className="flex-1 bg-gray-100 text-gray-800 px-3 py-2 rounded hover:bg-gray-200 transition-colors text-center text-sm"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={editingProduct ? "Edit Product" : "Add New Product"}
      >
        <ProductForm
          initialData={editingProduct || undefined}
          onSuccess={() => {
            fetchProducts();
            handleModalClose();
          }}
        />
      </Modal>
    </>
  );
}
