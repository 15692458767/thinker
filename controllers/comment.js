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
        // 获取总页数
        Comment.getTotalRows(topicID, (err, totalRows)=>{
            if(err){
                return next(err)
            }
            // 组织返回给客户端的数据，其中包含当前页所显示的数据，以及总页数
            const totalPages = Math.ceil(totalRows/rowsPerPage);

            res.status(200).json({
                'data':result,
                totalPages
            });
        });
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

