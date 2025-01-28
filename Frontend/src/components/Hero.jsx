import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  BookOpen,
  Award,
} from "lucide-react";
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
              "Master the art of trading with virtual stock portfolios, honing
              your skills risk-free!"
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
                <h2 className="text-2xl font-bold text-white">
                  Paytm Practice Chart
                </h2>
                <p className="text-gray-400">
                  Learn price action with real-time data
                </p>
              </div>
              <div className="flex gap-4">
                <button className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700">
                  1H
                </button>
                <button className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700">
                  1D
                </button>
                <button className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700">
                  1W
                </button>
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
