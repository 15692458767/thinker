const topic = require('../models/topic');

module.exports = (req, res, next)=>{
    const id = req.params.topicID;
    // 根据id查询出话题，判断当前用户的id是否匹配话题的所有者id
    topic.getById(id,(err, result)=>{
        if(err){
            return next(err);
        }
        if(!result){
            return res.status(200).json({
                code:1,
                message:'资源不存在'
            });
        }
        if(result.userId !== req.session.user.id ){
            return res.status(200).json({
                code:2,
                message:'Bad Boy'
            });
        }
        // *****//
        next();
        // ***** //
    });
}