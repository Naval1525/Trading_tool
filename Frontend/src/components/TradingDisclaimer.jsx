import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const TradingDisclaimer = ({ onAccept }) => {
  const [isRead, setIsRead] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm p-6">
      <div className="max-w-4xl bg-black bg-opacity-90 rounded-lg border border-gray-800 p-8 space-y-6">
        <div className="flex items-center gap-2 text-red-400">
          <AlertCircle className="h-6 w-6" />
          <h2 className="text-2xl font-bold text-white">Important Risk Disclosure</h2>
        </div>

        <div className="space-y-4 text-gray-100">
          <div className="text-xl font-semibold text-white">
            This platform is for EDUCATIONAL PURPOSES ONLY
          </div>

          <p className="text-white">The virtual trading platform provided here is designed solely for educational and practice purposes using virtual/dummy coins.</p>

          <div className="space-y-2">
            <p className="text-white font-semibold">Please understand that:</p>
            <ul className="list-disc pl-6 space-y-2 text-white">
              <li>Success in virtual trading does not guarantee success in real trading</li>
              <li>Virtual trading cannot fully simulate real market emotions and pressures</li>
              <li>Past performance is not indicative of future results</li>
              <li>Real cryptocurrency trading involves substantial risk of loss</li>
            </ul>
          </div>

          <p className="text-white">This platform is not a registered investment advisor, broker/dealer, exchange or trading platform. Subscription fees are for educational access only.</p>

          <div className="bg-gray-900 bg-opacity-50 p-4 rounded-lg">
            <p className="font-semibold text-white">Regulatory Notice:</p>
            <p className="text-white">This platform is not regulated by SEBI or any other Indian regulatory authority. Users must understand cryptocurrency regulations in India before real trading.</p>
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
            <span className="text-white">I have read and understand the disclaimer</span>
          </label>

          <Button
            onClick={onAccept}
            disabled={!isRead}
            className="w-full max-w-md bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TradingDisclaimer;