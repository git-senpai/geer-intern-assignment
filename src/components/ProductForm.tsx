"use client";

import { useState, useEffect } from "react";
import {
  addProduct,
  updateProduct,
  uploadProductImage,
} from "@/action/product.action";

interface ProductFormProps {
  initialData?: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
  };
  onSuccess?: () => void;
}

export default function ProductForm({
  initialData,
  onSuccess,
}: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || 0);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(initialData?.image_url || "");
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = !!initialData;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setError("");
    } else {
      setError("Please upload an image file");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    if (!name.trim()) {
      setError("Product name is required");
      return false;
    }
    if (price <= 0) {
      setError("Price must be greater than 0");
      return false;
    }
    if (!image && !initialData?.image_url) {
      setError("Product image is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      let imageUrl = initialData?.image_url || "";

      if (image) {
        imageUrl = await uploadProductImage(image);
      }

      if (isEditMode) {
        await updateProduct(initialData.id, {
          name,
          price: Number(price),
          image_url: imageUrl,
        });
      } else {
        await addProduct({
          name,
          price: Number(price),
          image_url: imageUrl,
        });
      }

      onSuccess?.();
      if (!isEditMode) {
        setName("");
        setPrice(0);
        setImage(null);
        setPreview("");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Error saving product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-900">
          Product Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="block w-full rounded-lg border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Enter product name"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-900">
          Price ($)
        </label>
        <div className="relative rounded-lg">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            min="0"
            step="0.01"
            className="block w-full rounded-lg border-0 py-2 pl-7 pr-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-900">
          Product Image
        </label>
        <div
          className={`mt-1 flex justify-center rounded-lg border border-dashed ${
            dragActive ? "border-indigo-600 bg-indigo-50" : "border-gray-300"
          } px-6 py-8`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            {preview ? (
              <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-lg">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setPreview("");
                  }}
                  className="absolute right-0 top-0 rounded-bl-lg bg-red-500 p-1 text-white hover:bg-red-600"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <>
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="mt-4 flex text-sm text-gray-600">
                  <label className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Saving...</span>
            </div>
          ) : (
            <span>{isEditMode ? "Update Product" : "Add Product"}</span>
          )}
        </button>
      </div>
    </form>
  );
}
