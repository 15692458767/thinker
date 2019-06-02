// 引入express
const express = require('express');
// 获取路由实例
const router = express.Router();

// 引入控制器
const commentController = require('../controllers/comment');

// 注册路由
router.post('/:topicID/comment/store', commentController.store);
router.get('/:topicID/comment', commentController.list);
router.get('/:topicID/commentID/edit', commentController.edit);
router.post('/:topicID/commentID/update', commentController.store);
router.post('/:topicID/commentID/delete', commentController.delete);

// 导出
module.exports = router;