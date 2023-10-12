
import { DataTypes, Sequelize } from 'sequelize'
import { sequelize } from '../../sequelize/config/config'
import TaskModel from './TaskModel'

const models = {
  Task: TaskModel.init(sequelize, DataTypes),
  // Add other models here if you have them
};

// Add associations between models if needed
// For example, if Task has associations with other models:
// models.User.hasMany(models.OtherModel);

export { sequelize };
export default models;
