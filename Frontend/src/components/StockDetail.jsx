// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react';

// const BASE_URL = 'http://localhost:8000/api';

// const StockDetail = () => {
//     const { symbol } = useParams();
//     const navigate = useNavigate();

//     const [stockData, setStockData] = useState(null);
//     const [userStocks, setUserStocks] = useState([]);
//     const [userBalance, setUserBalance] = useState(0);
//     const [quantity, setQuantity] = useState(1);
//     const [tradeType, setTradeType] = useState('buy');
//     const [orderStatus, setOrderStatus] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const checkAuth = useCallback(() => {
//       const token = localStorage.getItem('token');
//       const userId = localStorage.getItem('userId');

//       if (!token || !userId) {
//         navigate('/login');
//         return false;
//       }
//       return { token, userId };
//     }, [navigate]);

//     const fetchDashboard = useCallback(async (token, userId) => {
//       try {
//         const response = await fetch(`${BASE_URL}/dashboard/${userId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           if (response.status === 401) {
//             localStorage.removeItem('token');
//             localStorage.removeItem('userId');
//             navigate('/login');
//             return null;
//           }
//           throw new Error('Failed to fetch dashboard data');
//         }

//         const data = await response.json();
//         return data;
//       } catch (error) {
//         console.error('Dashboard fetch error:', error);
//         return null;
//       }
//     }, [navigate]);

//     const fetchData = useCallback(async () => {
//       const auth = checkAuth();
//       if (!auth) return;

//       try {
//         const stockResponse = await fetch(`${BASE_URL}/stocks?symbols=${symbol}`);
//         const stockResult = await stockResponse.json();
//         setStockData(stockResult?.[0] ?? null);

//         const dashboardData = await fetchDashboard(auth.token, auth.userId);
//         if (dashboardData) {
//           setUserBalance(dashboardData.accountBalance ?? 0);
//           setUserStocks(dashboardData.stocks ?? []);
//         }

//         setLoading(false);
//       } catch (err) {
//         setError(err?.message ?? 'An error occurred');
//         setLoading(false);
//       }
//     }, [symbol, checkAuth, fetchDashboard]);

//     useEffect(() => {
//       fetchData();
//       const interval = setInterval(fetchData, 30000);
//       return () => clearInterval(interval);
//     }, [fetchData]);

//     const handleTrade = async () => {
//       const auth = checkAuth();
//       if (!auth) return;

//       try {
//         setOrderStatus(null);
//         const { token, userId } = auth;

//         if (tradeType === 'sell') {
//           const userStock = userStocks.find(stock =>
//             stock.symbol === symbol && !stock.isSold
//           );
//           if (!userStock || userStock.quantity < quantity) {
//             throw new Error('Insufficient stock quantity');
//           }
//         } else if (tradeType === 'buy') {
//           const totalCost = (stockData?.price ?? 0) * quantity;
//           if (totalCost > userBalance) {
//             throw new Error('Insufficient balance');
//           }
//         }

//         const response = await fetch(`${BASE_URL}/${tradeType}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({
//             userId,
//             symbol,
//             quantity,
//             price: stockData?.price ?? 0
//           })
//         });

//         const result = await response.json();

//         if (!response.ok) {
//           throw new Error(result?.message ?? 'Trade failed');
//         }

//         setOrderStatus({
//           type: 'success',
//           message: `Successfully ${tradeType === 'buy' ? 'bought' : 'sold'} ${quantity} shares of ${symbol}`
//         });

//         fetchData();

//       } catch (err) {
//         setOrderStatus({
//           type: 'error',
//           message: err?.message ?? 'Trade failed'
//         });
//       }
//     };

//     if (loading) {
//       return (
//         <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
//           <div className="text-center text-gray-400">Loading...</div>
//         </div>
//       );
//     }

//     if (error) {
//       return (
//         <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
//           <div className="bg-red-900/20 border border-red-800 text-red-400 p-4 rounded-lg">
//             Error loading stock data: {error}
//           </div>
//         </div>
//       );
//     }

//     const totalCost = (stockData?.price ?? 0) * quantity;
//     const isPositiveChange = (stockData?.change ?? 0) >= 0;
//     const availableQuantity = userStocks.find(
//       stock => stock.symbol === symbol && !stock.isSold
//     )?.quantity ?? 0;

