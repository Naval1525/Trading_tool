import React, { useState, useEffect } from "react";
import { Search, TrendingUp, TrendingDown, X } from "lucide-react";

const StockCard = ({ stock }) => (
  <div className="bg-gray-900 rounded-lg p-4 hover:bg-gray-800 transition-all border border-gray-800 hover:border-gray-700">
    <div className="flex justify-between items-start mb-2">
      <span className="font-mono text-lg font-bold text-blue-400">
        {stock.symbol}
      </span>
      <div
        className={`flex items-center ${
          stock.change >= 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {stock.change != null && (
          <>
            {stock.change >= 0 ? (
              <TrendingUp size={16} className="mr-1" />
            ) : (
              <TrendingDown size={16} className="mr-1" />
            )}
            {Math.abs(stock.change).toFixed(2)}%
          </>
        )}
      </div>
    </div>
    <div className="text-sm text-gray-400 mb-2 truncate">{stock.name}</div>
    <div className="text-lg font-semibold">
      ${stock.price?.toFixed(2) || "N/A"}
    </div>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-xl font-bold mb-4 text-gray-200 border-b border-gray-800 pb-2">
    {children}
  </h2>
);

const Market = () => {
  const [marketData, setMarketData] = useState({
    topTrades: [],
    mostTraded: [],
    popular: [],
    gainersLarge: [],
    gainersMid: [],
    gainersSmall: [],
    losersLarge: [],
    losersMid: [],
    losersSmall: [],
    intraday: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const fetchMarketData = async () => {
    try {
      // Example symbols for each category (you should replace these with actual API calls)
      const topTrades = await fetchStockData(["AAPL", "MSFT", "GOOGL", "AMZN"]);
      const mostTraded = await fetchStockData(["TSLA", "NVDA", "AMD", "META"]);
      const popular = await fetchStockData(["NFLX", "DIS", "PYPL", "INTC"]);
      // ... fetch other categories

      setMarketData({
        topTrades,
        mostTraded,
        popular,
        gainersLarge: await fetchStockData(["JPM", "BAC", "WFC"]),
        gainersMid: await fetchStockData(["SNAP", "PINS", "DASH"]),
        gainersSmall: await fetchStockData(["GME", "AMC", "BB"]),
        losersLarge: await fetchStockData(["IBM", "INTC", "CSCO"]),
        losersMid: await fetchStockData(["PLTR", "SOFI", "HOOD"]),
        losersSmall: await fetchStockData(["WISH", "BBBY", "NOK"]),
        intraday: await fetchStockData(["SPY", "QQQ", "IWM"]),
      });
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchStockData = async (symbols) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/stocks?symbols=${symbols.join(",")}`
      );
      if (!response.ok) throw new Error("Failed to fetch stock data");
      return await response.json();
    } catch (error) {
      console.error("Error fetching stocks:", error);
      return [];
    }
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      setIsSearching(false);
      return;
    }

    setLoading(true);
    setIsSearching(true);
    try {
      const data = await fetchStockData([searchTerm.toUpperCase()]);
      setSearchResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    setSearchResults([]);
  };

  useEffect(() => {
    fetchMarketData();
    // Only set up interval if not searching
    if (!isSearching) {
      const interval = setInterval(fetchMarketData, 30000);
      return () => clearInterval(interval);
    }
  }, [isSearching]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Search Bar */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-sm border-b border-gray-800 px-4 py-4 z-50">
        <div className="max-w-7xl mx-auto flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search stocks by symbol (e.g., AAPL)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="w-full bg-gray-900 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-gray-400 py-20">
            Loading market data...
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-20">Error: {error}</div>
        ) : isSearching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {searchResults.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <section>
              <SectionTitle>Top Trades</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {marketData.topTrades.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
            </section>

            <section>
              <SectionTitle>Most Traded</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {marketData.mostTraded.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
            </section>

            <section>
              <SectionTitle>Popular</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {marketData.popular.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
            </section>

            <section>
              <SectionTitle>Gainers</SectionTitle>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-400">
                    Large Cap
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {marketData.gainersLarge.map((stock) => (
                      <StockCard key={stock.symbol} stock={stock} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-400">
                    Mid Cap
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {marketData.gainersMid.map((stock) => (
                      <StockCard key={stock.symbol} stock={stock} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-400">
                    Small Cap
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {marketData.gainersSmall.map((stock) => (
                      <StockCard key={stock.symbol} stock={stock} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <SectionTitle>Losers</SectionTitle>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-400">
                    Large Cap
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {marketData.losersLarge.map((stock) => (
                      <StockCard key={stock.symbol} stock={stock} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-400">
                    Mid Cap
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {marketData.losersMid.map((stock) => (
                      <StockCard key={stock.symbol} stock={stock} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-400">
                    Small Cap
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {marketData.losersSmall.map((stock) => (
                      <StockCard key={stock.symbol} stock={stock} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section>
              <SectionTitle>Top Intraday</SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {marketData.intraday.map((stock) => (
                  <StockCard key={stock.symbol} stock={stock} />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Market;
