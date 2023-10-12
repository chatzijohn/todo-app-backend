import { DataTypes, Model } from "sequelize"
import { sequelize } from './index'; // Import the centralized Sequelize instance

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
        type: DataTypes.STRING,
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

// Create a new Task
Task.add = async (title) => {
    try {
        const tasks = await Task.create(title)
        return tasks;
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
            return { error: "Task not found" }
        } else {
            return task
        }
    } catch (err) {
        throw err
    }
}

// Update a specific Task by ID
Task.updateById = async (id, updates) => {
    try {
        const task = await Task.findByPk(id)
        if (!task) {
        return { error: "Task not found" }
        } else {
        const updatedTask = await task.update(updates)
        return updatedTask
        }
    } catch (err) {
        throw err
    }
}

// Delete a Task by ID
Task.prototype.delete = async (id) => {
    try {
        const task = await Task.findByPk(id);
        if (!task) {
          return { error: 'Task not found' };
        }
        await task.destroy();
      } catch (err) {
        throw err
    }
}
  

module.exports = Task