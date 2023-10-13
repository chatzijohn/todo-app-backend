import express from "express"
import taskRoutes from "./taskRoutes" // Entity Task routes

const router = express.Router()

router.use('/tasks', taskRoutes)

module.exports = router