// // // import React, { useState, useEffect } from "react";
// // // import { Search, TrendingUp, TrendingDown, X, Globe } from "lucide-react";
// // // import { useNavigate } from "react-router-dom";

// // // // Exchange options with their corresponding suffixes
// // // const EXCHANGES = [
// // //   {
// // //     value: "NSE",
// // //     label: "National Stock Exchange of India (NSE)",
// // //     suffix: ".NS",
// // //   },
// // //   {
// // //     value: "BSE",
// // //     label: "Bombay Stock Exchange (BSE)",
// // //     suffix: ".BO",
// // //   },
// // //   {
// // //     value: "MSE",
// // //     label: "Metropolitan Stock Exchange of India (MSE)",
// // //     suffix: ".MSE",
// // //   },
// // //   {
// // //     value: "CSE",
// // //     label: "Calcutta Stock Exchange (CSE)",
// // //     suffix: ".CSE",
// // //   },
// // //   {
// // //     value: "MCX",
// // //     label: "Multi Commodity Exchange of India (MCX)",
// // //     suffix: ".MCX",
// // //   },
// // //   {
// // //     value: "NCDEX",
// // //     label: "National Commodity & Derivatives Exchange (NCDEX)",
// // //     suffix: ".NCDEX",
// // //   },
// // //   {
// // //     value: "ICEX",
// // //     label: "Indian Commodity Exchange (ICEX)",
// // //     suffix: ".ICEX",
// // //   },
// // //   {
// // //     value: "ASE",
// // //     label: "Ahmedabad Stock Exchange (ASE)",
// // //     suffix: ".ASE",
// // //   },
// // //   {
// // //     value: "DSE",
// // //     label: "Delhi Stock Exchange (DSE)",
// // //     suffix: ".DSE",
// // //   },
// // //   {
// // //     value: "JSE",
// // //     label: "Jaipur Stock Exchange (JSE)",
// // //     suffix: ".JSE",
// // //   },
// // //   {
// // //     value: "LSE",
// // //     label: "Ludhiana Stock Exchange (LSE)",
// // //     suffix: ".LSE",
// // //   },
// // //   {
// // //     value: "MSEI",
// // //     label: "Madras Stock Exchange (MSEI)",
// // //     suffix: ".MSEI",
// // //   },
// // //   {
// // //     value: "PSE",
// // //     label: "Pune Stock Exchange (PSE)",
// // //     suffix: ".PSE",
// // //   },
// // //   {
// // //     value: "VSE",
// // //     label: "Vadodara Stock Exchange (VSE)",
// // //     suffix: ".VSE",
// // //   },
// // //   {
// // //     value: "OTCEI",
// // //     label: "Over the Counter Exchange of India (OTCEI)",
// // //     suffix: ".OTC",
// // //   },
// // //   {
// // //     value: "BGSE",
// // //     label: "Bangalore Stock Exchange (BGSE)",
// // //     suffix: ".BGSE",
// // //   },
// // //   {
// // //     value: "MPSE",
// // //     label: "Madhya Pradesh Stock Exchange (MPSE)",
// // //     suffix: ".MPSE",
// // //   },
// // //   {
// // //     value: "CSE",
// // //     label: "Cochin Stock Exchange (CSE)",
// // //     suffix: ".CSE",
// // //   },
// // //   {
// // //     value: "ISE",
// // //     label: "Inter-connected Stock Exchange (ISE)",
// // //     suffix: ".ISE",
// // //   },
// // //   {
// // //     value: "UPSE",
// // //     label: "Uttar Pradesh Stock Exchange (UPSE)",
// // //     suffix: ".UPSE",
// // //   },
// // // ];

// // // const StockCard = ({ stock }) => {
// // //   const navigate = useNavigate();
// // //   return (
// // //     <div
// // //       className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-900/20 transition-all border border-gray-800 hover:border-blue-500/30 cursor-pointer"
// // //       onClick={() => navigate(`/stock/${stock.symbol}`)}
// // //     >
// // //       <div className="flex justify-between items-start mb-2">
// // //         <div className="space-y-1">
// // //           <span className="font-mono text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">
// // //             {stock.symbol}
// // //           </span>
// // //           <div className="text-sm text-gray-400 truncate max-w-[200px]">
// // //             {stock.name}
// // //           </div>
// // //           <div className="text-xs text-gray-500">{stock.exchange}</div>
// // //         </div>
// // //         <div
// // //           className={`flex items-center ${
// // //             stock.change >= 0 ? "text-emerald-400" : "text-rose-400"
// // //           }`}
// // //         >
// // //           {stock.change != null && (
// // //             <>
// // //               {stock.change >= 0 ? (
// // //                 <TrendingUp size={16} className="mr-1" />
// // //               ) : (
// // //                 <TrendingDown size={16} className="mr-1" />
// // //               )}
// // //               <span className="font-mono">
// // //                 {Math.abs(stock.change).toFixed(2)}%
// // //               </span>
// // //             </>
// // //           )}
// // //         </div>
// // //       </div>
// // //       <div className="text-xl font-semibold font-mono mt-4">
// // //         ${stock.price?.toFixed(2) || "N/A"}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // const SectionTitle = ({ children }) => (
// // //   <div className="flex items-center space-x-3 mb-6">
// // //     <h2 className="text-xl font-bold text-gray-100">{children}</h2>
// // //     <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent"></div>
// // //   </div>
// // // );

// // // const Market = () => {
// // //   const [marketData, setMarketData] = useState({
// // //     topTrades: [],
// // //     mostTraded: [],
// // //     popular: [],
// // //     gainersLarge: [],
// // //     gainersMid: [],
// // //     gainersSmall: [],
// // //     losersLarge: [],
// // //     losersMid: [],
// // //     losersSmall: [],
// // //     intraday: [],
// // //   });
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [selectedExchange, setSelectedExchange] = useState("all");
// // //   const [searchResults, setSearchResults] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [isSearching, setIsSearching] = useState(false);

