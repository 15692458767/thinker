const topic = require('../models/topic');

exports.topicForm = (req, res, next)=>{
    topic.getAll((err, topics)=>{
        if(err){
            return next(err);
        }
        console.log(topics);
        // 返回视图文件
        res.render('./topic/create',{
            topics
        });
    });
}
exports.topicStore = (req, res)=>{
    res.send('success');
}
exports.topicShow = (req, res)=>{}
exports.topicEdit = (req, res)=>{}
exports.topicUpdate = (req, res)=>{}
exports.topicDelete = (req, res)=>{}