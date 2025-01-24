// // import React, { useState } from "react";
// // import {
// //   ChevronRight,
// //   TrendingUp,
// //   BookOpen,
// //   BarChart2,
// //   Newspaper,
// //   Globe,
// //   TrendingDown,
// //   Award,
// // } from "lucide-react";

// // const Hero = () => {
// //   const [activeTab, setActiveTab] = useState("courses");

// //   const dashboardSections = {
// //     courses: [
// //       { title: "Technical Analysis", progress: 65 },
// //       { title: "Risk Management", progress: 45 },
// //       { title: "Market Psychology", progress: 30 },
// //     ],
// //     trends: [
// //       { name: "Crypto Volatility", change: "+12.3%" },
// //       { name: "Tech Stocks", change: "-3.5%" },
// //       { name: "Forex Patterns", change: "+7.2%" },
// //     ],
// //     news: [
// //       { headline: "Fed Rate Decision Impact", source: "Financial Times" },
// //       { headline: "Emerging Market Opportunities", source: "Bloomberg" },
// //       { headline: "AI Trading Innovations", source: "Wall Street Journal" },
// //     ],
// //   };

// //   return (
// //     <div className="bg-black text-white min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
// //       <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
// //         {/* Left Content */}
// //         <div className="space-y-8">
// //           <h1 className="text-7xl font-bold mb-6" style={{ color: "#BC6FF1" }}>
// //             Virtal Ventures
// //           </h1>
// //           <p className="text-2xl mb-8 text-gray-300 max-w-2xl">
// //             Transform Your Trading Journey with Intelligent Learning, Real-Time
// //             Insights, and Advanced Strategies
// //           </p>

// //           <div className="flex space-x-6">
// //             <button
// //               className="flex items-center space-x-3 px-8 py-4 text-lg rounded-xl font-bold transition-all duration-300"
// //               style={{
// //                 backgroundColor: "#52057B",
// //                 color: "white",
// //                 boxShadow: "0 0 20px rgba(141, 41, 220, 0.4)",
// //               }}
// //             >
// //               Start Learning <ChevronRight className="ml-2 w-6 h-6" />
// //             </button>
// //             <button className="flex items-center space-x-3 px-8 py-4 text-lg rounded-xl font-bold border-2 border-[#892CDC] text-[#892CDC] hover:bg-[#892CDC]/20 transition-all duration-300">
// //               <TrendingUp className="mr-2 w-6 h-6" /> Market Dashboard
// //             </button>
// //           </div>

// //           <div className="flex space-x-8 mt-12 text-gray-300">
// //             <div className="flex items-center space-x-3">
// //               <BookOpen className="w-8 h-8" style={{ color: "#892CDC" }} />
// //               <span className="text-xl">100+ Courses</span>
// //             </div>
// //             <div className="flex items-center space-x-3">
// //               <BarChart2 className="w-8 h-8" style={{ color: "#BC6FF1" }} />
// //               <span className="text-xl">Advanced Analytics</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Right Content - Interactive Dashboard */}
// //         <div className="relative">
// //           <div
// //             className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
// //             style={{ backgroundColor: "#52057B" }}
// //           ></div>
// //           <div className="relative z-10 bg-[#892CDC]/10 p-8 rounded-3xl border border-[#892CDC]/30 backdrop-blur-xl">
// //             <div className="flex justify-between mb-6">
// //               {["Courses", "Trends", "News"].map((tab) => (
// //                 <button
// //                   key={tab.toLowerCase()}
// //                   onClick={() => setActiveTab(tab.toLowerCase())}
// //                   className={`px-4 py-2 rounded-lg transition-all ${
// //                     activeTab === tab.toLowerCase()
// //                       ? "bg-[#52057B] text-white"
// //                       : "text-[#BC6FF1] hover:bg-[#892CDC]/20"
// //                   }`}
// //                 >
// //                   {tab}
// //                 </button>
// //               ))}
// //             </div>

