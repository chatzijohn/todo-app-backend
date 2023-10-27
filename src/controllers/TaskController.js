// Only what's called by the routes
import Task from "../models/TaskModel.js"

const getTasks = async  (req, res, next) => {
    try {
        const tasks = await Task.getAll()
        res.status(200).json({ tasks })
    } catch (err) {
        next(err)
    }
}

const getTask = async (req, res, next) => {
    try {
        const taskId = req.params.id
        //  If the task exists update it
        const task = await Task.getById(taskId)

        res.status(200).json(task);
    } catch (err) {
        next(err)
    }
}

const addTask = async (req, res, next) => {
    try {
        const { title } = req.body
        const taskData = {
            title
        }

        if (!title) {
            throw { name: "MissingTitleError" }
        } else {
            //If "title" is present, you can proceed to create the task
            const task = await Task.save(taskData);

            // Respond with the created task
            res.status(201).json(task)
        }
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const updateTask = async (req, res, next) => {
    try {
        const taskId = req.params.id
        const {completed, title} = req.body

        const taskData = {
            title,
            taskId,
            completed
        }
        
        const task = await Task.getById(taskId)
        if (!task) {
            throw { name: "TaskNotFoundError" }
        } else {
            
            const updatedTask = await Task.save(taskData)
            console.log(updatedTask)
            console.log("####################")
            console.log(Date())
            // Respond with the updated task
            res.status(200).json(updatedTask);
        }
    } catch (err) {
        console.log(err.name)
        next(err)
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.id
        //  If the task exists delete it
        const taskToDelete = await Task.getById(taskId)
        await taskToDelete.delete()
        res.status(200).json({ message: "Task deleted successfully" })
    } catch (err) {
        next(err)
    }
}

const controller = {
    getTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask,
  }
  
  export default controller