// // //   const getExchangeSpecificStocks = (exchange) => {
// // //     switch (exchange) {
// // //       case "NSE":
// // //       case "BSE":
// // //       case "MSE":
// // //       case "CSE":
// // //       case "ASE":
// // //       case "DSE":
// // //       case "JSE":
// // //       case "LSE":
// // //       case "MSEI":
// // //       case "PSE":
// // //       case "VSE":
// // //       case "OTCEI":
// // //       case "BGSE":
// // //       case "MPSE":
// // //       case "CSE (Cochin)":
// // //       case "ISE":
// // //       case "UPSE":
// // //         return {
// // //           topTrades: ["RELIANCE", "TCS", "HDFCBANK", "INFY"],
// // //           mostTraded: ["TATAMOTORS", "SBIN", "ICICIBANK", "AXISBANK"],
// // //           popular: ["WIPRO", "LT", "MARUTI", "HINDUNILVR"],
// // //           gainersLarge: ["BHARTIARTL", "ITC", "KOTAKBANK"],
// // //           gainersMid: ["INDIGO", "BANDHANBNK", "PNB"],
// // //           gainersSmall: ["YESBANK", "SUZLON", "RPOWER"],
// // //           losersLarge: ["ZEEL", "VEDL", "COALINDIA"],
// // //           losersMid: ["SAIL", "NMDC", "BANKBARODA"],
// // //           losersSmall: ["IDEA", "RCOM", "JP"],
// // //           intraday: ["NIFTY50", "BANKNIFTY", "FINNIFTY"],
// // //         };
// // //       case "MCX":
// // //       case "ICEX":
// // //         return {
// // //           topTrades: ["GOLD", "SILVER", "CRUDEOIL", "COPPER"],
// // //           mostTraded: ["NICKEL", "ZINC", "LEAD", "ALUMINIUM"],
// // //           popular: ["COTTON", "NATURALGAS", "MENTHAOIL", "GUARGUM"],
// // //           gainersLarge: ["GOLD", "SILVER", "CRUDEOIL"],
// // //           gainersMid: ["COPPER", "NICKEL", "ZINC"],
// // //           gainersSmall: ["LEAD", "ALUMINIUM", "COTTON"],
// // //           losersLarge: ["CRUDEOIL", "NATURALGAS", "MENTHAOIL"],
// // //           losersMid: ["GUARGUM", "COTTON", "SILVER"],
// // //           losersSmall: ["ALUMINIUM", "LEAD", "ZINC"],
// // //           intraday: ["MCXGOLD", "MCXSILVER", "MCXCRUDE"],
// // //         };
// // //       case "NCDEX":
// // //         return {
// // //           topTrades: ["SOYABEAN", "CHANA", "JEERA", "CASTORSEED"],
// // //           mostTraded: ["GUARSEED", "COTTONSEED", "BARLEY", "TURMERIC"],
// // //           popular: ["PEPPER", "MUSTARDSEED", "CARDAMOM", "CORIANDER"],
// // //           gainersLarge: ["SOYABEAN", "JEERA", "CHANA"],
// // //           gainersMid: ["TURMERIC", "BARLEY", "GUARSEED"],
// // //           gainersSmall: ["CASTORSEED", "PEPPER", "MUSTARDSEED"],
// // //           losersLarge: ["CARDAMOM", "CORIANDER", "COTTONSEED"],
// // //           losersMid: ["TURMERIC", "GUARSEED", "BARLEY"],
// // //           losersSmall: ["CHANA", "JEERA", "SOYABEAN"],
// // //           intraday: ["NCDEXSOYA", "NCDEXCHANA", "NCDEXJEERA"],
// // //         };
// // //       default:
// // //         return {
// // //           topTrades: [],
// // //           mostTraded: [],
// // //           popular: [],
// // //           gainersLarge: [],
// // //           gainersMid: [],
// // //           gainersSmall: [],
// // //           losersLarge: [],
// // //           losersMid: [],
// // //           losersSmall: [],
// // //           intraday: [],
// // //         };
// // //     }
// // //   };

// // //   const appendExchangeSuffix = (symbol, exchange) => {
// // //     const exchangeInfo = EXCHANGES.find((e) => e.value === exchange);
// // //     const suffix = exchangeInfo?.suffix || "";
// // //     return symbol.endsWith(suffix) ? symbol : symbol + suffix;
// // //   };

// // //   const fetchStockData = async (symbols, exchangeParam = "") => {
// // //     try {
// // //       // Append appropriate suffix to each symbol based on selected exchange
// // //       const modifiedSymbols = symbols.map((symbol) =>
// // //         appendExchangeSuffix(symbol, selectedExchange)
// // //       );

// // //       const response = await fetch(
// // //         `https://virtual-ventures-2.onrender.com/api/stocks?symbols=${modifiedSymbols.join(
// // //           ","
// // //         )}${exchangeParam}`
// // //       );
// // //       if (!response.ok) throw new Error("Failed to fetch stock data");
// // //       return await response.json();
// // //     } catch (error) {
// // //       console.error("Error fetching stocks:", error);
// // //       return [];
// // //     }
// // //   };

// // //   const fetchMarketData = async () => {
// // //     try {
// // //       const exchangeParam =
// // //         selectedExchange === "all" ? "" : `&exchange=${selectedExchange}`;

// // //       // Get exchange-specific stock lists
// // //       const stockLists = getExchangeSpecificStocks(selectedExchange);

// // //       // Fetch data for each category using exchange-specific symbols
// // //       const marketDataResults = await Promise.all(
// // //         Object.entries(stockLists).map(async ([category, symbols]) => {
// // //           const data = await fetchStockData(symbols, exchangeParam);
// // //           return [category, data];
// // //         })
// // //       );

// // //       // Convert results array back to object
// // //       const newMarketData = Object.fromEntries(marketDataResults);
// // //       setMarketData(newMarketData);
// // //       setLoading(false);
// // //     } catch (err) {
// // //       setError(err.message);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleSearch = async () => {
// // //     if (!searchTerm) {
// // //       setIsSearching(false);
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setIsSearching(true);
// // //     try {
// // //       const searchTermWithSuffix = appendExchangeSuffix(
// // //         searchTerm.toUpperCase(),
// // //         selectedExchange
// // //       );

// // //       const exchangeParam =
// // //         selectedExchange === "all" ? "" : `&exchange=${selectedExchange}`;

// // //       const data = await fetchStockData([searchTermWithSuffix], exchangeParam);
// // //       setSearchResults(data);
// // //     } catch (err) {
// // //       setError(err.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const clearSearch = () => {
// // //     setSearchTerm("");
// // //     setIsSearching(false);
// // //     setSearchResults([]);
// // //   };

