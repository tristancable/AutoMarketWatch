import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-(--bg)">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://s3mag.com/wp-content/uploads/2024/05/Autozam-AZ-1-14-1280x640.jpg"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          alt="Autozam AZ-1 background"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-8xl font-black italic mb-4 tracking-tighter uppercase text-(--text-h)">
            BEAT THE MARKET.
          </h1>
          <p className="text-xl text-(--text) max-w-xl mx-auto font-medium">
            Real-time valuation for enthusiasts who know that every mile—and
            every dollar—counts.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-20 px-8 grid md:grid-cols-2 gap-12 text-left">
        <div>
          <h2 className="text-4xl font-bold text-(--text-h) mb-6">
            Evolution of the Stack
          </h2>
          <div className="space-y-6 text-(--text) leading-relaxed text-lg">
            <p>
              <span className="text-(--accent) font-bold">
                AutoMarket Watch
              </span>{" "}
              is currently in{" "}
              <strong className="text-(--text-h)">Phase 1</strong>, focusing on
              a high-performance <strong>React</strong> frontend and client-side
              persistence. We use state-driven logic to manage your dream fleet
              instantly without server lag.
            </p>
            <p>
              The upcoming architecture will migrate this data to a
              <strong> MongoDB</strong> cluster, allowing for complex market
              trend analysis and cross-platform synchronization through a
              dedicated
              <strong> Node.js</strong> API.
            </p>
          </div>
        </div>

        <div className="bg-(--code-bg) border border-(--border) p-10 rounded-3xl flex flex-col justify-center shadow-xl">
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="bg-blue-600/10 p-3 rounded-xl">
                <span className="text-(--accent) font-black text-2xl">01</span>
              </div>
              <div className="flex flex-col">
                <span className="text-(--text-h) font-bold text-xl uppercase tracking-tight">
                  Live Market Tracking
                </span>
                <p className="text-sm text-(--text) mt-1 opacity-80">
                  Monitor valuation shifts across the most popular enthusiast
                  models in real-time.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start border-t border-(--border) pt-8">
              <div className="bg-blue-600/10 p-3 rounded-xl">
                <span className="text-(--accent) font-black text-2xl">02</span>
              </div>
              <div className="flex flex-col">
                <span className="text-(--text-h) font-bold text-xl uppercase tracking-tight">
                  Personal Watchlist
                </span>
                <p className="text-sm text-(--text) mt-1 opacity-80">
                  Save your "dream fleet" to a localized dashboard to see how
                  your portfolio is performing.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start border-t border-(--border) pt-8">
              <div className="bg-blue-600/10 p-3 rounded-xl">
                <span className="text-(--accent) font-black text-2xl">03</span>
              </div>
              <div className="flex flex-col">
                <span className="text-(--text-h) font-bold text-xl uppercase tracking-tight">
                  Predictive Analysis
                </span>
                <p className="text-sm text-(--text) mt-1 opacity-80">
                  Compare month-over-month trends to decide if it's time to buy,
                  hold, or sell.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
