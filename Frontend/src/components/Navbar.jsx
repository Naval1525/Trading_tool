// // // import React, { useState } from "react";
// // // import { ArrowRight } from "lucide-react";
// // // import { Link } from "react-router-dom";
// // // import { assets } from "./../assets/assets";


// // // const Navbar = () => {
// // //   const [isLogoHovered, setIsLogoHovered] = useState(false);

// // //   return (
// // //     <nav className="fixed top-0 left-0 w-full bg-black/10 from-[40%] backdrop-blur-sm shadow-md z-50">
// // //       <div className="flex justify-between items-center py-6 px-6 max-w-7xl mx-auto">
// // //         <Link to="/">
// // //           <div
// // //             className="flex items-center"
// // //             onMouseEnter={() => setIsLogoHovered(true)}
// // //             onMouseLeave={() => setIsLogoHovered(false)}
// // //           >
// // //             <div
// // //               className={`
// // //               w-12 h-12 inline-block
// // //               transition-transform duration-500 ease-in-out
// // //               ${isLogoHovered ? "rotate-180" : "rotate-0"}
// // //             `}
// // //             >
// // //               <img
// // //                 src={assets.Logo}
// // //                 alt="Logo"
// // //                 className="object-contain w-full h-full"
// // //               />
// // //             </div>
// // //             <div
// // //               className={`
// // //               text-white text-2xl font-normal whitespace-nowrap
// // //               transition-all duration-500 ease-linear overflow-hidden
// // //               ${
// // //                 isLogoHovered
// // //                   ? "max-w-full opacity-100 ml-2"
// // //                   : "max-w-0 opacity-0 ml-0"
// // //               }
// // //             `}
// // //             >
// // //               | Virtual Ventures
// // //             </div>
// // //           </div>
// // //         </Link>

// // //         <div className="flex items-center space-x-11 text-white">
// // //           <Link
// // //             to="/market"
// // //             className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors"
// // //           >
// // //             Market
// // //           </Link>
// // //           <Link
// // //             to="/news"
// // //             className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors"
// // //           >
// // //             News
// // //           </Link>
// // //           <Link
// // //             to="/portfolio"
// // //             className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors"
// // //           >
// // //             Portfolio
// // //           </Link>
// // //           <Link
// // //             to="/signup"
// // //             className="
// // //               flex items-center gap-2
// // //               bg-gradient-to-r from-blue-600 to-purple-600
// // //               text-white
// // //               py-2 px-4
// // //               rounded-full
// // //               shadow-md
// // //               hover:scale-105
// // //               transition-all
// // //               duration-300
// // //               group
// // //             "
// // //           >
// // //             <span className="text-sm font-medium">Sign Up</span>
// // //             <ArrowRight
// // //               size={20}
// // //               className="group-hover:translate-x-1 transition-transform"
// // //             />
// // //           </Link>
// // //         </div>
// // //       </div>
// // //     </nav>
// // //   );
// // // };

// // // export default Navbar;
// import React, { useState, useEffect } from "react";
// import { ArrowRight, LogOut } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { assets } from "./../assets/assets";
// import Cookies from 'js-cookie';

// const Navbar = () => {
//   const [isLogoHovered, setIsLogoHovered] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [userName, setUserName] = useState(null);
//   const navigate = useNavigate();

//   // Check for user data in cookies on mount
//   useEffect(() => {
//     try {
//       // Try to get the root persist cookie
//       const persistRoot = Cookies.get('persist:root');
//       if (persistRoot) {
//         const parsedRoot = JSON.parse(persistRoot);

//         // Parse the auth object if it exists
//         if (parsedRoot.auth) {
//           const auth = JSON.parse(parsedRoot.auth);