// //             {activeTab === "courses" && (
// //               <div>
// //                 <h3
// //                   className="text-2xl font-bold mb-4"
// //                   style={{ color: "#BC6FF1" }}
// //                 >
// //                   Learning Progress
// //                 </h3>
// //                 {dashboardSections.courses.map((course, index) => (
// //                   <div key={index} className="mb-4">
// //                     <div className="flex justify-between text-sm mb-1">
// //                       <span>{course.title}</span>
// //                       <span>{course.progress}%</span>
// //                     </div>
// //                     <div className="bg-[#52057B]/30 rounded-full h-2">
// //                       <div
// //                         className="bg-[#892CDC] rounded-full h-2"
// //                         style={{ width: `${course.progress}%` }}
// //                       ></div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {activeTab === "trends" && (
// //               <div>
// //                 <h3
// //                   className="text-2xl font-bold mb-4"
// //                   style={{ color: "#BC6FF1" }}
// //                 >
// //                   Market Trends
// //                 </h3>
// //                 {dashboardSections.trends.map((trend, index) => (
// //                   <div
// //                     key={index}
// //                     className="flex justify-between items-center bg-[#52057B]/20 p-3 rounded-xl mb-3"
// //                   >
// //                     <span>{trend.name}</span>
// //                     <span
// //                       className={`font-bold ${
// //                         trend.change.startsWith("+")
// //                           ? "text-green-400"
// //                           : "text-red-400"
// //                       }`}
// //                     >
// //                       {trend.change}
// //                     </span>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}

// //             {activeTab === "news" && (
// //               <div>
// //                 <h3
// //                   className="text-2xl font-bold mb-4"
// //                   style={{ color: "#BC6FF1" }}
// //                 >
// //                   Latest News
// //                 </h3>
// //                 {dashboardSections.news.map((item, index) => (
// //                   <div
// //                     key={index}
// //                     className="bg-[#52057B]/20 p-3 rounded-xl mb-3 hover:bg-[#892CDC]/20 transition-all"
// //                   >
// //                     <h4 className="text-white font-semibold">
// //                       {item.headline}
// //                     </h4>
// //                     <p className="text-sm text-gray-400">{item.source}</p>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Background Gradient */}
// //       <div
// //         className="absolute inset-0 z-0"
// //         style={{
// //           background:
// //             "black",
// //         }}
// //       ></div>
// //     </div>
// //   );
// // };

// // export default Hero;
// import React, { useState } from "react";
// import {
//   ChevronRight,
//   TrendingUp,
//   BookOpen,
//   BarChart2,
//   Newspaper,
//   Globe,
//   TrendingDown,
//   Award,
// } from "lucide-react";
// import TradingDisclaimer from "./TradingDisclaimer";

// const Hero = () => {
//   const [showDisclaimer, setShowDisclaimer] = useState(true);
//   const [activeTab, setActiveTab] = useState("courses");

//   const dashboardSections = {
//     courses: [
//       { title: "Technical Analysis", progress: 65 },
//       { title: "Risk Management", progress: 45 },
//       { title: "Market Psychology", progress: 30 },
//     ],
//     trends: [
//       { name: "Crypto Volatility", change: "+12.3%" },
//       { name: "Tech Stocks", change: "-3.5%" },
//       { name: "Forex Patterns", change: "+7.2%" },
//     ],
//     news: [
//       { headline: "Fed Rate Decision Impact", source: "Financial Times" },
//       { headline: "Emerging Market Opportunities", source: "Bloomberg" },
//       { headline: "AI Trading Innovations", source: "Wall Street Journal" },
//     ],
//   };

//   return (
//     <>
//       {showDisclaimer && <TradingDisclaimer onAccept={() => setShowDisclaimer(false)} />}
//       <div className="bg-black text-white min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
//         {/* Rest of your existing code remains unchanged */}
//         <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
//           {/* Left Content */}
//           <div className="space-y-8">
//             <h1 className="text-7xl font-bold mb-6" style={{ color: "#BC6FF1" }}>
//               Virtal Ventures
//             </h1>
//             <p className="text-2xl mb-8 text-gray-300 max-w-2xl">
//               Transform Your Trading Journey with Intelligent Learning, Real-Time
//               Insights, and Advanced Strategies
//             </p>

//             <div className="flex space-x-6">
//               <button
//                 className="flex items-center space-x-3 px-8 py-4 text-lg rounded-xl font-bold transition-all duration-300"
//                 style={{
//                   backgroundColor: "#52057B",
//                   color: "white",
//                   boxShadow: "0 0 20px rgba(141, 41, 220, 0.4)",
//                 }}
//               >
//                 Start Learning <ChevronRight className="ml-2 w-6 h-6" />
//               </button>
//               <button className="flex items-center space-x-3 px-8 py-4 text-lg rounded-xl font-bold border-2 border-[#892CDC] text-[#892CDC] hover:bg-[#892CDC]/20 transition-all duration-300">
//                 <TrendingUp className="mr-2 w-6 h-6" /> Market Dashboard
//               </button>
//             </div>

