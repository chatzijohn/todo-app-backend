// Import the dotenv library
import dotenv from "dotenv"
dotenv.config()

// Sequelize configuration
const sequelizeConfig = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: '+03:00', // for writing to database
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: '+03:00', // for writing to database
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      useUTC: false, // for reading from database
    },
    timezone: '+03:00', // for writing to database
  }
}

export default sequelizeConfig