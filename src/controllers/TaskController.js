import Task from "../models/TaskModel"

const getTasks = async (req, res) => {
    try {
        const Tasks = await Task.getAll()
        res.status(200).json({ Tasks });
    } catch (err) {
        next(err)
    }
}

const getTask = async (req, res) => {
    try {
        const retrievedTask = await Task.getById(req.id)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getTasks,
    getTask,

  }
  