//     return (
//       <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8 py-28">
//         <div className="max-w-6xl mx-auto space-y-8">
//           <div className="flex justify-between items-start">
//             <div>
//               <h1 className="text-3xl font-bold">{symbol}</h1>
//               <p className="text-gray-400">{stockData?.name ?? 'Loading...'}</p>
//             </div>
//             <div className="text-right">
//               <div className="text-3xl font-mono font-bold">
//                 ${stockData?.price?.toFixed(2) ?? '0.00'}
//               </div>
//               <div className={`flex items-center justify-end ${
//                 isPositiveChange ? 'text-emerald-400' : 'text-rose-400'
//               }`}>
//                 {isPositiveChange ? (
//                   <TrendingUp className="w-5 h-5 mr-2" />
//                 ) : (
//                   <TrendingDown className="w-5 h-5 mr-2" />
//                 )}
//                 <span className="font-mono">
//                   {Math.abs(stockData?.change ?? 0).toFixed(2)}%
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
//               <div className="text-sm text-gray-400">Open</div>
//               <div className="font-mono font-bold">
//                 ${stockData?.open?.toFixed(2) ?? '0.00'}
//               </div>
//             </div>
//             <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
//               <div className="text-sm text-gray-400">Previous Close</div>
//               <div className="font-mono font-bold">
//                 ${stockData?.previousClose?.toFixed(2) ?? '0.00'}
//               </div>
//             </div>
//             <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
//               <div className="text-sm text-gray-400">Day High</div>
//               <div className="font-mono font-bold">
//                 ${stockData?.dayHigh?.toFixed(2) ?? '0.00'}
//               </div>
//             </div>
//             <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
//               <div className="text-sm text-gray-400">Day Low</div>
//               <div className="font-mono font-bold">
//                 ${stockData?.dayLow?.toFixed(2) ?? '0.00'}
//               </div>
//             </div>
//           </div>

//           <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
//             <h2 className="text-xl font-bold mb-4">Place Order</h2>

//             {orderStatus && (
//               <div className={`p-4 mb-4 rounded-lg ${
//                 orderStatus.type === 'success'
//                   ? 'bg-emerald-900/20 border border-emerald-800 text-emerald-400'
//                   : 'bg-red-900/20 border border-red-800 text-red-400'
//               }`}>
//                 {orderStatus.message}
//               </div>
//             )}

//             <div className="space-y-4">
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setTradeType('buy')}
//                   className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
//                     tradeType === 'buy'
//                       ? 'bg-emerald-600 text-white'
//                       : 'bg-gray-800 text-gray-300'
//                   }`}
//                 >
//                   Buy
//                 </button>
//                 <button
//                   onClick={() => setTradeType('sell')}
//                   className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
//                     tradeType === 'sell'
//                       ? 'bg-rose-600 text-white'
//                       : 'bg-gray-800 text-gray-300'
//                   }`}
//                 >
//                   Sell
//                 </button>
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">
//                   Quantity
//                 </label>
//                 <input
//                   type="number"
//                   min="1"
//                   value={quantity}
//                   onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
//                   className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm text-gray-400 mb-1">
//                   Total {tradeType === 'buy' ? 'Cost' : 'Proceeds'}
//                 </label>
//                 <div className="text-2xl font-mono font-bold">
//                   ${totalCost.toFixed(2)}
//                 </div>
//               </div>

//               <div className="text-sm text-gray-400">
//                 Available Balance: ${userBalance.toFixed(2)}
//               </div>

//               <button
//                 onClick={handleTrade}
//                 disabled={loading || (tradeType === 'buy' && totalCost > userBalance)}
//                 className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
//                   tradeType === 'buy'
//                     ? 'bg-emerald-600 hover:bg-emerald-700'
//                     : 'bg-rose-600 hover:bg-rose-700'
//                 } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
//               >
//                 {tradeType === 'buy' ? 'Buy' : 'Sell'} {symbol}
//               </button>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
//               <h2 className="text-xl font-bold mb-4">Market Info</h2>
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Volume</span>
//                   <span className="font-mono">
//                     {(stockData?.volume ?? 0).toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Market Cap</span>
//                   <span className="font-mono">
//                     ${((stockData?.marketCap ?? 0) / 1e9).toFixed(2)}B
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-400">Exchange</span>
//                   <span className="font-mono">{stockData?.exchange ?? 'N/A'}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
// };

// export default StockDetail;
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react';

const BASE_URL = 'http://localhost:8000/api';