//           // Check if user exists and is not null
//           if (auth.user) {
//             setIsLoggedIn(true);
//             // Try to get userId from cookie
//             const storedUserId = Cookies.get('userId');
//             if (storedUserId) {
//               setUserId(storedUserId);
//             }
//             // Set user name if available
//             const userName = Cookies.get('userName');
//             if (userName) {
//               setUserName(userName);
//             }
//           } else {
//             setIsLoggedIn(false);
//             setUserId(null);
//             setUserName(null);
//           }
//         }
//       }
//     } catch (error) {
//       console.error('Error parsing cookies:', error);
//       setIsLoggedIn(false);
//       setUserId(null);
//       setUserName(null);
//     }
//   }, []);

//   const handleLogout = () => {
//     // Clear all relevant cookies
//     Cookies.remove('persist:root', { path: '/' });
//     Cookies.remove('userId', { path: '/' });
//     Cookies.remove('userName', { path: '/' });
//     Cookies.remove('token', { path: '/' });

//     // Reset states
//     setIsLoggedIn(false);
//     setUserId(null);
//     setUserName(null);

//     // Navigate to home
//     navigate('/');
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-black/10 backdrop-blur-sm shadow-md z-50">
//       <div className="flex justify-between items-center py-6 px-6 max-w-7xl mx-auto">
//         <Link to="/">
//           <div
//             className="flex items-center"
//             onMouseEnter={() => setIsLogoHovered(true)}
//             onMouseLeave={() => setIsLogoHovered(false)}
//           >
//             <div
//               className={`
//                 w-12 h-12 inline-block
//                 transition-transform duration-500 ease-in-out
//                 ${isLogoHovered ? "rotate-180" : "rotate-0"}
//               `}
//             >
//               <img
//                 src={assets.Logo}
//                 alt="Logo"
//                 className="object-contain w-full h-full"
//               />
//             </div>
//             <div
//               className={`
//                 text-white text-2xl font-normal whitespace-nowrap
//                 transition-all duration-500 ease-linear overflow-hidden
//                 ${isLogoHovered ? "max-w-full opacity-100 ml-2" : "max-w-0 opacity-0 ml-0"}
//               `}
//             >
//               | Virtual Ventures
//             </div>
//           </div>
//         </Link>

//         <div className="flex items-center space-x-11 text-white">
//           <Link
//             to="/market"
//             className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors"
//           >
//             Market
//           </Link>
//           <Link
//             to="/news"
//             className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors"
//           >
//             News
//           </Link>
//           {isLoggedIn ? (
//             <>
//               <Link
//                 to={`/portfolio/${userId || ''}`}
//                 className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors"
//               >
//                 Portfolio
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="
//                   flex items-center gap-2
//                   bg-gradient-to-r from-red-600 to-red-700
//                   text-white
//                   py-2 px-4
//                   rounded-full
//                   shadow-md
//                   hover:scale-105
//                   transition-all
//                   duration-300
//                   group
//                 "
//               >
//                 <span className="text-sm font-medium">
//                   {userName ? `Logout ${userName}` : 'Logout'}
//                 </span>
//                 <LogOut
//                   size={20}
//                   className="group-hover:translate-x-1 transition-transform"
//                 />
//               </button>
//             </>
//           ) : (
//             <Link
//               to="/signup"
//               className="
//                 flex items-center gap-2
//                 bg-gradient-to-r from-blue-600 to-purple-600
//                 text-white
//                 py-2 px-4
//                 rounded-full
//                 shadow-md
//                 hover:scale-105
//                 transition-all
//                 duration-300
//                 group
//               "
//             >
//               <span className="text-sm font-medium">Sign Up</span>
//               <ArrowRight
//                 size={20}
//                 className="group-hover:translate-x-1 transition-transform"
//               />
//             </Link>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import { ArrowRight, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "./../assets/assets";
import Cookies from 'js-cookie';

