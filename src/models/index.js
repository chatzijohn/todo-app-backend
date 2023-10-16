import { DataTypes, Sequelize } from 'sequelize'
import sequelizeConfig from '../../sequelize/config/config.js'
import Task from './TaskModel.js'

const sequelize = new Sequelize(sequelizeConfig.development)

const models = {
  Task: Task.init(sequelize, DataTypes),
  // Add other models here if you have them
};

// Add associations between models if needed
// For example, if Task has associations with other models:
// models.User.hasMany(models.OtherModel);

export { sequelize };
export default models;
