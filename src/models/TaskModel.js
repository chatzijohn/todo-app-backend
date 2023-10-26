import { Sequelize, DataTypes } from "sequelize"
import sequelizeConfig from '../../sequelize/config/config.js' // Import the centralized Sequelize instance

const sequelize = new Sequelize(sequelizeConfig.development)

const Task = sequelize.define("task", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },

}, {
    underscored: true
})

// Create a new Task or update an existing one.
Task.save = async function (taskData) {
    try {
        let updatedTask
        if (taskData.taskId) {
            await Task.update({
                title: taskData.title,
                completed: taskData.completed 
                },
                {where: {id: taskData.taskId}
            })
            updatedTask = await Task.findByPk(taskData.taskId)
        } else {
            const newTask = await Task.create({title: taskData.title})
            updatedTask  = newTask
        }
        return updatedTask
    } catch (err) {
        throw err
    }
}

// Get all Tasks
Task.getAll = async () => {
    try {
        const tasks = await Task.findAll()
        return tasks;
    } catch (err) {
        throw err
    }
}

// Get a specific Task by ID
Task.getById = async (id) => {
    try {
        const task = await Task.findByPk(id)
        if (!task) {
            throw { name: "TaskNotFoundError" }
        } else {
            return task
        }
    } catch (err) {
        throw err
    }
}

// // Update a specific Task by ID
// Task.updateById = async (id, updates) => {
//     try {
//         const task = await Task.findByPk(id)
//         if (!task) {
//             throw { name: "TaskNotFoundError" }
//         } else {
//             const updatedTask = await task.update(updates)
//             return updatedTask
//         }
//     } catch (err) {
//         throw err
//     }
// }

// Delete a Task by ID
Task.prototype.delete = async function() {
    try {
        await this.destroy()
      } catch (err) {
        throw err
    }
}

export default Task