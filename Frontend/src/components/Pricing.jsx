// import React from 'react';
// import { Check } from 'lucide-react';

// const PricingCard = ({ type, price, description, features, buttonText, isHighlighted = false }) => (
//   <div className={`relative rounded-2xl p-6 bg-gradient-to-br ${
//     isHighlighted
//       ? 'from-blue-950/50 via-indigo-950/50 to-gray-900'
//       : type === 'Team'
//         ? 'from-indigo-950/50 via-purple-950/50 to-gray-900'
//         : 'from-gray-900 via-gray-900 to-gray-950'
//   } border ${
//     isHighlighted ? 'border-blue-500/30' : 'border-gray-800'
//   } hover:border-blue-500/20 transition-all duration-300 backdrop-blur-sm`}>
//     <div className="space-y-6">
//       <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
//         isHighlighted
//           ? 'bg-blue-500/20 text-blue-400'
//           : type === 'Team'
//             ? 'bg-indigo-500/20 text-indigo-400'
//             : 'bg-gray-800 text-gray-300'
//       }`}>
//         {type}
//       </span>

//       <div className="space-y-1">
//         <div className="flex items-baseline">
//           {price === 'Free' ? (
//             <span className="text-4xl font-bold text-white">Free</span>
//           ) : (
//             <>
//               <span className="text-4xl font-bold text-white">${price}</span>
//               <span className="ml-2 text-sm text-gray-400">/per month</span>
//             </>
//           )}
//         </div>
//         <p className="text-sm text-gray-400">{description}</p>
//       </div>

//       <div className="space-y-4 py-6">
//         {features.map((feature, index) => (
//           <div key={index} className="flex items-center">
//             <Check size={18} className={`mr-3 ${
//               isHighlighted
//                 ? 'text-blue-400'
//                 : type === 'Team'
//                   ? 'text-indigo-400'
//                   : 'text-gray-400'
//             }`} />
//             <span className="text-gray-300 text-sm">{feature}</span>
//           </div>
//         ))}
//       </div>

//       <button className={`w-full py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 ${
//         isHighlighted
//           ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white'
//           : type === 'Team'
//             ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
//             : 'bg-gray-800 hover:bg-gray-700 text-white'
//       }`}>
//         {buttonText}
//       </button>
//     </div>
//   </div>
// );

// const Pricing = () => {
//   const plans = [
//     {
//       type: 'Personal',
//       price: 'Free',
//       description: 'To discover our product and its features',
//       features: [
//         'Unlimited Projects',
//         'Share with 5 team members',
//         'Sync across devices',
//         '20GB individual data each user'
//       ],
//       buttonText: 'Learn more'
//     },
//     {
//       type: 'Personal Pro',
//       price: '20',
//       description: 'The best option for individual notetakers',
//       features: [
//         'Unlimited Projects',
//         'Share with 25 team members',
//         'Sync across devices',
//         '50GB individual data each user'
//       ],
//       buttonText: 'Try for free',
//       isHighlighted: true
//     },
//     {
//       type: 'Team',
//       price: '50',
//       description: 'Best suited for larger notetakers',
//       features: [
//         'Unlimited Projects',
//         'Unlimited team members',
//         'Sync across devices',
//         'Unlimited individual data each user'
//       ],
//       buttonText: 'Try for free'
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white py-24">
//       <div className="max-w-[1400px] mx-auto px-4">
//         <div className="text-center mb-16 space-y-4">
//           <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-500/20 text-blue-400 rounded-full">
//             Pricing
//           </span>

//           <h2 className="text-4xl font-bold">
//             Choose the plan that{' '}
//             <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">fits</span>
//             <br />your needs.
//           </h2>

//           <p className="text-gray-400 max-w-2xl mx-auto">
//             Netus sagittis sapien sed montes condimentum. Eu eget ut cras
//             viverra. Volutpat posuere ac nulla scelerisque.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {plans.map((plan, index) => (
//             <PricingCard key={index} {...plan} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pricing;
import React from "react";
import { Check } from "lucide-react";

const PricingCard = ({
  type,
  price,
  description,
  features,
  buttonText,
  isHighlighted = false,
}) => (
  <div
    className={`relative rounded-2xl p-6 bg-gradient-to-br ${
      isHighlighted
        ? "from-blue-950/50 via-indigo-950/50 to-gray-900"
        : type === "Premium"
        ? "from-indigo-950/50 via-purple-950/50 to-gray-900"
        : "from-gray-900 via-gray-900 to-gray-950"
    } border ${
      isHighlighted ? "border-blue-500/30" : "border-gray-800"
    } hover:border-blue-500/20 transition-all duration-300 backdrop-blur-sm`}
  >
    <div className="space-y-6">
      <span
        className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
          isHighlighted
            ? "bg-blue-500/20 text-blue-400"
            : type === "Premium"
            ? "bg-indigo-500/20 text-indigo-400"
            : "bg-gray-800 text-gray-300"
        }`}
      >
        {type}
      </span>

      <div className="space-y-1">
        <div className="flex items-baseline">
          {price === "Free" ? (
            <span className="text-4xl font-bold text-white">Free</span>
          ) : (
            <>
              <span className="text-4xl font-bold text-white"> ₹{price}</span>
              <span className="ml-2 text-sm text-gray-400">/month</span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-400">{description}</p>
      </div>

      <div className="space-y-4 py-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <Check
              size={18}
              className={`mr-3 ${
                isHighlighted
                  ? "text-blue-400"
                  : type === "Premium"
                  ? "text-indigo-400"
                  : "text-gray-400"
              }`}
            />
            <span className="text-gray-300 text-sm">{feature}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full py-3 px-6 rounded-xl text-sm font-medium transition-all duration-300 ${
          isHighlighted
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            : type === "Premium"
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            : "bg-gray-800 hover:bg-gray-700 text-white"
        }`}
      >
        {buttonText}
      </button>
    </div>
  </div>
);

const Pricing = () => {
  const plans = [
    {
      type: "Basic",
      price: "Free",
      description: "Perfect for beginners to learn stock market basics",
      features: [
        "5,000 Hummy coins to start",
        "Basic stock charts",

        "3 stocks in watchlist",
      ],
      buttonText: "Start Learning",
    },
    {
      type: "Standard",
      price: "800",
      description: "For dedicated students of the stock market",
      features: [
        "10,000 Hummy coins monthly",
        "Detailed stock charts",

        "15 stocks in watchlist",

      ],
      buttonText: "Learn More",
      isHighlighted: true,
    },
    {
      type: "Premium",
      price: "2000",
      description: "Complete learning experience for serious students",
      features: [
        "25,000 Hummy coins monthly",
        "Full chart features",

        "Unlimited watchlist",
      ],
      buttonText: "Get Premium",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-24">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-500/20 text-blue-400 rounded-full">
            Virtual Venture
          </span>

          <h2 className="text-4xl font-bold">
            Learn stock trading{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
              safely
            </span>
            <br />
            with virtual money
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Master stock market trading fundamentals using virtual Hummy coins.
            Learn and practice without risking real money.
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
          (CURRENTLY FREE  🥳)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
