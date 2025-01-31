// import React, { useState, useEffect } from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";
// import {
//   TrendingUp,
//   TrendingDown,
//   DollarSign,
//   Activity,
//   PieChart as PieChartIcon,
//   Clock,
//   List,
//   Calendar,
//   Bell,
//   Settings,
//   Download,
//   AlertTriangle,
//   Target,
//   Zap,
// } from "lucide-react";

// const Portfolio = () => {
//   const [timeFrame, setTimeFrame] = useState("1D");
//   const [showAlerts, setShowAlerts] = useState(false);
//   const [selectedMetric, setSelectedMetric] = useState("value");
//   const [riskLevel, setRiskLevel] = useState("medium");

//   // Sample data - replace with real data
//   const performanceData = {
//     "1D": Array.from({ length: 24 }, (_, i) => ({
//       time: `${i}:00`,
//       value: 100000 + Math.random() * 5000,
//     })),
//     "1W": Array.from({ length: 7 }, (_, i) => ({
//       time: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
//       value: 100000 + Math.random() * 8000,
//     })),
//     "1M": Array.from({ length: 30 }, (_, i) => ({
//       time: `Day ${i + 1}`,
//       value: 100000 + Math.random() * 10000,
//     })),
//     "1Y": Array.from({ length: 12 }, (_, i) => ({
//       time: [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//         "Nov",
//         "Dec",
//       ][i],
//       value: 100000 + Math.random() * 20000,
//     })),
//   };

//   const tradeHistory = [
//     {
//       type: "BUY",
//       symbol: "AAPL",
//       quantity: 10,
//       price: 175.23,
//       timestamp: "2024-01-31T10:30:00",
//     },
//     {
//       type: "SELL",
//       symbol: "TSLA",
//       quantity: 5,
//       price: 210.76,
//       timestamp: "2024-01-31T11:15:00",
//     },
//     {
//       type: "BUY",
//       symbol: "NVDA",
//       quantity: 8,
//       price: 565.12,
//       timestamp: "2024-01-31T13:45:00",
//     },
//   ];

//   const holdings = [
//     {
//       symbol: "AAPL",
//       quantity: 15,
//       avgPrice: 170.25,
//       currentPrice: 175.23,
//       pl: 74.7,
//     },
//     {
//       symbol: "NVDA",
//       quantity: 8,
//       avgPrice: 565.12,
//       currentPrice: 572.35,
//       pl: 57.84,
//     },
//     {
//       symbol: "MSFT",
//       quantity: 12,
//       avgPrice: 375.5,
//       currentPrice: 382.3,
//       pl: 81.6,
//     },
//   ];

//   const performanceMetrics = {
//     totalValue: 125750.32,
//     dayChange: 1250.45,
//     weekChange: 3750.8,
//     monthChange: 8500.25,
//     yearChange: 25750.32,
//   };

//   const sectorAllocation = [
//     { name: "Technology", value: 45 },
//     { name: "Healthcare", value: 20 },
//     { name: "Finance", value: 15 },
//     { name: "Consumer", value: 12 },
//     { name: "Energy", value: 8 },
//   ];

//   // Risk Analysis Data
//   const riskMetrics = {
//     volatility: 15.2,
//     sharpeRatio: 1.8,
//     beta: 1.2,
//     maxDrawdown: -12.5,
//     varDaily: -2.5,
//   };

//   // Trading Alerts
//   const alerts = [
//     {
//       type: "price",
//       symbol: "AAPL",
//       message: "Price target reached: $180",
//       timestamp: new Date(),
//     },
//     {
//       type: "volume",
//       symbol: "TSLA",
//       message: "Unusual volume detected",
//       timestamp: new Date(),
//     },
//     {
//       type: "technical",
//       symbol: "NVDA",
//       message: "RSI overbought condition",
//       timestamp: new Date(),
//     },
//   ];

//   // Performance Analytics
//   const performanceAnalytics = {
//     winRate: 68.5,
//     avgWin: 523.45,
//     avgLoss: -285.3,
//     profitFactor: 2.1,
//     expectancy: 185.2,
//   };

//   // Portfolio Optimization Suggestions
//   const optimizationSuggestions = [
//     {
//       type: "rebalance",
//       message: "Technology sector overweight by 5%",
//       impact: "high",
//     },
//     {
//       type: "risk",
//       message: "Consider hedging TSLA position",
//       impact: "medium",
//     },
//     {
//       type: "diversification",
//       message: "Add exposure to emerging markets",
//       impact: "medium",
//     },
//   ];

