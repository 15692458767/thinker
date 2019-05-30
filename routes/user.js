// 1、引入express
const express = require('express');
// 2、创建路由容器
const router = express.Router();
// 导入控制器
const userController = require('../controllers/user');
// 3、添加路由
router.get('/signin', userController.signinForm);
router.post('/signin', userController.signin);
router.get('/signup', userController.signupForm);
router.post('/signup', userController.signup);
router.get('/signout', userController.signout);
// 4、导出路由
module.exports = router;