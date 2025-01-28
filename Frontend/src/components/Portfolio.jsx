import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import {
  TrendingUp, TrendingDown, DollarSign, Activity,
  PieChart as PieChartIcon, Clock, List, Loader
} from 'lucide-react';

const Portfolio = () => {
  const { userId } = useParams(); // Get userId from URL
  const token = localStorage.getItem("token");
  console.log(token);

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data


  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!token) {
        navigate('/login'); // Redirect if no token
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/api/dashboard/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        });

        if (response.status === 401) {
          navigate('/login'); // Handle unauthorized access
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch dashboard data');
        }

        const data = await response.json();
        setDashboardData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (userId) {
      fetchDashboardData();
    }
  }, [userId, navigate]);

  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B'];

  const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400">{title}</h3>
        <Icon className={`text-${color}`} size={20} />
      </div>
      <p className={`text-2xl font-bold ${trend && (trend > 0 ? 'text-green-500' : 'text-red-500')}`}>
        {typeof value === 'number' ?
          (title.includes('Change') ? `${value > 0 ? '+' : ''}${value}%` :
           `$${value.toLocaleString()}`) :
          value}
      </p>
    </div>
  );

  // Calculate portfolio changes
  const calculateChanges = (activities) => {
    if (!activities || activities.length === 0) return { daily: 0, total: 0 };

    const now = new Date();
    const todayStart = new Date(now.setHours(0,0,0,0));

    const dailyActivities = activities.filter(activity =>
      new Date(activity.timestamp) >= todayStart
    );

    const dailyChange = dailyActivities.reduce((acc, curr) =>
      acc + curr.balanceChange, 0
    );

    const totalChange = activities.reduce((acc, curr) =>
      curr.type === 'BUY' ? acc - curr.balanceChange : acc + curr.balanceChange, 0
    );

    return {
      daily: dailyChange,
      total: totalChange
    };
  };

  // Process stocks for pie chart
  const processStocksAllocation = (stocks) => {
    if (!stocks) return [];

    const totalValue = stocks.reduce((acc, stock) =>
      acc + (stock.quantity * stock.buyPrice), 0
    );

    return stocks.map(stock => ({
      name: stock.symbol,
      value: ((stock.quantity * stock.buyPrice / totalValue) * 100).toFixed(1)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader className="animate-spin mr-2" />
        <span>Loading dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="bg-red-900/20 border border-red-500 text-red-500 p-4 rounded">
          Error loading dashboard: {error}
        </div>
      </div>
    );
  }

  if (!dashboardData) return null;

  const { stocks, accountBalance, recentActivities, userInfo } = dashboardData;
  const changes = calculateChanges(recentActivities);
  const stockAllocation = processStocksAllocation(stocks.filter(stock => !stock.isSold));

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Trading Dashboard</h1>
        <p className="text-gray-400">Welcome back, {userInfo.name}</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Portfolio Value"
          value={accountBalance}
          icon={DollarSign}
          color="green-500"
        />
        <StatCard
          title="Daily Change"
          value={changes.daily}
          icon={changes.daily >= 0 ? TrendingUp : TrendingDown}
          trend={changes.daily}
          color="blue-500"
        />
        <StatCard
          title="Total P/L"
          value={changes.total}
          icon={Activity}
          trend={changes.total}
          color="purple-500"
        />
        <StatCard
          title="Active Positions"
          value={stocks.filter(stock => !stock.isSold).length}
          icon={PieChartIcon}
          color="yellow-500"
        />
      </div>

      {/* Portfolio Composition */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Holdings Table */}
        <div className="lg:col-span-2 bg-gray-900 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Current Holdings</h2>
            <List size={20} className="text-gray-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-gray-400 border-b border-gray-800">
                  <th className="text-left py-3">Symbol</th>
                  <th className="text-right">Shares</th>
                  <th className="text-right">Avg Price</th>
                  <th className="text-right">Current Value</th>
                </tr>
              </thead>
              <tbody>
                {stocks
                  .filter(stock => !stock.isSold)
                  .map((stock) => (
                    <tr key={stock.symbol} className="border-b border-gray-800">
                      <td className="py-3 font-medium">{stock.symbol}</td>
                      <td className="text-right">{stock.quantity}</td>
                      <td className="text-right">${stock.buyPrice.toFixed(2)}</td>
                      <td className="text-right">${(stock.quantity * stock.buyPrice).toLocaleString()}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Portfolio Allocation */}
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Portfolio Allocation</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stockAllocation}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name} (${value}%)`}
                >
                  {stockAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#111827', border: 'none' }}
                  labelStyle={{ color: '#9CA3AF' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-gray-900 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Activities</h2>
          <Clock size={20} className="text-gray-400" />
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded">
              <div>
                <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                  activity.type === 'BUY' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                }`}>
                  {activity.type}
                </span>
                {activity.stock && (
                  <span className="ml-3 font-medium">{activity.stock.symbol}</span>
                )}
              </div>
              <div className="text-right">
                {activity.stock && (
                  <p className="text-sm text-gray-400">
                    {activity.stock.quantity} shares @ ${activity.stock.price}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;