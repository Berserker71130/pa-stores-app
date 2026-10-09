"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

// Mock Product Dataset (Supabase-Ready Schema) TO CHANGE LATER TO APPROPRIATE CONNECTION
const INITIAL_PRODUCTS = [
  {
    id: "1",
    name: "Golden Penny Spaghetti",
    category: "Provisions",
    price: 1200,
    desc: "500g premium quality pasta staple",
    image: "/products/pasta.jpg",
    instock: true,
  },
  {
    id: "2",
    name: "Hollandia Evap Milk",
    category: "Beverages",
    price: 550,
    desc: "190g rich and creamy evaporated milk",
    image: "/products/milk.jpg",
    instock: true,
  },
  {
    id: "3",
    name: "Close-Up Red Hot",
    category: "Toiletries",
    price: 950,
    desc: "140 triple fresh breath toothpaste",
    image: "/products/closeup.jpg",
    instock: true,
  },
  {
    id: "4",
    name: "Milo Refill Pack",
    category: "Beverages",
    price: 3200,
    desc: "500g energy food drink powder",
    image: "/products/milo.jpg",
    instock: true,
  },
  {
    id: "5",
    name: "Dettol Hygiene Soap",
    category: "Toiletries",
    price: 650,
    desc: "110g antibacterial bathing soap",
    image: "/products/dettol.jpg",
    instock: true,
  },
  {
    id: "6",
    name: "Mama Gold Rice 5kg",
    category: "Provisions",
    price: 7800,
    desc: "Premium long grain Nigerian rice",
    image: "/products/rice.jpg",
    instock: true,
  },
];

interface cartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function ShopApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<cartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  //   Sync Dark Mode Class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  //   Cart Handlers
  const addToCart = (product: (typeof INITIAL_PRODUCTS)[0]) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) => {
            if (item.id === id) {
              const newQty = item.quantity + delta;
              return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
          })
          .filter(Boolean) as cartItem[],
    );
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  //   Filter Logic
  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return (
    <div className={darkMode ? "dark min-h-screen" : "min-h-screen"}>
      <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans transition-colors duration-500 selection:bg-amber-500 selection-text-black">
        {/* Sticky App Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Brand Identity */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-11 h-11 overflow-hidden rounded-2xl shadow-md group-hover:scale-105 transition-transform bg-amber-400 flex items-center justify-center">
                <Image
                  src="/P&A1.jpg"
                  alt="P & A Stores Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="text-base sm:text-lg font-black tracking-tight block leading-none">
                  P & A STORES
                </span>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                  Digital Catalog
                </span>
              </div>
            </Link>

            {/* Top Bar Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-sm border border-slate-200 dark:border-slate-700"
                aria-label="Toggle Theme"
              >
                <span>{darkMode ? "☀️" : "🌙"}</span>
              </motion.button>

              {/* Cart Drawer Trigger */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="bg-amber-400 hover:bg-amber-500 text-black px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition shadow-lg shadow-amber-500/20 flex items-center space-x-2"
              >
                <span>
                  <FaShoppingCart /> Cart
                </span>
                <motion.span
                  key={totalCartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="bg-black text-amber-400 text-xs px-2 py-0.5 rounded-full font-black"
                >
                  {totalCartCount}
                </motion.span>
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Main Catalog View */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header, Title & Live Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Browse Products
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Select items to compile your instant store order
              </p>
            </div>

            {/* Live Search Field */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition shadow-sm"
              />
              <span className="absolute left-3.5 top-3.5 text-slate-400 text-sm">
                🔍
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
        </main>
      </div>
    </div>
  );
}
