// 引入express
const express = require('express');

// 获取服务器实例
const app = express();

// 设置监听端口
app.listen(3000,()=>console.log('Server is running on 3000 port'));

// 注册路由
app.get('/',(req, res)=>{
    res.send('Welcome to app');
});