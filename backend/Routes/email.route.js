import express from 'express';
import { storeEmail}  from '../Controllers/email.Controller.js'; // Path to email controller

const router = express.Router();

// Route to store email
router.post('/store', storeEmail);

export default router;