// // //   useEffect(() => {
// // //     fetchMarketData();
// // //     if (!isSearching) {
// // //       const interval = setInterval(fetchMarketData, 30000);
// // //       return () => clearInterval(interval);
// // //     }
// // //   }, [isSearching, selectedExchange]);

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-24">
// // //       {/* Search Bar with Exchange Filter */}
// // //       <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800/50 px-4 py-4 z-50">
// // //         <div className="max-w-6xl mx-auto flex gap-3">
// // //           <div className="relative flex-1">
// // //             <input
// // //               type="text"
// // //               placeholder="Search stocks by symbol (e.g., AAPL)"
// // //               value={searchTerm}
// // //               onChange={(e) => setSearchTerm(e.target.value)}
// // //               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
// // //               className="w-full bg-gray-900/50 text-white px-4 py-2 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800 placeholder-gray-500"
// // //             />
// // //             <Search
// // //               className="absolute left-3 top-2.5 text-gray-500"
// // //               size={20}
// // //             />
// // //             {searchTerm && (
// // //               <button
// // //                 onClick={clearSearch}
// // //                 className="absolute right-3 top-2.5 text-gray-500 hover:text-white transition-colors"
// // //               >
// // //                 <X size={20} />
// // //               </button>
// // //             )}
// // //           </div>

// // //           <div className="relative">
// // //             <div className="absolute left-3 top-2.5 text-gray-500 pointer-events-none">
// // //               <Globe size={20} />
// // //             </div>
// // //             <select
// // //               value={selectedExchange}
// // //               onChange={(e) => setSelectedExchange(e.target.value)}
// // //               className="h-full w-64 bg-gray-900/50 text-white px-4 py-2 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800 appearance-none cursor-pointer"
// // //             >
// // //               {EXCHANGES.map((exchange) => (
// // //                 <option key={exchange.value} value={exchange.value}>
// // //                   {exchange.label}
// // //                 </option>
// // //               ))}
// // //             </select>
// // //             <div className="absolute right-3 top-3 text-gray-500 pointer-events-none">
// // //               <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
// // //                 <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
// // //               </svg>
// // //             </div>
// // //           </div>

// // //           <button
// // //             onClick={handleSearch}
// // //             className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors font-medium"
// // //           >
// // //             Search
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Main Content */}
// // //       <div className="max-w-7xl mx-auto px-4 py-8">
// // //         {loading ? (
// // //           <div className="text-center text-gray-400 py-20">
// // //             <div className="animate-pulse">Loading market data...</div>
// // //           </div>
// // //         ) : error ? (
// // //           <div className="text-center text-rose-400 py-20 bg-rose-950/20 rounded-xl border border-rose-900">
// // //             Error: {error}
// // //           </div>
// // //         ) : isSearching ? (
// // //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// // //             {searchResults.map((stock) => (
// // //               <StockCard key={stock.symbol} stock={stock} />
// // //             ))}
// // //           </div>
// // //         ) : (
// // //           <div className="space-y-12">
// // //             <section>
// // //               <SectionTitle>Top Trades</SectionTitle>
// // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// // //                 {marketData.topTrades.map((stock) => (
// // //                   <StockCard key={stock.symbol} stock={stock} />
// // //                 ))}
// // //               </div>
// // //             </section>

// // //             <section>
// // //               <SectionTitle>Most Traded</SectionTitle>
// // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// // //                 {marketData.mostTraded.map((stock) => (
// // //                   <StockCard key={stock.symbol} stock={stock} />
// // //                 ))}
// // //               </div>
// // //             </section>

// // //             <section>
// // //               <SectionTitle>Popular</SectionTitle>
// // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// // //                 {marketData.popular.map((stock) => (
// // //                   <StockCard key={stock.symbol} stock={stock} />
// // //                 ))}
// // //               </div>
// // //             </section>

// // //             <section>
// // //               <SectionTitle>Gainers</SectionTitle>
// // //               <div className="space-y-8">
// // //                 <div>
// // //                   <h3 className="text-lg font-semibold mb-4 text-gray-300 flex items-center">
// // //                     <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
// // //                     Large Cap
// // //                   </h3>
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// // //                     {marketData.gainersLarge.map((stock) => (
// // //                       <StockCard key={stock.symbol} stock={stock} />
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //                 <div>
// // //                   <h3 className="text-lg font-semibold mb-3 text-gray-400">
// // //                     Mid Cap
// // //                   </h3>
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// // //                     {marketData.gainersMid.map((stock) => (
// // //                       <StockCard key={stock.symbol} stock={stock} />
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //                 <div>
// // //                   <h3 className="text-lg font-semibold mb-3 text-gray-400">
// // //                     Small Cap
// // //                   </h3>
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// // //                     {marketData.gainersSmall.map((stock) => (
// // //                       <StockCard key={stock.symbol} stock={stock} />
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </section>

// // //             <section>
// // //               <SectionTitle>Losers</SectionTitle>
// // //               <div className="space-y-6">
// // //                 <div>
// // //                   <h3 className="text-lg font-semibold mb-3 text-gray-400">
// // //                     Large Cap
// // //                   </h3>
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// // //                     {marketData.losersLarge.map((stock) => (
// // //                       <StockCard key={stock.symbol} stock={stock} />
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //                 <div>
// // //                   <h3 className="text-lg font-semibold mb-3 text-gray-400">
// // //                     Mid Cap
// // //                   </h3>
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// // //                     {marketData.losersMid.map((stock) => (
// // //                       <StockCard key={stock.symbol} stock={stock} />
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //                 <div>
// // //                   <h3 className="text-lg font-semibold mb-3 text-gray-400">
// // //                     Small Cap
// // //                   </h3>
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// // //                     {marketData.losersSmall.map((stock) => (
// // //                       <StockCard key={stock.symbol} stock={stock} />
// // //                     ))}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </section>

// // //             <section>
// // //               <SectionTitle>Top Intraday</SectionTitle>
// // //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// // //                 {marketData.intraday.map((stock) => (
// // //                   <StockCard key={stock.symbol} stock={stock} />
// // //                 ))}
// // //               </div>
// // //             </section>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Market;

// // import React, { useState, useEffect } from "react";
// // import { Search, TrendingUp, TrendingDown, X, Globe } from "lucide-react";
// // import { useNavigate } from "react-router-dom";

// // // Exchange options with their corresponding suffixes
// // const EXCHANGES = [
// //   { value: "NSE", suffix: ".NS" },
// //   { value: "BSE", suffix: ".BO" },
// // ];

