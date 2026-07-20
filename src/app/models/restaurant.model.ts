export interface Restaurant {
  id: number;
  dishImage: string;
  dishName: string;
  shortName: string;
  description: string;
  price: number;
  city: string;
  distance: string;
  rating: number;
}

export const DUMMY_RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    dishImage:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500',
    dishName: 'Chicken Biryani',
    shortName: 'Karachi Biryani House',
    description:
      'Fragrant basmati rice layered with tender spiced chicken, slow-cooked to perfection.',
    price: 450,
    city: 'Karachi',
    distance: '1.2 km',
    rating: 4.5,
  },
  {
    id: 2,
    dishImage:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
    dishName: 'Beef Seekh Kebab',
    shortName: 'Bundu Khan',
    description:
      'Charcoal grilled minced beef skewers with a smoky flavor and fresh herbs.',
    price: 380,
    city: 'Lahore',
    distance: '3.4 km',
    rating: 4.7,
  },
  {
    id: 3,
    dishImage:
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=500',
    dishName: 'Margherita Pizza',
    shortName: "Papa John's",
    description:
      'Classic wood-fired pizza with fresh mozzarella, basil, and tomato sauce.',
    price: 890,
    city: 'Islamabad',
    distance: '2.1 km',
    rating: 4.3,
  },
  {
    id: 4,
    dishImage:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    dishName: 'Chinese Fried Rice',
    shortName: 'Dragon City',
    description:
      'Wok-tossed rice with vegetables, egg, and choice of chicken or shrimp.',
    price: 520,
    city: 'Karachi',
    distance: '900 m',
    rating: 4.1,
  },
  {
    id: 5,
    dishImage:
      'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=500',
    dishName: 'Beef Burger Deluxe',
    shortName: 'OPTP',
    description:
      'Juicy beef patty with cheddar cheese, lettuce, and signature sauce.',
    price: 650,
    city: 'Karachi',
    distance: '1.8 km',
    rating: 4.6,
  },
];