//   const COLORS = ["#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B"];

//   // Component Definitions
//   const StatCard = ({ title, value, icon: Icon, trend, color }) => (
//     <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 transition-colors">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-sm sm:text-base text-gray-400">{title}</h3>
//         <Icon className={`text-${color}`} size={20} />
//       </div>
//       <p
//         className={`text-lg sm:text-2xl font-bold ${
//           trend && (trend > 0 ? "text-green-500" : "text-red-500")
//         }`}
//       >
//         {typeof value === "number"
//           ? title.includes("Change")
//             ? `${value > 0 ? "+" : ""}${value.toFixed(2)}%`
//             : `$${value.toLocaleString()}`
//           : value}
//       </p>
//     </div>
//   );
//   const TimeFrameButton = ({ frame, active }) => (
//     <button
//       className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded ${
//         active
//           ? "bg-blue-500 text-white"
//           : "bg-gray-800 text-gray-400 hover:bg-gray-700"
//       }`}
//       onClick={() => setTimeFrame(frame)}
//     >
//       {frame}
//     </button>
//   );

//   const RiskMetricsCard = () => (
//     <div className="bg-gray-900 p-6 rounded-lg">
//       <h2 className="text-xl font-bold mb-4 flex items-center">
//         <AlertTriangle size={20} className="mr-2 text-yellow-500" />
//         Risk Metrics
//       </h2>
//       <div className="grid grid-cols-2 gap-4">
//         {Object.entries(riskMetrics).map(([key, value]) => (
//           <div key={key} className="bg-gray-800 p-3 rounded">
//             <div className="text-gray-400 text-sm">
//               {key.replace(/([A-Z])/g, " $1").toUpperCase()}
//             </div>
//             <div className="text-lg font-bold">
//               {typeof value === "number" ? value.toFixed(2) : value}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const AlertsPanel = () => (
//     <div className="bg-gray-900 p-6 rounded-lg">
//       <h2 className="text-xl font-bold mb-4 flex items-center">
//         <Bell size={20} className="mr-2 text-blue-500" />
//         Trading Alerts
//       </h2>
//       <div className="space-y-3">
//         {alerts.map((alert, index) => (
//           <div
//             key={index}
//             className="bg-gray-800 p-3 rounded flex items-center justify-between"
//           >
//             <div>
//               <span className="text-sm text-gray-400">{alert.symbol}</span>
//               <p className="font-medium">{alert.message}</p>
//             </div>
//             <span className="text-xs text-gray-500">
//               {alert.timestamp.toLocaleTimeString()}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const PerformanceMetrics = () => (
//     <div className="bg-gray-900 p-6 rounded-lg">
//       <h2 className="text-xl font-bold mb-4 flex items-center">
//         <Target size={20} className="mr-2 text-purple-500" />
//         Trading Performance
//       </h2>
//       <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
//         {Object.entries(performanceAnalytics).map(([key, value]) => (
//           <div key={key} className="bg-gray-800 p-3 rounded">
//             <div className="text-gray-400 text-sm">
//               {key.replace(/([A-Z])/g, " $1").toUpperCase()}
//             </div>
//             <div className="text-lg font-bold">
//               {typeof value === "number"
//                 ? key.includes("Rate")
//                   ? `${value}%`
//                   : `$${value.toFixed(2)}`
//                 : value}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const OptimizationSuggestions = () => (
//     <div className="bg-gray-900 p-6 rounded-lg">
//       <h2 className="text-xl font-bold mb-4 flex items-center">
//         <Zap size={20} className="mr-2 text-yellow-500" />
//         Portfolio Optimization
//       </h2>
//       <div className="space-y-3">
//         {optimizationSuggestions.map((suggestion, index) => (
//           <div
//             key={index}
//             className="bg-gray-800 p-3 rounded flex items-center justify-between"
//           >
//             <div>
//               <span
//                 className={`px-2 py-1 rounded text-xs font-medium ${
//                   suggestion.impact === "high"
//                     ? "bg-red-500/20 text-red-500"
//                     : suggestion.impact === "medium"
//                     ? "bg-yellow-500/20 text-yellow-500"
//                     : "bg-green-500/20 text-green-500"
//                 }`}
//               >
//                 {suggestion.impact.toUpperCase()}
//               </span>
//               <p className="mt-1 font-medium">{suggestion.message}</p>
//             </div>
//             <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
//               Act
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-black text-white p-4 sm:p-6 py-20 sm:py-28">
//       <div className="mx-auto max-w-7xl">
//         {/* Header */}
//         <div className="mb-4 sm:mb-4">
//           <h1 className="text-2xl sm:text-3xl font-bold mb-2">
//             Trading Portfolio
//           </h1>
//           <p className="text-sm sm:text-base text-gray-400">
//             Market is Open • Last updated: {new Date().toLocaleTimeString()}
//           </p>
//         </div>