// // const StockCard = ({ stock }) => {
// //   const navigate = useNavigate();
// //   return (
// //     <div
// //       className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-900/20 transition-all border border-gray-800 hover:border-blue-500/30 cursor-pointer"
// //       onClick={() => navigate(`/stock/${stock.symbol}`)}
// //     >
// //       <div className="flex justify-between items-start mb-2">
// //         <div className="space-y-1">
// //           <span className="font-mono text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">
// //             {stock.symbol}
// //           </span>
// //           <div className="text-sm text-gray-400 truncate max-w-[200px]">
// //             {stock.name}
// //           </div>
// //           <div className="text-xs text-gray-500">{stock.exchange}</div>
// //         </div>
// //         <div
// //           className={`flex items-center ${
// //             stock.change >= 0 ? "text-emerald-400" : "text-rose-400"
// //           }`}
// //         >
// //           {stock.change != null && (
// //             <>
// //               {stock.change >= 0 ? (
// //                 <TrendingUp size={16} className="mr-1" />
// //               ) : (
// //                 <TrendingDown size={16} className="mr-1" />
// //               )}
// //               <span className="font-mono">
// //                 {Math.abs(stock.change).toFixed(2)}%
// //               </span>
// //             </>
// //           )}
// //         </div>
// //       </div>
// //       <div className="text-xl font-semibold font-mono mt-4">
// //         ${stock.price?.toFixed(2) || "N/A"}
// //       </div>
// //     </div>
// //   );
// // };

// // const SectionTitle = ({ children }) => (
// //   <div className="flex items-center space-x-3 mb-6">
// //     <h2 className="text-xl font-bold text-gray-100">{children}</h2>
// //     <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent"></div>
// //   </div>
// // );

// // const Market = () => {
// //   const [marketData, setMarketData] = useState({
// //     topTrades: [],
// //     mostTraded: [],
// //     popular: [],
// //     gainersLarge: [],
// //     gainersMid: [],
// //     gainersSmall: [],
// //     losersLarge: [],
// //     losersMid: [],
// //     losersSmall: [],
// //     intraday: [],
// //   });
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedExchange, setSelectedExchange] = useState("all");
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isSearching, setIsSearching] = useState(false);

// //   const getExchangeSpecificStocks = (exchange) => {
// //     switch (exchange) {
// //       case "NSE":
// //       case "BSE":
// //         return {
// //           topTrades: ["RELIANCE", "TCS", "HDFCBANK", "INFY"],
// //           mostTraded: ["TATAMOTORS", "SBIN", "ICICIBANK", "AXISBANK"],
// //           popular: ["WIPRO", "LT", "MARUTI", "HINDUNILVR"],
// //           gainersLarge: ["BHARTIARTL", "ITC", "KOTAKBANK"],
// //           gainersMid: ["INDIGO", "BANDHANBNK", "PNB"],
// //           gainersSmall: ["YESBANK", "SUZLON", "RPOWER"],
// //           losersLarge: ["ZEEL", "VEDL", "COALINDIA"],
// //           losersMid: ["SAIL", "NMDC", "BANKBARODA"],
// //           losersSmall: ["IDEA", "RCOM", "JP"],
// //           intraday: ["NIFTY50", "BANKNIFTY", "FINNIFTY"],
// //         };
// //       default:
// //         return {
// //           topTrades: [],
// //           mostTraded: [],
// //           popular: [],
// //           gainersLarge: [],
// //           gainersMid: [],
// //           gainersSmall: [],
// //           losersLarge: [],
// //           losersMid: [],
// //           losersSmall: [],
// //           intraday: [],
// //         };
// //     }
// //   };

// //   const appendExchangeSuffix = (symbol, exchange) => {
// //     const exchangeInfo = EXCHANGES.find((e) => e.value === exchange);
// //     const suffix = exchangeInfo?.suffix || "";
// //     return symbol.endsWith(suffix) ? symbol : symbol + suffix;
// //   };

// //   const fetchStockData = async (symbols, exchangeParam = "") => {
// //     try {
// //       const modifiedSymbols = symbols.map((symbol) =>
// //         appendExchangeSuffix(symbol, selectedExchange)
// //       );

// //       const response = await fetch(
// //         `https://virtual-ventures-2.onrender.com/api/stocks?symbols=${modifiedSymbols.join(
// //           ","
// //         )}${exchangeParam}`
// //       );
// //       if (!response.ok) throw new Error("Failed to fetch stock data");
// //       return await response.json();
// //     } catch (error) {
// //       console.error("Error fetching stocks:", error);
// //       return [];
// //     }
// //   };

// //   const fetchMarketData = async () => {
// //     try {
// //       const exchangeParam =
// //         selectedExchange === "all" ? "" : `&exchange=${selectedExchange}`;

// //       const stockLists = getExchangeSpecificStocks(selectedExchange);

// //       const marketDataResults = await Promise.all(
// //         Object.entries(stockLists).map(async ([category, symbols]) => {
// //           const data = await fetchStockData(symbols, exchangeParam);
// //           return [category, data];
// //         })
// //       );

// //       const newMarketData = Object.fromEntries(marketDataResults);
// //       setMarketData(newMarketData);
// //       setLoading(false);
// //     } catch (err) {
// //       setError(err.message);
// //       setLoading(false);
// //     }
// //   };

// //   const handleSearch = async () => {
// //     if (!searchTerm) {
// //       setIsSearching(false);
// //       return;
// //     }

// //     setLoading(true);
// //     setIsSearching(true);
// //     try {
// //       const searchTermWithSuffix = appendExchangeSuffix(
// //         searchTerm.toUpperCase(),
// //         selectedExchange
// //       );

// //       const exchangeParam =
// //         selectedExchange === "all" ? "" : `&exchange=${selectedExchange}`;

// //       const data = await fetchStockData([searchTermWithSuffix], exchangeParam);
// //       setSearchResults(data);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const clearSearch = () => {
// //     setSearchTerm("");
// //     setIsSearching(false);
// //     setSearchResults([]);
// //   };

