import jwt from 'jsonwebtoken';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(401).json({ message: 'Access denied. Please login.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          res.clearCookie('accessToken');
          return res.status(401).json({ message: 'Session expired' });
        }
        return res.status(403).json({ message: 'Invalid session' });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
