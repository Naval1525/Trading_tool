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
    const userId = req.user.userId;
    const { symbol, quantity, price } = req.body;

    if (!symbol || !quantity || !price || quantity <= 0 || price <= 0) {
      return res.status(400).json({ message: 'Invalid input parameters' });
    }

    const totalCost = quantity * price;

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
            balanceAfter: { $subtract: ['$accountBalance', totalCost] },
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

    const updateResult = await User.findOneAndUpdate(
      {
        _id: userId,
        'stocks.symbol': symbol,
        'stocks.isSold': false
      },
      {
        $inc: { 'stocks.$.quantity': quantity },
        $set: {
          'stocks.$.buyPrice': {
            $divide: [
              { $add: [
                { $multiply: ['$stocks.$.buyPrice', '$stocks.$.quantity'] },
                { $multiply: [price, quantity] }
              ]},
              { $add: ['$stocks.$.quantity', quantity] }
            ]
          },
          'stocks.$.lastUpdated': new Date()
        }
      },
      { session, new: true }
    );

    if (!updateResult) {
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

export const sellStock = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user.userId;
    const { symbol, quantity, price } = req.body;

    if (!symbol || !quantity || !price || quantity <= 0 || price <= 0) {
      return res.status(400).json({ message: 'Invalid input parameters' });
    }

    const totalEarnings = quantity * price;

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
          'stocks.$.isSold': { $cond: [{ $eq: ['$stocks.$.quantity', quantity] }, true, false] },
          'stocks.$.lastUpdated': new Date()
        },
        $push: {
          activities: {
            type: 'SELL',
            stock: { symbol, price, quantity },
            balanceChange: totalEarnings,
            balanceAfter: { $add: ['$accountBalance', totalEarnings] },
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
      throw new Error('Insufficient stock quantity or user not found');
    }

    await session.commitTransaction();

    res.status(200).json({
      message: 'Stock sold successfully',
      accountBalance: user.accountBalance,
      latestActivity: user.activities[user.activities.length - 1]
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

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId)
      .select('stocks accountBalance activities name email')
      .slice('activities', -10);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      stocks: user.stocks.filter(stock => !stock.isSold),
      accountBalance: user.accountBalance,
      recentActivities: user.activities.reverse(),
      userInfo: {
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard' });
  }
};