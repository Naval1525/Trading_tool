import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react';

const BASE_URL = 'http://localhost:8000/api';

const StockDetail = () => {
    const { symbol } = useParams();
    const navigate = useNavigate();

    const [stockData, setStockData] = useState(null);
    const [userStocks, setUserStocks] = useState([]);
    const [userBalance, setUserBalance] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [tradeType, setTradeType] = useState('buy');
    const [orderStatus, setOrderStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const checkAuth = useCallback(() => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        navigate('/login');
        return false;
      }
      return { token, userId };
    }, [navigate]);

    const fetchDashboard = useCallback(async (token, userId) => {
      try {
        const response = await fetch(`${BASE_URL}/dashboard/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            navigate('/login');
            return null;
          }
          throw new Error('Failed to fetch dashboard data');
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Dashboard fetch error:', error);
        return null;
      }
    }, [navigate]);

    const fetchData = useCallback(async () => {
      const auth = checkAuth();
      if (!auth) return;

      try {
        const stockResponse = await fetch(`${BASE_URL}/stocks?symbols=${symbol}`);
        const stockResult = await stockResponse.json();
        setStockData(stockResult?.[0] ?? null);

        const dashboardData = await fetchDashboard(auth.token, auth.userId);
        if (dashboardData) {
          setUserBalance(dashboardData.accountBalance ?? 0);
          setUserStocks(dashboardData.stocks ?? []);
        }

        setLoading(false);
      } catch (err) {
        setError(err?.message ?? 'An error occurred');
        setLoading(false);
      }
    }, [symbol, checkAuth, fetchDashboard]);

    useEffect(() => {
      fetchData();
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }, [fetchData]);

    const handleTrade = async () => {
      const auth = checkAuth();
      if (!auth) return;

      try {
        setOrderStatus(null);
        const { token, userId } = auth;

        if (tradeType === 'sell') {
          const userStock = userStocks.find(stock =>
            stock.symbol === symbol && !stock.isSold
          );
          if (!userStock || userStock.quantity < quantity) {
            throw new Error('Insufficient stock quantity');
          }
        } else if (tradeType === 'buy') {
          const totalCost = (stockData?.price ?? 0) * quantity;
          if (totalCost > userBalance) {
            throw new Error('Insufficient balance');
          }
        }

        const response = await fetch(`${BASE_URL}/${tradeType}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            userId,
            symbol,
            quantity,
            price: stockData?.price ?? 0
          })
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message ?? 'Trade failed');
        }

        setOrderStatus({
          type: 'success',
          message: `Successfully ${tradeType === 'buy' ? 'bought' : 'sold'} ${quantity} shares of ${symbol}`
        });

        fetchData();

      } catch (err) {
        setOrderStatus({
          type: 'error',
          message: err?.message ?? 'Trade failed'
        });
      }
    };

    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
          <div className="text-center text-gray-400">Loading...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
          <div className="bg-red-900/20 border border-red-800 text-red-400 p-4 rounded-lg">
            Error loading stock data: {error}
          </div>
        </div>
      );
    }

    const totalCost = (stockData?.price ?? 0) * quantity;
    const isPositiveChange = (stockData?.change ?? 0) >= 0;
    const availableQuantity = userStocks.find(
      stock => stock.symbol === symbol && !stock.isSold
    )?.quantity ?? 0;

    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">{symbol}</h1>
              <p className="text-gray-400">{stockData?.name ?? 'Loading...'}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-mono font-bold">
                ${stockData?.price?.toFixed(2) ?? '0.00'}
              </div>
              <div className={`flex items-center justify-end ${
                isPositiveChange ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {isPositiveChange ? (
                  <TrendingUp className="w-5 h-5 mr-2" />
                ) : (
                  <TrendingDown className="w-5 h-5 mr-2" />
                )}
                <span className="font-mono">
                  {Math.abs(stockData?.change ?? 0).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
              <div className="text-sm text-gray-400">Open</div>
              <div className="font-mono font-bold">
                ${stockData?.open?.toFixed(2) ?? '0.00'}
              </div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
              <div className="text-sm text-gray-400">Previous Close</div>
              <div className="font-mono font-bold">
                ${stockData?.previousClose?.toFixed(2) ?? '0.00'}
              </div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
              <div className="text-sm text-gray-400">Day High</div>
              <div className="font-mono font-bold">
                ${stockData?.dayHigh?.toFixed(2) ?? '0.00'}
              </div>
            </div>
            <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
              <div className="text-sm text-gray-400">Day Low</div>
              <div className="font-mono font-bold">
                ${stockData?.dayLow?.toFixed(2) ?? '0.00'}
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Place Order</h2>

            {orderStatus && (
              <div className={`p-4 mb-4 rounded-lg ${
                orderStatus.type === 'success'
                  ? 'bg-emerald-900/20 border border-emerald-800 text-emerald-400'
                  : 'bg-red-900/20 border border-red-800 text-red-400'
              }`}>
                {orderStatus.message}
              </div>
            )}

            <div className="space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setTradeType('buy')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    tradeType === 'buy'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setTradeType('sell')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    tradeType === 'sell'
                      ? 'bg-rose-600 text-white'
                      : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  Sell
                </button>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Total {tradeType === 'buy' ? 'Cost' : 'Proceeds'}
                </label>
                <div className="text-2xl font-mono font-bold">
                  ${totalCost.toFixed(2)}
                </div>
              </div>

              <div className="text-sm text-gray-400">
                Available Balance: ${userBalance.toFixed(2)}
              </div>

              <button
                onClick={handleTrade}
                disabled={loading || (tradeType === 'buy' && totalCost > userBalance)}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  tradeType === 'buy'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-rose-600 hover:bg-rose-700'
                } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {tradeType === 'buy' ? 'Buy' : 'Sell'} {symbol}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
              <h2 className="text-xl font-bold mb-4">Market Info</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Volume</span>
                  <span className="font-mono">
                    {(stockData?.volume ?? 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Market Cap</span>
                  <span className="font-mono">
                    ${((stockData?.marketCap ?? 0) / 1e9).toFixed(2)}B
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Exchange</span>
                  <span className="font-mono">{stockData?.exchange ?? 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default StockDetail;