const Navbar = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  // Check authentication status on mount and when token changes
  useEffect(() => {
    const checkAuth = () => {
      // Check token from cookies first
      const tokenFromCookies = Cookies.get('token');

      // Check token from localStorage as fallback
      const tokenFromLocalStorage = localStorage.getItem('token');

      const token = tokenFromCookies || tokenFromLocalStorage;

      if (token) {
        try {
          // Try to get user ID from local storage or cookies
          const userId = localStorage.getItem('userId') || Cookies.get('userId');
          const userName = localStorage.getItem('userName') || Cookies.get('userName');

          if (userId) {
            setIsAuthenticated(true);
            setUserId(userId);
            setUserName(userName || '');

            // If token was in cookies but not in localStorage, move it to localStorage
            if (tokenFromCookies && !tokenFromLocalStorage) {
              localStorage.setItem('token', tokenFromCookies);
            }

            // If user ID was in cookies but not in localStorage, move it to localStorage
            if (Cookies.get('userId') && !localStorage.getItem('userId')) {
              localStorage.setItem('userId', Cookies.get('userId'));
            }
          } else {
            handleLogout(); // Clear incomplete auth state
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          handleLogout();
        }
      } else {
        setIsAuthenticated(false);
        setUserId(null);
        setUserName(null);
      }
    };

    // Check auth on initial load
    checkAuth();

    // Set up an interval to periodically check token expiration
    const interval = setInterval(checkAuth, 5 * 60 * 1000); // Check every 5 minutes

    // Listen for storage changes (e.g., from other tabs/windows)
    window.addEventListener('storage', checkAuth);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    // Clear cookies
    Cookies.remove('token', { path: '/' });
    Cookies.remove('userId', { path: '/' });
    Cookies.remove('userName', { path: '/' });
    Cookies.remove('persist:root', { path: '/' });

    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');

    // Reset state
    setIsAuthenticated(false);
    setUserId(null);
    setUserName(null);

    // Redirect to home
    navigate('/');
  };

  // Protect portfolio route
  const handlePortfolioClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate('/signup');
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/10 backdrop-blur-sm shadow-md z-50">
      <div className="flex justify-between items-center py-6 px-6 max-w-7xl mx-auto">
        <Link to="/">
          <div
            className="flex items-center"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <div
              className={`
                w-12 h-12 inline-block
                transition-transform duration-500 ease-in-out
                ${isLogoHovered ? "rotate-180" : "rotate-0"}
              `}
            >
              <img
                src={assets.Logo}
                alt="Logo"
                className="object-contain w-full h-full"
              />
            </div>
            <div
              className={`
                text-white text-2xl font-normal whitespace-nowrap
                transition-all duration-500 ease-linear overflow-hidden
                ${isLogoHovered ? "max-w-full opacity-100 ml-2" : "max-w-0 opacity-0 ml-0"}
              `}
            >
              | Virtual Ventures
            </div>
          </div>
        </Link>

        <div className="flex items-center space-x-11 text-white">
          <Link
            to="/market"
            className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors"
          >
            Market
          </Link>
          <Link
            to="/news"
            className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors"
          >
            News
          </Link>

          <Link
            to={isAuthenticated ? `/portfolio/${userId}` : '/signup'}
            onClick={handlePortfolioClick}
            className="text-xl font-normal tracking-wide hover:text-gray-300 transition-colors"
          >
            Portfolio
          </Link>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="
                flex items-center gap-2
                bg-gradient-to-r from-red-600 to-red-700
                text-white
                py-2 px-4
                rounded-full
                shadow-md
                hover:scale-105
                transition-all
                duration-300
                group
              "
            >
              <span className="text-sm font-medium">
                {userName ? `Logout ${userName}` : 'Logout'}
              </span>
              <LogOut
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          ) : (
            <Link
              to="/signup"
              className="
                flex items-center gap-2
                bg-gradient-to-r from-blue-600 to-purple-600
                text-white
                py-2 px-4
                rounded-full
                shadow-md
                hover:scale-105
                transition-all
                duration-300
                group
              "
            >
              <span className="text-sm font-medium">Sign Up</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;