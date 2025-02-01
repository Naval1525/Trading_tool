// import React, { useState, useEffect } from "react";
// import { Search, Calendar, Tag, Briefcase, TrendingUp, X } from "lucide-react";

// const API_KEY = "MLBI3No7LqpcIWmSPyWzlETsTjwGOKrs5gt3TSFx";

// const ENTITY_TYPES = [
//   { value: "equity", label: "Stocks" },
//   { value: "crypto", label: "Crypto" },
//   { value: "forex", label: "Forex" },
//   { value: "index", label: "Market Indices" },
// ];

// const INDUSTRIES = [
//   "Technology",
//   "Financial Services",
//   "Healthcare",
//   "Consumer Cyclical",
//   "Energy",
//   "Industrials",
//   "Basic Materials",
//   "Real Estate",
// ];

// const News = () => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     entityTypes: [],
//     industries: [],
//     sentiment: "all",
//     timeRange: "1d",
//   });

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         setLoading(true);
//         const baseUrl = "https://api.marketaux.com/v1/news/all";

//         const params = new URLSearchParams({
//           api_token: API_KEY,
//           language: "en",
//           limit: "12",
//           page: page.toString(),
//           must_have_entities: "true",
//         });

//         if (searchTerm) params.append("search", searchTerm);
//         if (filters.entityTypes.length > 0)
//           params.append("entity_types", filters.entityTypes.join(","));
//         if (filters.industries.length > 0)
//           params.append("industries", filters.industries.join(","));

//         if (filters.sentiment === "positive") {
//           params.append("sentiment_gte", "0.2");
//         } else if (filters.sentiment === "negative") {
//           params.append("sentiment_lte", "-0.2");
//         }

//         const now = new Date();
//         const publishedAfter = new Date();
//         switch (filters.timeRange) {
//           case "7d":
//             publishedAfter.setDate(now.getDate() - 7);
//             break;
//           case "30d":
//             publishedAfter.setDate(now.getDate() - 30);
//             break;
//           default:
//             publishedAfter.setDate(now.getDate() - 1);
//         }
//         params.append(
//           "published_after",
//           publishedAfter.toISOString().split("T")[0]
//         );

//         const response = await fetch(`${baseUrl}?${params.toString()}`);
//         if (!response.ok) throw new Error("Failed to fetch news");

//         const result = await response.json();
//         setNews(page === 1 ? result.data : (prev) => [...prev, ...result.data]);
//         setError(null);
//       } catch (err) {
//         setError("Failed to load news. Please try again later.");
//         console.error("Error fetching news:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, [page, filters, searchTerm]);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getSentimentColor = (score) => {
//     if (!score) return "bg-gray-900 text-gray-400";
//     if (score >= 0.5) return "bg-emerald-900/50 text-emerald-400";
//     if (score > 0) return "bg-blue-900/50 text-blue-400";
//     if (score <= -0.5) return "bg-rose-900/50 text-rose-400";
//     return "bg-orange-900/50 text-orange-400";
//   };

//   const resetFilters = () => {
//     setFilters({
//       entityTypes: [],
//       industries: [],
//       sentiment: "all",
//       timeRange: "1d",
//     });
//     setSearchTerm("");
//     setPage(1);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-24">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="space-y-8 mb-12">
//           <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
//             Global Market News
//           </h1>

//           <div className="sticky top-0 space-y-4 bg-black/80 backdrop-blur-md p-6 rounded-2xl border border-gray-800/50">
//             {/* Search Bar */}
//             <div className="relative">
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setPage(1);
//                 }}
//                 placeholder="Search news..."
//                 className="w-full bg-gray-900/50 text-white px-4 py-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800"
//               />
//               <Search
//                 className="absolute left-3 top-3.5 text-gray-500"
//                 size={20}
//               />
//               {searchTerm && (
//                 <button
//                   onClick={() => setSearchTerm("")}
//                   className="absolute right-3 top-3.5 text-gray-500 hover:text-white"
//                 >
//                   <X size={20} />
//                 </button>
//               )}
//             </div>