// //   useEffect(() => {
// //     fetchMarketData();
// //     if (!isSearching) {
// //       const interval = setInterval(fetchMarketData, 30000);
// //       return () => clearInterval(interval);
// //     }
// //   }, [isSearching, selectedExchange]);
// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-24">
// //       {/* Search Bar with Exchange Filter */}
// //       <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800/50 px-4 py-4 z-50">
// //         <div className="max-w-6xl mx-auto flex gap-3">
// //           <div className="relative flex-1">
// //             <input
// //               type="text"
// //               placeholder="Search stocks by symbol (e.g., AAPL)"
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
// //               className="w-full bg-gray-900/50 text-white px-4 py-2 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800 placeholder-gray-500"
// //             />
// //             <Search
// //               className="absolute left-3 top-2.5 text-gray-500"
// //               size={20}
// //             />
// //             {searchTerm && (
// //               <button
// //                 onClick={clearSearch}
// //                 className="absolute right-3 top-2.5 text-gray-500 hover:text-white transition-colors"
// //               >
// //                 <X size={20} />
// //               </button>
// //             )}
// //           </div>

// //           <div className="relative">
// //             <div className="absolute left-3 top-2.5 text-gray-500 pointer-events-none">
// //               <Globe size={20} />
// //             </div>
// //             <select
// //               value={selectedExchange}
// //               onChange={(e) => setSelectedExchange(e.target.value)}
// //               className="h-full w-32 bg-gray-900/50 text-white px-4 py-2 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800 appearance-none cursor-pointer"
// //             >
// //               <option value="all">ALL</option>
// //               {EXCHANGES.map((exchange) => (
// //                 <option key={exchange.value} value={exchange.value}>
// //                   {exchange.value}
// //                 </option>
// //               ))}
// //             </select>
// //             <div className="absolute right-3 top-3 text-gray-500 pointer-events-none">
// //               <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
// //                 <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
// //               </svg>
// //             </div>
// //           </div>

// //           <button
// //             onClick={handleSearch}
// //             className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors font-medium"
// //           >
// //             Search
// //           </button>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="max-w-7xl mx-auto px-4 py-8">
// //         {loading ? (
// //           <div className="text-center text-gray-400 py-20">
// //             <div className="animate-pulse">Loading market data...</div>
// //           </div>
// //         ) : error ? (
// //           <div className="text-center text-rose-400 py-20 bg-rose-950/20 rounded-xl border border-rose-900">
// //             Error: {error}
// //           </div>
// //         ) : isSearching ? (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //             {searchResults.map((stock) => (
// //               <StockCard key={stock.symbol} stock={stock} />
// //             ))}
// //           </div>
// //         ) : (
// //           <div className="space-y-12">
// //             {/* Top Trades Section */}
// //             <section>
// //               <SectionTitle>Top Trades</SectionTitle>
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //                 {marketData.topTrades.map((stock) => (
// //                   <StockCard key={stock.symbol} stock={stock} />
// //                 ))}
// //               </div>
// //             </section>

// //             {/* Most Traded Section */}
// //             <section>
// //               <SectionTitle>Most Traded</SectionTitle>
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //                 {marketData.mostTraded.map((stock) => (
// //                   <StockCard key={stock.symbol} stock={stock} />
// //                 ))}
// //               </div>
// //             </section>

// //             {/* Popular Section */}
// //             <section>
// //               <SectionTitle>Popular</SectionTitle>
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //                 {marketData.popular.map((stock) => (
// //                   <StockCard key={stock.symbol} stock={stock} />
// //                 ))}
// //               </div>
// //             </section>

// //             {/* Gainers Section */}
// //             <section>
// //               <SectionTitle>Gainers</SectionTitle>
// //               <div className="space-y-8">
// //                 {/* Large Cap Gainers */}
// //                 <div>
// //                   <h3 className="text-lg font-semibold mb-4 text-gray-300 flex items-center">
// //                     <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
// //                     Large Cap
// //                   </h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //                     {marketData.gainersLarge.map((stock) => (
// //                       <StockCard key={stock.symbol} stock={stock} />
// //                     ))}
// //                   </div>
// //                 </div>
// //                 {/* Mid Cap Gainers */}
// //                 <div>
// //                   <h3 className="text-lg font-semibold mb-3 text-gray-400">
// //                     Mid Cap
// //                   </h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //                     {marketData.gainersMid.map((stock) => (
// //                       <StockCard key={stock.symbol} stock={stock} />
// //                     ))}
// //                   </div>
// //                 </div>
// //                 {/* Small Cap Gainers */}
// //                 <div>
// //                   <h3 className="text-lg font-semibold mb-3 text-gray-400">
// //                     Small Cap
// //                   </h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //                     {marketData.gainersSmall.map((stock) => (
// //                       <StockCard key={stock.symbol} stock={stock} />
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             </section>

// //             {/* Losers Section */}
// //             <section>
// //               <SectionTitle>Losers</SectionTitle>
// //               <div className="space-y-6">
// //                 {/* Large Cap Losers */}
// //                 <div>
// //                   <h3 className="text-lg font-semibold mb-3 text-gray-400">
// //                     Large Cap
// //                   </h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //                     {marketData.losersLarge.map((stock) => (
// //                       <StockCard key={stock.symbol} stock={stock} />
// //                     ))}
// //                   </div>
// //                 </div>
// //                 {/* Mid Cap Losers */}
// //                 <div>
// //                   <h3 className="text-lg font-semibold mb-3 text-gray-400">
// //                     Mid Cap
// //                   </h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //                     {marketData.losersMid.map((stock) => (
// //                       <StockCard key={stock.symbol} stock={stock} />
// //                     ))}
// //                   </div>
// //                 </div>
// //                 {/* Small Cap Losers */}
// //                 <div>
// //                   <h3 className="text-lg font-semibold mb-3 text-gray-400">
// //                     Small Cap
// //                   </h3>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //                     {marketData.losersSmall.map((stock) => (
// //                       <StockCard key={stock.symbol} stock={stock} />
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>
// //             </section>

// //             {/* Top Intraday Section */}
// //             <section>
// //               <SectionTitle>Top Intraday</SectionTitle>
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
// //                 {marketData.intraday.map((stock) => (
// //                   <StockCard key={stock.symbol} stock={stock} />
// //                 ))}
// //               </div>
// //             </section>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Market;

// import React, { useState, useEffect } from "react";
// import { Search, TrendingUp, TrendingDown, X, Globe } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// // Simplified Exchange options with only NSE and BSE
// const EXCHANGES = [
//   { value: "NSE", suffix: ".NS" },
//   { value: "BSE", suffix: ".BO" },
// ];

