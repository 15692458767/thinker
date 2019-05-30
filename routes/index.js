// 1、引入express
const express = require('express');
// 2、创建路由容器
const router = express.Router();
// 导入控制器
const indexController = require('../controllers/index');
// 3、添加路由
router.get('/', indexController.index);
// 4、导出路由
module.exports = router;