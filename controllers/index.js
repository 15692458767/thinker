exports.index = (req, res)=>{
    // 测试session
    // console.log(req.session.user);
    res.render('index',{
        user:req.session.user
    });
}