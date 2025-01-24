// import React, { useState, useEffect } from "react";
// import { ChevronRight, TrendingUp, AlertTriangle } from "lucide-react";
// import Particles from "../components/ui/particles";

// const BitcoinTradingGraph = () => {
//   const [candles, setCandles] = useState([]);

//   useEffect(() => {
//     const generateCandles = () => {
//       let lastPrice = 50000;
//       const newCandles = Array.from({ length: 10 }, (_, index) => {
//         const open = lastPrice;
//         const volatility = Math.random() * 2000;
//         const close = open + (Math.random() > 0.5 ? volatility : -volatility);
//         const high = Math.max(open, close) + Math.random() * 1000;
//         const low = Math.min(open, close) - Math.random() * 1000;
//         const color = close > open ? "green" : "red";
//         lastPrice = close;

//         return { open, close, high, low, color };
//       });
//       setCandles(newCandles);
//     };

//     generateCandles();
//     const interval = setInterval(generateCandles, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const maxPrice = Math.max(...candles.map((c) => c.high));
//   const minPrice = Math.min(...candles.map((c) => c.low));

//   return (
//     <div className="w-full h-64 overflow-hidden relative bg-black shadow-2xl">
//       <svg viewBox="0 0 500 250" className="w-full h-full">
//         <defs>
//           <linearGradient id="candleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
//             <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
//           </linearGradient>
//         </defs>
//         <rect
//           x="0"
//           y="0"
//           width="500"
//           height="250"
//           fill="url(#candleGradient)"
//         />
//         {candles.map((candle, index) => {
//           const x = index * 50 + 25;
//           const width = 20;
//           const scaleY = 250 / (maxPrice - minPrice);
//           const bodyHeight = Math.abs(candle.close - candle.open) * scaleY;
//           const bodyY = 250 - (candle.close - minPrice) * scaleY;
//           const wickHeight = (candle.high - candle.low) * scaleY;
//           const wickY = 250 - (candle.high - minPrice) * scaleY;

//           return (
//             <g key={index} className="transition-all duration-500 ease-in-out">
//               <line
//                 x1={x}
//                 y1={wickY}
//                 x2={x}
//                 y2={wickY + wickHeight}
//                 stroke={candle.color === "green" ? "green" : "red"}
//                 strokeWidth="2"
//               />
//               <rect
//                 x={x - width / 2}
//                 y={bodyY}
//                 width={width}
//                 height={bodyHeight}
//                 fill={candle.color === "green" ? "green" : "red"}
//                 className="transition-all duration-500 ease-in-out"
//               />
//             </g>
//           );
//         })}
//       </svg>
//       <div className="absolute top-2 right-2 bg-gray-800/50 text-white px-2 py-1 rounded">
//         Bitcoin Price: $
//         {candles[candles.length - 1]?.close.toLocaleString() || "Loading"}
//       </div>
//     </div>
//   );
// };

// const Hero = () => {
//   const [showDisclaimer, setShowDisclaimer] = useState(true);

//   return (
//     <div className="relative min-h-screen w-full bg-black overflow-hidden">
//       <Particles
//         className="absolute inset-0"
//         quantity={50}
//         color="#ffffff"
//         refresh={false}
//       />
//       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10 px-6 min-h-screen">
//         <div className="space-y-8">
//           <h1 className="text-6xl md:text-7xl font-bold text-white">
//             Virtual Ventures
//           </h1>
//           <p className="text-2xl mb-8 text-gray-300 max-w-2xl">
//             Master Stocks, Crypto and Real-estate Trading at one Space.
//           </p>

//           <div className="flex space-x-6">
//             <button className="flex items-center space-x-3 px-8 py-4 text-lg rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-all">
//               Start Trading <ChevronRight className="ml-2 w-6 h-6" />
//             </button>
//             <button className="flex items-center space-x-3 px-8 py-4 text-lg rounded-xl font-bold border-2 border-white text-white hover:bg-white/10 transition-all duration-300">
//               <TrendingUp className="mr-2 w-6 h-6" /> Dashboard
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-col items-center justify-center space-y-6">
//           <div className="w-full max-w-md bg-black p-6 rounded-xl border border-gray-800 shadow-2xl hover:scale-105 transition-transform">
//             <h3 className="text-2xl font-bold text-white mb-4">Trading Card</h3>
//             <div className="text-gray-200 space-y-2">
//               <p>
//                 Bitcoin Current Price:{" "}
//                 <span className="text-white">$52,500</span>
//               </p>
//               <p>
//                 24h Change: <span className="text-white">+3.2%</span>
//               </p>
//               <p>
//                 Market Cap: <span className="text-white">$1.02T</span>
//               </p>
//               <div className="mt-4 w-full h-2 bg-gray-700 rounded-full">
//                 <div className="w-2/3 h-full bg-white rounded-full animate-pulse"></div>
//               </div>
//             </div>
//           </div>

//           <BitcoinTradingGraph />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;/

