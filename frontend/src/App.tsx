import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Watchlist from "./pages/Watchlist";
import "./index.css";

function App() {
  return (
    <Router>
      <nav className="sticky top-0 z-50 bg-[#08060d]/90 backdrop-blur-md border-b border-white/10 px-8 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {" "}
          {/* added items-center */}
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white italic shadow-lg shadow-blue-900/20">
              AM
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase">
              AutoMarket<span className="text-blue-500">Watch</span>
            </span>
          </div>
          {/* Links Section */}
          <div className="flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em]">
            <Link
              to="/"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/market"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Market
            </Link>
            <Link
              to="/watchlist"
              className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-md"
            >
              Watchlist
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/watchlist" element={<Watchlist />} />
      </Routes>
    </Router>
  );
}

export default App;
