import React, { useState, useEffect } from "react";
import {
  Search,
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Market = () => {
  const [symbols, setSymbols] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSymbols, setTotalSymbols] = useState(0);

  useEffect(() => {
    fetchSymbols();
  }, [page, searchTerm]);

  useEffect(() => {
    if (symbols.length > 0) {
      fetchStockData(symbols.map((s) => s.symbol));
    }
  }, [symbols]);

  const fetchSymbols = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/symbols?page=${page}&limit=50&search=${searchTerm}`
      );
      if (!response.ok) throw new Error("Failed to fetch symbols");
      const data = await response.json();
      setSymbols(data.data);
      setTotalPages(data.totalPages);
      setTotalSymbols(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStockData = async (symbolsList) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/stocks?symbols=${symbolsList.join(",")}`
      );
      if (!response.ok) throw new Error("Failed to fetch stock data");
      const data = await response.json();
      setStocks(data);
    } catch (err) {
      console.error("Error fetching stock data:", err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="bg-black min-h-screen text-white pt-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Stock Market Overview</h1>
          <div className="text-gray-400">Total Symbols: {totalSymbols}</div>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search by symbol or company name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <div className="grid grid-cols-5 gap-4 px-6 py-3 bg-gray-800 font-semibold">
            <div>Symbol</div>
            <div>Name</div>
            <div className="text-right">Price</div>
            <div className="text-right">24h Change</div>
            <div className="text-right">Volume</div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-400">
              Loading market data...
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {stocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-800 transition-colors"
                >
                  <div className="font-mono text-blue-400">{stock.symbol}</div>
                  <div className="truncate">{stock.name}</div>
                  <div className="text-right">
                    ${stock.price?.toFixed(2) || "N/A"}
                  </div>
                  <div
                    className={`text-right flex items-center justify-end ${
                      stock.change >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {stock.change != null ? (
                      <>
                        {stock.change >= 0 ? (
                          <TrendingUp size={16} className="mr-1" />
                        ) : (
                          <TrendingDown size={16} className="mr-1" />
                        )}
                        {Math.abs(stock.change).toFixed(2)}%
                      </>
                    ) : (
                      "N/A"
                    )}
                  </div>
                  <div className="text-right">
                    {stock.volume ? stock.volume.toLocaleString() : "N/A"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-gray-400">
            Page {page} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="p-2 rounded-lg bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="p-2 rounded-lg bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
