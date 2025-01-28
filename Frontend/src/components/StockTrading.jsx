// // import React, { useState, useEffect } from 'react';
// // import { DollarSign, TrendingUp, TrendingDown, Clock, AlertCircle } from 'lucide-react';

// // const StockTrading = () => {
// //   // Dummy user ID - replace with actual user authentication
// //   const DUMMY_USER_ID = "dummy123";

// //   // State for dashboard data
// //   const [dashboardData, setDashboardData] = useState({
// //     stocks: [],
// //     accountBalance: 0,
// //     recentActivities: [],
// //     userInfo: { name: '', email: '' }
// //   });

// //   // Available dummy stocks
// //   const dummyStocks = [
// //     { symbol: 'AAPL', currentPrice: 180.50, name: 'Apple Inc.' },
// //     { symbol: 'GOOGL', currentPrice: 2750.25, name: 'Alphabet Inc.' },
// //     { symbol: 'MSFT', currentPrice: 350.75, name: 'Microsoft Corp.' },
// //     { symbol: 'AMZN', currentPrice: 3400.50, name: 'Amazon.com Inc.' }
// //   ];

// //   const [selectedStock, setSelectedStock] = useState(dummyStocks[0]);
// //   const [quantity, setQuantity] = useState(1);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [logs, setLogs] = useState([]);

// //   // Add log entry
// //   const addLog = (message, type = 'info') => {
// //     const newLog = {
// //       message,
// //       type,
// //       timestamp: new Date().toISOString()
// //     };
// //     setLogs(prevLogs => [newLog, ...prevLogs]);
// //   };

// //   // Fetch dashboard data
// //   const fetchDashboardData = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await fetch(`http://localhost:8000/api/dashboard/${DUMMY_USER_ID}`);
// //       const data = await response.json();
// //       setDashboardData(data);
// //       addLog('Dashboard data refreshed');
// //     } catch (error) {
// //       setError('Failed to fetch dashboard data');
// //       addLog('Failed to fetch dashboard data', 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchDashboardData();
// //   }, []);

// //   // Handle buy/sell stock
// //   const handleTransaction = async (type) => {
// //     try {
// //       setLoading(true);
// //       setError('');

// //       const endpoint = type === 'BUY' ? 'buy' : 'sell';
// //       const response = await fetch(`http://localhost:8000/api/${endpoint}`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           userId: DUMMY_USER_ID,
// //           symbol: selectedStock.symbol,
// //           quantity: parseInt(quantity),
// //           price: selectedStock.currentPrice
// //         }),
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         throw new Error(data.message || 'Transaction failed');
// //       }

// //       addLog(`Successfully ${type.toLowerCase()}ed ${quantity} shares of ${selectedStock.symbol} at $${selectedStock.currentPrice}`);
// //       await fetchDashboardData();
// //       setQuantity(1);
// //     } catch (error) {
// //       setError(error.message);
// //       addLog(error.message, 'error');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="p-6 max-w-7xl mx-auto">
// //       <div className="mb-8">
// //         <h1 className="text-3xl font-bold mb-2">Stock Trading Platform</h1>
// //         <p className="text-gray-600">
// //           Balance: ${dashboardData?.accountBalance?.toFixed(2)}
// //         </p>
// //       </div>

// //       {error && (
// //         <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center">
// //           <AlertCircle className="w-5 h-5 mr-2" />
// //           {error}
// //         </div>
// //       )}

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div className="bg-white p-6 rounded-lg shadow">
// //           <h2 className="text-xl font-semibold mb-4">Trade Stocks</h2>

// //           <div className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium mb-1">Select Stock</label>
// //               <select
// //                 className="w-full p-2 border rounded"
// //                 value={selectedStock.symbol}
// //                 onChange={(e) => setSelectedStock(dummyStocks.find(s => s.symbol === e.target.value))}
// //               >
// //                 {dummyStocks.map(stock => (
// //                   <option key={stock.symbol} value={stock.symbol}>
// //                     {stock.name} ({stock.symbol}) - ${stock.currentPrice}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium mb-1">Quantity</label>
// //               <input
// //                 type="number"
// //                 min="1"
// //                 value={quantity}
// //                 onChange={(e) => setQuantity(e.target.value)}
// //                 className="w-full p-2 border rounded"
// //               />
// //             </div>

// //             <div className="text-sm text-gray-600 mb-4">
// //               Total Cost: ${(selectedStock.currentPrice * quantity).toFixed(2)}
// //             </div>

// //             <div className="grid grid-cols-2 gap-4">
// //               <button
// //                 onClick={() => handleTransaction('BUY')}
// //                 disabled={loading}
// //                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
// //               >
// //                 Buy Stock
// //               </button>

