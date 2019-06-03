module.exports = (req, res, next)=>{

    // 如果没登陆，可能是还没有登陆，
    // 还可能是登陆状态超时，
    // 还可能是cookie被清掉
    if(!req.session.user){

        // 获取请求的类型
        const asynReq = req.get('X-Requested-With');
        // 如果是异步请求
        if(asynReq && asynReq === 'XMLHttpRequest'){
            // 则返回状态码，将前端ajax处理
            return res.sendStatus(401);
        }

        // 如果是同步则，服务器直接返回重定向
        return res.redirect('/signin');
    }

    // 需要设置next()，不然在登陆成功后状态，访问topic/create不会向后继续
    // 因为authen，在topicForm方法之前
    next();
}