//             {/* Filters Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               {/* Entity Types */}
//               <div className="relative">
//                 <Tag
//                   className="absolute left-3 top-2.5 text-gray-500"
//                   size={20}
//                 />
//                 <select
//                   multiple
//                   value={filters.entityTypes}
//                   onChange={(e) => {
//                     const values = Array.from(
//                       e.target.selectedOptions,
//                       (option) => option.value
//                     );
//                     setFilters((prev) => ({ ...prev, entityTypes: values }));
//                     setPage(1);
//                   }}
//                   className="w-full bg-gray-900/50 text-white pl-10 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800"
//                 >
//                   <option value="" disabled>
//                     Asset Types
//                   </option>
//                   {ENTITY_TYPES.map((type) => (
//                     <option key={type.value} value={type.value}>
//                       {type.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Industries */}
//               <div className="relative">
//                 <Briefcase
//                   className="absolute left-3 top-2.5 text-gray-500"
//                   size={20}
//                 />
//                 <select
//                   multiple
//                   value={filters.industries}
//                   onChange={(e) => {
//                     const values = Array.from(
//                       e.target.selectedOptions,
//                       (option) => option.value
//                     );
//                     setFilters((prev) => ({ ...prev, industries: values }));
//                     setPage(1);
//                   }}
//                   className="w-full bg-gray-900/50 text-white pl-10 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800"
//                 >
//                   <option value="" disabled>
//                     Industries
//                   </option>
//                   {INDUSTRIES.map((industry) => (
//                     <option key={industry} value={industry}>
//                       {industry}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Sentiment */}
//               <div className="relative">
//                 <TrendingUp
//                   className="absolute left-3 top-2.5 text-gray-500"
//                   size={20}
//                 />
//                 <select
//                   value={filters.sentiment}
//                   onChange={(e) => {
//                     setFilters((prev) => ({
//                       ...prev,
//                       sentiment: e.target.value,
//                     }));
//                     setPage(1);
//                   }}
//                   className="w-full bg-gray-900/50 text-white pl-10 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800"
//                 >
//                   <option value="all">All Sentiment</option>
//                   <option value="positive">Positive Only</option>
//                   <option value="negative">Negative Only</option>
//                 </select>
//               </div>

//               {/* Time Range */}
//               <div className="relative">
//                 <Calendar
//                   className="absolute left-3 top-2.5 text-gray-500"
//                   size={20}
//                 />
//                 <select
//                   value={filters.timeRange}
//                   onChange={(e) => {
//                     setFilters((prev) => ({
//                       ...prev,
//                       timeRange: e.target.value,
//                     }));
//                     setPage(1);
//                   }}
//                   className="w-full bg-gray-900/50 text-white pl-10 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800"
//                 >
//                   <option value="1d">Last 24 Hours</option>
//                   <option value="7d">Last 7 Days</option>
//                   <option value="30d">Last 30 Days</option>
//                 </select>
//               </div>
//             </div>

//             {/* Reset Filters */}
//             <button
//               onClick={resetFilters}
//               className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors duration-300"
//             >
//               Reset Filters
//             </button>
//           </div>

//           {error && (
//             <div className="bg-rose-950/20 text-rose-400 p-6 rounded-xl border border-rose-900/50">
//               {error}
//             </div>
//           )}

//           {/* News Grid */}
//           <div className="space-y-6">
//             {news.map((article, index) => (
//               <div
//                 key={`${article.uuid}-${index}`}
//                 className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
//               >
//                 <div className="flex flex-col md:flex-row">
//                   {article.image_url && (
//                     <div className="md:w-1/3">
//                       <img
//                         src={article.image_url}
//                         alt={article.title}
//                         className="w-full h-48 object-cover"
//                         onError={(e) => {
//                           e.target.src = "/api/placeholder/400/225";
//                         }}
//                       />
//                     </div>
//                   )}

