const { default: mongoose } = require("mongoose");


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
    stockName: {
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
      min: 1
    }
  }],
  accountBalance: {
    type: Number,
    default: 0,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for faster querying
userSchema.index({ email: 1 });
userSchema.index({ 'stocks.stockName': 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;