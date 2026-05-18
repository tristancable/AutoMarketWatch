import React, { useState, useEffect, useCallback } from "react";

interface CarListing {
  id: number;
  make: string;
  model: string;
  year: number;
  imageUrl: string;
  estimatedPrice: string;
  trend: string;
  isUp: boolean;
  category: string;
}

const SEED_VEHICLES: {
  make: string;
  model: string;
  year: number;
  category: string;
}[] = [
  { make: "Toyota", model: "Camry", year: 2023, category: "Sedan" },
  { make: "Ford", model: "Mustang", year: 2023, category: "Coupe" },
  { make: "Chevrolet", model: "Corvette", year: 2023, category: "Sport" },
  { make: "Honda", model: "Civic", year: 2023, category: "Sedan" },
  { make: "BMW", model: "M3", year: 2023, category: "Coupe" },
  { make: "Subaru", model: "WRX", year: 2023, category: "Sport" },
  { make: "Dodge", model: "Challenger", year: 2023, category: "Coupe" },
  { make: "Nissan", model: "370Z", year: 2022, category: "Sport" },
  { make: "Mercedes-Benz", model: "C-Class", year: 2023, category: "Sedan" },
  { make: "Audi", model: "A4", year: 2023, category: "Sedan" },
  { make: "Volkswagen", model: "Golf", year: 2023, category: "Hatch" },
  { make: "Porsche", model: "911", year: 2023, category: "Sport" },
];

function buildCarImageUrl(make: string, model: string, year: number): string {
  const url = new URL("https://cdn.imagin.studio/getimage");
  url.searchParams.set("customer", "img");
  url.searchParams.set("make", make.toLowerCase().replace(/\s+/g, "-"));
  url.searchParams.set("modelFamily", model.split(" ")[0].toLowerCase());
  url.searchParams.set("modelYear", String(year));
  url.searchParams.set("zoomType", "fullscreen");
  url.searchParams.set("angle", "23");
  return url.toString();
}

function estimatePrice(make: string, year: number): string {
  const premium = ["bmw", "mercedes-benz", "audi", "porsche", "lexus"];
  const sport = ["chevrolet", "dodge", "ford", "nissan", "subaru"];
  let base = 28000;
  if (premium.includes(make.toLowerCase())) base = 52000;
  else if (sport.includes(make.toLowerCase())) base = 38000;
  const ageFactor = Math.max(0.5, 1 - (2025 - year) * 0.04);
  const price = Math.round(base * ageFactor * (0.88 + Math.random() * 0.24));
  return `$${price.toLocaleString()}`;
}

