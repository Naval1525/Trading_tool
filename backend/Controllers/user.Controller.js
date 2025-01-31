// // import User from "../Models/user.model";


// // export const buyStock = async (req, res) => {
// //   try {
// //     const { userId, symbol, quantity, price } = req.body;

// //     const user = await User.findById(userId);
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     const totalCost = quantity * price;

// //     // Check if user has enough balance
// //     if (user.accountBalance < totalCost) {
// //       return res.status(400).json({ message: 'Insufficient balance' });
// //     }

// //     // Update user's stocks array
// //     const existingStockIndex = user.stocks.findIndex(
// //       stock => stock.symbol === symbol && !stock.isSold
// //     );

// //     if (existingStockIndex !== -1) {
// //       // Update existing stock
// //       const existingStock = user.stocks[existingStockIndex];
// //       const newQuantity = existingStock.quantity + quantity;
// //       const newAvgPrice = ((existingStock.buyPrice * existingStock.quantity) + (price * quantity)) / newQuantity;

// //       user.stocks[existingStockIndex].quantity = newQuantity;
// //       user.stocks[existingStockIndex].buyPrice = newAvgPrice;
// //       user.stocks[existingStockIndex].lastUpdated = new Date();
// //     } else {
// //       // Add new stock
// //       user.stocks.push({
// //         symbol,
// //         buyPrice: price,
// //         quantity,
// //         lastUpdated: new Date()
// //       });
// //     }

// //     // Update balance and add activity
// //     user.accountBalance -= totalCost;
// //     user.activities.push({
// //       type: 'BUY',
// //       stock: {
// //         symbol,
// //         price,
// //         quantity
// //       },
// //       balanceChange: -totalCost,
// //       balanceAfter: user.accountBalance,
// //       description: `Bought ${quantity} shares of ${symbol} at $${price} per share`
// //     });

// //     await user.save();

// //     return res.status(200).json({
// //       message: 'Stock purchased successfully',
// //       user: {
// //         stocks: user.stocks,
// //         accountBalance: user.accountBalance,
// //         latestActivity: user.activities[user.activities.length - 1]
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Buy stock error:', error);
// //     return res.status(500).json({ message: 'Internal server error' });
// //   }
// // };

// // export const sellStock = async (req, res) => {
// //   try {
// //     const { userId, symbol, quantity, price } = req.body;

// //     const user = await User.findById(userId);
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     // Find the stock to sell
// //     const stockIndex = user.stocks.findIndex(
// //       stock => stock.symbol === symbol && !stock.isSold && stock.quantity >= quantity
// //     );

// //     if (stockIndex === -1) {
// //       return res.status(400).json({ message: 'Insufficient stock quantity' });
// //     }

// //     const totalEarnings = quantity * price;

// //     // Update stock quantity or mark as sold
// //     if (user.stocks[stockIndex].quantity === quantity) {
// //       user.stocks[stockIndex].isSold = true;
// //     } else {
// //       user.stocks[stockIndex].quantity -= quantity;
// //     }
// //     user.stocks[stockIndex].lastUpdated = new Date();

// //     // Update balance and add activity
// //     user.accountBalance += totalEarnings;
// //     user.activities.push({
// //       type: 'SELL',
// //       stock: {
// //         symbol,
// //         price,
// //         quantity
// //       },
// //       balanceChange: totalEarnings,
// //       balanceAfter: user.accountBalance,
// //       description: `Sold ${quantity} shares of ${symbol} at $${price} per share`
// //     });

// //     await user.save();

// //     return res.status(200).json({
// //       message: 'Stock sold successfully',
// //       user: {
// //         stocks: user.stocks,
// //         accountBalance: user.accountBalance,
// //         latestActivity: user.activities[user.activities.length - 1]
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Sell stock error:', error);
// //     return res.status(500).json({ message: 'Internal server error' });
// //   }
// // };

// // export const getDashboard = async (req, res) => {
// //   try {
// //     const { userId } = req.params;

// //     const user = await User.findById(userId);
// //     if (!user) {
// //       return res.status(404).json({ message: 'User not found' });
// //     }