// //               <button
// //                 onClick={() => handleTransaction('SELL')}
// //                 disabled={loading}
// //                 className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
// //               >
// //                 Sell Stock
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow">
// //           <h2 className="text-xl font-semibold mb-4">Current Holdings</h2>
// //           <div className="overflow-x-auto">
// //             <table className="w-full">
// //               <thead>
// //                 <tr className="border-b">
// //                   <th className="text-left p-2">Symbol</th>
// //                   <th className="text-right p-2">Quantity</th>
// //                   <th className="text-right p-2">Avg Price</th>
// //                   <th className="text-right p-2">Current Value</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {dashboardData?.stocks?.map(stock => {
// //                   const currentPrice = dummyStocks.find(s => s.symbol === stock.symbol)?.currentPrice || stock.buyPrice;
// //                   return (
// //                     <tr key={stock.symbol} className="border-b">
// //                       <td className="p-2">{stock.symbol}</td>
// //                       <td className="text-right p-2">{stock.quantity}</td>
// //                       <td className="text-right p-2">${stock.buyPrice.toFixed(2)}</td>
// //                       <td className="text-right p-2">
// //                         ${(currentPrice * stock.quantity).toFixed(2)}
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
// //         <div className="bg-white p-6 rounded-lg shadow">
// //           <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
// //           <div className="space-y-4">
// //             {dashboardData?.recentActivities?.map((activity, index) => (
// //               <div key={index} className="flex items-start border-b pb-4">
// //                 {activity.type === 'BUY' ? (
// //                   <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
// //                 ) : (
// //                   <TrendingDown className="w-6 h-6 text-red-500 mr-2" />
// //                 )}
// //                 <div>
// //                   <p className="font-medium">{activity.description}</p>
// //                   <p className="text-sm text-gray-500">
// //                     Balance change: ${activity.balanceChange.toFixed(2)}
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         <div className="bg-white p-6 rounded-lg shadow">
// //           <h2 className="text-xl font-semibold mb-4">Transaction Logs</h2>
// //           <div className="space-y-2 max-h-96 overflow-y-auto">
// //             {logs.map((log, index) => (
// //               <div
// //                 key={index}
// //                 className={`p-2 rounded text-sm ${
// //                   log.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-gray-100'
// //                 }`}
// //               >
// //                 <div className="flex items-center justify-between">
// //                   <span>{log.message}</span>
// //                   <span className="text-xs text-gray-500">
// //                     {new Date(log.timestamp).toLocaleTimeString()}
// //                   </span>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default StockTrading;
// import React, { useState, useEffect } from 'react';
// import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

// const StockTrading = () => {
//   const DUMMY_USER_ID = "dummy123";

//   // Simplified state management
//   const [dashboardData, setDashboardData] = useState({
//     stocks: [],
//     accountBalance: 0,
//     recentActivities: [],
//     userInfo: {}
//   });

//   const [tradeData, setTradeData] = useState({
//     symbol: '',
//     quantity: '',
//     price: ''
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');

//   // Available stocks for trading
//   const stockOptions = [
//     { symbol: 'AAPL', price: 180.50, name: 'Apple Inc.' },
//     { symbol: 'GOOGL', price: 2750.25, name: 'Alphabet Inc.' },
//     { symbol: 'MSFT', price: 350.75, name: 'Microsoft Corp.' },
//     { symbol: 'AMZN', price: 3400.50, name: 'Amazon.com Inc.' }
//   ];

//   // Safe fetch wrapper
//   const safeFetch = async (url, options = {}) => {
//     try {
//       const response = await fetch(url, {
//         ...options,
//         headers: {
//           'Content-Type': 'application/json',
//           ...options.headers,
//         },
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data?.message || 'An error occurred');
//       }

//       return data;
//     } catch (err) {
//       setError(err?.message || 'Network error occurred');
//       return null;
//     }
//   };

//   // Fetch dashboard data
//   const fetchDashboard = async () => {
//     setIsLoading(true);
//     const data = await safeFetch(`http://localhost:8000/api/dashboard/${DUMMY_USER_ID}`);
//     if (data) {
//       setDashboardData({
//         stocks: data?.stocks || [],
//         accountBalance: data?.accountBalance || 0,
//         recentActivities: data?.recentActivities || [],
//         userInfo: data?.userInfo || {}
//       });
//     }
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   // Handle stock selection
//   const handleStockSelect = (symbol) => {
//     const selectedStock = stockOptions.find(stock => stock.symbol === symbol);
//     if (selectedStock) {
//       setTradeData(prev => ({
//         ...prev,
//         symbol: selectedStock.symbol,
//         price: selectedStock.price
//       }));
//     }
//   };

