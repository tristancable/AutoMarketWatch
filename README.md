# 🏎️ AutoMarket Watch (Phase 2)

AutoMarket Watch is a high-performance web application designed for automotive enthusiasts to track market valuations of iconic vehicles in real-time. Built with a focus on speed and clean UI, it allows users to monitor price trends and curate a personal "dream fleet" watchlist.

---

## 🚀 Current Features (Phase 2)

- **Live Market Feed:** Real-time visualization of vehicle data, including year, model, and average market price pulled from the NHTSA vPIC API.
- **Trend Tracking:** Visual indicators (▲/▼) showing month-over-month value shifts.
- **Persistent Watchlist:** Add vehicles to a personal tracking dashboard saved via LocalStorage—your data stays with you even after a page refresh.
- **Responsive Design:** Fully optimized for desktop and mobile viewing using Tailwind CSS.
- **Dynamic Theming:** Built with CSS variables for seamless design consistency across the "Market" and "Watchlist" views.

---

## 🛠️ The Tech Stack

- **Frontend:** React 18 with TypeScript
- **Styling:** Tailwind CSS (Utility-first CSS)
- **Icons/UI:** Custom SVG components and Lucide-inspired design
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Persistence:** Browser LocalStorage API
- **Vehicle Data:** [NHTSA vPIC API](https://vpic.nhtsa.dot.gov/api/)
- **Photography:** [IMAGIN.studio](https://www.imaginstudio.com)

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have the following installed before getting started:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)

You can verify your versions by running:

```bash
node -v
npm -v
```

### 1. Clone the Repository

```bash
git clone https://github.com/tristancable/AutoMarketWatch
cd automarketwatch
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The app will be available at **http://localhost:5173** (or the port shown in your terminal if using Vite).

### 4. Build for Production (Optional)

```bash
npm run build
```

The compiled output will be in the `dist/` folder, ready to deploy.

---

## 📋 Project Roadmap

This project follows a structured 5-phase development cycle to evolve from a static prototype into a complete social marketplace:

- [x] **Phase 1:** Stack Choice & Sample App – Establishing the React + TypeScript foundation and core UI components.
- [x] **Phase 2:** Talking to APIs – Integrating external automotive data sources and handling asynchronous data fetching.
- [ ] **Phase 3:** Custom API & CRUD – Building a dedicated Node/Express backend to manage custom vehicle listings and market data.
- [ ] **Phase 4:** Adding Persistence – Implementing MongoDB to move beyond local storage and securely store global application data.
- [ ] **Phase 5:** Membership & User Interactions – Introducing user authentication, profiles, and community-driven features.
