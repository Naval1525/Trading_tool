import React, { useState } from 'react';
import { BookOpen, LineChart, Shield, Target, ChartBar, TrendingUp, GraduationCap, Users, ArrowRight } from 'lucide-react';

const FEATURES_DATA = {
  main: [
    {
      icon: LineChart,
      title: "Market Analysis",
      description: "Learn to read charts and analyze market trends with real-time data visualization tools.",
      details: ["Technical analysis indicators", "Price action patterns", "Volume analysis tools", "Market trend identification"]
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Master the art of risk management using virtual funds in a safe learning environment.",
      details: ["Position sizing strategies", "Stop-loss management", "Risk-reward calculations", "Portfolio diversification"]
    },
    {
      icon: Target,
      title: "Trading Strategies",
      description: "Develop and test different trading strategies without risking real money.",
      details: ["Momentum trading basics", "Swing trading techniques", "Breakout strategies", "Technical pattern trading"]
    }
  ],
  additional: [
    { icon: ChartBar, title: "Real-Time Charts", content: "Practice with live market data and professional-grade charting tools" },
    { icon: Users, title: "Community Learning", content: "Join a community of learners and share trading insights" },
    { icon: BookOpen, title: "Educational Resources", content: "Access comprehensive learning materials and trading guides" }
  ]
};

const GradientBlur = ({ color, top, left }) => (
  <div
    className={`absolute w-96 h-96 ${color} opacity-30 blur-3xl -z-10`}
    style={{ top, left }}
  />
);

const FeatureCard = ({ icon: Icon, title, content, isSmall = false }) => (
  <div className={`group relative ${isSmall ? 'p-6' : 'p-8'} bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-purple-500/30 transition-all duration-500`}>
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl" />
    <div className="relative">
      <div className={`${isSmall ? 'w-12 h-12' : 'w-14 h-14'} rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
        <Icon className={`${isSmall ? 'w-6 h-6' : 'w-7 h-7'} text-purple-400`} />
      </div>
      <h3 className={`${isSmall ? 'text-xl' : 'text-2xl'} font-bold text-white mb-3`}>{title}</h3>
      <p className="text-gray-300 text-base leading-relaxed">{content}</p>
    </div>
  </div>
);

const FeatureSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white py-32 relative overflow-hidden">
      <GradientBlur color="bg-purple-500" top={0} left={-200} />
      <GradientBlur color="bg-blue-500" top={300} left={800} />
      <GradientBlur color="bg-purple-500" top={600} left={200} />

      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-purple-400 text-base mb-6">
            <GraduationCap className="w-5 h-5 mr-2" />
            Advanced Learning Features
          </div>
          <h2 className="text-5xl font-bold mb-8">
            Master Trading with Our
            <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 text-transparent bg-clip-text mt-2">
              Comprehensive Tools
            </span>
          </h2>
          <p className="text-gray-300 text-xl leading-relaxed">
            Experience a complete trading education platform designed to help you learn and practice without financial risk
          </p>
        </div>

        {/* Main Features */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
          <div className="space-y-8">
            {FEATURES_DATA.main.map((feature, index) => (
              <div
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`group cursor-pointer p-8 rounded-2xl transition-all duration-500 ${
                  activeFeature === index
                    ? 'bg-gradient-to-br from-purple-950/50 to-blue-950/50 border border-purple-500/30'
                    : 'bg-gray-900/50 border border-gray-800 hover:border-purple-500/20'
                }`}
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-300 text-base leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative sticky top-8">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl" />
            <div className="relative bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-2xl p-10">
              <div className="space-y-8">
                {FEATURES_DATA.main[activeFeature].details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center">
                      <ArrowRight className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-gray-200 text-lg">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES_DATA.additional.map((feature, index) => (
            <FeatureCard key={index} {...feature} isSmall />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;