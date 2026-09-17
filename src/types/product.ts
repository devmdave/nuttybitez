export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'Dragées' | 'Spicy Snacks' | 'Coffee & Dark';
  flavour: string;
  tagline: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  weight: string;
  images: {
    poster: string;
    jar: string;
    ingredients: string;
  };
  ingredients: string[];
  tasteNotes: string[];
  tasteProfile: {
    crunch: number; // 1-100
    sweetness: number;
    richness: number;
    aroma: number;
    spice?: number;
  };
  availability: boolean;
  bgTheme: string;
  accentColor: string;
  moodCategory: 'RICH & INDULGENT' | 'COFFEE LOVERS' | 'FRESH & AROMATIC' | 'BOLD & SPICY';
}

export interface CartItem {
  product: Product;
  quantity: number;
}
