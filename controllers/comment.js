// 引入Comment模块
const Comment = require('../models/comment');

exports.store = (req, res, next)=>{
    // res.send(req.path);
    const {topicID} = req.params;
    const {content} = req.body;
    const userId = req.session.user.id;

    new Comment({topicID, content, userId}).save((err, result)=>{
        if(err){
            return next(err)
        }
        res.status(200).json({
            code:0,
            message:'success'
        });
    });
}
exports.list = (req, res, next)=>{
    const {topicID} = req.params;
    // 处理分页数据
    const curPage = req.query.curPage || 1;
    const rowsPerPage = 2;
    // 组织分页数据与当前话题id
    let options = {
        curPage,
        rowsPerPage,
        topicID
    }
    // 传递option参数
    Comment.getCommentByTopicId(options, (err, result)=>{
        if(err){
            return next(err);
        }
        res.status(200).json(result);
    })
}
exports.edit = (req, res, next)=>{
    res.send(req.path);
}
exports.update = (req, res, next)=>{
    res.send(req.path);
}
exports.delete = (req, res, next)=>{
    res.send(req.path);
}