const Market: React.FC = () => {
  const [listings, setListings] = useState<CarListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "up" | "down">("all");
  const [watchlist, setWatchlist] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem("amw_watchlist");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    const controller = new AbortController();

    async function fetchListings() {
      try {
        setLoading(true);
        setError(null);

        const results = await Promise.all(
          SEED_VEHICLES.map(async ({ make, model, year, category }, idx) => {
            const res = await fetch(
              `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${year}?format=json`,
              { signal: controller.signal },
            );

            let verifiedModel = model;
            if (res.ok) {
              const json = await res.json();
              const match = (json.Results as any[])?.find(
                (r: any) => r.Model_Name?.toLowerCase() === model.toLowerCase(),
              );
              if (match?.Model_Name) verifiedModel = match.Model_Name;
            }

            const isUp = Math.random() > 0.4;
            const trendVal = isUp
              ? `+${(Math.random() * 4 + 0.4).toFixed(1)}%`
              : `-${(Math.random() * 3 + 0.2).toFixed(1)}%`;

            return {
              id: idx,
              make,
              model: verifiedModel,
              year,
              imageUrl: buildCarImageUrl(make, model, year),
              estimatedPrice: estimatePrice(make, year),
              trend: trendVal,
              isUp,
              category,
            } satisfies CarListing;
          }),
        );

        setListings(results);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError("Failed to load vehicle data. Please try again.");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
    return () => controller.abort();
  }, []);

  const toggleWatchlist = useCallback((car: CarListing) => {
    setWatchlist((prev) => {
      const next = new Set(prev);
      if (next.has(car.id)) {
        next.delete(car.id);
      } else {
        next.add(car.id);
      }
      try {
        localStorage.setItem("amw_watchlist", JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }, []);

  const filtered = listings.filter((c) =>
    filter === "all" ? true : filter === "up" ? c.isUp : !c.isUp,
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-(--border) rounded-full" />
          <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-(--text-h) tracking-tight">
            Loading vehicle listings
          </p>
          <p className="text-sm text-(--text) opacity-60 mt-1">
            Fetching from NHTSA vPIC&hellip;
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-8">
        <div className="bg-rose-500/10 border border-rose-500/20 p-8 rounded-2xl max-w-md text-center">
          <div className="text-3xl mb-3">⚠️</div>
          <p className="text-lg font-bold text-rose-400 mb-2">
            Could not load listings
          </p>
          <p className="text-sm text-(--text) opacity-70">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10 border-b border-(--border) pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-blue-400 uppercase mb-2">
            Auto Market Watch
          </p>
          <h1 className="text-5xl font-black tracking-tighter text-(--text-h) uppercase italic leading-none">
            Market Feed
          </h1>
          <p className="text-(--text) mt-2 text-sm opacity-70">
            Vehicle data via{" "}
            <a
              href="https://vpic.nhtsa.dot.gov/api/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              NHTSA vPIC API
            </a>
            {" · "}Images via{" "}
            <a
              href="https://imagin.studio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              IMAGIN.studio
            </a>
            {" · "}Pricing is simulated for demo purposes.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-widest">
          {(["all", "up", "down"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                filter === f
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-(--code-bg) border-(--border) text-(--text) hover:border-blue-500/40"
              }`}
            >
              {f === "all"
                ? "All"
                : f === "up"
                  ? "↑ Trending Up"
                  : "↓ Trending Down"}
            </button>
          ))}
          {watchlist.size > 0 && (
            <span className="px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              ★ {watchlist.size} watching
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((car) => {
          const watched = watchlist.has(car.id);
          return (
            <div
              key={car.id}
              className="flex flex-col bg-(--code-bg) border border-(--border) rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="relative h-52 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                <img
                  src={car.imageUrl}
                  alt={`${car.year} ${car.make} ${car.model}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.opacity = "0";
                  }}
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-(--bg)/80 backdrop-blur border border-(--border) text-xs font-black text-(--text-h)">
                  {car.year}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-blue-600/80 backdrop-blur text-white text-[10px] font-bold uppercase tracking-wider">
                  {car.category}
                </div>
              </div>

              <div className="p-5 flex flex-col grow">
                <h3 className="text-xl font-black text-(--text-h) tracking-tight uppercase italic leading-tight">
                  {car.make} {car.model}
                </h3>

                <div className="flex items-center justify-between mt-4 p-3.5 rounded-2xl bg-(--bg) border border-(--border)">
                  <div>
                    <div className="text-[9px] uppercase tracking-[0.18em] font-bold text-(--text) opacity-60 mb-0.5">
                      Est. Valuation
                    </div>
                    <div className="text-xl font-black font-mono text-(--accent)">
                      {car.estimatedPrice}
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1.5 rounded-xl text-xs font-black tracking-tight ${
                      car.isUp
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {car.trend}
                  </div>
                </div>

                <button
                  onClick={() => toggleWatchlist(car)}
                  className={`mt-4 w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    watched
                      ? "bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
                      : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                  }`}
                >
                  {watched ? "★ Watching" : "+ Add to Watchlist"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-(--text) opacity-50">
          No listings match the current filter.
        </div>
      )}
    </div>
  );
};

export default Market;
