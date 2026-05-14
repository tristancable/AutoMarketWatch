import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Car {
  year: number;
  name: string;
  price: string;
  trend: string;
  isUp: boolean;
  image: string;
}

const Watchlist: React.FC = () => {
  const [watchedCars, setWatchedCars] = useState<Car[]>(() => {
    const savedCars = localStorage.getItem("watchlist");
    return savedCars ? JSON.parse(savedCars) : [];
  });

  const removeFromWatchlist = (name: string) => {
    const updated = watchedCars.filter((car) => car.name !== name);
    setWatchedCars(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  };

  return (
    <div className="max-w-7xl mx-auto p-8 text-left">
      <div className="mb-10 text-left">
        <h1 className="text-4xl font-bold text-(--text-h) mb-2">
          My Watchlist
        </h1>
        <p className="text-(--text)">Tracking the value of your dream fleet.</p>
      </div>

      {watchedCars.length === 0 ? (
        <div className="bg-(--code-bg) border-2 border-dashed border-(--border) rounded-3xl p-20 text-center">
          <h2 className="text-2xl font-bold text-(--text-h) mb-4">
            Your Watchlist is Empty
          </h2>
          <p className="text-(--text) mb-8">
            You haven't added any vehicles to track yet.
          </p>
          <Link
            to="/market"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-blue-500 transition-all"
          >
            Explore Market
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {watchedCars.map((car, index) => (
            <div
              key={index}
              className="flex flex-col bg-(--code-bg) border border-(--border) rounded-2xl overflow-hidden hover:shadow-2xl transition-all text-left"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-bold text-(--text-h) mb-2">
                  {car.year} {car.name}
                </h3>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-(--text) uppercase font-semibold tracking-wider">
                    Avg. Market Price
                  </span>
                  <span className="text-(--accent) font-mono font-bold text-lg">
                    {car.price}
                  </span>
                </div>

                <div
                  className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter w-fit ${
                    car.isUp
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-rose-500/10 text-rose-400"
                  }`}
                >
                  {car.trend} vs Last Month
                </div>

                <button
                  onClick={() => removeFromWatchlist(car.name)}
                  className="mt-6 block text-center bg-rose-600/10 text-rose-500 border border-rose-500/20 font-bold py-3 rounded-xl hover:bg-rose-500 hover:text-white transition-all uppercase text-xs tracking-widest cursor-pointer"
                >
                  Remove Vehicle
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
