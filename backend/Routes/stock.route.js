import { login, logout, register } from "../Controllers/auth.contoller.js";
import { buyStock, getDashboard, portfolio, sellStock } from "../Controllers/user.Controller.js";
import { verifyToken } from "../Middlewares/auth.middleware.js";
import router from "./email.route.js";



// Use in routes
router.post('/buy',verifyToken, buyStock);
router.post('/sell',verifyToken, sellStock);
router.get('/dashboard/:userId',verifyToken, getDashboard);
router.get('/portfolio/:userId',verifyToken, portfolio);

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