// const StockCard = ({ stock }) => {
//   const navigate = useNavigate();
//   return (
//   <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-900/20 transition-all border border-gray-800 hover:border-blue-500/30" onClick={() => navigate(`/stock/${stock.symbol}`)}>
//     <div className="flex justify-between items-start mb-2">
//       <div className="space-y-1">
//         <span className="font-mono text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">
//           {stock.symbol}
//         </span>
//         <div className="text-sm text-gray-400 truncate max-w-[200px]">
//           {stock.name}
//         </div>
//       </div>
//       <div
//         className={`flex items-center ${
//           stock.change >= 0 ? "text-emerald-400" : "text-rose-400"
//         }`}
//       >
//         {stock.change != null && (
//           <>
//             {stock.change >= 0 ? (
//               <TrendingUp size={16} className="mr-1" />
//             ) : (
//               <TrendingDown size={16} className="mr-1" />
//             )}
//             <span className="font-mono">
//               {Math.abs(stock.change).toFixed(2)}%
//             </span>
//           </>
//         )}
//       </div>
//     </div>
//     <div className="text-xl font-semibold font-mono mt-4">
//       ${stock.price?.toFixed(2) || "N/A"}
//     </div>
//   );
// };

// const SectionTitle = ({ children }) => (
//   <div className="flex items-center space-x-3 mb-6">
//     <h2 className="text-xl font-bold text-gray-100">{children}</h2>
//     <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent"></div>
//   </div>
// );

// const Market = () => {
//   const [marketData, setMarketData] = useState({
//     topTrades: [],
//     mostTraded: [],
//     popular: [],
//     gainersLarge: [],
//     gainersMid: [],
//     gainersSmall: [],
//     losersLarge: [],
//     losersMid: [],
//     losersSmall: [],
//     intraday: [],
//   });
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedExchange, setSelectedExchange] = useState("NSE");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isSearching, setIsSearching] = useState(false);

//   const getExchangeSpecificStocks = (exchange) => {
//     switch (exchange) {
//       case "NSE":
//         return {
//           topTrades: ["RELIANCE", "TCS", "HDFCBANK", "INFY"],
//           mostTraded: ["TATAMOTORS", "SBIN", "ICICIBANK", "AXISBANK"],
//           popular: ["WIPRO", "LT", "MARUTI", "HINDUNILVR"],
//           gainersLarge: ["BHARTIARTL", "ITC", "KOTAKBANK"],
//           gainersMid: ["INDIGO", "BANDHANBNK", "PNB"],
//           gainersSmall: ["YESBANK", "SUZLON", "RPOWER"],
//           losersLarge: ["ZEEL", "VEDL", "COALINDIA"],
//           losersMid: ["SAIL", "NMDC", "BANKBARODA"],
//           losersSmall: ["IDEA", "RCOM", "JP"],
//           intraday: ["NIFTY50", "BANKNIFTY", "FINNIFTY"],
//         };
//       case "BSE":
//         return {
//           topTrades: ["RELIANCE", "TCS", "HDFCBANK", "INFY"],
//           mostTraded: ["TATAMOTORS", "SBIN", "ICICIBANK", "AXISBANK"],
//           popular: ["WIPRO", "LT", "MARUTI", "HINDUNILVR"],
//           gainersLarge: ["BHARTIARTL", "ITC", "KOTAKBANK"],
//           gainersMid: ["INDIGO", "BANDHANBNK", "PNB"],
//           gainersSmall: ["YESBANK", "SUZLON", "RPOWER"],
//           losersLarge: ["ZEEL", "VEDL", "COALINDIA"],
//           losersMid: ["SAIL", "NMDC", "BANKBARODA"],
//           losersSmall: ["IDEA", "RCOM", "JP"],
//           intraday: ["SENSEX", "BSE100", "BSE200"],
//         };
//       default:
//         return {
//           topTrades: [],
//           mostTraded: [],
//           popular: [],
//           gainersLarge: [],
//           gainersMid: [],
//           gainersSmall: [],
//           losersLarge: [],
//           losersMid: [],
//           losersSmall: [],
//           intraday: [],
//         };
//     }
//   };

//   const appendExchangeSuffix = (symbol, exchange) => {
//     const exchangeInfo = EXCHANGES.find((e) => e.value === exchange);
//     const suffix = exchangeInfo?.suffix || "";
//     return symbol.endsWith(suffix) ? symbol : symbol + suffix;
//   };

//   const fetchStockData = async (symbols, exchangeParam = "") => {
//     try {
//       const modifiedSymbols = symbols.map((symbol) =>
//         appendExchangeSuffix(symbol, selectedExchange)
//       );

//       const response = await fetch(
//         `https://virtual-ventures-2.onrender.com/api/stocks?symbols=${modifiedSymbols.join(
//           ","
//         )}${exchangeParam}`
//       );
//       if (!response.ok) throw new Error("Failed to fetch stock data");
//       return await response.json();
//     } catch (error) {
//       console.error("Error fetching stocks:", error);
//       return [];
//     }
//   };

//   const fetchMarketData = async () => {
//     try {
//       const exchangeParam = `&exchange=${selectedExchange}`;
//       const stockLists = getExchangeSpecificStocks(selectedExchange);

//       const marketDataResults = await Promise.all(
//         Object.entries(stockLists).map(async ([category, symbols]) => {
//           const data = await fetchStockData(symbols, exchangeParam);
//           return [category, data];
//         })
//       );

//       const newMarketData = Object.fromEntries(marketDataResults);
//       setMarketData(newMarketData);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     if (!searchTerm) {
//       setIsSearching(false);
//       return;
//     }

//     setLoading(true);
//     setIsSearching(true);
//     try {
//       const searchTermWithSuffix = appendExchangeSuffix(
//         searchTerm.toUpperCase(),
//         selectedExchange
//       );

//       const exchangeParam = `&exchange=${selectedExchange}`;
//       const data = await fetchStockData([searchTermWithSuffix], exchangeParam);
//       setSearchResults(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearSearch = () => {
//     setSearchTerm("");
//     setIsSearching(false);
//     setSearchResults([]);
//   };

