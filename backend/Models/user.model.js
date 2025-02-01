// // // const { default: mongoose } = require("mongoose");

// // import mongoose from "mongoose";

// // const activitySchema = new mongoose.Schema({
// //   type: {
// //     type: String,
// //     required: true,
// //     enum: ['BUY', 'SELL', 'DEPOSIT', 'WITHDRAWAL', 'BALANCE_UPDATE']
// //   },
// //   stock: {
// //     symbol: {
// //       type: String,
// //       required: function() { return this.type === 'BUY' || this.type === 'SELL'; }
// //     },
// //     price: {
// //       type: Number,
// //       required: function() { return this.type === 'BUY' || this.type === 'SELL'; },
// //       min: 0
// //     },
// //     quantity: {
// //       type: Number,
// //       required: function() { return this.type === 'BUY' || this.type === 'SELL'; },
// //       min: 0
// //     }
// //   },
// //   balanceChange: {
// //     type: Number,
// //     required: true
// //   },
// //   balanceAfter: {
// //     type: Number,
// //     required: true
// //   },
// //   description: {
// //     type: String,
// //     required: true
// //   },
// //   timestamp: {
// //     type: Date,
// //     default: Date.now
// //   }
// // });

// // const userSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true,
// //     trim: true
// //   },
// //   email: {
// //     type: String,
// //     required: true,
// //     unique: true,
// //     trim: true,
// //     lowercase: true,
// //     match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
// //   },
// //   password: {
// //     type: String,
// //     required: true,
// //     minlength: 6
// //   },
// //   phoneNumber: {
// //     type: String,
// //     required: true,
// //     trim: true,
// //     match: [/^\+?[\d\s-]+$/, 'Please enter a valid phone number']
// //   },
// //   stocks: [{
// //     symbol: {
// //       type: String,
// //       required: true,
// //       trim: true
// //     },
// //     buyPrice: {
// //       type: Number,
// //       required: true,
// //       min: 0
// //     },
// //     quantity: {
// //       type: Number,
// //       required: true,
// //       min: 0
// //     },
// //     lastUpdated: {
// //       type: Date,
// //       default: Date.now
// //     },
// //     isSold: {
// //       type: Boolean,
// //       default: false
// //     }
// //   }],
// //   accountBalance: {
// //     type: Number,
// //     default: 2000,
// //     min: 0
// //   },
// //   activities: [activitySchema],
// //   createdAt: {
// //     type: Date,
// //     default: Date.now
// //   }
// // });

// // // Create indexes for faster querying
// // userSchema.index({ email: 1 });
// // userSchema.index({ 'stocks.symbol': 1 });
// // userSchema.index({ 'activities.timestamp': -1 });
// // userSchema.index({ 'activities.type': 1 });

// // const User = mongoose.model('User', userSchema);

// // export default User;
// import mongoose from "mongoose";

// const activitySchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ['BUY', 'SELL', 'DEPOSIT', 'WITHDRAWAL', 'BALANCE_UPDATE'],
//     required: true
//   },
//   stock: {
//     symbol: String,
//     price: { type: Number, min: 0 },
//     quantity: { type: Number, min: 0 }
//   },
//   balanceChange: Number,
//   balanceAfter: Number,
//   description: String,
//   timestamp: { type: Date, default: Date.now }
// }, { _id: false }); // Disable _id for subdocuments to improve performance

// const stockSchema = new mongoose.Schema({
//   symbol: { type: String, required: true, trim: true },
//   buyPrice: { type: Number, required: true, min: 0 },
//   quantity: { type: Number, required: true, min: 0 },
//   lastUpdated: { type: Date, default: Date.now },
//   isSold: { type: Boolean, default: false }
// }, { _id: false }); // Disable _id for subdocuments

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
//     match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email format']
//   },
//   password: { type: String, required: true, minlength: 6 },
//   phoneNumber: {
//     type: String,
//     required: true,
//     trim: true,
//     match: [/^\+?[\d\s-]+$/, 'Invalid phone number format']
//   },
//   stocks: [stockSchema],
//   accountBalance: { type: Number, default: 2000, min: 0 },
//   activities: [activitySchema]
// }, {
//   timestamps: true, // Replaces createdAt with automatic timestamp handling
//   versionKey: false // Disable __v field to reduce document size
// });

// // Indexes for optimized querying
// userSchema.index({ email: 1 });
// userSchema.index({ 'stocks.symbol': 1 });
// userSchema.index({ 'activities.timestamp': -1 });

// const User = mongoose.model('User', userSchema);
// export default User;
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["BUY", "SELL", "DEPOSIT", "WITHDRAWAL"],
      required: true,
    },
    stock: {
      symbol: String,
      price: { type: Number, min: 0 },
      quantity: { type: Number, min: 0 },
    },
    balanceChange: Number,
    balanceAfter: Number,
    description: String,
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false }
);

const stockSchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true, trim: true },
    buyPrice: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    lastUpdated: { type: Date, default: Date.now },
    isSold: { type: Boolean, default: false },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
    },
    password: { type: String, required: true, minlength: 6 },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?[\d\s-]+$/, "Invalid phone number"],
    },
    stocks: [stockSchema],
    accountBalance: { type: Number, default: 10000, min: 0 },
    activities: [activitySchema],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.index({ email: 1 });
userSchema.index({ "stocks.symbol": 1 });
userSchema.index({ "activities.timestamp": -1 });

const User = mongoose.model("User", userSchema);
export default User;
