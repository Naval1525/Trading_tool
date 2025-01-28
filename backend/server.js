import express from "express";
import cors from "cors";
import * as yahooFinance from "yahoo-finance2";

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// Market categories with their symbols
const MARKET_CATEGORIES = {
  topTrades: {
    symbols: ["AAPL", "MSFT", "GOOGL", "AMZN", "META", "NVDA"],
    description: "Most actively traded large-cap stocks",
  },
  mostTraded: {
    symbols: ["TSLA", "AMD", "INTC", "BAC", "F", "PLTR"],
    description: "Stocks with highest trading volume",
  },
  popular: {
    symbols: ["NFLX", "DIS", "PYPL", "COIN", "RBLX", "HOOD"],
    description: "Popular stocks among retail investors",
  },
  gainersLarge: {
    symbols: ["JPM", "V", "WMT", "PG", "XOM", "JNJ"],
    description: "Top gaining large-cap stocks",
  },
  gainersMid: {
    symbols: ["SNAP", "PINS", "DASH", "RIVN", "LUCID", "DOCU"],
    description: "Top gaining mid-cap stocks",
  },
  gainersSmall: {
    symbols: ["GME", "AMC", "BB", "BBBY", "EXPR", "KIRK"],
    description: "Top gaining small-cap stocks",
  },
  losersLarge: {
    symbols: ["IBM", "T", "INTC", "CSCO", "VZ", "CMCSA"],
    description: "Large-cap stocks with biggest losses",
  },
  losersMid: {
    symbols: ["PLTR", "SOFI", "DKNG", "SPCE", "SKLZ", "WISH"],
    description: "Mid-cap stocks with biggest losses",
  },
  losersSmall: {
    symbols: ["SNDL", "NOK", "NKLA", "RIDE", "GOEV", "WKHS"],
    description: "Small-cap stocks with biggest losses",
  },
  intraday: {
    symbols: ["SPY", "QQQ", "IWM", "DIA", "UVXY", "TQQQ"],
    description: "Most active intraday trading stocks",
  },
};

// Cache mechanism
let stockCache = {};
let lastUpdate = null;
const CACHE_DURATION = 30000; // 30 seconds

// Helper function to get all symbols
const getAllSymbols = () => {
  const symbols = new Set();
  Object.values(MARKET_CATEGORIES).forEach((category) => {
    category.symbols.forEach((symbol) => symbols.add(symbol));
  });
  return Array.from(symbols);
};

// Function to fetch stock data
async function fetchStockData(symbols) {
  try {
    const quotes = await yahooFinance.default.quote(symbols);
    const results = Array.isArray(quotes) ? quotes : [quotes];

    return results.map((quote) => ({
      symbol: quote.symbol,
      name: quote.longName || quote.shortName || "",
      price: quote.regularMarketPrice,
      change: quote.regularMarketChangePercent,
      volume: quote.regularMarketVolume,
      marketCap: quote.marketCap,
      exchange: quote.exchange,
      dayHigh: quote.regularMarketDayHigh,
      dayLow: quote.regularMarketDayLow,
      open: quote.regularMarketOpen,
      previousClose: quote.regularMarketPreviousClose,
    }));
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return [];
  }
}

// Endpoint to get stocks by category
app.get("/api/market/:category", async (req, res) => {
  try {
    const { category } = req.params;
    if (!MARKET_CATEGORIES[category]) {
      return res.status(404).json({ error: "Category not found" });
    }

    const currentTime = Date.now();
    const cacheKey = `category_${category}`;

    // Return cached data if fresh
    if (stockCache[cacheKey] && currentTime - lastUpdate < CACHE_DURATION) {
      return res.json(stockCache[cacheKey]);
    }

    // Fetch new data
    const symbols = MARKET_CATEGORIES[category].symbols;
    const stockData = await fetchStockData(symbols);

    // Update cache
    stockCache[cacheKey] = stockData;
    lastUpdate = currentTime;

    res.json(stockData);
  } catch (error) {
    console.error("Error in /api/market/:category:", error);
    res.status(500).json({ error: "Failed to fetch market data" });
  }
});

// Endpoint to get all categories and their stocks
app.get("/api/market", async (req, res) => {
  try {
    const currentTime = Date.now();
    const cacheKey = "all_categories";

    // Return cached data if fresh
    if (stockCache[cacheKey] && currentTime - lastUpdate < CACHE_DURATION) {
      return res.json(stockCache[cacheKey]);
    }

    // Fetch all stocks
    const allSymbols = getAllSymbols();
    const stockData = await fetchStockData(allSymbols);

    // Organize by category
    const marketData = {};
    Object.entries(MARKET_CATEGORIES).forEach(([category, info]) => {
      marketData[category] = stockData.filter((stock) =>
        info.symbols.includes(stock.symbol)
      );
    });

    // Update cache
    stockCache[cacheKey] = marketData;
    lastUpdate = currentTime;

    res.json(marketData);
  } catch (error) {
    console.error("Error in /api/market:", error);
    res.status(500).json({ error: "Failed to fetch market data" });
  }
});

// Endpoint to search/get specific stocks
app.get("/api/stocks", async (req, res) => {
  try {
    const symbols = req.query.symbols ? req.query.symbols.split(",") : [];
    if (symbols.length === 0) {
      return res.json([]);
    }

    const currentTime = Date.now();
    const cacheKey = symbols.sort().join(",");

    // Return cached data if fresh
    if (stockCache[cacheKey] && currentTime - lastUpdate < CACHE_DURATION) {
      return res.json(stockCache[cacheKey]);
    }

    // Fetch new data
    const stockData = await fetchStockData(symbols);

    // Update cache
    stockCache[cacheKey] = stockData;
    lastUpdate = currentTime;

    res.json(stockData);
  } catch (error) {
    console.error("Error in /api/stocks:", error);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Total tracked symbols: ${getAllSymbols().length}`);
});