//   useEffect(() => {
//     fetchMarketData();
//     if (!isSearching) {
//       const interval = setInterval(fetchMarketData, 30000);
//       return () => clearInterval(interval);
//     }
//   }, [isSearching, selectedExchange]);

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-24">
//       <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800/50 px-4 py-4 z-50">
//         <div className="max-w-6xl mx-auto flex gap-3">
//           <div className="relative flex-1">
//             <input
//               type="text"
//               placeholder="Search stocks by symbol (e.g., RELIANCE)"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//               className="w-full bg-gray-900/50 text-white px-4 py-2 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800 placeholder-gray-500"
//             />
//             <Search
//               className="absolute left-3 top-2.5 text-gray-500"
//               size={20}
//             />
//             {searchTerm && (
//               <button
//                 onClick={clearSearch}
//                 className="absolute right-3 top-2.5 text-gray-500 hover:text-white transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             )}
//           </div>

//           <div className="relative">
//             <div className="absolute left-3 top-2.5 text-gray-500 pointer-events-none">
//               <Globe size={20} />
//             </div>
//             <select
//               value={selectedExchange}
//               onChange={(e) => setSelectedExchange(e.target.value)}
//               className="h-full w-28 bg-gray-900/50 text-white px-4 py-2 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800 appearance-none cursor-pointer"
//             >
//               {EXCHANGES.map((exchange) => (
//                 <option key={exchange.value} value={exchange.value}>
//                   {exchange.value}
//                 </option>
//               ))}
//             </select>
//             <div className="absolute right-3 top-3 text-gray-500 pointer-events-none">
//               <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
//                 <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
//               </svg>
//             </div>
//           </div>

//           <button
//             onClick={handleSearch}
//             className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors font-medium"
//           >
//             Search
//           </button>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-8">
//         {loading ? (
//           <div className="text-center text-gray-400 py-20">
//             <div className="animate-pulse">Loading market data...</div>
//           </div>
//         ) : error ? (
//           <div className="text-center text-rose-400 py-20 bg-rose-950/20 rounded-xl border border-rose-900">
//             Error: {error}
//           </div>
//         ) : isSearching ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//             {searchResults.map((stock) => (
//               <StockCard key={stock.symbol} stock={stock} />
//             ))}
//           </div>
//         ) : (
//           <div className="space-y-12">
//             <section>
//               <SectionTitle>Top Trades</SectionTitle>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {marketData.topTrades.map((stock) => (
//                   <StockCard key={stock.symbol} stock={stock} />
//                 ))}
//               </div>
//             </section>

//             <section>
//               <SectionTitle>Most Traded</SectionTitle>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {marketData.mostTraded.map((stock) => (
//                   <StockCard key={stock.symbol} stock={stock} />
//                 ))}
//               </div>
//             </section>

//             <section>
//               <SectionTitle>Popular</SectionTitle>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {marketData.popular.map((stock) => (
//                   <StockCard key={stock.symbol} stock={stock} />
//                 ))}
//               </div>
//             </section>

