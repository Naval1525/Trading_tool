import express from "express";
import dotenv from 'dotenv';
import connectDB from "./utils/db.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
import compression from "compression";
import emailRoute from './Routes/email.route.js'


// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;



const allowedOrigins = [
    'http://localhost:5173','https://splendid-narwhal-c66579.netlify.app/'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true); // Allow request
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow cookies and credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // HTTP methods allowed
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Headers allowed
};




app.use(compression());
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// API routes
app.use('/api',emailRoute)



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
        status: false
    });
});

// app.use(express.static(path.join(_dirname, "/frontend/dist")));
// app.get("*", (_,res) => {
//     res.sendFile(path.resolve(_dirname, "frontend/dist/index.html"));
// });
// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource was not found',
        status: false
    });
});
// await createSavedJobsTable();
// Start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};


startServer();