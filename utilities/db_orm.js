// 引入
const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
// 使用独立的参数连接数据库
const sequelize = new Sequelize('guest', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging:false
});

// 导出 
module.exports = sequelize;
