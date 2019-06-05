const user = require('../models/user.js');
// 引入md5
const md5 = require('blueimp-md5');

exports.signinForm = (req, res)=>{
    res.render('signin');
}
exports.signin = async (req, res, next)=>{
    try{
        const [ret] = await user.findByEmail(req.body.email);

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
    }catch(err){
        next(err);
    }
}

exports.signupForm = (req, res)=>{
    res.render('signup');
}
exports.signup = async (req, res)=>{
    try{
        if((await user.findByEmail(req.body.email))[0]){
            return res.status(200).json({
                code:1,
                message:'邮箱被占用'
            });
        }
        if((await user.findByName(req.body.nickname))[0]){
            return res.status(200).json({
                code:2,
                message:'昵称被占用'
            });
        }

        const userInfo = await new user(req.body).store();
        // 如果验证通过调用 对密码进行md5加密
        req.body.password = md5(req.body.password);

        new user(req.body).store();
        // 存储用户数据到session
        req.session.user = {
            ...req.body,
            id:userInfo.insertId
        }
        return res.status(200).send({
            code:3,
            message:'注册成功'
        });
    }catch(err){
        next(err);
    }
}
exports.signout = (req, res)=>{
    // 删除session 通过删除对象的属性
    delete req.session.user

    // 转向登陆页
    res.redirect('/signin');

}


