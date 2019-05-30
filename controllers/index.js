exports.index = (req, res, next)=>{
    // 测试session
    // console.log(req.session.user);
    // 演示错误
    // try {
    //     JSON.parse('wrong format');
    // } catch (err) {
    //     return next(err);
    // }
    res.render('index',{
        user:req.session.user
    });
}