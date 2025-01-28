import { registerUser } from "../Controllers/auth.contoller.js";
import { buyStock, getDashboard, sellStock } from "../Controllers/user.Controller.js";
import router from "./email.route.js";



// Use in routes
router.post('/buy', buyStock);
router.post('/sell', sellStock);
router.get('/dashboard/:userId', getDashboard);
router.post('/register', registerUser);
export default router;
