// 1、引入express
const express = require('express');
// 2、创建路由容器
const router = express.Router();
// 导入控制器
const topicController = require('../controllers/topic');
// 3、添加路由
router.get('/create', topicController.topicForm);
router.post('/store', topicController.topicStore);
router.get('/:topicID', topicController.topicShow);
router.get('/:topicID/edit', topicController.topicEdit);
router.post('/:topicID/update', topicController.topicUpdate);
router.post('/:topicID/delete', topicController.topicDelete);

// 4、导出路由
module.exports = router;