//             <div className="flex space-x-8 mt-12 text-gray-300">
//               <div className="flex items-center space-x-3">
//                 <BookOpen className="w-8 h-8" style={{ color: "#892CDC" }} />
//                 <span className="text-xl">100+ Courses</span>
//               </div>
//               <div className="flex items-center space-x-3">
//                 <BarChart2 className="w-8 h-8" style={{ color: "#BC6FF1" }} />
//                 <span className="text-xl">Advanced Analytics</span>
//               </div>
//             </div>
//           </div>

//           {/* Right Content - Interactive Dashboard */}
//           <div className="relative">
//             <div
//               className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
//               style={{ backgroundColor: "#52057B" }}
//             ></div>
//             <div className="relative z-10 bg-[#892CDC]/10 p-8 rounded-3xl border border-[#892CDC]/30 backdrop-blur-xl">
//               <div className="flex justify-between mb-6">
//                 {["Courses", "Trends", "News"].map((tab) => (
//                   <button
//                     key={tab.toLowerCase()}
//                     onClick={() => setActiveTab(tab.toLowerCase())}
//                     className={`px-4 py-2 rounded-lg transition-all ${
//                       activeTab === tab.toLowerCase()
//                         ? "bg-[#52057B] text-white"
//                         : "text-[#BC6FF1] hover:bg-[#892CDC]/20"
//                     }`}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </div>

//               {activeTab === "courses" && (
//                 <div>
//                   <h3
//                     className="text-2xl font-bold mb-4"
//                     style={{ color: "#BC6FF1" }}
//                   >
//                     Learning Progress
//                   </h3>
//                   {dashboardSections.courses.map((course, index) => (
//                     <div key={index} className="mb-4">
//                       <div className="flex justify-between text-sm mb-1">
//                         <span>{course.title}</span>
//                         <span>{course.progress}%</span>
//                       </div>
//                       <div className="bg-[#52057B]/30 rounded-full h-2">
//                         <div
//                           className="bg-[#892CDC] rounded-full h-2"
//                           style={{ width: `${course.progress}%` }}
//                         ></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {activeTab === "trends" && (
//                 <div>
//                   <h3
//                     className="text-2xl font-bold mb-4"
//                     style={{ color: "#BC6FF1" }}
//                   >
//                     Market Trends
//                   </h3>
//                   {dashboardSections.trends.map((trend, index) => (
//                     <div
//                       key={index}
//                       className="flex justify-between items-center bg-[#52057B]/20 p-3 rounded-xl mb-3"
//                     >
//                       <span>{trend.name}</span>
//                       <span
//                         className={`font-bold ${
//                           trend.change.startsWith("+")
//                             ? "text-green-400"
//                             : "text-red-400"
//                         }`}
//                       >
//                         {trend.change}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {activeTab === "news" && (
//                 <div>
//                   <h3
//                     className="text-2xl font-bold mb-4"
//                     style={{ color: "#BC6FF1" }}
//                   >
//                     Latest News
//                   </h3>
//                   {dashboardSections.news.map((item, index) => (
//                     <div
//                       key={index}
//                       className="bg-[#52057B]/20 p-3 rounded-xl mb-3 hover:bg-[#892CDC]/20 transition-all"
//                     >
//                       <h4 className="text-white font-semibold">
//                         {item.headline}
//                       </h4>
//                       <p className="text-sm text-gray-400">{item.source}</p>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Background Gradient */}
//         <div
//           className="absolute inset-0 z-0"
//           style={{
//             background: "black",
//           }}
//         ></div>
//       </div>
//     </>
//   );
// };

// export default Hero;
import React, { useState } from 'react';
import {
  ChevronRight,
  TrendingUp,
  BookOpen,
  BarChart2,
  AlertTriangle
} from 'lucide-react';