// //     const activeStocks = user.stocks.filter(stock => !stock.isSold);
// //     const recentActivities = user.activities.slice(-10).reverse();

// //     return res.status(200).json({
// //       stocks: activeStocks,
// //       accountBalance: user.accountBalance,
// //       recentActivities,
// //       userInfo: {
// //         name: user.name,
// //         email: user.email
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Get dashboard error:', error);
// //     return res.status(500).json({ message: 'Internal server error' });
// //   }
// // };
// export const buyStock = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { userId, symbol, quantity, price } = req.body;

//     if (!symbol || !quantity || !price || quantity <= 0 || price <= 0) {
//       return res.status(400).json({ message: 'Invalid input parameters' });
//     }

//     const totalCost = quantity * price;

//     const user = await User.findOneAndUpdate(
//       {
//         _id: userId,
//         accountBalance: { $gte: totalCost }
//       },
//       {
//         $inc: { accountBalance: -totalCost },
//         $push: {
//           activities: {
//             type: 'BUY',
//             stock: { symbol, price, quantity },
//             balanceChange: -totalCost,
//             balanceAfter: { $subtract: ['$accountBalance', totalCost] },
//             description: `Bought ${quantity} shares of ${symbol} at $${price} per share`
//           }
//         }
//       },
//       {
//         session,
//         new: true,
//         runValidators: true
//       }
//     );

//     if (!user) {
//       throw new Error('Insufficient balance or user not found');
//     }

//     // Update stock holdings in a single operation
//     const updateResult = await User.findOneAndUpdate(
//       {
//         _id: userId,
//         'stocks.symbol': symbol,
//         'stocks.isSold': false
//       },
//       {
//         $inc: { 'stocks.$.quantity': quantity },
//         $set: {
//           'stocks.$.buyPrice': {
//             $divide: [
//               { $add: [
//                 { $multiply: ['$stocks.$.buyPrice', '$stocks.$.quantity'] },
//                 { $multiply: [price, quantity] }
//               ]},
//               { $add: ['$stocks.$.quantity', quantity] }
//             ]
//           },
//           'stocks.$.lastUpdated': new Date()
//         }
//       },
//       { session, new: true }
//     );

//     if (!updateResult) {
//       await User.findByIdAndUpdate(
//         userId,
//         {
//           $push: {
//             stocks: {
//               symbol,
//               buyPrice: price,
//               quantity,
//               lastUpdated: new Date()
//             }
//           }
//         },
//         { session }
//       );
//     }

//     await session.commitTransaction();

//     return res.status(200).json({
//       message: 'Stock purchased successfully',
//       accountBalance: user.accountBalance,
//       latestActivity: user.activities[user.activities.length - 1]
//     });
//   } catch (error) {
//     await session.abortTransaction();
//     console.error('Buy stock error:', error);
//     return res.status(error.message.includes('Insufficient') ? 400 : 500)
//       .json({ message: error.message || 'Internal server error' });
//   } finally {
//     session.endSession();
//   }
// };

// export const sellStock = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { userId, symbol, quantity, price } = req.body;

//     if (!symbol || !quantity || !price || quantity <= 0 || price <= 0) {
//       return res.status(400).json({ message: 'Invalid input parameters' });
//     }

//     const totalEarnings = quantity * price;

//     const user = await User.findOneAndUpdate(
//       {
//         _id: userId,
//         'stocks': {
//           $elemMatch: {
//             symbol,
//             isSold: false,
//             quantity: { $gte: quantity }
//           }
//         }
//       },
//       {
//         $inc: {
//           accountBalance: totalEarnings,
//           'stocks.$.quantity': -quantity
//         },
//         $set: {
//           'stocks.$.isSold': { $cond: [{ $eq: ['$stocks.$.quantity', quantity] }, true, false] },
//           'stocks.$.lastUpdated': new Date()
//         },
//         $push: {
//           activities: {
//             type: 'SELL',
//             stock: { symbol, price, quantity },
//             balanceChange: totalEarnings,
//             balanceAfter: { $add: ['$accountBalance', totalEarnings] },
//             description: `Sold ${quantity} shares of ${symbol} at $${price} per share`
//           }
//         }
//       },
//       {
//         session,
//         new: true,
//         runValidators: true
//       }
//     );

