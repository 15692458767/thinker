// 引入express
const express = require('express');

// 获取服务器实例
const app = express();

// 设置监听端口
app.listen(3000,()=>console.log('Server is running on 3000 port'));

// 配置body-parser表单请求体
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
// parse application/json
app.use(bodyParser.json());

// 公开资源文件目录
app.use('/node_modules',express.static('./node_modules/'));
app.use('/public',express.static('./public/'));

// 配置模板引擎
app.engine('html',require('express-art-template'));
// 要配置此语句
app.set('view engine','html');

app.set('view options',{
    debug:process.env.NODE_ENV !== 'production'
});

// 5、导入路由模块
const router = require('./routers.js');

// 6、挂载路由到app实例
app.use(router);

