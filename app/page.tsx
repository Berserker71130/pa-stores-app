"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark min-h-screen" : "min-h-screen"}>
      <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-sans transition-colors duration-500 selection:bg-amber-500 selection:text-black">
        {/* Sticky Glassmorphism Navbar with Real Logo */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-50 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Real Logo In Navbar */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 overflow-hidden rounded-2xl shadow-md group-hover:scale-105 transition-transform bg-amber-400 flex items-center justify-center">
                <Image
                  src="/P&A1.jpg"
                  alt="P & A Stores Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <span className="text-lg font-black tracking-tight block leading-none">
                  P & A STORES
                </span>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                  Enterprise Platform
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
              <a href="#features" className="hover:text-amber-500 transition">
                Features
              </a>
              <a href="#about" className="hover:text-amber-500 transition">
                About Us
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition text-sm font-medium border border-slate-200 dark:border-slate-700"
                aria-label="Toggle Theme"
              >
                <span>{darkMode ? "☀️" : "🌙"}</span>
              </motion.button>

              <Link
                href="/shop"
                className="bg-amber-400 hover:bg-amber-500 text-black px-6 py-3 rounded-xl text-sm font-black transition shadow-xl shadow-amber-500/25 flex items-center space-x-2 group"
              >
                <span>Enter Store App</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </div>
        </motion.header>

        {/* Hero Section With Prominent Logo Display */}
        <section className="relative overflow-hidden py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5 dark:from-amber-500/10 pointer-events-none"></div>

          <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
            {/* Logo Emblem Spotlight in Hero */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto w-28 h-28 sm:w-36 sm:h-36 relative rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/20 border border-amber-400/40 bg-amber-400 flex items-center justify-center mb-4 group hover:scale-105 transition-transform"
            >
              <Image
                src="/P&A1.jpg"
                alt="P & A Stores Emblem"
                fill
                className="object-contain p-2"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center space-x-2 bg-amber-400/10 border border-amber-400/30 text-amber-600 dark:text-amber-400 text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span>Next Gen Retail & Order Management</span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.1]"
            >
              The Modern Way to Experience <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400">
                P & A Stores
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
            >
              Explore quality household provisions, groceries, and daily
              essentials with lightning-fast catalog browsing and streamlined
              digital ordering.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-5 pt-4"
            >
              <Link
                href="/shop"
                className="w-full sm:w-auto bg-amber-400 hover:bg-amber-500 text-black font-black px-10 py-4 rounded-2xl transition shadow-2xl shadow-amber-500/20 text-center text-base"
              >
                Launch Store App
              </Link>
              <a
                href="#features"
                className="w-full sm:w-auto bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold px-8 py-4 rounded-2xl transition text-center text-base"
              >
                Explore Features
              </a>
            </motion.div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section
          id="features"
          className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Built for Speed and Reliability
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-2">
                Designed from the ground up to redefine how local retail handles
                customer inventory and orders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "⚡",
                  title: "Instant Catalog Access",
                  desc: "Browse verified store stock instantly with category filters and real-time pricing.",
                },
                {
                  icon: "🛡️",
                  title: "Seamless Order Flow",
                  desc: "Compile orders effortlessly and transmit them directly to store management logs.",
                },
                {
                  icon: "📱",
                  title: "Mobile-First Architecture",
                  desc: "Optimized entirely for mobile viewing, ensuring a fluid experience on any smartphone device.",
                },
              ].map((feat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="w-14 h-14 rounded-2xl bg-amber-400/10 text-amber-500 flex items-center justify-center font-bold text-2xl mb-6">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section
          id="about"
          className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-black text-amber-500 uppercase tracking-widest bg-amber-400/10 px-3.5 py-1.5 rounded-full border border-amber-400/20">
                Our Heritage & Vision
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Dedicated To Serving Our Community With Excellence.
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                P & A Stores has long stood as a trusted neighbourhood
                destination for quality daily household essentials, wholesale
                provisions and friendly retail service.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                This digital platform represents our next major leap
                forward—bridging traditional retail reliability with modern,
                high-speed technology to make inventory tracking and customer
                ordering smoother than ever.
              </p>
              <div className="pt-2 flex items-center space-x-6">
                <div>
                  <span className="block text-2xl font-black text-amber-500">
                    100%
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Verified Inventory
                  </span>
                </div>
                <div className="border-l border-slate-200 dark:border-slate-800 pl-6">
                  <span className="block text-2xl font-black text-amber-500">
                    Fast
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Digital Workflow
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-80 sm:h-96 rounded-3xl bg-gradient-to-br from-amber-400/20 to-blue-600/20 dark:from-amber-400/10 dark:to-blue-600/10 border border-slate-200 dark:border-slate-800 flex items-center justify-center p-8 relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
                <div className="relative z-10 text-center space-y-3">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <span className="text-2xl font-black text-black">PA</span>
                  </div>
                  <h4 className="font-extrabold text-lg">
                    P & A Stores Platform
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                    Engineered to showcase modern technical execution and
                    business value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Major Distributors Section (Verified Banner Information) */}
        <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Official Supply Chain
              </span>
              <h2 className="text-3xl font-black tracking-tight mt-3">
                Major Distributors Of
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[
                "DANGOTE",
                "PEPSI",
                "COCA-COLA",
                "FRUTTA",
                "BUA GROUP",
                "GOLDEN PENNY",
                "STAR OIL",
                "POP COLA",
                "CWAY",
                "UAC",
              ].map((brand, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center text-center shadow-sm"
                >
                  <span className="text-xs sm:text-sm font-black tracking-wider text-slate-700 dark:text-slate-300">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise Contact & Store Information Footer */}
        <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand Intro */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-amber-400 flex items-center justify-center">
                  <Image
                    src="/P&A1.jpg"
                    alt="P & A Stores Logo"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <span className="text-lg font-black tracking-tight">
                  P & A STORES
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                Your one stop store for all essentials. Delivering quality
                household provisions, wholesale goods, and fast digital order
                fulfillment.
              </p>
            </div>

            {/* Official Social Handle */}
            <div className="space-y-3">
              <span className="text-xs font-black text-amber-500 uppercase tracking-widest block">
                Social Connection
              </span>
              <div className="inline-flex items-center space-x-2.5 p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-lg">📸</span>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                    Instagram
                  </span>
                  <a
                    href="https://instagram.com/Pa_storess"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-extrabold text-slate-800 dark:text-slate-200 hover:text-amber-500 transition"
                  >
                    @Pa_storess
                  </a>
                </div>
              </div>
            </div>

            {/* Verified Contacts & Address */}
            <div className="space-y-3">
              <span className="text-xs font-black text-amber-500 uppercase tracking-widest block">
                Location & Support
              </span>
              <div className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <div className="flex items-start space-x-2">
                  <span>📍</span>
                  <p>No 1 Kashim Ibrahim Road, West of Mines, Jos, Nigeria.</p>
                </div>
                <div className="flex items-center space-x-2 pt-1">
                  <span>📞</span>
                  <p>09138571140, 09013784118</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-12 pt-6 text-center text-xs text-slate-400 border-t border-slate-200 dark:border-slate-800">
            © 2026 P & A Stores. Engineered For Excellence.
          </div>
        </footer>
      </div>
    </div>
  );
}
