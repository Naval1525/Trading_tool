import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";


const cookieOptions = {
  httpOnly: true, // Ensures the cookie is only accessible through HTTP(S), not via client-side JavaScript
  secure: process.env.NODE_ENV === "production", // Ensures the cookie is only sent over HTTPS in production
  sameSite: "strict", // Helps mitigate CSRF attacks
  maxAge: 60 * 60 * 1000, // Cookie expiration time in milliseconds (1 hour in this case)
};

const setTokenCookies = (res, userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("accessToken", accessToken, cookieOptions);
};

export const register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await user.save();


    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const tokenData = {
      userId: user.email
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });



res.status(200).cookie("token", token, {
  maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
  httpOnly: true,
  sameSite: 'strict',
  path: '/'
}).json({
  message: "Login successful",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    token,
  },
});

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

export const verifyAuth = async (req, res) => {
  try {
    res.status(200).json({ authenticated: true });
  } catch (error) {
    res.status(401).json({ authenticated: false });
  }
};

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const tokenData = {
//         userId: user.email // Using email as the unique identifier
//       };
//     const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res.status(200).cookie("token", token, {
//         maxAge: 1 * 24 * 60 * 60 * 1000,
//         httpOnly: true,
//         sameSite: 'strict',
//         path: '/'
//       }).json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Login failed" });
//   }
// };

export const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.json({ message: "Logout successful" });
};
