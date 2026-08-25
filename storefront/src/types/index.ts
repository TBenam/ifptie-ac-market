export interface ProductAttribute {
  id: string;
  name: string; // e.g. "Color", "Size"
  options: string[]; // e.g. ["Noir", "Blanc", "Or"], ["S", "M", "L", "XL"]
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  price: number;
  originalPrice?: number;
  attributes: Record<string, string>; // e.g. { Color: "Noir", Size: "M" }
  stock: number;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  category: string;
  tags: string[];
  featuredImage: string;
  galleryImages: string[];
  attributes: ProductAttribute[];
  variants: ProductVariant[];
  isNew?: boolean;
  isBestSeller?: boolean;
  stock: number;
  inStock: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  id: string; // unique item id (product.id + variant.id)
  product: Product;
  selectedVariant?: ProductVariant;
  selectedAttributes?: Record<string, string>;
  quantity: number;
  price: number;
}

export interface CustomerCODDetails {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  customer: CustomerCODDetails;
  paymentMethod: "COD";
  status: "Pending" | "Confirmed" | "Shipped" | "Delivered";
}
