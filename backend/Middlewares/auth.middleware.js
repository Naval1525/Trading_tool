// // // import jwt from 'jsonwebtoken';

// // // export const verifyToken = async (req, res, next) => {
// // //     try {
// // //         // Check for token in both cookies and Authorization header
// // //         const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

// // //         if (!token) {
// // //             return res.status(401).json({
// // //                 error: 'Unauthorized - No token provided',
// // //                 status: false
// // //             });
// // //         }

// // //         try {
// // //             const decoded = jwt.verify(token, process.env.SECRET_KEY);
// // //             req.id = decoded.userId;
// // //             next();
// // //         } catch (jwtError) {
// // //             return res.status(401).json({
// // //                 error: 'Unauthorized - Invalid token',
// // //                 status: false
// // //             });
// // //         }
// // //     } catch (err) {
// // //         console.error('Auth middleware error:', err);
// // //         return res.status(500).json({
// // //             error: 'Internal server error',
// // //             details: err.message,
// // //             status: false
// // //         });
// // //     }
// // // };

// // // export default verifyToken;
// // import jwt from 'jsonwebtoken';

// // export const verifyToken = async (req, res, next) => {
// //     try {
// //         // Check for token in both cookies and Authorization header
// //         const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

// //         if (!token) {
// //             return res.status(401).json({
// //                 error: 'Unauthorized - No token provided',
// //                 status: false
// //             });
// //         }

// //         try {
// //             const decoded = jwt.verify(token, process.env.SECRET_KEY);
// //             req.id = decoded.userId; // Attach user ID to the request object
// //             next();
// //         } catch (jwtError) {
// //             return res.status(401).json({
// //                 error: 'Unauthorized - Invalid token',
// //                 status: false
// //             });
// //         }
// //     } catch (err) {
// //         console.error('Auth middleware error:', err);
// //         return res.status(500).json({
// //             error: 'Internal server error',
// //             details: err.message,
// //             status: false
// //         });
// //     }
// // };

// // export default verifyToken;
// import jwt from 'jsonwebtoken';

// export const verifyToken = async (req, res, next) => {
//   try {
//     // Check for token in both cookies and Authorization header
//     const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
//     console.log(token)

//     if (!token) {
//       return res.status(401).json({
//         error: 'Unauthorized - No token provided',
//         status: false
//       });
//     }

//     try {
//       const decoded = jwt.verify(token, process.env.SECRET_KEY);
//       req.id = decoded.userId; // Attach user ID to the request
//       next();
//     } catch (jwtError) {
//       return res.status(401).json({
//         error: 'Unauthorized - Invalid token',
//         status: false
//       });
//     }
//   } catch (err) {
//     console.error('Auth middleware error:', err);
//     return res.status(500).json({
//       error: 'Internal server error',
//       details: err.message,
//       status: false
//     });
//   }
// };
import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized - No token provided',
        status: false
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.id = decoded.userId; // Attach user ID to the request
      next();
    } catch (jwtError) {
      return res.status(401).json({
        error: 'Unauthorized - Invalid token',
        status: false
      });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({
      error: 'Internal server error',
      details: err.message,
      status: false
    });
  }
};
