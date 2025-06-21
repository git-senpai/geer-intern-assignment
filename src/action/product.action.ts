// actions/product.actions.ts
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";

type Product = Database["public"]["Tables"]["products"]["Row"];
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export class ProductError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ProductError";
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new ProductError(error.message);
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error instanceof ProductError
      ? error
      : new ProductError("Failed to fetch products");
  }
}

export async function uploadProductImage(file: File): Promise<string> {
  try {
    if (!file) throw new ProductError("No file provided");

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `product-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(filePath, file);

    if (uploadError) throw new ProductError(uploadError.message);

    const {
      data: { publicUrl },
    } = supabase.storage.from("products").getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error instanceof ProductError
      ? error
      : new ProductError("Failed to upload image");
  }
}

export async function addProduct(product: ProductInsert): Promise<Product> {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert([product])
      .select()
      .single();

    if (error) throw new ProductError(error.message);
    if (!data) throw new ProductError("Failed to create product");
    return data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error instanceof ProductError
      ? error
      : new ProductError("Failed to add product");
  }
}

export async function updateProduct(
  id: string,
  updates: ProductUpdate
): Promise<Product> {
  try {
    const { data, error } = await supabase
      .from("products")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new ProductError(error.message);
    if (!data) throw new ProductError("Product not found");
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error instanceof ProductError
      ? error
      : new ProductError("Failed to update product");
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) throw new ProductError(error.message);
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error instanceof ProductError
      ? error
      : new ProductError("Failed to delete product");
  }
}

export async function getProductById(id: string): Promise<Product> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new ProductError(error.message);
    if (!data) throw new ProductError("Product not found");
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error instanceof ProductError
      ? error
      : new ProductError("Failed to fetch product");
  }
}
