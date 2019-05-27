// 1、引入express
const express = require('express');

// 2、创建路由容器
const router = express.Router();

// 3、添加路由
router.get('/',(req, res)=>{
    res.send('hello');
});
router.get('/signin',(req, res)=>{});
router.post('/signin',(req, res)=>{});
router.get('/signup',(req, res)=>{});
router.post('/signup',(req, res)=>{});
router.post('/signout',(req, res)=>{});
router.get('/topic/create',(req, res)=>{});
router.post('/topic/store',(req, res)=>{});
router.get('/topic/:topicID',(req, res)=>{});
router.get('/topic/:topicID/edit',(req, res)=>{});
router.post('/topic/:topicID/update',(req, res)=>{});
router.post('/topic/:topicID/delete',(req, res)=>{});

// 4、导出路由
module.exports = router;