//     if (!user) {
//       throw new Error('Insufficient stock quantity or user not found');
//     }

//     await session.commitTransaction();

//     return res.status(200).json({
//       message: 'Stock sold successfully',
//       accountBalance: user.accountBalance,
//       latestActivity: user.activities[user.activities.length - 1]
//     });
//   } catch (error) {
//     await session.abortTransaction();
//     console.error('Sell stock error:', error);
//     return res.status(error.message.includes('Insufficient') ? 400 : 500)
//       .json({ message: error.message || 'Internal server error' });
//   } finally {
//     session.endSession();
//   }
// };

// export const getDashboard = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     const user = await User.findById(userId)
//       .select('stocks accountBalance activities name email')
//       .slice('activities', -10);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     return res.status(200).json({
//       stocks: user.stocks.filter(stock => !stock.isSold),
//       accountBalance: user.accountBalance,
//       recentActivities: user.activities.reverse(),
//       userInfo: {
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     console.error('Get dashboard error:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };
import mongoose from 'mongoose';
import User from '../models/user.model.js';
export const buyStock = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user?.userId || req.body.userId;
    const { symbol, quantity, price } = req.body;

    if (!symbol || !quantity || !price || quantity <= 0 || price <= 0) {
      return res.status(400).json({ message: 'Invalid input parameters' });
    }

    const totalCost = quantity * price;

    // First, get the current user to calculate the new balance
    const currentUser = await User.findById(userId).session(session);
    if (!currentUser || currentUser.accountBalance < totalCost) {
      throw new Error('Insufficient balance or user not found');
    }

    const newBalance = currentUser.accountBalance - totalCost;

    // Update user's balance and add activity
    const user = await User.findOneAndUpdate(
      {
        _id: userId,
        accountBalance: { $gte: totalCost }
      },
      {
        $inc: { accountBalance: -totalCost },
        $push: {
          activities: {
            type: 'BUY',
            stock: { symbol, price, quantity },
            balanceChange: -totalCost,
            balanceAfter: newBalance,
            description: `Bought ${quantity} shares of ${symbol} at $${price}`
          }
        }
      },
      {
        session,
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      throw new Error('Insufficient balance or user not found');
    }

    // Find existing stock position
    const existingStock = currentUser.stocks.find(
      stock => stock.symbol === symbol && !stock.isSold
    );

    if (existingStock) {
      // Calculate new average buy price
      const totalCurrentValue = existingStock.buyPrice * existingStock.quantity;
      const totalNewValue = price * quantity;
      const totalQuantity = existingStock.quantity + quantity;
      const newAveragePrice = (totalCurrentValue + totalNewValue) / totalQuantity;

      // Update existing stock position
      await User.findOneAndUpdate(
        {
          _id: userId,
          'stocks.symbol': symbol,
          'stocks.isSold': false
        },
        {
          $inc: { 'stocks.$.quantity': quantity },
          $set: {
            'stocks.$.buyPrice': newAveragePrice,
            'stocks.$.lastUpdated': new Date()
          }
        },
        { session }
      );
    } else {
      // Add new stock position
      await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            stocks: {
              symbol,
              buyPrice: price,
              quantity,
              lastUpdated: new Date()
            }
          }
        },
        { session }
      );
    }

    await session.commitTransaction();

    res.status(200).json({
      message: 'Stock purchased successfully',
      accountBalance: user.accountBalance,
      latestActivity: user.activities[user.activities.length - 1]
    });
  } catch (error) {
    await session.abortTransaction();
    console.error('Buy stock error:', error);
    res.status(error.message.includes('Insufficient') ? 400 : 500)
      .json({ message: error.message || 'Purchase failed' });
  } finally {
    session.endSession();
  }
};

// export const buyStock = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const userId = req.user?.userId || req.body.userId;
//     const { symbol, quantity, price } = req.body;

