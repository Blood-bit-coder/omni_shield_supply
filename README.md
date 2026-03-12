# 🛡️ Omni Shield Supply Chain

<div align="center">

![Omni Shield](https://img.shields.io/badge/Omni-Shield-8B5CF6?style=for-the-badge&logo=react&logoColor=white)
![Aleo](https://img.shields.io/badge/Aleo-Blockchain-000000?style=for-the-badge&logo=aleo&logoColor=white)
![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-3D-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

### 🚀 Enterprise Supply Chain Management on Aleo Blockchain

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Structure](#project-structure) • [License](#license)

</div>

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration Files](#configuration-files)
- [Usage Guide](#usage-guide)
- [Components](#components)
- [Pages](#pages)
- [Hooks](#custom-hooks)
- [3D Animations](#3d-animations)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🔍 Overview

Omni Shield is a **next-generation supply chain management system** built on the Aleo blockchain. It provides real-time tracking, immutable records, and complete transparency for global supply chain operations with stunning 3D visualizations.

---

## ✨ Features

### 🎨 **Visual Experience**
- **3D Animated Background** - Floating spheres, particle fields, and stars using Three.js
- **Smooth Animations** - Framer Motion powered transitions
- **Glassmorphism UI** - Modern frosted glass design
- **Responsive Design** - Works on all devices

### 🔗 **Blockchain Integration**
- **Aleo Wallet Connection** - Connect with Aleo wallets
- **Immutable Records** - All transactions on blockchain
- **Smart Contracts** - Leo programs for supply chain logic

### 📦 **Supply Chain Functions**
- **Manufacture Items** - Create new supply items on blockchain
- **Transfer Custody** - Transfer items with Bill of Lading
- **Track History** - Complete transfer history
- **Real-time Status** - Live item status updates

### 📊 **Analytics**
- **Interactive Charts** - Visual data representation
- **Performance Metrics** - Supply chain insights
- **Status Distribution** - Item status breakdown

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TypeScript, Vite |
| **Styling** | Tailwind CSS, CSS3 |
| **3D Graphics** | Three.js, React Three Fiber, React Three Drei |
| **Animations** | Framer Motion |
| **Blockchain** | Aleo, Leo Language |
| **Routing** | React Router DOM v6 |
| **Charts** | Recharts |
| **Utilities** | clsx, date-fns |

---

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Step-by-Step Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/omni-shield-supply-chain.git
cd omni-shield-supply-chain

# 2. Navigate to frontend
cd frontend

# 3. Install dependencies
npm install

# 4. Install additional packages
npm install framer-motion three @react-three/fiber @react-three/drei
npm install react-router-dom recharts clsx

# 5. Install dev dependencies
npm install -D tailwindcss postcss autoprefixer @types/react @types/react-dom

# 6. Start development server
npm run dev
