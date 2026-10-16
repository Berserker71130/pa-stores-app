"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  desc?: string;
  image_url: string;
  in_stock: boolean;
}

interface cartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function ShopApp() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<cartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);

  // Sync Dark Mode Class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Fetch Live Products from Supabase
  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error fetching products:", error.message);
        } else if (data) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Unexpected error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Cart Handlers
  const addToCart = (product: Product) => {
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
          image: product.image_url,
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

  // Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Submit Order to Supabase Database
  const handleOrderSubmission = async () => {
    if (cart.length === 0) return;
    setIsSubmittingOrder(true);

    try {
      const { error } = await supabase.from("orders").insert([
        {
          customer_name: "Walk-in / Online Customer",
          customer_phone: "N/A",
          delivery_address: "Store Pickup / Direct Order",
          items: cart,
          total_amount: totalCartPrice,
          status: "Pending",
        },
      ]);

      if (error) {
        console.error("Order submission error:", error.message);
      }
    } catch (err) {
      console.error("Error submitting order:", err);
    } finally {
      setIsSubmittingOrder(false);
      setIsCartOpen(false);
      setIsOrderSubmitted(true);
    }
  };

  return (
    <div className={darkMode ? "dark min-h-screen" : "min-h-screen"}>
      <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans transition-colors duration-500 selection:bg-amber-500 selection:text-black">
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
                className="bg-amber-400 hover:bg-amber-500 text-black px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition shadow-lg shadow-amber-500/20 flex items-center space-x-2 cursor-pointer"
              >
                <span className="flex items-center space-x-1.5">
                  <FaShoppingCart /> <span>Cart</span>
                </span>
                <motion.span
                  key={totalCartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="bg-black text-amber-400 text-xs px-2 py-0.5 rounded-full font-black ml-1"
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
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {[
              "All",
              "Provisions",
              "Beverages",
              "Household",
              "Cooking Oil",
              "Toiletries",
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap shadow-sm cursor-pointer ${
                  activeCategory === cat
                    ? "bg-amber-400 text-black shadow-amber-200/20 font-black scale-105"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loading Skeleton */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 animate-pulse h-80"
                />
              ))}
            </div>
          ) : (
            /* Product Grid */
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div>
                      {/* Dedicated Image Box */}
                      <div className="relative w-full h-56 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-5 overflow-hidden flex items-center justify-center border border-slate-200/50 dark:border-slate-700/50">
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLElement;
                            target.style.display = "none";
                          }}
                        />
                        {/* Fallback Placeholder Display */}
                        <div className="text-center p-4">
                          <span className="text-3xl block mb-2">📦</span>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                            Photo Placeholder
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">
                            (Drop photo into {product.image_url})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-400/10 px-2.5 py-1 rounded-md">
                          {product.category}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          • In Stock
                        </span>
                      </div>

                      <h3 className="font-extrabold text-slate-900 dark:text-white text-lg mt-2">
                        {product.name}
                      </h3>
                      {product.desc && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          {product.desc}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">
                          Unit Price
                        </span>
                        <span className="text-lg font-black text-slate-900 dark:text-white">
                          ₦{product.price.toLocaleString()}
                        </span>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToCart(product)}
                        className="bg-amber-400 hover:bg-amber-500 text-black px-4 py-2.5 rounded-xl text-xs font-black transition shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
                      >
                        + Add to Cart
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <span className="text-4xl block mb-3">🔍</span>
              <h3 className="text-lg font-bold">No Products Found</h3>
              <p className="text-xs text-slate-500 mt-1">
                Try adjusting your category filter or search query.
              </p>
            </div>
          )}
        </main>

        {/* Slide-Over Cart Drawer */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />

              {/* Drawer Box */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-900 z-50 p-6 flex flex-col justify-between shadow-2xl border-l border-slate-200 dark:border-slate-800"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">
                        <FaShoppingCart />
                      </span>
                      <h2 className="text-xl font-black">Your Order Cart</h2>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold cursor-pointer"
                    >
                      ✕ Close
                    </button>
                  </div>

                  {/* Cart items list */}
                  <div className="py-6 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <span className="text-4xl block mb-2">🛍️</span>
                        <p className="text-sm text-slate-500 font-medium">
                          Your cart is empty
                        </p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
                        >
                          <div>
                            <h4 className="font-bold text-sm">{item.name}</h4>
                            <span className="text-xs text-amber-500 font-black">
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2 font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-xs font-black px-1">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2 font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Drawer Footer Summary */}
                <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-slate-500">Total Amount:</span>
                    <span className="text-2xl font-black text-amber-500">
                      ₦{totalCartPrice.toLocaleString()}
                    </span>
                  </div>

                  <button
                    disabled={cart.length === 0 || isSubmittingOrder}
                    onClick={handleOrderSubmission}
                    className="w-full bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-black font-black py-4 rounded-2xl transition shadow-xl shadow-amber-500/20 text-center text-sm cursor-pointer"
                  >
                    {isSubmittingOrder
                      ? "Submitting Order..."
                      : "Submit Order to Store →"}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Modern Framer Motion Order Confirmation Modal */}
        <AnimatePresence>
          {isOrderSubmitted && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOrderSubmitted(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
              >
                {/* Modal Window */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-black border border-emerald-500/20">
                    ✓
                  </div>

                  <h3 className="text-2xl font-black tracking-tight">
                    Order Received!
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    Your order compilation has been recorded. Our P & A Stores
                    desk will prepare your order for pickup or delivery.
                  </p>

                  <div className="my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 font-medium">
                        Items Selected:
                      </span>
                      <span className="font-bold">{totalCartCount} items</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400 font-medium">
                        Total Price:
                      </span>
                      <span className="font-black text-amber-500">
                        ₦{totalCartPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setCart([]);
                      setIsOrderSubmitted(false);
                    }}
                    className="w-full bg-amber-400 hover:bg-amber-500 text-black font-black py-3.5 rounded-xl text-sm transition shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    Done / Clear Cart
                  </button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <footer className="py-8 text-center text-xs text-slate-400 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/"
            className="hover:text-amber-500 transition font-semibold"
          >
            ← Back to Marketing Landing Page
          </Link>
        </footer>
      </div>
    </div>
  );
}
