import Task from "../models/TaskModel.js"

const getTaskById = async (id) => {
    const task = await Task.findById(id)
    if (!task) {
      throw { name: "NotFoundError" }
    } else {
        return task
    }
}

const getTasks = async (res, next) => {
    try {
        const tasks = await Task.getAll()
        res.status(200).json({ tasks });
    } catch (err) {
        next(err)
    }
}

const getTask = async (req, res, next) => {
    try {
        const taskId = req.params.id
        //  If the task exists update it
        const task = await getTaskById(taskId)

        res.status(200).json(task);
    } catch (err) {
        next(err)
    }
}

const addTask = async (req, res, next) => {
    try {
        const { title } = req.body

        if (!title) {
            throw { name: "MissingTitleError", message: "A title must be provided" }
        } else {
            //If "title" is present, you can proceed to create the task
            const task = await Task.save(title);

            // Respond with the created task
            res.status(201).json(task)
        }
    } catch (err) {
        next(err)
    }
}

const updateTask = async (req, res, next) => {
    try {
        const taskId = req.params.id
        const { completed } = req.body
        if (!completed) {
            throw { name: "NotCompletedError", message: "Task is not completed" }
        } else {
            // If "completed" is true, you can proceed to update the task
            const task = await Task.updateById(taskId, completed)
            // Respond with the updated task
            res.status(200).json(task);
        }
    } catch (err) {
        next(err)
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.id
        //  If the task exists delete it
        const taskToDelete = await getTaskById(taskId)
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