//         {/*Wallet*/}
//         <div className="mb-4 sm:mb-8">
//           <h1 className=" text-green-400 text-2xl sm:text-6xl font-bold mb-2">
//             $ 65,378,945,213.678
//           </h1>
//         </div>

//         {/* Performance Metrics Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
//           <StatCard
//             title="Portfolio Value"
//             value={performanceMetrics.totalValue}
//             icon={DollarSign}
//             color="green-500"
//           />
//           <StatCard
//             title="24h Change"
//             value={
//               (performanceMetrics.dayChange / performanceMetrics.totalValue) *
//               100
//             }
//             icon={performanceMetrics.dayChange >= 0 ? TrendingUp : TrendingDown}
//             trend={performanceMetrics.dayChange}
//             color="blue-500"
//           />
//           <StatCard
//             title="30d Change"
//             value={
//               (performanceMetrics.monthChange / performanceMetrics.totalValue) *
//               100
//             }
//             icon={Activity}
//             trend={performanceMetrics.monthChange}
//             color="purple-500"
//           />
//           <StatCard
//             title="YTD Return"
//             value={
//               (performanceMetrics.yearChange / performanceMetrics.totalValue) *
//               100
//             }
//             icon={Calendar}
//             trend={performanceMetrics.yearChange}
//             color="yellow-500"
//           />
//         </div>

//         {/* Portfolio Performance Chart */}
//         <div className="bg-gray-900 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
//             <h2 className="text-lg sm:text-xl font-bold">
//               Portfolio Performance
//             </h2>
//             <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto">
//               <TimeFrameButton frame="1D" active={timeFrame === "1D"} />
//               <TimeFrameButton frame="1W" active={timeFrame === "1W"} />
//               <TimeFrameButton frame="1M" active={timeFrame === "1M"} />
//               <TimeFrameButton frame="1Y" active={timeFrame === "1Y"} />
//             </div>
//           </div>
//           <div className="h-60 sm:h-80">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={performanceData[timeFrame]}>
//                 <defs>
//                   <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
//                     <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                 <XAxis dataKey="time" stroke="#9CA3AF" />
//                 <YAxis stroke="#9CA3AF" />
//                 <Tooltip
//                   contentStyle={{ backgroundColor: "#111827", border: "none" }}
//                   labelStyle={{ color: "#9CA3AF" }}
//                 />
//                 <Area
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#3B82F6"
//                   fillOpacity={1}
//                   fill="url(#colorValue)"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Holdings and Allocation */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8">
//           {/* Current Holdings */}
//           <div className="lg:col-span-2 bg-gray-900 p-4 sm:p-6 rounded-lg overflow-hidden">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg sm:text-xl font-bold">Current Holdings</h2>
//               <List size={20} className="text-gray-400" />
//             </div>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="text-gray-400 border-b border-gray-800">
//                     <th className="text-left py-3">Symbol</th>
//                     <th className="text-right">Quantity</th>
//                     <th className="text-right">Avg Price</th>
//                     <th className="text-right">Current</th>
//                     <th className="text-right">P/L</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {holdings.map((holding) => (
//                     <tr
//                       key={holding.symbol}
//                       className="border-b border-gray-800"
//                     >
//                       <td className="py-3 font-medium">{holding.symbol}</td>
//                       <td className="text-right">{holding.quantity}</td>
//                       <td className="text-right">
//                         ${holding.avgPrice.toFixed(2)}
//                       </td>
//                       <td className="text-right">
//                         ${holding.currentPrice.toFixed(2)}
//                       </td>
//                       <td
//                         className={`text-right ${
//                           holding.pl >= 0 ? "text-green-500" : "text-red-500"
//                         }`}
//                       >
//                         ${holding.pl.toFixed(2)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Sector Allocation */}
//           <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
//             <h2 className="text-lg sm:text-xl font-bold mb-4">
//               Sector Allocation
//             </h2>
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     data={sectorAllocation}
//                     cx="50%"
//                     cy="50%"
//                     innerRadius={60}
//                     outerRadius={80}
//                     paddingAngle={5}
//                     dataKey="value"
//                     label={({ name, value }) => `${name} (${value}%)`}
//                   >
//                     {sectorAllocation.map((entry, index) => (
//                       <Cell
//                         key={`cell-${index}`}
//                         fill={COLORS[index % COLORS.length]}
//                       />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#111827",
//                       border: "none",
//                     }}
//                     labelStyle={{ color: "#9CA3AF" }}
//                   />
//                   <Legend />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>

