import express from "express"
import controller from "../controllers/TaskController"

const router = express.Router()

router.get("/", controller.getTasks)
router.get("/:id", controller.getTasksById)
router.post("/", controller.addTask)
router.put("/:id", controller.updateTask)
router.delete("/:id", controller.deleteTask)

module.exports = router