//     if (!symbol || !quantity || !price || quantity <= 0 || price <= 0) {
//       return res.status(400).json({ message: 'Invalid input parameters' });
//     }

//     const totalCost = quantity * price;

//     const user = await User.findOneAndUpdate(
//       {
//         _id: userId,
//         accountBalance: { $gte: totalCost }
//       },
//       {
//         $inc: { accountBalance: -totalCost },
//         $push: {
//           activities: {
//             type: 'BUY',
//             stock: { symbol, price, quantity },
//             balanceChange: -totalCost,
//             balanceAfter: { $subtract: ['$accountBalance', totalCost] },
//             description: `Bought ${quantity} shares of ${symbol} at $${price}`
//           }
//         }
//       },
//       {
//         session,
//         new: true,
//         runValidators: true
//       }
//     );

//     if (!user) {
//       throw new Error('Insufficient balance or user not found');
//     }

//     const updateResult = await User.findOneAndUpdate(
//       {
//         _id: userId,
//         'stocks.symbol': symbol,
//         'stocks.isSold': false
//       },
//       {
//         $inc: { 'stocks.$.quantity': quantity },
//         $set: {
//           'stocks.$.buyPrice': {
//             $divide: [
//               { $add: [
//                 { $multiply: ['$stocks.$.buyPrice', '$stocks.$.quantity'] },
//                 { $multiply: [price, quantity] }
//               ]},
//               { $add: ['$stocks.$.quantity', quantity] }
//             ]
//           },
//           'stocks.$.lastUpdated': new Date()
//         }
//       },
//       { session, new: true }
//     );

//     if (!updateResult) {
//       await User.findByIdAndUpdate(
//         userId,
//         {
//           $push: {
//             stocks: {
//               symbol,
//               buyPrice: price,
//               quantity,
//               lastUpdated: new Date()
//             }
//           }
//         },
//         { session }
//       );
//     }

//     await session.commitTransaction();

//     res.status(200).json({
//       message: 'Stock purchased successfully',
//       accountBalance: user.accountBalance,
//       latestActivity: user.activities[user.activities.length - 1]
//     });
//   } catch (error) {
//     await session.abortTransaction();
//     console.error('Buy stock error:', error);
//     res.status(error.message.includes('Insufficient') ? 400 : 500)
//       .json({ message: error.message || 'Purchase failed' });
//   } finally {
//     session.endSession();
//   }
// };
export const sellStock = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user?.userId || req.body.userId;
    const { symbol, quantity, price } = req.body;

    if (!symbol || !quantity || !price || quantity <= 0 || price <= 0) {
      return res.status(400).json({ message: 'Invalid input parameters' });
    }

    const totalEarnings = quantity * price;

    // First, get the current user to check stock availability and calculate new balance
    const currentUser = await User.findById(userId).session(session);
    if (!currentUser) {
      throw new Error('User not found');
    }

    // Find the stock position
    const stockPosition = currentUser.stocks.find(
      stock => stock.symbol === symbol && !stock.isSold
    );

    if (!stockPosition || stockPosition.quantity < quantity) {
      throw new Error('Insufficient stock quantity');
    }

    const newBalance = currentUser.accountBalance + totalEarnings;
    const remainingQuantity = stockPosition.quantity - quantity;
    const shouldMarkAsSold = remainingQuantity === 0;

    // Update user's stock position, balance, and add activity
    const user = await User.findOneAndUpdate(
      {
        _id: userId,
        'stocks': {
          $elemMatch: {
            symbol,
            isSold: false,
            quantity: { $gte: quantity }
          }
        }
      },
      {
        $inc: {
          accountBalance: totalEarnings,
          'stocks.$.quantity': -quantity
        },
        $set: {
          'stocks.$.isSold': shouldMarkAsSold,
          'stocks.$.lastUpdated': new Date()
        },
        $push: {
          activities: {
            type: 'SELL',
            stock: { symbol, price, quantity },
            balanceChange: totalEarnings,
            balanceAfter: newBalance,
            description: `Sold ${quantity} shares of ${symbol} at $${price}`
          }
        }
      },
      {
        session,
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      throw new Error('Failed to update user data');
    }

    await session.commitTransaction();

    // Prepare response with profit/loss calculation
    const profitLoss = (price - stockPosition.buyPrice) * quantity;
    const profitLossPercentage = ((price - stockPosition.buyPrice) / stockPosition.buyPrice) * 100;

    res.status(200).json({
      message: 'Stock sold successfully',
      accountBalance: user.accountBalance,
      latestActivity: user.activities[user.activities.length - 1],
      tradeSummary: {
        profitLoss: Number(profitLoss.toFixed(2)),
        profitLossPercentage: Number(profitLossPercentage.toFixed(2)),
        remainingShares: remainingQuantity
      }
    });
  } catch (error) {
    await session.abortTransaction();
    console.error('Sell stock error:', error);
    res.status(error.message.includes('Insufficient') ? 400 : 500)
      .json({ message: error.message || 'Sale failed' });
  } finally {
    session.endSession();
  }
};
// export const sellStock = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const userId = req.user.userId;
//     const { symbol, quantity, price } = req.body;