//         {/* Recent Trades */}
//         <div className="space-y-6 sm:space-y-8 mb-8">
//           <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-lg sm:text-xl font-bold">Recent Trades</h2>
//               <Clock size={20} className="text-gray-400" />
//             </div>
//             <div className="space-y-4">
//               {tradeHistory.map((trade, index) => (
//                 <div
//                   key={index}
//                   className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-800 rounded space-y-2 sm:space-y-0"
//                 >
//                   <div>
//                     <span
//                       className={`inline-block px-2 py-1 rounded text-sm font-medium ${
//                         trade.type === "BUY"
//                           ? "bg-green-500/20 text-green-500"
//                           : "bg-red-500/20 text-red-500"
//                       }`}
//                     >
//                       {trade.type}
//                     </span>
//                     <span className="ml-3 font-medium">{trade.symbol}</span>
//                   </div>
//                   <div className="text-left sm:text-right">
//                     <p className="text-sm text-gray-400">
//                       {trade.quantity} shares @ ${trade.price}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {new Date(trade.timestamp).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Risk Metrics and Alerts */}
//         <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
//           {/* Risk Metrics Card */}
//           <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
//             <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
//               <AlertTriangle size={20} className="mr-2 text-yellow-500" />
//               Risk Metrics
//             </h2>
//             <div className="grid grid-cols-2 gap-3 sm:gap-4">
//               {Object.entries(riskMetrics).map(([key, value]) => (
//                 <div key={key} className="bg-gray-800 p-3 rounded">
//                   <div className="text-gray-400 text-xs sm:text-sm">
//                     {key.replace(/([A-Z])/g, " $1").toUpperCase()}
//                   </div>
//                   <div className="text-base sm:text-lg font-bold">
//                     {typeof value === "number" ? value.toFixed(2) : value}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Alerts Panel */}
//           <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
//             <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
//               <Bell size={20} className="mr-2 text-blue-500" />
//               Trading Alerts
//             </h2>
//             <div className="space-y-3">
//               {alerts.map((alert, index) => (
//                 <div
//                   key={index}
//                   className="bg-gray-800 p-3 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0"
//                 >
//                   <div>
//                     <span className="text-sm text-gray-400">
//                       {alert.symbol}
//                     </span>
//                     <p className="font-medium">{alert.message}</p>
//                   </div>
//                   <span className="text-xs text-gray-500">
//                     {alert.timestamp.toLocaleTimeString()}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Performance Analytics */}
//         <div className="mb-6 sm:mb-8">
//           <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
//             <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
//               <Target size={20} className="mr-2 text-purple-500" />
//               Trading Performance
//             </h2>
//             <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
//               {Object.entries(performanceAnalytics).map(([key, value]) => (
//                 <div key={key} className="bg-gray-800 p-3 rounded">
//                   <div className="text-gray-400 text-xs sm:text-sm">
//                     {key.replace(/([A-Z])/g, " $1").toUpperCase()}
//                   </div>
//                   <div className="text-base sm:text-lg font-bold">
//                     {typeof value === "number"
//                       ? key.includes("Rate")
//                         ? `${value}%`
//                         : `${value.toFixed(2)}`
//                       : value}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Portfolio Optimization */}
//         <div className="mb-6 sm:mb-8">
//           <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
//             <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
//               <Zap size={20} className="mr-2 text-yellow-500" />
//               Portfolio Optimization
//             </h2>
//             <div className="space-y-3">
//               {optimizationSuggestions.map((suggestion, index) => (
//                 <div
//                   key={index}
//                   className="bg-gray-800 p-3 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0"
//                 >
//                   <div>
//                     <span
//                       className={`px-2 py-1 rounded text-xs font-medium ${
//                         suggestion.impact === "high"
//                           ? "bg-red-500/20 text-red-500"
//                           : suggestion.impact === "medium"
//                           ? "bg-yellow-500/20 text-yellow-500"
//                           : "bg-green-500/20 text-green-500"
//                       }`}
//                     >
//                       {suggestion.impact.toUpperCase()}
//                     </span>
//                     <p className="mt-1 font-medium">{suggestion.message}</p>
//                   </div>
//                   <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
//                     Act
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions Floating Button */}
//         <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 flex space-x-4">
//           <button className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
//             <Download size={24} />
//           </button>
//           <button className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
//             <Settings size={24} />
//           </button>
//           <button
//             className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
//             onClick={() => setShowAlerts(!showAlerts)}
//           >
//             <Bell size={24} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Portfolio;

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  PieChart as PieChartIcon,
  Clock,
  List,
  Calendar,
  Bell,
  Settings,
  Download,
  AlertTriangle,
  Target,
  Zap,
} from "lucide-react";