const TradingDisclaimer = ({ onAccept }) => {
  const [isRead, setIsRead] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-6 z-50">
      <div className="max-w-4xl bg-black bg-opacity-90 rounded-lg border border-gray-800 p-8 space-y-6">
        <div className="flex items-center gap-2 text-red-400">
          <AlertTriangle className="w-6 h-6" />
          <h2 className="text-2xl font-bold text-white">Important Risk Disclosure</h2>
        </div>

        <div className="space-y-4 text-gray-100">
          <div className="text-xl font-semibold text-white">
            This platform is for EDUCATIONAL PURPOSES ONLY
          </div>

          <p>The virtual trading platform provided here is designed solely for educational and practice purposes using virtual/dummy coins.</p>

          <div className="space-y-2">
            <p className="font-semibold">Please understand that:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Success in virtual trading does not guarantee success in real trading</li>
              <li>Virtual trading cannot fully simulate real market emotions and pressures</li>
              <li>Past performance is not indicative of future results</li>
              <li>Real cryptocurrency trading involves substantial risk of loss</li>
            </ul>
          </div>

          <div className="bg-gray-900 bg-opacity-50 p-4 rounded-lg">
            <p className="font-semibold">Regulatory Notice:</p>
            <p>This platform is not regulated by SEBI or any other Indian regulatory authority.</p>
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
            <span className='text-white'>I have read and understand the disclaimer</span>
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

const Hero = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [activeTab, setActiveTab] = useState("courses");

  const dashboardSections = {
    courses: [
      { title: "Technical Analysis", progress: 65 },
      { title: "Risk Management", progress: 45 },
      { title: "Market Psychology", progress: 30 },
    ],
    trends: [
      { name: "Crypto Volatility", change: "+12.3%" },
      { name: "Tech Stocks", change: "-3.5%" },
      { name: "Forex Patterns", change: "+7.2%" },
    ],
    news: [
      { headline: "Fed Rate Decision Impact", source: "Financial Times" },
      { headline: "Emerging Market Opportunities", source: "Bloomberg" },
      { headline: "AI Trading Innovations", source: "Wall Street Journal" },
    ],
  };

  return (
    <>
      {showDisclaimer && <TradingDisclaimer onAccept={() => setShowDisclaimer(false)} />}
      <div className="bg-black text-white min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <h1 className="text-7xl font-bold mb-6 text-[#BC6FF1]">
              Virtal Ventures
            </h1>
            <p className="text-2xl mb-8 text-gray-300 max-w-2xl">
              Transform Your Trading Journey with Intelligent Learning, Real-Time
              Insights, and Advanced Strategies
            </p>

            <div className="flex space-x-6">
              <button className="flex items-center space-x-3 px-8 py-4 text-lg rounded-xl font-bold bg-[#52057B] text-white shadow-lg shadow-[#52057B]/40">
                Start Learning <ChevronRight className="ml-2 w-6 h-6" />
              </button>
              <button className="flex items-center space-x-3 px-8 py-4 text-lg rounded-xl font-bold border-2 border-[#892CDC] text-[#892CDC] hover:bg-[#892CDC]/20 transition-all duration-300">
                <TrendingUp className="mr-2 w-6 h-6" /> Market Dashboard
              </button>
            </div>

            <div className="flex space-x-8 mt-12 text-gray-300">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-8 h-8 text-[#892CDC]" />
                <span className="text-xl">100+ Courses</span>
              </div>
              <div className="flex items-center space-x-3">
                <BarChart2 className="w-8 h-8 text-[#BC6FF1]" />
                <span className="text-xl">Advanced Analytics</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-1/4 -right-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl bg-[#52057B]"></div>
            <div className="relative z-10 bg-[#892CDC]/10 p-8 rounded-3xl border border-[#892CDC]/30 backdrop-blur-xl">
              <div className="flex justify-between mb-6">
                {["Courses", "Trends", "News"].map((tab) => (
                  <button
                    key={tab.toLowerCase()}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      activeTab === tab.toLowerCase()
                        ? "bg-[#52057B] text-white"
                        : "text-[#BC6FF1] hover:bg-[#892CDC]/20"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTab === "courses" && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-[#BC6FF1]">
                    Learning Progress
                  </h3>
                  {dashboardSections.courses.map((course, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{course.title}</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="bg-[#52057B]/30 rounded-full h-2">
                        <div
                          className="bg-[#892CDC] rounded-full h-2"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "trends" && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-[#BC6FF1]">
                    Market Trends
                  </h3>
                  {dashboardSections.trends.map((trend, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-[#52057B]/20 p-3 rounded-xl mb-3"
                    >
                      <span>{trend.name}</span>
                      <span
                        className={trend.change.startsWith("+")
                          ? "text-green-400"
                          : "text-red-400"}
                      >
                        {trend.change}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "news" && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-[#BC6FF1]">
                    Latest News
                  </h3>
                  {dashboardSections.news.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#52057B]/20 p-3 rounded-xl mb-3 hover:bg-[#892CDC]/20 transition-all"
                    >
                      <h4 className="font-semibold">{item.headline}</h4>
                      <p className="text-sm text-gray-400">{item.source}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;