import dotenv from "dotenv";
dotenv.config();
//
import express from "express";
import cors from "cors";


//import API
import productRoutes from "./routes/productRoute.js"
import categoryRoutes from "./routes/categoryRoute.js"
import orderRoutes from "./routes/orderRoutes.js"
import authRoute from "./routes/authRoute.js"

//cho phép url truy cập
const app = express();
app.disable("x-powered-by");
app.use((req, res, next) => {
    // Basic security headers without adding a new dependency.
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "no-referrer");
    next();
});
app.use(cors({
    origin: process.env.CORS_ORIGINS?.split(",").map((origin) => origin.trim()).filter(Boolean) || [
        'https://seafood-liard.vercel.app',
        'https://seafood-git-main-nlan4670-1022s-projects.vercel.app',
        'http://localhost:5173'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());



// api
app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/user", authRoute);


//test api
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

//lắng nghe PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("API running on port " + PORT));
