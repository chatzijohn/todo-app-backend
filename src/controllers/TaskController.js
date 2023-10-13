import Task from "../models/TaskModel"

const getTasks = async (req, res) => {
    try {
        const Tasks = await Task.getAll()
        res.status(200).json({ Tasks });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getTasks,

  }
  