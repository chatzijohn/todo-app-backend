import { DataTypes, Model } from "sequelize"
import { sequelize } from '../../sequelize/config/config'

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


module.exports = Task