import { TProduct } from "@/types/common";

export const products: TProduct[] = [
  {
    _id: "123456789111111111111111",
    vendorId: "123456789111111111111111",
    name: "Apple iPhone 15 Pro",
    description: "Experience the latest technology with the iPhone 15 Pro.",
    shortDescription:
      "Latest iPhone model with cutting-edge features and camera system.",
    price: 10,
    stock: 0,
    category: {
      name: "Smartphones",
      description: "Latest and most powerful smartphones",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/31/Apple_logo_white.svg",
    },
    brand: {
      name: "Apple",
      description: "Innovative tech giant",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    images: [
      "https://images.unsplash.com/photo-1722503585127-f850a5cc7da5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGlwaG9uZSUyMDE1fGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
    ],
    reviews: [],
    rating: 2.5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "123456789111111111111112",
    vendorId: "123456789111111111111123",
    name: "Samsung Galaxy S24 Ultra",
    description: "The most powerful Galaxy smartphone ever.",
    shortDescription:
      "Flagship smartphone with ultra-powerful features and camera system.",
    price: 1199.99,
    stock: 20,
    category: {
      name: "Smartphones",
      description: "Latest and most powerful smartphones",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    },
    brand: {
      name: "Samsung",
      description: "Global leader in smartphone innovation",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
    },
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFwdG9wfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1722503585127-f850a5cc7da5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGlwaG9uZSUyMDE1fGVufDB8fDB8fHww",
    ],
    reviews: [],
    rating: 3.78,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "3",
    vendorId: "v103",
    name: "Sony WH-1000XM5 Headphones",
    description:
      "Industry-leading noise canceling headphones with up to 30 hours of battery life.",
    shortDescription:
      "Top-tier noise-canceling headphones with exceptional sound quality.",
    price: 349.99,
    stock: 40,
    category: {
      name: "Headphones",
      description: "Premium audio devices for music lovers",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Sony_logo.svg",
    },
    brand: {
      name: "Sony",
      description: "World-class audio technology",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/15/Sony_logo.svg",
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lfGVufDB8fDB8fHww",
    ],
    reviews: [],
    rating: 4.15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "4",
    vendorId: "v104",
    name: "Dell XPS 15 Laptop",
    description:
      "Powerful laptop with Intel Core i9 processor and OLED display.",
    shortDescription:
      "High-performance laptop ideal for work, gaming, and creative tasks.",
    price: 1799.99,
    stock: 15,
    category: {
      name: "Laptops",
      description: "High-performance laptops for work and gaming",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg",
    },
    brand: {
      name: "Dell",
      description: "Leading innovator in computing",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg",
    },
    images: [
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHNwZWFrZXJzfGVufDB8fDB8fHww",
    ],
    reviews: [],
    rating: 4.85,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const cProducts = [
  {
    name: "Sunglass",
    img: "https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanners%2Fcategory-3.png&w=3840&q=75",
    order: "3k orders this week",
    href: "/product?category=sunglass",
  },
  {
    name: "Headphone",
    img: "https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanners%2Fcategory-1.png&w=3840&q=75",
    order: "3k orders this week",
    href: "/product?category=headphone",
  },
  {
    name: "Watch",
    img: "https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanners%2Fcategory-2.png&w=3840&q=75",
    order: "3k orders this week",
    href: "/product?category=watch",
  },
  {
    name: "Sunglass",
    img: "https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanners%2Fcategory-3.png&w=3840&q=75",
    order: "3k orders this week",
    href: "/product?category=sunglass",
  },
  {
    name: "Headphone",
    img: "https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanners%2Fcategory-1.png&w=3840&q=75",
    order: "3k orders this week",
    href: "/product?category=headphone",
  },
  {
    name: "Watch",
    img: "https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanners%2Fcategory-2.png&w=3840&q=75",
    order: "3k orders this week",
    href: "/product?category=watch",
  },
  {
    name: "Sunglass",
    img: "https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanners%2Fcategory-3.png&w=3840&q=75",
    order: "3k orders this week",
    href: "/product?category=sunglass",
  },
  {
    name: "Headphone",
    img: "https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanners%2Fcategory-1.png&w=3840&q=75",
    order: "3k orders this week",
    href: "/product?category=headphone",
  },
  {
    name: "Watch",
    img: "https://bonik-react.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanners%2Fcategory-2.png&w=3840&q=75",
    order: "3k orders this week",
    href: "/product?category=watch",
  },
];