//   // Handle trade
//   const handleTrade = async (action) => {
//     if (!tradeData.symbol || !tradeData.quantity) {
//       setError('Please fill in all fields');
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     const payload = {
//       userId: DUMMY_USER_ID,
//       symbol: tradeData.symbol,
//       quantity: Number(tradeData.quantity),
//       price: Number(tradeData.price)
//     };

//     const data = await safeFetch(
//       `http://localhost:8000/api/stock/${action.toLowerCase()}`,
//       {
//         method: 'POST',
//         body: JSON.stringify(payload)
//       }
//     );

//     if (data) {
//       await fetchDashboard();
//       setTradeData({ symbol: '', quantity: '', price: '' });
//     }

//     setIsLoading(false);
//   };

//   return (
//     <div className="p-4 max-w-6xl mx-auto">
//       {/* Account Overview */}
//       <div className="bg-white rounded-lg shadow p-6 mb-6">
//         <div className="flex items-center mb-4">
//           <DollarSign className="w-6 h-6 text-green-500 mr-2" />
//           <h2 className="text-xl font-semibold">Account Balance</h2>
//         </div>
//         <p className="text-3xl font-bold">
//           ${dashboardData?.accountBalance?.toFixed(2) || '0.00'}
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Trading Panel */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Trade Stocks</h2>

//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//               {error}
//             </div>
//           )}

//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-2">Select Stock</label>
//               <select
//                 className="w-full p-2 border rounded"
//                 value={tradeData.symbol}
//                 onChange={(e) => handleStockSelect(e.target.value)}
//                 disabled={isLoading}
//               >
//                 <option value="">Select a stock</option>
//                 {stockOptions.map(stock => (
//                   <option key={stock.symbol} value={stock.symbol}>
//                     {stock.name} ({stock.symbol}) - ${stock.price}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-2">Quantity</label>
//               <input
//                 type="number"
//                 min="1"
//                 className="w-full p-2 border rounded"
//                 value={tradeData.quantity}
//                 onChange={(e) => setTradeData(prev => ({ ...prev, quantity: e.target.value }))}
//                 disabled={isLoading}
//               />
//             </div>

//             {tradeData.symbol && tradeData.quantity && (
//               <div className="text-sm text-gray-600">
//                 Total Value: ${(Number(tradeData.quantity) * Number(tradeData.price)).toFixed(2)}
//               </div>
//             )}

//             <div className="grid grid-cols-2 gap-4">
//               <button
//                 onClick={() => handleTrade('BUY')}
//                 disabled={isLoading || !tradeData.symbol || !tradeData.quantity}
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600
//                           disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? 'Processing...' : 'Buy'}
//               </button>

//               <button
//                 onClick={() => handleTrade('SELL')}
//                 disabled={isLoading || !tradeData.symbol || !tradeData.quantity}
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600
//                           disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? 'Processing...' : 'Sell'}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Portfolio */}
//         <div className="bg-white rounded-lg shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">Current Holdings</h2>
//           <div className="overflow-x-auto">
//             {dashboardData?.stocks?.length > 0 ? (
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b">
//                     <th className="text-left p-2">Symbol</th>
//                     <th className="text-right p-2">Quantity</th>
//                     <th className="text-right p-2">Avg Price</th>
//                     <th className="text-right p-2">Value</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {dashboardData.stocks.map((stock) => (
//                     <tr key={stock.symbol} className="border-b">
//                       <td className="p-2">{stock.symbol}</td>
//                       <td className="text-right p-2">{stock.quantity}</td>
//                       <td className="text-right p-2">${stock?.buyPrice?.toFixed(2) || '0.00'}</td>
//                       <td className="text-right p-2">
//                         ${((stock?.buyPrice || 0) * (stock?.quantity || 0)).toFixed(2)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             ) : (
//               <p className="text-gray-500 text-center py-4">No stocks in portfolio</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Recent Activities */}
//       <div className="mt-6 bg-white rounded-lg shadow p-6">
//         <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
//         <div className="space-y-4">
//           {dashboardData?.recentActivities?.length > 0 ? (
//             dashboardData.recentActivities.map((activity, index) => (
//               <div key={index} className="flex items-start border-b last:border-0 pb-4">
//                 {activity?.type === 'BUY' ? (
//                   <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
//                 ) : (
//                   <TrendingDown className="w-6 h-6 text-red-500 mr-2" />
//                 )}
//                 <div>
//                   <p className="font-medium">{activity?.description}</p>
//                   <p className="text-sm text-gray-500">
//                     Balance change: ${activity?.balanceChange?.toFixed(2) || '0.00'}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center">No recent activities</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StockTrading;
import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const StockTrading = () => {
  // Using a valid MongoDB ObjectId format
  const DEMO_USER_ID = "67993b627ffaaa3842466728";  // This should be replaced with actual user ID after login

  const [dashboardData, setDashboardData] = useState({
    stocks: [],
    accountBalance: 0,
    recentActivities: [],
    userInfo: {}
  });

  const [tradeData, setTradeData] = useState({
    symbol: '',
    quantity: '',
    price: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const stockOptions = [
    { symbol: 'AAPL', price: 50000000, name: 'Apple Inc.' },
    { symbol: 'GOOGL', price: 2750.25, name: 'Alphabet Inc.' },
    { symbol: 'MSFT', price: 350.75, name: 'Microsoft Corp.' },
    { symbol: 'AMZN', price: 3400.50, name: 'Amazon.com Inc.' }
  ];

  const safeFetch = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Server error occurred');
      }

      return await response.json();
    } catch (err) {
      console.error('API Error:', err);
      setError(err?.message || 'An error occurred while processing your request');
      return null;
    }
  };

  const fetchDashboard = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await safeFetch(`http://localhost:8000/api/dashboard/${DEMO_USER_ID}`);
      if (data) {
        setDashboardData({
          stocks: data?.stocks || [],
          accountBalance: data?.accountBalance || 0,
          recentActivities: data?.recentActivities || [],
          userInfo: data?.userInfo || {}
        });
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleStockSelect = (symbol) => {
    const selectedStock = stockOptions.find(stock => stock.symbol === symbol);
    if (selectedStock) {
      setTradeData(prev => ({
        ...prev,
        symbol: selectedStock.symbol,
        price: selectedStock.price
      }));
      setError(''); // Clear any previous errors
    }
  };

  const handleTrade = async (action) => {
    if (!tradeData.symbol || !tradeData.quantity) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const payload = {
        userId: DEMO_USER_ID,
        symbol: tradeData.symbol,
        quantity: Number(tradeData.quantity),
        price: Number(tradeData.price)
      };

      const data = await safeFetch(
        `http://localhost:8000/api/${action.toLowerCase()}`,
        {
          method: 'POST',
          body: JSON.stringify(payload)
        }
      );

      if (data) {
        await fetchDashboard();
        setTradeData({ symbol: '', quantity: '', price: '' });
      }
    } catch (err) {
      console.error('Trade error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !dashboardData.stocks.length) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      {/* Account Overview */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center mb-4">
          <DollarSign className="w-6 h-6 text-green-500 mr-2" />
          <h2 className="text-xl font-semibold">Account Balance</h2>
        </div>
        <p className="text-3xl font-bold">
          ${dashboardData?.accountBalance?.toFixed(2) || '0.00'}
        </p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trading Panel */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Trade Stocks</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Stock</label>
              <select
                className="w-full p-2 border rounded"
                value={tradeData.symbol}
                onChange={(e) => handleStockSelect(e.target.value)}
                disabled={isLoading}
              >
                <option value="">Select a stock</option>
                {stockOptions.map(stock => (
                  <option key={stock.symbol} value={stock.symbol}>
                    {stock.name} ({stock.symbol}) - ${stock.price}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                className="w-full p-2 border rounded"
                value={tradeData.quantity}
                onChange={(e) => setTradeData(prev => ({ ...prev, quantity: e.target.value }))}
                disabled={isLoading}
              />
            </div>

            {tradeData.symbol && tradeData.quantity && (
              <div className="text-sm text-gray-600">
                Total Value: ${(Number(tradeData.quantity) * Number(tradeData.price)).toFixed(2)}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleTrade('BUY')}
                disabled={isLoading || !tradeData.symbol || !tradeData.quantity}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600
                          disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Buy'}
              </button>

              <button
                onClick={() => handleTrade('SELL')}
                disabled={isLoading || !tradeData.symbol || !tradeData.quantity}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600
                          disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : 'Sell'}
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Current Holdings</h2>
          <div className="overflow-x-auto">
            {dashboardData?.stocks?.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Symbol</th>
                    <th className="text-right p-2">Quantity</th>
                    <th className="text-right p-2">Avg Price</th>
                    <th className="text-right p-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.stocks.map((stock) => (
                    <tr key={stock.symbol} className="border-b">
                      <td className="p-2">{stock.symbol}</td>
                      <td className="text-right p-2">{stock.quantity}</td>
                      <td className="text-right p-2">${stock?.buyPrice?.toFixed(2) || '0.00'}</td>
                      <td className="text-right p-2">
                        ${((stock?.buyPrice || 0) * (stock?.quantity || 0)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-center py-4">No stocks in portfolio</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {dashboardData?.recentActivities?.length > 0 ? (
            dashboardData.recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start border-b last:border-0 pb-4">
                {activity?.type === 'BUY' ? (
                  <TrendingUp className="w-6 h-6 text-green-500 mr-2" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-500 mr-2" />
                )}
                <div>
                  <p className="font-medium">{activity?.description}</p>
                  <p className="text-sm text-gray-500">
                    Balance change: ${activity?.balanceChange?.toFixed(2) || '0.00'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No recent activities</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockTrading;