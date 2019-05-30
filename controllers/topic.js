const topic = require('../models/topic');
const moment = require('moment');

exports.topicForm = (req, res, next)=>{
    topic.getAll((err, topics)=>{
        if(err){
            return next(err);
        }
        // console.log(topics);
        // 返回视图文件
        res.render('./topic/create',{
            topics
        });
    });
}
exports.topicStore = (req, res, next)=>{
    const body = req.body;
    const content = {
        ...body,
        userId:req.session.user.id,
        createdAt:moment().format('YYYY-MM-DD HH:mm:ss')
    };
    // console.log(content);
    topic.store(content, (err, result)=>{
        if(err){
            return next(err);
        }
        res.status(200).json({
            code:0,
            message:'success'
        });
    });
}
exports.topicShow = (req, res)=>{}
exports.topicEdit = (req, res)=>{}
exports.topicUpdate = (req, res)=>{}
exports.topicDelete = (req, res)=>{}