//     if (!symbol || !quantity || !price || quantity <= 0 || price <= 0) {
//       return res.status(400).json({ message: 'Invalid input parameters' });
//     }

//     const totalEarnings = quantity * price;

//     const user = await User.findOneAndUpdate(
//       {
//         _id: userId,
//         'stocks': {
//           $elemMatch: {
//             symbol,
//             isSold: false,
//             quantity: { $gte: quantity }
//           }
//         }
//       },
//       {
//         $inc: {
//           accountBalance: totalEarnings,
//           'stocks.$.quantity': -quantity
//         },
//         $set: {
//           'stocks.$.isSold': { $cond: [{ $eq: ['$stocks.$.quantity', quantity] }, true, false] },
//           'stocks.$.lastUpdated': new Date()
//         },
//         $push: {
//           activities: {
//             type: 'SELL',
//             stock: { symbol, price, quantity },
//             balanceChange: totalEarnings,
//             balanceAfter: { $add: ['$accountBalance', totalEarnings] },
//             description: `Sold ${quantity} shares of ${symbol} at $${price}`
//           }
//         }
//       },
//       {
//         session,
//         new: true,
//         runValidators: true
//       }
//     );

//     if (!user) {
//       throw new Error('Insufficient stock quantity or user not found');
//     }

//     await session.commitTransaction();

//     res.status(200).json({
//       message: 'Stock sold successfully',
//       accountBalance: user.accountBalance,
//       latestActivity: user.activities[user.activities.length - 1]
//     });
//   } catch (error) {
//     await session.abortTransaction();
//     console.error('Sell stock error:', error);
//     res.status(error.message.includes('Insufficient') ? 400 : 500)
//       .json({ message: error.message || 'Sale failed' });
//   } finally {
//     session.endSession();
//   }
// };

// export const getDashboard = async (req, res) => {
//   try {
//     const { userId } = req.params;


//     const user = await User.findById(userId)
//       .select('stocks accountBalance activities name email')
//       .slice('activities', -10);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({
//       stocks: user.stocks.filter(stock => !stock.isSold),
//       accountBalance: user.accountBalance,
//       recentActivities: user.activities.reverse(),
//       userInfo: {
//         name: user.name,
//         email: user.email
//       }
//     });
//   } catch (error) {
//     console.error('Dashboard error:', error);
//     res.status(500).json({ message: 'Failed to fetch dashboard' });
//   }
// };
import axios from 'axios';

