// 引入express
const express = require('express');

// 获取服务器实例
const app = express();

// 设置监听端口
app.listen(3000,()=>console.log('Server is running on 3000 port'));

// 5、导入路由模块
const router = require('./routers.js');

// 6、挂载路由到app实例
app.use(router);