const TIME_RANGES = [
  { label: '1D', value: '1d' },
  { label: '5D', value: '5d' },
  { label: '1M', value: '1mo' },
  { label: '3M', value: '3mo' },
  { label: '6M', value: '6mo' },
  { label: '1Y', value: '1y' }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-3 rounded-lg shadow-lg">
        <p className="text-gray-300 mb-1">{label}</p>
        <p className="text-emerald-400 font-mono">
          ${payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

const StockDetail = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();

  // State Management
  const [stockData, setStockData] = useState(null);
  const [userStocks, setUserStocks] = useState([]);
  const [userBalance, setUserBalance] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tradeType, setTradeType] = useState('buy');
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New state for historical data and order book
  const [historicalData, setHistoricalData] = useState([]);
  const [orderBook, setOrderBook] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('1mo');
  const [chartLoading, setChartLoading] = useState(true);

  // Auth check
  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      navigate('/login');
      return false;
    }
    return { token, userId };
  }, [navigate]);

  // Dashboard fetch
  const fetchDashboard = useCallback(async (token, userId) => {
    try {
      const response = await fetch(`${BASE_URL}/dashboard/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          navigate('/login');
          return null;
        }
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      return null;
    }
  }, [navigate]);

  // Historical data fetch
  const fetchHistoricalData = useCallback(async () => {
    try {
      setChartLoading(true);
      const response = await fetch(
        `${BASE_URL}/stocks/historical/${symbol}?range=${selectedTimeRange}`
      );
      const data = await response.json();

      const processedData = data.map(item => ({
        date: new Date(item.date).toLocaleDateString(),
        close: item.close,
        volume: item.volume,
        high: item.high,
        low: item.low,
      }));

      setHistoricalData(processedData);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    } finally {
      setChartLoading(false);
    }
  }, [symbol, selectedTimeRange]);

  // Order book fetch
  const fetchOrderBook = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/stocks/orderbook/${symbol}`);
      const data = await response.json();
      setOrderBook(data);
    } catch (error) {
      console.error('Error fetching order book:', error);
    }
  }, [symbol]);

  // Main data fetch
  const fetchData = useCallback(async () => {
    const auth = checkAuth();
    if (!auth) return;

    try {
      const stockResponse = await fetch(`${BASE_URL}/stocks?symbols=${symbol}`);
      const stockResult = await stockResponse.json();
      setStockData(stockResult?.[0] ?? null);

      const dashboardData = await fetchDashboard(auth.token, auth.userId);
      if (dashboardData) {
        setUserBalance(dashboardData.accountBalance ?? 0);
        setUserStocks(dashboardData.stocks ?? []);
      }

      await Promise.all([
        fetchHistoricalData(),
        fetchOrderBook()
      ]);

      setLoading(false);
    } catch (err) {
      setError(err?.message ?? 'An error occurred');
      setLoading(false);
    }
  }, [symbol, checkAuth, fetchDashboard, fetchHistoricalData, fetchOrderBook]);

  // Handle trade
  const handleTrade = async () => {
    const auth = checkAuth();
    if (!auth) return;

    try {
      setOrderStatus(null);
      const { token, userId } = auth;

      if (tradeType === 'sell') {
        const userStock = userStocks.find(stock =>
          stock.symbol === symbol && !stock.isSold
        );
        if (!userStock || userStock.quantity < quantity) {
          throw new Error('Insufficient stock quantity');
        }
      } else if (tradeType === 'buy') {
        const totalCost = (stockData?.price ?? 0) * quantity;
        if (totalCost > userBalance) {
          throw new Error('Insufficient balance');
        }
      }

      const response = await fetch(`${BASE_URL}/${tradeType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          symbol,
          quantity,
          price: stockData?.price ?? 0
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message ?? 'Trade failed');
      }

      setOrderStatus({
        type: 'success',
        message: `Successfully ${tradeType === 'buy' ? 'bought' : 'sold'} ${quantity} shares of ${symbol}`
      });

      fetchData();
    } catch (err) {
      setOrderStatus({
        type: 'error',
        message: err?.message ?? 'Trade failed'
      });
    }
  };

  // Effects
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  useEffect(() => {
    fetchHistoricalData();
  }, [selectedTimeRange, fetchHistoricalData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
        <div className="text-center text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
        <div className="bg-red-900/20 border border-red-800 text-red-400 p-4 rounded-lg">
          Error loading stock data: {error}
        </div>
      </div>
    );
  }

  const totalCost = (stockData?.price ?? 0) * quantity;
  const isPositiveChange = (stockData?.change ?? 0) >= 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8 py-28">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{symbol}</h1>
            <p className="text-gray-400">{stockData?.name ?? 'Loading...'}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-mono font-bold">
              ${stockData?.price?.toFixed(2) ?? '0.00'}
            </div>
            <div className={`flex items-center justify-end ${
              isPositiveChange ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {isPositiveChange ? (
                <TrendingUp className="w-5 h-5 mr-2" />
              ) : (
                <TrendingDown className="w-5 h-5 mr-2" />
              )}
              <span className="font-mono">
                {Math.abs(stockData?.change ?? 0).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Price History</h2>
            <div className="flex gap-2">
              {TIME_RANGES.map(range => (
                <button
                  key={range.value}
                  onClick={() => setSelectedTimeRange(range.value)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedTimeRange === range.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {chartLoading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="text-gray-400">Loading chart...</div>
            </div>
          ) : (
            <>
              {/* Price Chart */}
              <div className="h-96 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalData}>
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                    <XAxis dataKey="date" stroke="#9CA3AF"/>
                    <YAxis stroke="#9CA3AF"/>
                    <Tooltip content={<CustomTooltip />}/>
                    <Area
                      type="monotone"
                      dataKey="close"
                      stroke="#10B981"
                      fillOpacity={1}
                      fill="url(#colorPrice)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Volume Chart */}
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                    <XAxis dataKey="date" stroke="#9CA3AF"/>
                    <YAxis stroke="#9CA3AF"/>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '0.5rem',
                      }}
                    />
                    <Bar dataKey="volume" fill="#60A5FA"/>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
        </div>

        {/* Trading Section */}
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold mb-4">Place Order</h2>

          {orderStatus && (
            <div className={`p-4 mb-4 rounded-lg ${
              orderStatus.type === 'success'
                ? 'bg-emerald-900/20 border border-emerald-800 text-emerald-400'
                : 'bg-red-900/20 border border-red-800 text-red-400'
            }`}>
              {orderStatus.message}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setTradeType('buy')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  tradeType === 'buy'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-800 text-gray-300'
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setTradeType('sell')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  tradeType === 'sell'
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-800 text-gray-300'
                }`}
              >
                Sell
              </button>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Total {tradeType === 'buy' ? 'Cost' : 'Proceeds'}
              </label>
              <div className="text-2xl font-mono font-bold">
                ${totalCost.toFixed(2)}
              </div>
            </div>

            <div className="text-sm text-gray-400">
              Available Balance: ${userBalance.toFixed(2)}
            </div>

            <button
              onClick={handleTrade}
              disabled={loading || (tradeType === 'buy' && totalCost > userBalance)}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                tradeType === 'buy'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-rose-600 hover:bg-rose-700'
              } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {tradeType === 'buy' ? 'Buy' : 'Sell'} {symbol}
            </button>
          </div>
        </div>

        {/* Market Info and Order Book */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Market Info */}
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Market Info</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Volume</span>
                <span className="font-mono">
                  {(stockData?.volume ?? 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Market Cap</span>
                <span className="font-mono">
                  ${((stockData?.marketCap ?? 0) / 1e9).toFixed(2)}B
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Exchange</span>
                <span className="font-mono">{stockData?.exchange ?? 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Day High</span>
                <span className="font-mono">
                  ${stockData?.dayHigh?.toFixed(2) ?? 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Day Low</span>
                <span className="font-mono">
                  ${stockData?.dayLow?.toFixed(2) ?? 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Open</span>
                <span className="font-mono">
                  ${stockData?.open?.toFixed(2) ?? 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Previous Close</span>
                <span className="font-mono">
                  ${stockData?.previousClose?.toFixed(2) ?? 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Order Book */}
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Order Book</h2>
            {orderBook ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Bid Side */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm text-gray-400 mb-2">Bid</h3>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Price</span>
                            <span className="font-mono text-emerald-400">
                              ${orderBook.bid.price?.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Size</span>
                            <span className="font-mono">
                              {orderBook.bid.size?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ask Side */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm text-gray-400 mb-2">Ask</h3>
                      <div className="bg-gray-800/50 rounded-lg p-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Price</span>
                            <span className="font-mono text-rose-400">
                              ${orderBook.ask.price?.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Size</span>
                            <span className="font-mono">
                              {orderBook.ask.size?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-800 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Price</span>
                    <span className="font-mono">
                      ${orderBook.lastPrice?.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Size</span>
                    <span className="font-mono">
                      {orderBook.lastSize?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-center py-4">
                Loading order book data...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;