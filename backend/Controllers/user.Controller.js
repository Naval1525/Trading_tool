import User from "../Models/user.model.js";


export const buyStock = async (req, res) => {
  try {
    const { userId, symbol, quantity, price } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const totalCost = quantity * price;

    // Check if user has enough balance
    if (user.accountBalance < totalCost) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Update user's stocks array
    const existingStockIndex = user.stocks.findIndex(
      stock => stock.symbol === symbol && !stock.isSold
    );

    if (existingStockIndex !== -1) {
      // Update existing stock
      const existingStock = user.stocks[existingStockIndex];
      const newQuantity = existingStock.quantity + quantity;
      const newAvgPrice = ((existingStock.buyPrice * existingStock.quantity) + (price * quantity)) / newQuantity;

      user.stocks[existingStockIndex].quantity = newQuantity;
      user.stocks[existingStockIndex].buyPrice = newAvgPrice;
      user.stocks[existingStockIndex].lastUpdated = new Date();
    } else {
      // Add new stock
      user.stocks.push({
        symbol,
        buyPrice: price,
        quantity,
        lastUpdated: new Date()
      });
    }

    // Update balance and add activity
    user.accountBalance -= totalCost;
    user.activities.push({
      type: 'BUY',
      stock: {
        symbol,
        price,
        quantity
      },
      balanceChange: -totalCost,
      balanceAfter: user.accountBalance,
      description: `Bought ${quantity} shares of ${symbol} at $${price} per share`
    });

    await user.save();

    return res.status(200).json({
      message: 'Stock purchased successfully',
      user: {
        stocks: user.stocks,
        accountBalance: user.accountBalance,
        latestActivity: user.activities[user.activities.length - 1]
      }
    });
  } catch (error) {
    console.error('Buy stock error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const sellStock = async (req, res) => {
  try {
    const { userId, symbol, quantity, price } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the stock to sell
    const stockIndex = user.stocks.findIndex(
      stock => stock.symbol === symbol && !stock.isSold && stock.quantity >= quantity
    );

    if (stockIndex === -1) {
      return res.status(400).json({ message: 'Insufficient stock quantity' });
    }

    const totalEarnings = quantity * price;

    // Update stock quantity or mark as sold
    if (user.stocks[stockIndex].quantity === quantity) {
      user.stocks[stockIndex].isSold = true;
    } else {
      user.stocks[stockIndex].quantity -= quantity;
    }
    user.stocks[stockIndex].lastUpdated = new Date();

    // Update balance and add activity
    user.accountBalance += totalEarnings;
    user.activities.push({
      type: 'SELL',
      stock: {
        symbol,
        price,
        quantity
      },
      balanceChange: totalEarnings,
      balanceAfter: user.accountBalance,
      description: `Sold ${quantity} shares of ${symbol} at $${price} per share`
    });

    await user.save();

    return res.status(200).json({
      message: 'Stock sold successfully',
      user: {
        stocks: user.stocks,
        accountBalance: user.accountBalance,
        latestActivity: user.activities[user.activities.length - 1]
      }
    });
  } catch (error) {
    console.error('Sell stock error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const activeStocks = user.stocks.filter(stock => !stock.isSold);
    const recentActivities = user.activities.slice(-10).reverse();

    return res.status(200).json({
      stocks: activeStocks,
      accountBalance: user.accountBalance,
      recentActivities,
      userInfo: {
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};