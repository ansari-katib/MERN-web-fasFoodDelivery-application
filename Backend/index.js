import express from "express";
import mongoDB from "./db.js";
import createUserRoute from "./Routes/CreateUser.js";
import DisplayData from "./Routes/DisplayData.js";
import OrderData from "./Routes/OrderData.js";  // Correct the spelling here
import cors from "cors";

const app = express();
const port = 5000;

mongoDB(); // Connect to MongoDB

// Use CORS Middleware
app.use(cors({
    origin: ["http://localhost:5173","http://localhost:5174","http://localhost:5175"],  // Allow your React app's origin
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"]
}));

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api', createUserRoute);
app.use('/api', DisplayData);
app.use('/api', OrderData);  // Corrected route name

// Root route
app.get('/', (req, res) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
