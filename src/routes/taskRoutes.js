import express from "express"
import controller from "../controllers/TaskController.js"

const taskRouter = express.Router()

taskRouter.get("/", controller.getTasks)
taskRouter.get("/:id", controller.getTask)
taskRouter.post("/", controller.addTask)
taskRouter.put("/:id", controller.updateTask)
taskRouter.delete("/:id", controller.deleteTask)

export default taskRouter