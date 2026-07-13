export type CartItem = {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
};

export type ProductWithCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  stock: number;
  featured: boolean;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
};
