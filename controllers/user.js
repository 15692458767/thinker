const user = require('../models/user.js');
// 引入md5
const md5 = require('blueimp-md5');

exports.signinForm = (req, res)=>{
    
}
exports.signin = (req, res)=>{}
exports.signupForm = (req, res)=>{
    res.render('signup');
}
exports.signup = (req, res)=>{
    // console.log(req.body)
    // 验证邮箱是否重复
    user.findByEmail(req.body.email,(err,ret)=>{
        if(err){
            return res.status(500).json({
                error:err.message
            });
        }
        if(ret){
            return res.send({
                code:1,
                message:'邮箱被占用'
            });
        }
    });
    // 验证昵称是否重复
    user.findByNickname(req.body.nickname,(err, ret)=>{
        if(err){
            return res.status(500).json({
                error:err.message
            });
        }
        if(ret){
            return res.status(200).json({
                code:2,
                message:'昵称被占用'
            });
        }
    });

    // res.send(req.body);
    // 如果验证通过调用
    // 对密码进行md5加密
    req.body.password = md5(req.body.password);
    user.store(req.body,(err, ret)=>{
        if(err){
            return res.status(500).json({
                error:err.message
            });
        }
        if(ret){
            return res.status(200).send({
                code:3,
                message:'注册成功'
            });
        }
    });
}
exports.signout = (req, res)=>{}


