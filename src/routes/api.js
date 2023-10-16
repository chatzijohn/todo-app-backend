import express from "express"
import taskRouter from "./taskRoutes.js" // Entity Task routes

const router = express.Router()

router.use('/tasks', taskRouter)

export default router