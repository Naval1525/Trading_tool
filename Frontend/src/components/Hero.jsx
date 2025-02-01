import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  GraduationCap,
  BookOpen,
  Shield,
  Info,
  Wifi,
  Award,
} from "lucide-react";
import Particles from "../components/ui/particles";
import { useNavigate } from "react-router-dom";

const TradingDisclaimer = ({ onAccept }) => {
  const [isRead, setIsRead] = useState(false);

  const Section = ({ icon: Icon, title, children, variant = 'default' }) => {
    const variants = {
      red: 'bg-red-900/20 border-red-800/50',
      blue: 'bg-blue-900/20 border-blue-800/50',
      yellow: 'bg-yellow-900/20 border-yellow-800/50',
      default: 'bg-gray-800/50'
    };

    return (
      <div className={`rounded-lg p-3 ${variant !== 'default' ? `border ${variants[variant]}` : variants.default}`}>
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 flex-shrink-0" />
          <h2 className="text-sm sm:text-base font-semibold text-white">{title}</h2>
        </div>
        {children}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 flex items-start sm:items-center justify-center bg-black/90 backdrop-blur-sm p-2 z-50 overflow-y-auto">
      <div className="w-full max-w-2xl bg-gray-900 rounded-xl border border-gray-800 p-3 sm:p-4 my-2 sm:my-4 space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
          <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 flex-shrink-0" />
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">Educational Platform Disclaimer</h1>
            <p className="text-xs text-gray-400">Please read carefully</p>
          </div>
        </div>

        <Section icon={BookOpen} title="Platform Overview" variant="blue">
          <p className="text-xs sm:text-sm text-gray-300">
            This is an educational trading platform using virtual currency for learning purposes only.
            No real money is involved, and all activities are simulated to provide risk-free learning.
          </p>
        </Section>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Section icon={GraduationCap} title="Features">
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Virtual trading simulations</li>
              <li>• Market concept education</li>
              <li>• Risk management learning</li>
              <li>• Practice environment</li>
            </ul>
          </Section>

          <Section icon={Info} title="Important Notices">
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• No real money involved</li>
              <li>• Not a real trading platform</li>
              <li>• No investment advice</li>
              <li>• Educational purposes only</li>
            </ul>
          </Section>
        </div>

        <Section icon={Wifi} title="Data Usage" variant="yellow">
          <p className="text-xs text-gray-300">
            Uses Yahoo Finance API data for educational purposes. Data may be delayed or inaccurate.
          </p>
        </Section>

        <Section icon={Shield} title="Risk Warning" variant="red">
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Virtual success ≠ real trading success</li>
            <li>• Cannot simulate real market emotions</li>
            <li>• Past performance not indicative</li>
            <li>• Real trading involves substantial risk</li>
            <li>• Not regulated by SEBI</li>
          </ul>
        </Section>

        <div className="border-t border-gray-800 pt-3 sm:pt-4 space-y-3">
          <label className="flex items-start gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={isRead}
              onChange={() => setIsRead(!isRead)}
              className="mt-1 w-4 h-4 rounded border-gray-600 bg-gray-800 text-blue-500 flex-shrink-0"
            />
            <span className="text-xs text-gray-300 group-hover:text-white">
              I understand this is an educational platform only, using virtual currency for learning purposes,
              with no real trading involved.
            </span>
          </label>

          <button
            onClick={onAccept}
            disabled={!isRead}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed
              text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            Accept and Continue
          </button>

          <p className="text-center text-xs text-gray-500">
            By continuing, you acknowledge this is strictly educational and not a real trading platform
          </p>
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
  const nav = useNavigate();

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
            <button className="flex items-center space-x-3 px-8 py-4 text-lg rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-all" onClick={()=>nav('/login')}>
              Start Now <ChevronRight className="ml-2 w-6 h-6" />
            </button>
            <button className="flex items-center space-x-3 px-8 py-4 text-lg rounded-xl font-bold border-2 border-white text-white hover:bg-white/10 transition-all duration-300" onClick={()=>nav('/market')}>
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
