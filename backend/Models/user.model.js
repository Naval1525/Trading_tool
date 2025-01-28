// const { default: mongoose } = require("mongoose");

import mongoose from "mongoose";


// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
//     match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6
//   },
//   phoneNumber: {
//     type: String,
//     required: true,
//     trim: true,
//     match: [/^\+?[\d\s-]+$/, 'Please enter a valid phone number']
//   },
//   stocks: [{
//     symbol: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     buyPrice: {
//       type: Number,
//       required: true,
//       min: 0
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: 0
//     },
//     lastUpdated: {
//       type: Date,
//       default: Date.now
//     },
//     isSold:{
//       type: Boolean,
//       default: false
//     }
//   }],
//   accountBalance: {
//     type: Number,
//     default: 2000,
//     min: 0
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Create indexes for faster querying
// userSchema.index({ email: 1 });
// userSchema.index({ 'stocks.stockName': 1 });

// const User = mongoose.model('User', userSchema);

// module.exports = User;


// Activity Schema to track all user actions
const activitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['BUY', 'SELL', 'DEPOSIT', 'WITHDRAWAL', 'BALANCE_UPDATE']
  },
  stock: {
    symbol: {
      type: String,
      required: function() { return this.type === 'BUY' || this.type === 'SELL'; }
    },
    price: {
      type: Number,
      required: function() { return this.type === 'BUY' || this.type === 'SELL'; },
      min: 0
    },
    quantity: {
      type: Number,
      required: function() { return this.type === 'BUY' || this.type === 'SELL'; },
      min: 0
    }
  },
  balanceChange: {
    type: Number,
    required: true
  },
  balanceAfter: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^\+?[\d\s-]+$/, 'Please enter a valid phone number']
  },
  stocks: [{
    symbol: {
      type: String,
      required: true,
      trim: true
    },
    buyPrice: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    },
    isSold: {
      type: Boolean,
      default: false
    }
  }],
  accountBalance: {
    type: Number,
    default: 2000,
    min: 0
  },
  activities: [activitySchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for faster querying
userSchema.index({ email: 1 });
userSchema.index({ 'stocks.symbol': 1 });
userSchema.index({ 'activities.timestamp': -1 });
userSchema.index({ 'activities.type': 1 });

const User = mongoose.model('User', userSchema);

export default User;