//             <section>
//               <SectionTitle>Gainers</SectionTitle>
//               <div className="space-y-8">
//                 <div>
//                   <h3 className="text-lg font-semibold mb-4 text-gray-300 flex items-center">
//                     <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
//                     Large Cap
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                     {marketData.gainersLarge.map((stock) => (
//                       <StockCard key={stock.symbol} stock={stock} />
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold mb-3 text-gray-400">
//                     Mid Cap
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                     {marketData.gainersMid.map((stock) => (
//                       <StockCard key={stock.symbol} stock={stock} />
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold mb-3 text-gray-400">
//                     Small Cap
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                     {marketData.gainersSmall.map((stock) => (
//                       <StockCard key={stock.symbol} stock={stock} />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </section>

//             <section>
//               <SectionTitle>Losers</SectionTitle>
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-lg font-semibold mb-3 text-gray-400">
//                     Large Cap
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                     {marketData.losersLarge.map((stock) => (
//                       <StockCard key={stock.symbol} stock={stock} />
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold mb-3 text-gray-400">
//                     Mid Cap
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                     {marketData.losersMid.map((stock) => (
//                       <StockCard key={stock.symbol} stock={stock} />
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-semibold mb-3 text-gray-400">
//                     Small Cap
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                     {marketData.losersSmall.map((stock) => (
//                       <StockCard key={stock.symbol} stock={stock} />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </section>

//             <section>
//               <SectionTitle>Top Intraday</SectionTitle>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {marketData.intraday.map((stock) => (
//                   <StockCard key={stock.symbol} stock={stock} />
//                 ))}
//               </div>
//             </section>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Market;

import React, { useState, useEffect } from "react";
import { Search, TrendingUp, TrendingDown, X, Globe } from "lucide-react";
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom';


const EXCHANGES = [
  { value: "NSE", suffix: ".NS" },
  { value: "BSE", suffix: ".BO" },
];

const StockCard = ({ stock }) => {
  const nav = useNavigate();
  return (
    <div  onClick={()=>nav(`/stock/${stock.symbol}`)} className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl p-4 hover:shadow-lg hover:shadow-blue-900/20 transition-all border border-gray-800 hover:border-blue-500/30 cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <div className="space-y-1">
          <span className="font-mono text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-500">
            {stock.symbol}
          </span>
          <div className="text-sm text-gray-400 truncate max-w-[200px]">
            {stock.name}
          </div>
          <div className="text-sm text-gray-400 truncate max-w-[200px]">
            {stock.exchange}
          </div>
        </div>
        <div
          className={`flex items-center ${
            stock.change >= 0 ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {stock.change != null && (
            <>
              {stock.change >= 0 ? (
                <TrendingUp size={16} className="mr-1" />
              ) : (
                <TrendingDown size={16} className="mr-1" />
              )}
              <span className="font-mono">
                {Math.abs(stock.change).toFixed(2)}%
              </span>
            </>
          )}
        </div>
      </div>
      <div className="text-xl font-semibold font-mono mt-4">
        ₹{stock.price?.toFixed(2) || "N/A"}
      </div>
    </div>
  );
};

const SectionTitle = ({ children }) => (
  <div className="flex items-center space-x-3 mb-6">
    <h2 className="text-xl font-bold text-gray-100">{children}</h2>
    <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent"></div>
  </div>
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
  const [selectedExchange, setSelectedExchange] = useState("NSE");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const getExchangeSpecificStocks = (exchange) => {
    const stocks = {
      NSE: {
        topTrades: ["RELIANCE", "TCS", "HDFCBANK", "INFY"],
        mostTraded: ["TATAMOTORS", "SBIN", "ICICIBANK", "AXISBANK"],
        popular: ["WIPRO", "LT", "MARUTI", "HINDUNILVR"],
        gainersLarge: ["BHARTIARTL", "ITC", "KOTAKBANK"],
        gainersMid: ["INDIGO", "BANDHANBNK", "PNB"],
        gainersSmall: ["YESBANK", "SUZLON", "RPOWER"],
        losersLarge: ["ZEEL", "VEDL", "COALINDIA"],
        losersMid: ["SAIL", "NMDC", "BANKBARODA"],
        losersSmall: ["IDEA", "RCOM", "JP"],
        intraday: ["NIFTY50", "BANKNIFTY", "FINNIFTY"],
      },
      BSE: {
        topTrades: ["RELIANCE", "TCS", "HDFCBANK", "INFY"],
        mostTraded: ["TATAMOTORS", "SBIN", "ICICIBANK", "AXISBANK"],
        popular: ["WIPRO", "LT", "MARUTI", "HINDUNILVR"],
        gainersLarge: ["BHARTIARTL", "ITC", "KOTAKBANK"],
        gainersMid: ["INDIGO", "BANDHANBNK", "PNB"],
        gainersSmall: ["YESBANK", "SUZLON", "RPOWER"],
        losersLarge: ["ZEEL", "VEDL", "COALINDIA"],
        losersMid: ["SAIL", "NMDC", "BANKBARODA"],
        losersSmall: ["IDEA", "RCOM", "JP"],
        intraday: ["SENSEX", "BSE100", "BSE200"],
      },
    };
    return stocks[exchange] || {};
  };

  const appendExchangeSuffix = (symbol, exchange) => {
    const exchangeInfo = EXCHANGES.find((e) => e.value === exchange);
    const suffix = exchangeInfo?.suffix || "";
    return symbol.endsWith(suffix) ? symbol : symbol + suffix;
  };

  const fetchStockData = async (symbols, exchangeParam = "") => {
    try {
      const modifiedSymbols = symbols.map((symbol) =>
        appendExchangeSuffix(symbol, selectedExchange)
      );

      const response = await fetch(
        `https://virtual-ventures-2.onrender.com/api/stocks?symbols=${modifiedSymbols.join(
          ","
        )}${exchangeParam}`
      );
      if (!response.ok) throw new Error("Failed to fetch stock data");
      return await response.json();
    } catch (error) {
      console.error("Error fetching stocks:", error);
      return [];
    }
  };

  const fetchMarketData = async () => {
    try {
      const exchangeParam = `&exchange=${selectedExchange}`;
      const stockLists = getExchangeSpecificStocks(selectedExchange);

      const marketDataResults = await Promise.all(
        Object.entries(stockLists).map(async ([category, symbols]) => {
          const data = await fetchStockData(symbols, exchangeParam);
          return [category, data];
        })
      );

      const newMarketData = Object.fromEntries(marketDataResults);
      setMarketData(newMarketData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
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
      const searchTermWithSuffix = appendExchangeSuffix(
        searchTerm.toUpperCase(),
        selectedExchange
      );

      const exchangeParam = `&exchange=${selectedExchange}`;
      const data = await fetchStockData([searchTermWithSuffix], exchangeParam);
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
    if (!isSearching) {
      const interval = setInterval(fetchMarketData, 30000);
      return () => clearInterval(interval);
    }
  }, [isSearching, selectedExchange]);

  const renderStockGrid = (stocks) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {stocks.map((stock) => (
        <StockCard key={stock.symbol} stock={stock} />
      ))}
    </div>
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-24">
        <div className="sticky top-0 bg-black/80 backdrop-blur-md border-b border-gray-800/50 px-4 py-4 ">
          <div className="max-w-6xl mx-auto flex gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search stocks"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full bg-gray-900/50 text-white px-4 py-2 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800 placeholder-gray-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-500"
                size={20}
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="relative">
              <div className="absolute left-3 top-2.5 text-gray-500 pointer-events-none">
                <Globe size={20} />
              </div>
              <select
                value={selectedExchange}
                onChange={(e) => setSelectedExchange(e.target.value)}
                className="h-full w-28 bg-gray-900/50 text-white px-4 py-2 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800 appearance-none cursor-pointer"
              >
                {EXCHANGES.map((exchange) => (
                  <option key={exchange.value} value={exchange.value}>
                    {exchange.value}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-3 text-gray-500 pointer-events-none">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors font-medium"
            >
              Search
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {loading ? (
            <div className="text-center text-gray-400 py-20">
              <div className="animate-pulse">Loading market data...</div>
            </div>
          ) : error ? (
            <div className="text-center text-rose-400 py-20 bg-rose-950/20 rounded-xl border border-rose-900">
              Error: {error}
            </div>
          ) : isSearching ? (
            renderStockGrid(searchResults)
          ) : (
            <div className="space-y-12">
              <section>
                <SectionTitle>Top Trades</SectionTitle>
                {renderStockGrid(marketData.topTrades || [])}
              </section>

              <section>
                <SectionTitle>Most Traded</SectionTitle>
                {renderStockGrid(marketData.mostTraded || [])}
              </section>

              <section>
                <SectionTitle>Popular</SectionTitle>
                {renderStockGrid(marketData.popular || [])}
              </section>

              <section>
                <SectionTitle>Gainers</SectionTitle>
                <div className="space-y-8">
                  {[
                    { title: "Large Cap", data: marketData.gainersLarge },
                    { title: "Mid Cap", data: marketData.gainersMid },
                    { title: "Small Cap", data: marketData.gainersSmall },
                  ].map(({ title, data }) => (
                    <div key={title}>
                      <h3 className="text-lg font-semibold mb-4 text-gray-300 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                        {title}
                      </h3>
                      {renderStockGrid(data || [])}
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle>Losers</SectionTitle>
                <div className="space-y-8">
                  {[
                    { title: "Large Cap", data: marketData.losersLarge },
                    { title: "Mid Cap", data: marketData.losersMid },
                    { title: "Small Cap", data: marketData.losersSmall },
                  ].map(({ title, data }) => (
                    <div key={title}>
                      <h3 className="text-lg font-semibold mb-4 text-gray-300 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-rose-500 mr-2"></span>
                        {title}
                      </h3>
                      {renderStockGrid(data || [])}
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <SectionTitle>Top Intraday</SectionTitle>
                {renderStockGrid(marketData.intraday || [])}
              </section>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Market;
