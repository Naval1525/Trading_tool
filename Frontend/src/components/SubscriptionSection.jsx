import React, { useState } from "react";
import {
  Mail,
  TrendingUp,
  BookOpen,
  Target,
  Loader2,
  ArrowRight,
  Check,
} from "lucide-react";
import { Toaster } from "../components/ui/toaster";
import { useToast } from "../components/ui/use-toast";

const SubscriptionSection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const features = [
    { id: 1, text: "Practice with virtual currency" },
    { id: 2, text: "Real-time market data" },
    { id: 3, text: "Advanced trading strategies" },
    { id: 4, text: "Performance analytics" },
  ];

  const benefits = [
    { id: 1, number: "₹0", label: "Risk-Free Trading" },
    { id: 2, number: "100%", label: "Market Data" },
    { id: 3, number: "24/7", label: "Trading Access" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://trading-tool-1.onrender.com/api/store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        toast({
          title: "Waitlist Joined!",
          description: "You've successfully joined the waitlist.",
          className: "bg-black text-white border border-white",
        });
        setEmail("");
      } else {
        toast({
          title: "Registration Failed",
          description: "Please try again.",
          variant: "destructive",
          className: "bg-red-900 text-white border border-red-700",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
        className: "bg-red-900 text-white border border-red-700",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="w-full bg-black py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-sm rounded-full px-3 py-1 inline-block text-white mb-6">
                Practice Platform
              </div>
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                Learn Trading <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Without Risk
                </span>
              </h1>
              <p className="text-gray-400 text-xl mb-8">
                Perfect your trading strategies using virtual currency on real
                market data.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {features.map((feature) => (
                  <div key={feature.id} className="flex items-center space-x-2">
                    <Check className="text-blue-500" size={20} />
                    <span className="text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="relative mb-8">
                <div className="flex items-center">
                  <div className="relative flex-grow">
                    <Mail
                      className="absolute left-4 top-4 text-gray-400"
                      size={20}
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email for early access"
                      className="w-full pl-12 pr-36 py-4 bg-gray-900 border border-gray-800 rounded-lg
                               text-white placeholder-gray-500 focus:outline-none focus:border-blue-500
                               focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600
                             text-white rounded-md hover:opacity-90 transition-opacity flex items-center
                             space-x-2 disabled:opacity-70"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        <span>Join Waitlist</span>
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="text-sm text-gray-500">
                🔒 Your email is safe with us. No spam, ever.
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="grid grid-cols-2 gap-8">
                {benefits.map((stat) => (
                  <div
                    key={stat.id}
                    className="text-center p-6 bg-black rounded-xl border border-gray-800"
                  >
                    <div className="text-3xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
                <div className="col-span-2">
                  <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6 text-center">
                    <div className="text-3xl font-bold text-white mb-2">
                      Practice Trading
                    </div>
                    <div className="text-blue-200">Learn Risk-Free</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-4">
              Practice with real market data from
            </p>
            <div className="flex justify-center space-x-8">
              {["NSE", "BSE"].map((exchange) => (
                <div
                  key={exchange}
                  className="text-gray-600 font-semibold text-xl"
                >
                  {exchange}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default SubscriptionSection;