import React, { useState, useEffect } from "react";
import { AlertTriangle, ChevronRight, TrendingUp, BookOpen, Award  } from "lucide-react";
import Particles from "../components/ui/particles";
const TradingDisclaimer = ({ onAccept }) => {
  const [isRead, setIsRead] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-6 z-50">
      <div className="max-w-4xl bg-black bg-opacity-90 rounded-lg border border-gray-800 p-8 space-y-6">
        <div className="flex items-center gap-2 text-red-400">
          <AlertTriangle className="w-6 h-6" />
          <h2 className="text-2xl font-bold text-white">
            Important Risk Disclosure
          </h2>
        </div>

        <div className="space-y-4 text-gray-100">
          <div className="text-xl font-semibold text-white">
            This platform is for EDUCATIONAL PURPOSES ONLY
          </div>

          <p>
            The virtual trading platform provided here is designed solely for
            educational and practice purposes using virtual/dummy coins.
          </p>

          <div className="space-y-2">
            <p className="font-semibold">Please understand that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Success in virtual trading does not guarantee success in real
                trading
              </li>
              <li>
                Virtual trading cannot fully simulate real market emotions and
                pressures
              </li>
              <li>Past performance is not indicative of future results</li>
              <li>
                Real cryptocurrency trading involves substantial risk of loss
              </li>
            </ul>
          </div>

          <div className="bg-gray-900 bg-opacity-50 p-4 rounded-lg">
            <p className="font-semibold">Regulatory Notice:</p>
            <p>
              This platform is not regulated by SEBI or any other Indian
              regulatory authority.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 pt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isRead}
              onChange={() => setIsRead(!isRead)}
              className="w-4 h-4"
            />
            <span className="text-white">
              I have read and understand the disclaimer
            </span>
          </label>

          <button
            onClick={onAccept}
            disabled={!isRead}
            className="w-full max-w-md bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white rounded-md px-4 py-2"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const BitcoinTradingGraph = () => {
  const [candles, setCandles] = useState([]);

  useEffect(() => {
    const generateCandles = () => {
      let lastPrice = 50000;
      const newCandles = Array.from({ length: 25 }, (_, index) => {
        const open = lastPrice;
        const volatility = Math.random() * 2000;
        const close = open + (Math.random() > 0.5 ? volatility : -volatility);
        const high = Math.max(open, close) + Math.random() * 1000;
        const low = Math.min(open, close) - Math.random() * 1000;
        const color = close > open ? "green" : "red";
        lastPrice = close;

        return { open, close, high, low, color };
      });
      setCandles(newCandles);
    };

    generateCandles();
    const interval = setInterval(generateCandles, 5000);
    return () => clearInterval(interval);
  }, []);

  const maxPrice = Math.max(...candles.map((c) => c.high));
  const minPrice = Math.min(...candles.map((c) => c.low));

  return (
    <div className="w-full h-[300px] relative overflow-hidden">
      <svg viewBox="0 0 2000 300" className="w-full h-full">
        <defs>
          <linearGradient>
            <stop offset="0%" stopColor="rgba(30,40,60,0.3)" />
            <stop offset="100%" stopColor="rgba(30,40,60,0.6)" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="2000"
          height="300"
          fill="url(#graphGradient)"
        />
        {candles.map((candle, index) => {
          const x = index * 80 + 40;
          const width = 30;
          const scaleY = 250 / (maxPrice - minPrice);
          const bodyHeight = Math.abs(candle.close - candle.open) * scaleY;
          const bodyY = 300 - (candle.close - minPrice) * scaleY;
          const wickHeight = (candle.high - candle.low) * scaleY;
          const wickY = 300 - (candle.high - minPrice) * scaleY;

          return (
            <g key={index} className="transition-all duration-500 ease-in-out">
              <line
                x1={x}
                y1={wickY}
                x2={x}
                y2={wickY + wickHeight}
                stroke={candle.color === "green" ? "#10B981" : "#EF4444"}
                strokeWidth="3"
              />
              <rect
                x={x - width / 2}
                y={bodyY}
                width={width}
                height={bodyHeight}
                fill={candle.color === "green" ? "#10B981" : "#EF4444"}
                className="transition-all duration-500 ease-in-out"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};


const Hero = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  return (
    <>
      {showDisclaimer && (
        <TradingDisclaimer onAccept={() => setShowDisclaimer(false)} />
      )}
      <div className="relative min-h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center py-40 px-6">
        <Particles
          className="absolute inset-0"
          quantity={50}
          color="#ffffff"
          refresh={false}
        />

        <div className="w-full max-w-4xl text-center space-y-8 relative z-10">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold text-white">
              Learn Trading Risk-Free
            </h1>
            <p className="text-2xl text-gray-300">
              Master the art of trading with virtual portfolios across Stocks and Real Estate
            </p>
            <div className="flex justify-center gap-4 text-gray-300 mt-6">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                <span>Educational Platform</span>
              </div>
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                <span>Risk-Free Practice</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-6">
            <button className="flex items-center space-x-3 px-8 py-4 text-lg rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-all">
              Start Learning <ChevronRight className="ml-2 w-6 h-6" />
            </button>
            <button className="flex items-center space-x-3 px-8 py-4 text-lg rounded-xl font-bold border-2 border-white text-white hover:bg-white/10 transition-all duration-300">
              <TrendingUp className="mr-2 w-6 h-6" /> Practice Dashboard
            </button>
          </div>
        </div>

        <div className="mt-16 w-full max-w-6xl relative">
          {/* Aura effect layers */}
          <div className="absolute -inset-1 bg-white/20 rounded-3xl blur-2xl" />
          <div className="absolute -inset-2 bg-white/10 rounded-3xl blur-3xl" />
          <div className="absolute -inset-3 bg-white/5 rounded-3xl blur-3xl" />

          <div className="relative bg-gray-900 rounded-2xl p-8 shadow-2xl border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Paytm Practice Chart</h2>
                <p className="text-gray-400">Learn price action with real-time data</p>
              </div>
              <div className="flex gap-4">
                <button className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700">1H</button>
                <button className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700">1D</button>
                <button className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700">1W</button>
              </div>
            </div>
            <div className="h-96">
              <BitcoinTradingGraph />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