//                   <div className="p-6 md:flex-1">
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {article.entities?.map((entity, i) => (
//                         <span
//                           key={`${entity.symbol}-${i}`}
//                           className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(
//                             entity.sentiment_score
//                           )}`}
//                         >
//                           {entity.symbol} ({entity.sentiment_score?.toFixed(2)})
//                         </span>
//                       ))}
//                     </div>

//                     <h2 className="text-xl font-bold text-white mb-3">
//                       {article.title}
//                     </h2>

//                     <p className="text-gray-400 mb-4">{article.snippet}</p>

//                     <div className="flex flex-wrap items-center justify-between mt-4">
//                       <div className="flex items-center gap-4 text-sm text-gray-500">
//                         <span>{formatDate(article.published_at)}</span>
//                         <span>via {article.source}</span>
//                       </div>

//                       <a
//                         href={article.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-400 hover:text-blue-300 transition-colors duration-300 group inline-flex items-center"
//                       >
//                         Read full article
//                         <span className="inline-block transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ml-1">
//                           →
//                         </span>
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Load More Button */}
//           {!loading && news.length > 0 && (
//             <div className="mt-8 text-center">
//               <button
//                 onClick={() => setPage((p) => p + 1)}
//                 className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-colors duration-300"
//               >
//                 Load More News
//               </button>
//             </div>
//           )}

//           {/* Loading State */}
//           {loading && (
//             <div className="mt-8">
//               <div className="animate-pulse space-y-6">
//                 {[1, 2].map((n) => (
//                   <div key={n} className="bg-gray-800/50 rounded-xl p-6">
//                     <div className="h-4 bg-gray-700/50 rounded w-1/4 mb-4"></div>
//                     <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-4"></div>
//                     <div className="h-4 bg-gray-700/50 rounded w-full"></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Empty State */}
//           {!loading && news.length === 0 && (
//             <div className="text-center text-gray-400 py-12 bg-gray-900/50 rounded-xl border border-gray-800">
//               No news articles found matching your criteria. Try adjusting your
//               filters.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default News;

import React, { useState, useEffect } from "react";
import { Search, Calendar, Tag, Briefcase, TrendingUp, X } from "lucide-react";

const API_KEY = "MLBI3No7LqpcIWmSPyWzlETsTjwGOKrs5gt3TSFx";

const ENTITY_TYPES = [
  { value: "equity", label: "Stocks" },
  { value: "crypto", label: "Crypto" },
  { value: "forex", label: "Forex" },
  { value: "index", label: "Market Indices" },
];

const INDUSTRIES = [
  "Technology",
  "Financial Services",
  "Healthcare",
  "Consumer Cyclical",
  "Energy",
  "Industrials",
  "Basic Materials",
  "Real Estate",
];

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    entityTypes: [],
    industries: [],
    sentiment: "all",
    timeRange: "1d",
  });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const baseUrl = "https://api.marketaux.com/v1/news/all";

        const params = new URLSearchParams({
          api_token: API_KEY,
          language: "en",
          limit: "12",
          page: page.toString(),
          must_have_entities: "true",
        });

        if (searchTerm) params.append("search", searchTerm);
        if (filters.entityTypes.length > 0)
          params.append("entity_types", filters.entityTypes.join(","));
        if (filters.industries.length > 0)
          params.append("industries", filters.industries.join(","));

        if (filters.sentiment === "positive") {
          params.append("sentiment_gte", "0.2");
        } else if (filters.sentiment === "negative") {
          params.append("sentiment_lte", "-0.2");
        }

        const now = new Date();
        const publishedAfter = new Date();
        switch (filters.timeRange) {
          case "7d":
            publishedAfter.setDate(now.getDate() - 7);
            break;
          case "30d":
            publishedAfter.setDate(now.getDate() - 30);
            break;
          default:
            publishedAfter.setDate(now.getDate() - 1);
        }
        params.append(
          "published_after",
          publishedAfter.toISOString().split("T")[0]
        );

        const response = await fetch(`${baseUrl}?${params.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch news");

        const result = await response.json();
        setNews(page === 1 ? result.data : (prev) => [...prev, ...result.data]);
        setError(null);
      } catch (err) {
        setError("Failed to load news. Please try again later.");
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [page, filters, searchTerm]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSentimentColor = (score) => {
    if (!score) return "bg-gray-900 text-gray-400";
    if (score >= 0.5) return "bg-emerald-900/50 text-emerald-400";
    if (score > 0) return "bg-blue-900/50 text-blue-400";
    if (score <= -0.5) return "bg-rose-900/50 text-rose-400";
    return "bg-orange-900/50 text-orange-400";
  };

  const resetFilters = () => {
    setFilters({
      entityTypes: [],
      industries: [],
      sentiment: "all",
      timeRange: "1d",
    });
    setSearchTerm("");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="space-y-8 mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Global Market News
          </h1>

          <div className="sticky top-0 space-y-4 bg-gray-900/50 backdrop-blur-md p-6 rounded-2xl border border-gray-800/50">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                placeholder="Search news..."
                className="w-full bg-gray-900/50 text-white px-4 py-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800"
              />
              <Search
                className="absolute left-3 top-3.5 text-gray-500"
                size={20}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-white"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Entity Types */}
              <div className="relative">
                <Tag
                  className="absolute left-3 top-2.5 text-gray-500"
                  size={20}
                />
                <select
                  value={filters.entityTypes[0] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilters((prev) => ({
                      ...prev,
                      entityTypes: value ? [value] : [],
                    }));
                    setPage(1);
                  }}
                  className="w-full bg-gray-900/50 text-white pl-10 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800 appearance-none cursor-pointer"
                >
                  <option value="">All Asset Types</option>
                  {ENTITY_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-3 text-gray-500 pointer-events-none">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>

              {/* Industries */}
              <div className="relative">
                <Briefcase
                  className="absolute left-3 top-2.5 text-gray-500"
                  size={20}
                />
                <select
                  value={filters.industries[0] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilters((prev) => ({
                      ...prev,
                      industries: value ? [value] : [],
                    }));
                    setPage(1);
                  }}
                  className="w-full bg-gray-900/50 text-white pl-10 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800 appearance-none cursor-pointer"
                >
                  <option value="">All Industries</option>
                  {INDUSTRIES.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-3 text-gray-500 pointer-events-none">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>

              {/* Sentiment */}
              <div className="relative">
                <TrendingUp
                  className="absolute left-3 top-2.5 text-gray-500"
                  size={20}
                />
                <select
                  value={filters.sentiment}
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      sentiment: e.target.value,
                    }));
                    setPage(1);
                  }}
                  className="w-full bg-gray-900/50 text-white pl-10 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800"
                >
                  <option value="all">All Sentiment</option>
                  <option value="positive">Positive Only</option>
                  <option value="negative">Negative Only</option>
                </select>
              </div>

              {/* Time Range */}
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-2.5 text-gray-500"
                  size={20}
                />
                <select
                  value={filters.timeRange}
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      timeRange: e.target.value,
                    }));
                    setPage(1);
                  }}
                  className="w-full bg-gray-900/50 text-white pl-10 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 border border-gray-800"
                >
                  <option value="1d">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </select>
              </div>
            </div>

            {/* Reset Filters */}
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors duration-300"
            >
              Reset Filters
            </button>
          </div>

          {error && (
            <div className="bg-rose-950/20 text-rose-400 p-6 rounded-xl border border-rose-900/50">
              {error}
            </div>
          )}

          {/* News Grid */}
          <div className="space-y-6">
            {news.map((article, index) => (
              <div
                key={`${article.uuid}-${index}`}
                className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  {article.image_url && (
                    <div className="md:w-1/3">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.src = "/api/placeholder/400/225";
                        }}
                      />
                    </div>
                  )}

                  <div className="p-6 md:flex-1">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.entities?.map((entity, i) => (
                        <span
                          key={`${entity.symbol}-${i}`}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(
                            entity.sentiment_score
                          )}`}
                        >
                          {entity.symbol} ({entity.sentiment_score?.toFixed(2)})
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl font-bold text-white mb-3">
                      {article.title}
                    </h2>

                    <p className="text-gray-400 mb-4">{article.snippet}</p>

                    <div className="flex flex-wrap items-center justify-between mt-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{formatDate(article.published_at)}</span>
                        <span>via {article.source}</span>
                      </div>

                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300 group inline-flex items-center"
                      >
                        Read full article
                        <span className="inline-block transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300 ml-1">
                          →
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {!loading && news.length > 0 && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setPage((p) => p + 1)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-colors duration-300"
              >
                Load More News
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="mt-8">
              <div className="animate-pulse space-y-6">
                {[1, 2].map((n) => (
                  <div key={n} className="bg-gray-800/50 rounded-xl p-6">
                    <div className="h-4 bg-gray-700/50 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-700/50 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && news.length === 0 && (
            <div className="text-center text-gray-400 py-12 bg-gray-900/50 rounded-xl border border-gray-800">
              No news articles found matching your criteria. Try adjusting your
              filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
