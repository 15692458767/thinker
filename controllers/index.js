// 引入话题模型
const topic = require('../models/topic');

exports.index = (req, res, next)=>{
    // 调用模型方法获取所有的话题
    topic.getAll((err, result)=>{
        if(err){
            return next(err);
        }
        res.render('index', {
            data:result
        });
    });
}