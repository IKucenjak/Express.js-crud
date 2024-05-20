const { Sequelize } = require('sequelize');
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;

const sequelize = new Sequelize(databaseUrl, {
    dialect: 'postgres',
    define: {
        timestamps: true,
        paranoid: true,
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 5000,
        idle: 5000,
    },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database, error:', error);
  });


module.exports = sequelize;