export const getDashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user data with populated stocks and recent activities
    const user = await User.findById(userId)
      .select('stocks accountBalance activities name email phoneNumber createdAt')
      .slice('activities', -20);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get current stock prices
    const activeStocks = user.stocks.filter(stock => !stock.isSold);
    const symbols = activeStocks.map(stock => stock.symbol);

    // Fetch current prices (replace with your actual stock API)
    const stockPrices = await Promise.all(
      symbols.map(async (symbol) => {
        try {
          const response = await axios.get(`YOUR_STOCK_API_ENDPOINT/${symbol}`);
          return { symbol, currentPrice: response.data.price };
        } catch (error) {
          console.error(`Failed to fetch price for ${symbol}:`, error);
          return { symbol, currentPrice: null };
        }
      })
    );

    // Calculate portfolio metrics
    const portfolioMetrics = calculatePortfolioMetrics(activeStocks, stockPrices);

    // Calculate historical performance
    const historicalPerformance = calculateHistoricalPerformance(user.activities);

    // Generate trading insights
    const tradingInsights = generateTradingInsights(user.activities, portfolioMetrics);

    // Calculate risk metrics
    const riskMetrics = calculateRiskMetrics(activeStocks, stockPrices);

    // Get sector diversification
    const sectorDiversification = await calculateSectorDiversification(activeStocks);

    res.status(200).json({
      userInfo: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        memberSince: user.createdAt,
      },
      accountSummary: {
        accountBalance: user.accountBalance,
        totalPortfolioValue: portfolioMetrics.totalValue,
        totalUnrealizedGain: portfolioMetrics.totalUnrealizedGain,
        totalUnrealizedGainPercentage: portfolioMetrics.totalUnrealizedGainPercentage,
        dailyChange: portfolioMetrics.dailyChange,
        dailyChangePercentage: portfolioMetrics.dailyChangePercentage,
      },
      portfolioDetails: {
        stocks: portfolioMetrics.stocksWithMetrics,
        bestPerformer: portfolioMetrics.bestPerformer,
        worstPerformer: portfolioMetrics.worstPerformer,
      },
      riskAnalysis: {
        portfolioBeta: riskMetrics.portfolioBeta,
        volatility: riskMetrics.volatility,
        sharpeRatio: riskMetrics.sharpeRatio,
        diversificationScore: riskMetrics.diversificationScore,
      },
      sectorDiversification,
      historicalPerformance: {
        daily: historicalPerformance.daily,
        weekly: historicalPerformance.weekly,
        monthly: historicalPerformance.monthly,
        yearly: historicalPerformance.yearly,
      },
      tradingInsights,
      recentActivities: user.activities.reverse(),
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard' });
  }
};

const calculatePortfolioMetrics = (stocks, currentPrices) => {
  let totalValue = 0;
  let totalCost = 0;
  let dailyChange = 0;

  const stocksWithMetrics = stocks.map(stock => {
    const currentPrice = currentPrices.find(p => p.symbol === stock.symbol)?.currentPrice || stock.buyPrice;
    const value = currentPrice * stock.quantity;
    const cost = stock.buyPrice * stock.quantity;
    const unrealizedGain = value - cost;
    const unrealizedGainPercentage = (unrealizedGain / cost) * 100;

    totalValue += value;
    totalCost += cost;

    return {
      ...stock.toObject(),
      currentPrice,
      value,
      unrealizedGain,
      unrealizedGainPercentage,
    };
  });

  // Sort stocks by unrealized gain percentage to find best and worst performers
  const sortedStocks = [...stocksWithMetrics].sort((a, b) =>
    b.unrealizedGainPercentage - a.unrealizedGainPercentage
  );

  return {
    totalValue,
    totalUnrealizedGain: totalValue - totalCost,
    totalUnrealizedGainPercentage: ((totalValue - totalCost) / totalCost) * 100,
    dailyChange,
    dailyChangePercentage: (dailyChange / totalValue) * 100,
    stocksWithMetrics,
    bestPerformer: sortedStocks[0],
    worstPerformer: sortedStocks[sortedStocks.length - 1],
  };
};

