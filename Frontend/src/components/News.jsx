import React, { useState, useEffect } from "react";
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
          api_token:API_KEY,
          language: "en",
          limit: "12",
          page: page.toString(),
          must_have_entities: "true",
        });

        // Add search if present
        if (searchTerm) {
          params.append("search", searchTerm);
        }

        // Add entity types filter
        if (filters.entityTypes.length > 0) {
          params.append("entity_types", filters.entityTypes.join(","));
        }

        // Add industries filter
        if (filters.industries.length > 0) {
          params.append("industries", filters.industries.join(","));
        }

        // Add sentiment filter
        if (filters.sentiment === "positive") {
          params.append("sentiment_gte", "0.2");
        } else if (filters.sentiment === "negative") {
          params.append("sentiment_lte", "-0.2");
        }

        // Add time range
        const now = new Date();
        const publishedAfter = new Date();
        switch (filters.timeRange) {
          case "1d":
            publishedAfter.setDate(now.getDate() - 1);
            break;
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

        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const result = await response.json();

        if (page === 1) {
          setNews(result.data);
        } else {
          setNews((prev) => [...prev, ...result.data]);
        }

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
    if (!score) return "bg-gray-100 text-gray-800";
    if (score >= 0.5) return "bg-green-100 text-green-800";
    if (score > 0) return "bg-blue-100 text-blue-800";
    if (score <= -0.5) return "bg-red-100 text-red-800";
    return "bg-orange-100 text-orange-800";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col space-y-6 mb-8">
          <h1 className="text-4xl font-bold text-white">Global Market News</h1>

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
              className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Entity Types */}
            <select
              multiple
              value={filters.entityTypes}
              onChange={(e) => {
                const values = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setFilters((prev) => ({ ...prev, entityTypes: values }));
                setPage(1);
              }}
              className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Asset Types
              </option>
              {ENTITY_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            {/* Industries */}
            <select
              multiple
              value={filters.industries}
              onChange={(e) => {
                const values = Array.from(
                  e.target.selectedOptions,
                  (option) => option.value
                );
                setFilters((prev) => ({ ...prev, industries: values }));
                setPage(1);
              }}
              className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Industries
              </option>
              {INDUSTRIES.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>

            {/* Sentiment */}
            <select
              value={filters.sentiment}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, sentiment: e.target.value }));
                setPage(1);
              }}
              className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Sentiment</option>
              <option value="positive">Positive Only</option>
              <option value="negative">Negative Only</option>
            </select>

            {/* Time Range */}
            <select
              value={filters.timeRange}
              onChange={(e) => {
                setFilters((prev) => ({ ...prev, timeRange: e.target.value }));
                setPage(1);
              }}
              className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="1d">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>

          {/* Reset Filters */}
          <button
            onClick={resetFilters}
            className="self-start px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors duration-300"
          >
            Reset Filters
          </button>
        </div>

        {error && (
          <div className="bg-red-500 bg-opacity-10 text-red-500 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid gap-6">
          {news.map((article, index) => (
            <div
              key={`${article.uuid}-${index}`}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl overflow-hidden transform hover:scale-102 transition-all duration-300"
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

                  <p className="text-gray-300 mb-4">{article.snippet}</p>

                  <div className="flex flex-wrap items-center justify-between mt-4">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
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

        {!loading && news.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
            >
              Load More News
            </button>
          </div>
        )}

        {loading && (
          <div className="mt-8">
            <div className="animate-pulse space-y-6">
              {[1, 2].map((n) => (
                <div key={n} className="bg-gray-800 rounded-xl p-6">
                  <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && news.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            No news articles found matching your criteria. Try adjusting your
            filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
