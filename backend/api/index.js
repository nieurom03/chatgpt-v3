require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const helmet = require("helmet");

 
const conversactionRoute = require( '../routes/conversationRoute.js')
const messageRoute = require('../routes/messageRoute.js')
const authRoute = require('../routes/authRoute.js')

const { connectDB } = require("../config/db");

connectDB();



const app = express();
// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:3000', // React app's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  };

app.set("trust proxy", 1);

app.use(express.json({ limit: "4mb" }));
// app.use(helmet());
app.use(cors(corsOptions));

//root route
app.get("/", (req, res) => {
  res.send("App works properly!");
});


app.use("/api/conversation", conversactionRoute)
app.use("/api/message", messageRoute);
app.use("/api/auth", authRoute);


const PORT =process.env.PORT || 5001 
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`))