const calculateHistoricalPerformance = (activities) => {
  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const oneWeek = 7 * oneDay;
  const oneMonth = 30 * oneDay;
  const oneYear = 365 * oneDay;

  // Filter activities by timeframe and calculate performance
  const getPerformanceForPeriod = (activities, startTime) => {
    const periodActivities = activities.filter(a =>
      new Date(a.timestamp) >= startTime
    );

    return {
      totalTrades: periodActivities.length,
      profitableTrades: periodActivities.filter(a =>
        (a.type === 'SELL' && a.balanceChange > 0)
      ).length,
      totalVolume: periodActivities.reduce((sum, a) =>
        sum + Math.abs(a.balanceChange), 0
      ),
    };
  };

  return {
    daily: getPerformanceForPeriod(activities, new Date(now - oneDay)),
    weekly: getPerformanceForPeriod(activities, new Date(now - oneWeek)),
    monthly: getPerformanceForPeriod(activities, new Date(now - oneMonth)),
    yearly: getPerformanceForPeriod(activities, new Date(now - oneYear)),
  };
};

const generateTradingInsights = (activities, portfolioMetrics) => {
  const insights = [];

  // Analyze trading patterns
  const trades = activities.filter(a => ['BUY', 'SELL'].includes(a.type));
  const profitableTrades = trades.filter(t => t.type === 'SELL' && t.balanceChange > 0);
  const winRate = (profitableTrades.length / trades.length) * 100;

  // Generate insights based on analysis
  if (winRate < 50) {
    insights.push('Consider reviewing your trading strategy as win rate is below 50%');
  }

  if (portfolioMetrics.stocksWithMetrics.length < 5) {
    insights.push('Portfolio diversification opportunity: Consider adding more stocks');
  }

  const highConcentration = portfolioMetrics.stocksWithMetrics.find(s =>
    (s.value / portfolioMetrics.totalValue) > 0.3
  );
  if (highConcentration) {
    insights.push(`High concentration risk in ${highConcentration.symbol}`);
  }

  return insights;
};

const calculateRiskMetrics = (stocks, currentPrices) => {
  // Calculate basic risk metrics
  const returns = stocks.map(stock => {
    const currentPrice = currentPrices.find(p => p.symbol === stock.symbol)?.currentPrice;
    if (!currentPrice) return 0;
    return ((currentPrice - stock.buyPrice) / stock.buyPrice) * 100;
  });

  const volatility = calculateStandardDeviation(returns);
  const diversificationScore = calculateDiversificationScore(stocks);

  return {
    volatility,
    diversificationScore,
    portfolioBeta: 1.0, // This should be calculated using market data
    sharpeRatio: calculateSharpeRatio(returns, 2.0), // Assuming 2% risk-free rate
  };
};

const calculateStandardDeviation = (values) => {
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
  const variance = squaredDiffs.reduce((sum, value) => sum + value, 0) / values.length;
  return Math.sqrt(variance);
};

const calculateDiversificationScore = (stocks) => {
  const totalValue = stocks.reduce((sum, stock) => sum + (stock.buyPrice * stock.quantity), 0);
  const weights = stocks.map(stock => (stock.buyPrice * stock.quantity) / totalValue);
  return 1 - Math.sqrt(weights.reduce((sum, weight) => sum + Math.pow(weight, 2), 0));
};

const calculateSharpeRatio = (returns, riskFreeRate) => {
  const excessReturns = returns.map(r => r - riskFreeRate);
  const meanExcessReturn = excessReturns.reduce((sum, r) => sum + r, 0) / returns.length;
  const stdDev = calculateStandardDeviation(returns);
  return stdDev === 0 ? 0 : meanExcessReturn / stdDev;
};

const calculateSectorDiversification = async (stocks) => {
  // This would typically involve calling an external API to get sector information
  // For now, return a mock implementation
  const sectors = {
    'AAPL': 'Technology',
    'MSFT': 'Technology',
    'JPM': 'Financial',
    // Add more mappings as needed
  };

  const sectorAllocations = stocks.reduce((acc, stock) => {
    const sector = sectors[stock.symbol] || 'Unknown';
    acc[sector] = (acc[sector] || 0) + (stock.buyPrice * stock.quantity);
    return acc;
  }, {});

  const totalValue = Object.values(sectorAllocations).reduce((sum, value) => sum + value, 0);

  return Object.entries(sectorAllocations).map(([sector, value]) => ({
    sector,
    value,
    percentage: (value / totalValue) * 100,
  }));
};