// 1、引入express
const express = require('express');

// 2、创建路由容器
const router = express.Router();

// 导入控制器
const indexController = require('./controllers/index');
const userController = require('./controllers/user');
const topicController = require('./controllers/topic');
const commentController = require('./controllers/comment');

// 3、添加路由
router.get('/', indexController.index);
router.get('/signin', userController.signinForm);
router.post('/signin', userController.signin);
router.get('/signup', userController.signupForm);
router.post('/signup', userController.signup);
router.get('/signout', userController.signout);
router.get('/topic/create', topicController.topicForm);
router.post('/topic/store', topicController.topicStore);
router.get('/topic/:topicID', topicController.topicShow);
router.get('/topic/:topicID/edit', topicController.topicEdit);
router.post('/topic/:topicID/update', topicController.topicUpdate);
router.post('/topic/:topicID/delete', topicController.topicDelete);

// 4、导出路由
module.exports = router;