const Portfolio = () => {
  const [timeFrame, setTimeFrame] = useState("1D");
  const [showAlerts, setShowAlerts] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState("value");
  const [riskLevel, setRiskLevel] = useState("medium");
  const [dashboardData, setDashboardData] = useState({
    stocks: [],
    accountBalance: 0,
    recentActivities: [],
    userInfo: { name: "", email: "" },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:8000/api/dashboard/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        setDashboardData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Performance data generation based on timeframe
  const generatePerformanceData = (timeframe) => {
    const baseValue = dashboardData.accountBalance;
    let dataPoints;

    switch (timeframe) {
      case "1D":
        dataPoints = Array.from({ length: 24 }, (_, i) => ({
          time: `${i}:00`,
          value: baseValue + (Math.random() - 0.5) * baseValue * 0.02,
        }));
        break;
      case "1W":
        dataPoints = Array.from({ length: 7 }, (_, i) => ({
          time: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
          value: baseValue + (Math.random() - 0.5) * baseValue * 0.05,
        }));
        break;
      case "1M":
        dataPoints = Array.from({ length: 30 }, (_, i) => ({
          time: `Day ${i + 1}`,
          value: baseValue + (Math.random() - 0.5) * baseValue * 0.08,
        }));
        break;
      case "1Y":
        dataPoints = Array.from({ length: 12 }, (_, i) => ({
          time: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ][i],
          value: baseValue + (Math.random() - 0.5) * baseValue * 0.15,
        }));
        break;
      default:
        dataPoints = [];
    }
    return dataPoints;
  };

  const calculatePerformanceMetrics = () => {
    const totalStockValue = dashboardData.stocks.reduce((total, stock) => {
      return total + stock.quantity * stock.currentPrice;
    }, 0);

    const totalValue = totalStockValue + dashboardData.accountBalance;

    // Calculate changes based on profit/loss values
    const dayChange = dashboardData.stocks.reduce(
      (total, stock) => total + (stock.dailyProfitLoss || 0),
      0
    );
    const monthChange = dashboardData.stocks.reduce(
      (total, stock) => total + (stock.monthlyProfitLoss || 0),
      0
    );
    const yearChange = dashboardData.stocks.reduce(
      (total, stock) => total + (stock.yearlyProfitLoss || 0),
      0
    );

    return {
      totalValue,
      dayChange,
      weekChange: dayChange * 5, // Simplified weekly calculation
      monthChange,
      yearChange,
    };
  };

  const calculateSectorAllocation = () => {
    const sectors = dashboardData.stocks.reduce((acc, stock) => {
      const sector = stock.sector || "Other";
      const stockValue = stock.quantity * stock.currentPrice;
      acc[sector] = (acc[sector] || 0) + stockValue;
      return acc;
    }, {});

    const totalValue = Object.values(sectors).reduce((a, b) => a + b, 0);

    return Object.entries(sectors).map(([name, value]) => ({
      name,
      value: Math.round((value / totalValue) * 100),
    }));
  };

  // Risk metrics calculation
  const calculateRiskMetrics = () => {
    const stockPrices = dashboardData.stocks.map((stock) => stock.currentPrice);
    const returns = stockPrices.map((price, i, arr) =>
      i === 0 ? 0 : (price - arr[i - 1]) / arr[i - 1]
    );

    const volatility =
      Math.sqrt(
        returns.reduce((sum, ret) => sum + ret * ret, 0) / returns.length
      ) *
      Math.sqrt(252) *
      100;

    return {
      volatility: volatility.toFixed(2),
      sharpeRatio: (volatility / 20 + 1).toFixed(2),
      beta: (volatility / 15).toFixed(2),
      maxDrawdown: (-volatility / 2).toFixed(2),
      varDaily: (-volatility / 16).toFixed(2),
    };
  };

  const performanceMetrics = calculatePerformanceMetrics();
  const sectorAllocation = calculateSectorAllocation();
  const riskMetrics = calculateRiskMetrics();
  const performanceData = generatePerformanceData(timeFrame);

  const COLORS = ["#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B"];

  // Component Definitions
  const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <div className="bg-gray-900 p-4 sm:p-6 rounded-lg hover:bg-gray-800 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm sm:text-base text-gray-400">{title}</h3>
        <Icon className={`text-${color}`} size={20} />
      </div>
      <p
        className={`text-lg sm:text-2xl font-bold ${
          trend && (trend > 0 ? "text-green-500" : "text-red-500")
        }`}
      >
        {typeof value === "number"
          ? title.includes("Change")
            ? `${value > 0 ? "+" : ""}${value.toFixed(2)}%`
            : `$${value.toLocaleString()}`
          : value}
      </p>
    </div>
  );

  const TimeFrameButton = ({ frame, active }) => (
    <button
      className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded ${
        active
          ? "bg-blue-500 text-white"
          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
      }`}
      onClick={() => setTimeFrame(frame)}
    >
      {frame}
    </button>
  );

  const RiskMetricsCard = () => (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <AlertTriangle size={20} className="mr-2 text-yellow-500" />
        Risk Metrics
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(riskMetrics).map(([key, value]) => (
          <div key={key} className="bg-gray-800 p-3 rounded">
            <div className="text-gray-400 text-sm">
              {key.replace(/([A-Z])/g, " $1").toUpperCase()}
            </div>
            <div className="text-lg font-bold">
              {typeof value === "number" ? value.toFixed(2) : value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Trading alerts data
  const alerts = [
    {
      type: "price",
      symbol: "AAPL",
      message: "Price target reached: $180",
      timestamp: new Date(),
    },
    {
      type: "volume",
      symbol: "TSLA",
      message: "Unusual volume detected",
      timestamp: new Date(),
    },
    {
      type: "technical",
      symbol: "NVDA",
      message: "RSI overbought condition",
      timestamp: new Date(),
    },
  ];

  // Performance Analytics
  const performanceAnalytics = {
    winRate: 68.5,
    avgWin: 523.45,
    avgLoss: -285.3,
    profitFactor: 2.1,
    expectancy: 185.2,
  };

  // Portfolio Optimization Suggestions
  const optimizationSuggestions = [
    {
      type: "rebalance",
      message: "Technology sector overweight by 5%",
      impact: "high",
    },
    {
      type: "risk",
      message: "Consider hedging TSLA position",
      impact: "medium",
    },
    {
      type: "diversification",
      message: "Add exposure to emerging markets",
      impact: "medium",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-4 sm:mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {dashboardData.userInfo.name}'s Portfolio
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Market is Open • Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>

        {/* Wallet */}
        <div className="mb-4 sm:mb-8">
          <h1 className="text-green-400 text-2xl sm:text-6xl font-bold mb-2">
            ${" "}
            {dashboardData.accountBalance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h1>
        </div>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 sm:mb-8">
          <StatCard
            title="Portfolio Value"
            value={performanceMetrics.totalValue}
            icon={DollarSign}
            color="green-500"
          />
          <StatCard
            title="24h Change"
            value={
              (performanceMetrics.dayChange / performanceMetrics.totalValue) *
              100
            }
            icon={performanceMetrics.dayChange >= 0 ? TrendingUp : TrendingDown}
            trend={performanceMetrics.dayChange}
            color="blue-500"
          />
          <StatCard
            title="30d Change"
            value={
              (performanceMetrics.monthChange / performanceMetrics.totalValue) *
              100
            }
            icon={Activity}
            trend={performanceMetrics.monthChange}
            color="purple-500"
          />
          <StatCard
            title="YTD Return"
            value={
              (performanceMetrics.yearChange / performanceMetrics.totalValue) *
              100
            }
            icon={Calendar}
            trend={performanceMetrics.yearChange}
            color="yellow-500"
          />
        </div>

        {/* Portfolio Performance Chart */}
        <div className="bg-gray-900 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <h2 className="text-lg sm:text-xl font-bold">
              Portfolio Performance
            </h2>
            <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto">
              <TimeFrameButton frame="1D" active={timeFrame === "1D"} />
              <TimeFrameButton frame="1W" active={timeFrame === "1W"} />
              <TimeFrameButton frame="1M" active={timeFrame === "1M"} />
              <TimeFrameButton frame="1Y" active={timeFrame === "1Y"} />
            </div>
          </div>
          <div className="h-60 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111827", border: "none" }}
                  labelStyle={{ color: "#9CA3AF" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Holdings and Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mb-6 sm:mb-8">
          {/* Current Holdings */}
          <div className="lg:col-span-2 bg-gray-900 p-4 sm:p-6 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold">Current Holdings</h2>
              <List size={20} className="text-gray-400" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-800">
                    <th className="text-left py-3">Symbol</th>
                    <th className="text-right">Quantity</th>
                    <th className="text-right">Avg Price</th>
                    <th className="text-right">Current</th>
                    <th className="text-right">P/L</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.stocks?.map((stock) => (
                    <tr key={stock._id} className="border-b border-gray-800">
                      <td className="py-3 font-medium">{stock.symbol}</td>
                      <td className="text-right">{stock.quantity}</td>
                      <td className="text-right">
                        ${stock.avgPrice?.toFixed(2) || "0.00"}
                      </td>
                      <td className="text-right">
                        ${stock.currentPrice?.toFixed(2) || "0.00"}
                      </td>
                      <td
                        className={`text-right ${
                          stock.profitLoss >= 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        ${stock.profitLoss?.toFixed(2) || "0.00"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sector Allocation */}
          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              Sector Allocation
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name} (${value}%)`}
                  >
                    {sectorAllocation.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "none",
                    }}
                    labelStyle={{ color: "#9CA3AF" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-gray-900 p-4 sm:p-6 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold">Recent Activities</h2>
            <Clock size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {dashboardData.recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-gray-800 rounded space-y-2 sm:space-y-0"
              >
                <div>
                  <span
                    className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                      activity.type === "BUY"
                        ? "bg-green-500/20 text-green-500"
                        : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {activity.type}
                  </span>
                  <span className="ml-3 font-medium">{activity.symbol}</span>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm text-gray-400">
                    {activity.quantity} shares @ ${activity.price}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Metrics and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
          <RiskMetricsCard />
          {/* Trading Alerts */}
          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
              <Bell size={20} className="mr-2 text-blue-500" />
              Trading Alerts
            </h2>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-3 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0"
                >
                  <div>
                    <span className="text-sm text-gray-400">
                      {alert.symbol}
                    </span>
                    <p className="font-medium">{alert.message}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {alert.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Analytics */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
              <Target size={20} className="mr-2 text-purple-500" />
              Trading Performance
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              {Object.entries(performanceAnalytics).map(([key, value]) => (
                <div key={key} className="bg-gray-800 p-3 rounded">
                  <div className="text-gray-400 text-xs sm:text-sm">
                    {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                  </div>
                  <div className="text-base sm:text-lg font-bold">
                    {typeof value === "number"
                      ? key.includes("Rate")
                        ? `${value}%`
                        : `${value.toFixed(2)}`
                      : value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Optimization */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gray-900 p-4 sm:p-6 rounded-lg">
            <h2 className="text-lg sm:text-xl font-bold mb-4 flex items-center">
              <Zap size={20} className="mr-2 text-yellow-500" />
              Portfolio Optimization
            </h2>
            <div className="space-y-3">
              {optimizationSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="bg-gray-800 p-3 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0"
                >
                  <div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        suggestion.impact === "high"
                          ? "bg-red-500/20 text-red-500"
                          : suggestion.impact === "medium"
                          ? "bg-yellow-500/20 text-yellow-500"
                          : "bg-green-500/20 text-green-500"
                      }`}
                    >
                      {suggestion.impact.toUpperCase()}
                    </span>
                    <p className="mt-1 font-medium">{suggestion.message}</p>
                  </div>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Act
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Floating Button */}
        <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 flex space-x-4">
          <button className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
            <Download size={24} />
          </button>
          <button className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
            <Settings size={24} />
          </button>
          <button
            className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
            onClick={() => setShowAlerts(!showAlerts)}
          >
            <Bell size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
