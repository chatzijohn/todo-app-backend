import express from "express"
import errorHandler from "./middleware/errorHandler.js"
import apiRouter from "./routes/api.js"
import logger from "./config/logger.js"
import cors from "cors"
import dotenv from "dotenv"


dotenv.config()

const app = express()
const port = parseInt(process.env.API_PORT, 10)

// Enable Cross Origin Resource Sharing
app.use(cors({
    origin: `${process.env.DB_HOST}`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: '*'
}))

// Parse incoming JSON data
app.use(express.json())

// // Middleware: logRequest
// // This middleware will log information about incoming requests.
// app.use(logger)

// Route: GET '/'
// This route handles request to the root URL.
app.get("/", (_, res) => {
    res.send("NodeJS Backend")
})

// API Routes
app.use("/api", apiRouter)

// This will be responsible for default error handling
app.use(errorHandler)

// Start the server
app.listen(port, () => console.log(`Server is running on port: ${port}`))