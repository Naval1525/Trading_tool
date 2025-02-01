// import express from "express";
// import dotenv from 'dotenv';
// import connectDB from "./utils/db.js";
// import cors from "cors";
// import cookieParser from 'cookie-parser';
// import compression from "compression";
// import emailRoute from './Routes/email.route.js'
// import stockRoute from './Routes/stock.route.js'

// // Load environment variables
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3001;

// const allowedOrigins = [
//     'http://localhost:5173','https://splendid-narwhal-c66579.netlify.app',
// ];

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.includes(origin) || !origin) {
//             callback(null, true); // Allow request
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true, // Allow cookies and credentials
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // HTTP methods allowed
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Headers allowed
// };

// app.use(compression());
// // Middleware
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Health check route
// app.get('/health', (req, res) => {
//     res.status(200).json({ status: 'OK', message: 'Server is running' });
// });

// // API routes
// app.use('/api',emailRoute)
// app.use('/api',stockRoute)

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({
//         error: 'Internal Server Error',
//         message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
//         status: false
//     });
// });

// // app.use(express.static(path.join(_dirname, "/frontend/dist")));
// // app.get("*", (_,res) => {
// //     res.sendFile(path.resolve(_dirname, "frontend/dist/index.html"));
// // });
// // Handle 404 routes
// app.use((req, res) => {
//     res.status(404).json({
//         error: 'Not Found',
//         message: 'The requested resource was not found',
//         status: false
//     });
// });
// // await createSavedJobsTable();
// // Start server
// const startServer = async () => {
//     try {
//         await connectDB();
//         app.listen(port, () => {
//             console.log(`Server is running on port ${port}`);
//         });
//     } catch (error) {
//         console.error('Failed to start server:', error);
//         process.exit(1);
//     }
// };

// startServer();
// import express from "express";
// import dotenv from 'dotenv';
// import connectDB from "./utils/db.js";
// import cors from "cors";
// import cookieParser from 'cookie-parser';
// import compression from "compression";
// import * as yahooFinance from "yahoo-finance2";
// import emailRoute from './Routes/email.route.js';
// import stockRoute from './Routes/stock.route.js';

// // Load environment variables
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3001;

// // CORS Configuration
// const allowedOrigins = [
//     'http://localhost:5173',
//     'https://splendid-narwhal-c66579.netlify.app',
// ];

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.includes(origin) || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
// };

// // Market categories with their symbols
// const MARKET_CATEGORIES = {
//     topTrades: {
//         symbols: ["AAPL", "MSFT", "GOOGL", "AMZN", "META", "NVDA"],
//         description: "Most actively traded large-cap stocks",
//     },
//     mostTraded: {
//         symbols: ["TSLA", "AMD", "INTC", "BAC", "F", "PLTR"],
//         description: "Stocks with highest trading volume",
//     },
//     // ... [rest of the categories remain the same]
// };

// // Cache mechanism
// let stockCache = {};
// let lastUpdate = null;
// const CACHE_DURATION = 30000; // 30 seconds

// // Middleware
// app.use(compression());
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // Helper function to get all symbols
// const getAllSymbols = () => {
//     const symbols = new Set();
//     Object.values(MARKET_CATEGORIES).forEach((category) => {
//         category.symbols.forEach((symbol) => symbols.add(symbol));
//     });
//     return Array.from(symbols);
// };

// // Function to fetch stock data
// async function fetchStockData(symbols) {
//     try {
//         const quotes = await yahooFinance.default.quote(symbols);
//         const results = Array.isArray(quotes) ? quotes : [quotes];

//         return results.map((quote) => ({
//             symbol: quote.symbol,
//             name: quote.longName || quote.shortName || "",
//             price: quote.regularMarketPrice,
//             change: quote.regularMarketChangePercent,
//             volume: quote.regularMarketVolume,
//             marketCap: quote.marketCap,
//             exchange: quote.exchange,
//             dayHigh: quote.regularMarketDayHigh,
//             dayLow: quote.regularMarketDayLow,
//             open: quote.regularMarketOpen,
//             previousClose: quote.regularMarketPreviousClose,
//         }));
//     } catch (error) {
//         console.error("Error fetching stock data:", error);
//         return [];
//     }
// }

// // Health check route
// app.get('/health', (req, res) => {
//     res.status(200).json({ status: 'OK', message: 'Server is running' });
// });

// // API routes
// app.use('/api', emailRoute);
// app.use('/api', stockRoute);

// // Market API routes
// app.get("/api/market/:category", async (req, res) => {
//     try {
//         const { category } = req.params;
//         if (!MARKET_CATEGORIES[category]) {
//             return res.status(404).json({ error: "Category not found" });
//         }

//         const currentTime = Date.now();
//         const cacheKey = `category_${category}`;

//         if (stockCache[cacheKey] && currentTime - lastUpdate < CACHE_DURATION) {
//             return res.json(stockCache[cacheKey]);
//         }

//         const symbols = MARKET_CATEGORIES[category].symbols;
//         const stockData = await fetchStockData(symbols);

//         stockCache[cacheKey] = stockData;
//         lastUpdate = currentTime;

//         res.json(stockData);
//     } catch (error) {
//         console.error("Error in /api/market/:category:", error);
//         res.status(500).json({ error: "Failed to fetch market data" });
//     }
// });

// app.get("/api/market", async (req, res) => {
//     try {
//         const currentTime = Date.now();
//         const cacheKey = "all_categories";

//         if (stockCache[cacheKey] && currentTime - lastUpdate < CACHE_DURATION) {
//             return res.json(stockCache[cacheKey]);
//         }

//         const allSymbols = getAllSymbols();
//         const stockData = await fetchStockData(allSymbols);

//         const marketData = {};
//         Object.entries(MARKET_CATEGORIES).forEach(([category, info]) => {
//             marketData[category] = stockData.filter((stock) =>
//                 info.symbols.includes(stock.symbol)
//             );
//         });

//         stockCache[cacheKey] = marketData;
//         lastUpdate = currentTime;

//         res.json(marketData);
//     } catch (error) {
//         console.error("Error in /api/market:", error);
//         res.status(500).json({ error: "Failed to fetch market data" });
//     }
// });

// app.get("/api/stocks", async (req, res) => {
//     try {
//         const symbols = req.query.symbols ? req.query.symbols.split(",") : [];
//         if (symbols.length === 0) {
//             return res.json([]);
//         }

//         const currentTime = Date.now();
//         const cacheKey = symbols.sort().join(",");

//         if (stockCache[cacheKey] && currentTime - lastUpdate < CACHE_DURATION) {
//             return res.json(stockCache[cacheKey]);
//         }

//         const stockData = await fetchStockData(symbols);

//         stockCache[cacheKey] = stockData;
//         lastUpdate = currentTime;

//         res.json(stockData);
//     } catch (error) {
//         console.error("Error in /api/stocks:", error);
//         res.status(500).json({ error: "Failed to fetch stock data" });
//     }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({
//         error: 'Internal Server Error',
//         message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
//         status: false
//     });
// });

// // Handle 404 routes
// app.use((req, res) => {
//     res.status(404).json({
//         error: 'Not Found',
//         message: 'The requested resource was not found',
//         status: false
//     });
// });

// // Start server
// const startServer = async () => {
//     try {
//         await connectDB();
//         app.listen(port, () => {
//             console.log(`Server is running on port ${port}`);
//             console.log(`Total tracked symbols: ${getAllSymbols().length}`);
//         });
//     } catch (error) {
//         console.error('Failed to start server:', error);
//         process.exit(1);
//     }
// };

// startServer();
/*==============================================
  IMPORTS AND CONFIGURATIONS
===============================================*/
import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import * as yahooFinance from "yahoo-finance2";
import emailRoute from "./Routes/email.route.js";
import stockRoute from "./Routes/stock.route.js";

// Load environment variables
dotenv.config();

/*==============================================
  SERVER SETUP AND CONSTANTS
===============================================*/
const app = express();
const port = process.env.PORT || 3001;

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "https://splendid-narwhal-c66579.netlify.app",
  "https://virtual-ventures.netlify.app/",
  "https://virtual-ventures.netlify.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

/*==============================================
  MARKET DATA CONFIGURATION
===============================================*/
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
};

/*==============================================
  CACHING CONFIGURATION
===============================================*/
let stockCache = {};
let lastUpdate = null;
const CACHE_DURATION = 30000; // 30 seconds

/*==============================================
  MIDDLEWARE SETUP
===============================================*/
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/*==============================================
  HELPER FUNCTIONS
===============================================*/
// Get all unique symbols from categories
const getAllSymbols = () => {
  const symbols = new Set();
  Object.values(MARKET_CATEGORIES).forEach((category) => {
    category.symbols.forEach((symbol) => symbols.add(symbol));
  });
  return Array.from(symbols);
};

// Fetch current stock data
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

// Calculate start date for historical data
function getStartDate(range) {
  const now = new Date();
  switch (range) {
    case "1d":
      return new Date(now.setDate(now.getDate() - 1));
    case "5d":
      return new Date(now.setDate(now.getDate() - 5));
    case "1mo":
      return new Date(now.setMonth(now.getMonth() - 1));
    case "3mo":
      return new Date(now.setMonth(now.getMonth() - 3));
    case "6mo":
      return new Date(now.setMonth(now.getMonth() - 6));
    case "1y":
      return new Date(now.setFullYear(now.getFullYear() - 1));
    case "2y":
      return new Date(now.setFullYear(now.getFullYear() - 2));
    case "5y":
      return new Date(now.setFullYear(now.getFullYear() - 5));
    case "max":
      return new Date(1970, 0, 1);
    default:
      return new Date(now.setMonth(now.getMonth() - 1));
  }
}

/*==============================================
  ROUTE HANDLERS
===============================================*/
// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Import routes
app.use("/api", emailRoute);
app.use("/api", stockRoute);

/*==============================================
  MARKET DATA ENDPOINTS
===============================================*/
// Get specific market category data
app.get("/api/market/:category", async (req, res) => {
  try {
    const { category } = req.params;
    if (!MARKET_CATEGORIES[category]) {
      return res.status(404).json({ error: "Category not found" });
    }

    const currentTime = Date.now();
    const cacheKey = `category_${category}`;

    if (stockCache[cacheKey] && currentTime - lastUpdate < CACHE_DURATION) {
      return res.json(stockCache[cacheKey]);
    }

    const symbols = MARKET_CATEGORIES[category].symbols;
    const stockData = await fetchStockData(symbols);

    stockCache[cacheKey] = stockData;
    lastUpdate = currentTime;

    res.json(stockData);
  } catch (error) {
    console.error("Error in /api/market/:category:", error);
    res.status(500).json({ error: "Failed to fetch market data" });
  }
});

// Get all market categories data
app.get("/api/market", async (req, res) => {
  try {
    const currentTime = Date.now();
    const cacheKey = "all_categories";

    if (stockCache[cacheKey] && currentTime - lastUpdate < CACHE_DURATION) {
      return res.json(stockCache[cacheKey]);
    }

    const allSymbols = getAllSymbols();
    const stockData = await fetchStockData(allSymbols);

    const marketData = {};
    Object.entries(MARKET_CATEGORIES).forEach(([category, info]) => {
      marketData[category] = stockData.filter((stock) =>
        info.symbols.includes(stock.symbol)
      );
    });

    stockCache[cacheKey] = marketData;
    lastUpdate = currentTime;

    res.json(marketData);
  } catch (error) {
    console.error("Error in /api/market:", error);
    res.status(500).json({ error: "Failed to fetch market data" });
  }
});

// Get specific stocks data
app.get("/api/stocks", async (req, res) => {
  try {
    const symbols = req.query.symbols ? req.query.symbols.split(",") : [];
    if (symbols.length === 0) {
      return res.json([]);
    }

    const currentTime = Date.now();
    const cacheKey = symbols.sort().join(",");

    if (stockCache[cacheKey] && currentTime - lastUpdate < CACHE_DURATION) {
      return res.json(stockCache[cacheKey]);
    }

    const stockData = await fetchStockData(symbols);

    stockCache[cacheKey] = stockData;
    lastUpdate = currentTime;

    res.json(stockData);
  } catch (error) {
    console.error("Error in /api/stocks:", error);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
});

// Get historical data for a symbol
app.get("/api/stocks/historical/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const {
      interval = "1d", // 1d, 1wk, 1mo
      range = "1mo", // 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, max
      events = "history", // history, div, split
    } = req.query;

    const currentTime = Date.now();
    const cacheKey = `historical_${symbol}_${interval}_${range}`;

    if (stockCache[cacheKey] && currentTime - lastUpdate < CACHE_DURATION) {
      return res.json(stockCache[cacheKey]);
    }

    const queryOptions = {
      period1: getStartDate(range),
      interval: interval,
      events: events,
    };

    const result = await yahooFinance.default.historical(symbol, queryOptions);

    const formattedData = result.map((item) => ({
      date: item.date,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume,
      adjClose: item.adjClose,
    }));

    stockCache[cacheKey] = formattedData;
    lastUpdate = currentTime;

    res.json(formattedData);
  } catch (error) {
    console.error("Error fetching historical data:", error);
    res.status(500).json({ error: "Failed to fetch historical data" });
  }
});

// Get order book data for a symbol
app.get("/api/stocks/orderbook/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;

    const currentTime = Date.now();
    const cacheKey = `orderbook_${symbol}`;

    if (stockCache[cacheKey] && currentTime - lastUpdate < CACHE_DURATION) {
      return res.json(stockCache[cacheKey]);
    }

    const quote = await yahooFinance.default.quote(symbol);

    const orderBookData = {
      symbol: quote.symbol,
      timestamp: new Date().toISOString(),
      bid: {
        price: quote.bid,
        size: quote.bidSize,
      },
      ask: {
        price: quote.ask,
        size: quote.askSize,
      },
      lastPrice: quote.regularMarketPrice,
      lastSize: quote.regularMarketVolume,
    };

    stockCache[cacheKey] = orderBookData;
    lastUpdate = currentTime;

    res.json(orderBookData);
  } catch (error) {
    console.error("Error fetching order book data:", error);
    res.status(500).json({ error: "Failed to fetch order book data" });
  }
});

/*==============================================
  ERROR HANDLING
===============================================*/
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
    status: false,
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found",
    status: false,
  });
});

/*==============================================
  SERVER STARTUP
===============================================*/
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Total tracked symbols: ${getAllSymbols().length}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
