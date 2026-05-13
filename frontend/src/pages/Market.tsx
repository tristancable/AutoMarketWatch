import React from "react";

const Market: React.FC = () => {
  const carData = [
    {
      year: 1995,
      name: "Toyota Corolla",
      price: "$4,500",
      trend: "+1.5%",
      isUp: true,
      image:
        "https://static.cargurus.com/images/site/2015/10/20/17/30/1995_toyota_corolla_base-pic-4293196301910102715-1600x1200.jpeg",
    },
    {
      year: 2002,
      name: "Subaru Impreza WRX",
      price: "$15,000",
      trend: "-0.5%",
      isUp: false,
      image: "https://i.ytimg.com/vi/sB81cZKu6aU/maxresdefault.jpg",
    },
    {
      year: 2020,
      name: "Porsche 911 GT3 RS",
      price: "$192,000",
      trend: "+2.4%",
      isUp: true,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH4P4h4X5vunckdtxcOvPJYBUkFchz9HN_Ew&s",
    },
    {
      year: 1995,
      name: "Toyota Supra",
      price: "$56,500",
      trend: "-1.2%",
      isUp: false,
      image:
        "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=70/59339d5e07287c702e69307de910cceaa69c1d04/photos/KY5L1v8x-4oRssBAKli-(edit).jpg?t=171608201255",
    },
    {
      year: 1995,
      name: "Mazda RX-7",
      price: "$91,000",
      trend: "+0.8%",
      isUp: true,
      image:
        "https://www.edmunds.com/assets/m/mazda/rx-7/1995/oem/1995_mazda_rx-7_coupe_base_fq_oem_1_500.jpg",
    },
  ];

  const addToWatchlist = (car: any) => {
    const currentWatchlist = JSON.parse(
      localStorage.getItem("watchlist") || "[]",
    );

    if (!currentWatchlist.some((item: any) => item.name === car.name)) {
      const updatedWatchlist = [...currentWatchlist, car];
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      alert(`${car.name} added to Watchlist!`);
    } else {
      alert("Vehicle is already being tracked.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="mb-10 text-left">
        <h1 className="text-4xl font-bold text-[var(--text-h)]">
          Live Market Feed
        </h1>
        <p className="text-[var(--text)] mt-2">
          Real-time valuation updates from across the nation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {carData.map((car, index) => (
          <div
            key={index}
            className="flex flex-col bg-[var(--code-bg)] border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-2xl transition-all text-left"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-[var(--text-h)] mb-2">
                {car.year} {car.name}
              </h3>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-[var(--text)] uppercase font-semibold tracking-wider">
                  Avg. Market Price
                </span>
                <span className="text-[var(--accent)] font-mono font-bold text-lg">
                  {car.price}
                </span>
              </div>

              <div
                className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter w-fit ${car.isUp ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}
              >
                {car.trend} vs Last Month
              </div>

              <button
                onClick={() => addToWatchlist(car)}
                className="mt-6 block text-center bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-500 transition-all uppercase text-xs tracking-widest cursor-pointer"
              >
                Track This Vehicle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Market;
