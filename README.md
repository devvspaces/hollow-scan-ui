# HollowScan UI

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?logo=framer)](https://www.framer.com/motion/)

A high-performance, modern, and interactive landing page for **HollowScan**, the premier arbitrage and restock monitoring application. Designed with a focus on speed, precision, and visual excellence.

## 🚀 Live Now
The HollowScan app is officially live and available for download:
- [**Download on the App Store**](https://hollowscan.com/ios)
- [**Get it on Google Play**](https://hollowscan.com/android)

---

## ✨ Key Features

### 🃏 Interactive 3D Trading Card
A premium, browser-based 3D trading card component featuring:
- **Real-time mouse tracking** with spring-physics tilt effects.
- **Holographic shimmer & gloss overlays** that react to movement.
- **Card-flip interaction** to reveal hidden details.

### ⚡ Real-Time Stats Engine
Dynamic dashboard-style counters tracking:
- **System Uptime:** Continuous counting since the official launch.
- **Speed Metrics:** Sub-50ms execution and instant response indicators.
- **Global Coverage:** Real-time site and region tracking.

### ❓ Animated FAQ System
A polished, grouped accordion system with:
- **Smooth Framer Motion transitions.**
- **High-contrast active states** with subtle glow effects.
- **Categorized information architecture** for a cleaner user experience.

### 🖥️ Immersive Loading Experience
A custom-built, cyber-aesthetic loading screen featuring:
- **System initialization simulations.**
- **Glitch-text effects** and scanning line animations.
- **Branded logo integration.**

---

## 🛠️ Tech Stack

- **Core Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Frontend Library:** [React 18](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) (Complex interactive 3D & physics)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (Strictly typed)

---

## 📂 Project Structure

```text
├── app/                    # Next.js App Router (Layouts, Pages, Styles)
│   ├── globals.css         # Global design tokens and animations
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Main assembly for the landing page
├── components/             # Reusable UI Components
│   ├── HeroSection         # High-impact CTA and navigation
│   ├── TradingCardSection  # Interactive 3D trading card
│   ├── FaqSection          # Animated FAQ system
│   ├── StatsSection        # Live counters and metrics
│   ├── FeaturesSection     # 2x2 Feature matrix
│   └── LoadingScreen       # Branded pre-loader
├── public/                 # Static assets (Logos, Interactive card source)
└── tailwind.config.ts      # Custom theme and design system configuration
```

---

## 📈 Development Workflow

The project follows a component-driven development approach:
1.  **Atomic Components:** UI elements are isolated in `components/ui` for maximum reusability.
2.  **Section Composition:** Large page sections (Hero, Stats, FAQ) are built and tested independently.
3.  **Animation Pacing:** Framer Motion is used with spring physics to ensure animations feel "alive" and responsive to user input rather than canned.
4.  **Performance Optimization:** Aggressive use of Next.js `Image` optimization and client-side component boundaries for fluid 60fps interactions.

---

## 🔧 Getting Started

First, install the dependencies:
```bash
npm install
# or
yarn install
```

Then, run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🛡️ License
Used for the HollowScan official platform. (c) 2026 Hollowscan. All rights reserved.
