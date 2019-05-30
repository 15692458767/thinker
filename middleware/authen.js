module.exports = (req, res, next)=>{

    if(!req.session.user){
        return res.redirect('/signin');
    }

    // 需要设置next()，不然在登陆成功后状态，访问topic/create不会向后继续
    // 因为authen，在topicForm方法之前
    next();
}
