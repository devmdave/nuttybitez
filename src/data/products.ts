import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 'choco-crunch',
    name: 'Choco Crunch',
    slug: 'choco-crunch',
    category: 'Dragées',
    flavour: 'Rich Milk Chocolate & Roasted Almond',
    tagline: 'Rich. Crunchy. Addictive.',
    description: 'Crisp California almonds slow-roasted to golden perfection, enveloped in layers of rich milk chocolate dragée coating. Every bite offers an irresistible crunch balanced with velvety cocoa notes.',
    shortDescription: 'Premium roasted almonds coated in smooth milk chocolate dragée.',
    price: 149,
    originalPrice: 199,
    weight: '100g',
    images: {
      poster: '/assets/original_theme_poster.jpeg',
      jar: '/assets/all_packagings.jpeg',
      ingredients: '/assets/hero_ingredients_bg_1789677986247.png'
    },
    ingredients: ['California Almonds', 'Milk Chocolate (Cacao Mass, Cocoa Butter)', 'Pure Cane Sugar', 'Natural Vanilla Extract'],
    tasteNotes: ['Rich', 'Crunchy', 'Addictive'],
    tasteProfile: {
      crunch: 95,
      sweetness: 75,
      richness: 90,
      aroma: 80
    },
    availability: true,
    bgTheme: '#2E1B12',
    accentColor: '#C79A4A',
    moodCategory: 'RICH & INDULGENT'
  },
  {
    id: 'paan-shot',
    name: 'Paan Shot',
    slug: 'paan-shot',
    category: 'Dragées',
    flavour: 'Refreshing Aromatic Paan & White Chocolate',
    tagline: 'Refreshing. Aromatic. Royal.',
    description: 'An iconic Indian digestif reimagined as a luxury dragée. Roasted whole almonds infused with authentic betel paan extract, sweet fennel, candied papaya, and dried pink rose petals encased in white chocolate.',
    shortDescription: 'Refreshing betel paan infused almonds with rose & sweet fennel.',
    price: 149,
    originalPrice: 199,
    weight: '100g',
    images: {
      poster: '/assets/paan_shot_poster.jpeg',
      jar: '/assets/paan_shot_poster.jpeg',
      ingredients: '/assets/paan_ingredients_1789678003258.png'
    },
    ingredients: ['California Almonds', 'White Chocolate', 'Betel Leaf Extract', 'Saunf (Fennel)', 'Pink Rose Petals', 'Meetha Masala'],
    tasteNotes: ['Fresh', 'Aromatic', 'Royal'],
    tasteProfile: {
      crunch: 90,
      sweetness: 65,
      richness: 75,
      aroma: 98
    },
    availability: true,
    bgTheme: '#1A2911',
    accentColor: '#4A5A20',
    moodCategory: 'FRESH & AROMATIC'
  },
  {
    id: 'coffee-tiramisu',
    name: 'Coffee Tiramisu',
    slug: 'coffee-tiramisu',
    category: 'Coffee & Dark',
    flavour: 'Espresso Coffee & Creamy Tiramisu Dragée',
    tagline: 'Smooth. Creamy. Irresistible.',
    description: 'A coffee connoisseur’s dream. Crunchy roasted almonds coated in decadent Italian tiramisu white chocolate cream, dusted with freshly ground Arabica espresso powder and cocoa nibs.',
    shortDescription: 'Espresso Arabica dust & creamy tiramisu wrapped around roasted almonds.',
    price: 149,
    originalPrice: 199,
    weight: '100g',
    images: {
      poster: '/assets/coffee_tiramisu_poster.jpeg',
      jar: '/assets/coffee_tiramisu_poster.jpeg',
      ingredients: '/assets/hero_ingredients_bg_1789677986247.png'
    },
    ingredients: ['California Almonds', 'Arabica Coffee Extract', 'Tiramisu Cream White Chocolate', 'Cocoa Powder', 'Mascarpone Notes'],
    tasteNotes: ['Smooth', 'Creamy', 'Irresistible'],
    tasteProfile: {
      crunch: 88,
      sweetness: 60,
      richness: 95,
      aroma: 94
    },
    availability: true,
    bgTheme: '#24150F',
    accentColor: '#D8B36A',
    moodCategory: 'COFFEE LOVERS'
  },
  {
    id: 'dark-chocolate',
    name: 'Dark Chocolate',
    slug: 'dark-chocolate',
    category: 'Coffee & Dark',
    flavour: 'Intense 70% Single-Origin Dark Cocoa',
    tagline: 'Intense. Rich. Pure Indulgence.',
    description: 'For true dark chocolate purists. Whole crisp almonds enveloped in intense 70% dark chocolate dragée shell with zero artificial preservatives. Deep, bittersweet, and deeply comforting.',
    shortDescription: '70% bittersweet dark chocolate shell over roasted crunchy almonds.',
    price: 149,
    originalPrice: 199,
    weight: '100g',
    images: {
      poster: '/assets/original_theme_poster.jpeg',
      jar: '/assets/all_packagings.jpeg',
      ingredients: '/assets/hero_ingredients_bg_1789677986247.png'
    },
    ingredients: ['California Almonds', '70% Dark Cacao Mass', 'Cocoa Butter', 'Unrefined Cane Sugar'],
    tasteNotes: ['Intense', 'Rich', 'Pure Indulgence'],
    tasteProfile: {
      crunch: 92,
      sweetness: 40,
      richness: 98,
      aroma: 88
    },
    availability: true,
    bgTheme: '#1A0E0A',
    accentColor: '#C79A4A',
    moodCategory: 'RICH & INDULGENT'
  },
  {
    id: 'peri-peri-cashew',
    name: 'Peri Peri Cashew',
    slug: 'peri-peri-cashew',
    category: 'Spicy Snacks',
    flavour: 'Fiery Birdseye Chili & Spicy Peri Peri Seasoning',
    tagline: 'Spicy. Crunchy. Irresistible.',
    description: 'Hand-picked premium Mangalore jumbo cashews dry-roasted to a crispy crunch, tossed in a signature fiery peri-peri spice blend of African birdseye chili, lemon zest, garlic, and smoky paprika.',
    shortDescription: 'Jumbo roasted cashews dusted in fiery tangy peri peri spice mix.',
    price: 149,
    originalPrice: 199,
    weight: '100g',
    images: {
      poster: '/assets/peri_peri_poster.jpeg',
      jar: '/assets/peri_peri_poster.jpeg',
      ingredients: '/assets/peri_peri_cashews_hero_1789678016585.png'
    },
    ingredients: ['Jumbo Cashews', 'Peri Peri Spice Mix (Birdseye Chili, Paprika, Garlic, Onion)', 'Himalayan Pink Salt', 'Lemon Zest', 'Cold-pressed Oil'],
    tasteNotes: ['Spicy', 'Crunchy', 'Irresistible'],
    tasteProfile: {
      crunch: 96,
      sweetness: 10,
      richness: 85,
      aroma: 92,
      spice: 90
    },
    availability: true,
    bgTheme: '#220E08',
    accentColor: '#E84B16',
    moodCategory: 'BOLD & SPICY'
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};
