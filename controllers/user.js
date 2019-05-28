const user = require('../models/user.js');
// 引入md5
const md5 = require('blueimp-md5');

exports.signinForm = (req, res)=>{
    res.render('signin');
}
exports.signin = (req, res)=>{
    user.findByEmail(req.body.email, (err,ret)=>{
        if(err){
            return res.status(500).json({
                error:err.message
            });
        }

        // 如果用户存在
        if(!ret){
            return res.status(200).json({
                code:1,
                message:'帐号不存在'
            });
        }
        
        // 校验密码
        if(md5(req.body.password) !== ret.password){
            return res.status(200).json({
                code:2,
                message:'密码不正确'
            });
        }

        // 登陆成功
        req.session.user = ret;
        res.status(200).json({
            code:0,
            message:'登陆成功'
        });
    });
}
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
            // 存储用户数据到session
            req.session.user = {
                ...req.body,
                id:ret.insertId
            }
            return res.status(200).send({
                code:3,
                message:'注册成功'
            });
        }
    });
}
exports.signout = (req, res)=>{}


