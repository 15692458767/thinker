// 引入express
const express = require('express');

// 获取服务器实例
const app = express();

// 引入express-session包
const session = require('express-session');

// 引入express-mysql-session
const MySQLStore = require('express-mysql-session')(session);

// 引入数据库配置文件
const options = require('./config');

// 实例化session的存储对象
var sessionStore = new MySQLStore(options.dbConfig);

// 设置监听端口
app.listen(3000,()=>console.log('Server is running on 3000 port'));

// 配置session
app.use(session({
    //配置一个加密字符串，防止客户端恶意伪造
    secret:'thinker',
    resave:false,
    // 无论是否使用session,我都会默认给你分配一把钥匙
    saveUninitialized:false,
    // 设置上存储session数据到数据库所用的实例
    store:sessionStore,
    cookie:{
        maxAge:1000*3600*24    //单位是毫秒
    }
}));

// 在配置session之后不满足第1、2个条件
// 通过注册中间件来满足第3个条件
app.use((req, res, next)=>{
    app.locals.user = req.session.user;
    // console.log(app.locals.user);
    next();
});

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
// const router = require('./routers.js'); //不再引入routers.js
const index = require('./routes/index.js');
const user = require('./routes/user.js');
const topic = require('./routes/topic.js');

// 引入认证模块
const authen = require('./middleware/authen');

// 6、挂载路由到app实例
// app.use(router);  //不再挂载router
app.use(index);
app.use(user);
app.use('/topic', authen, topic);

// 统一处理错误的中间件
app.use((err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).send('Somthing Went Wrong');
});


// 请求会去上面的中间件一个一个匹配
// 当能走到这里时，就是所有的中间件都没有匹配成功
// 就意味着请求的路径不对
app.use('/', (req, res, next)=>{
    // 设置状态码
    res.status(404);
    // 返回视图
    res.render('../404.html');
});