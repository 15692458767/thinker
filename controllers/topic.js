const topic = require('../models/topic');
const moment = require('moment');
const marked = require('marked');

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
exports.topicShow = (req, res, next)=>{
    // 动态获取路由参数
    // console.log(req.params.topicID)
    const id = req.params.topicID;
    topic.getById(id, (err, result)=>{
        if(err){
            return next(err);
        }
        // 将内容转换为html
        result && (result.content = marked(result.content));
        
        res.render('topic/show', {
            topic:result
        });
    });
}
exports.topicEdit = (req, res, next)=>{
    // 动态获取路由参数
    // console.log(req.params.topicID)
    const id = req.params.topicID;
    topic.getById(id, (err, result)=>{
        if(err){
            return next(err);
        }

        topic.getAll((err, topics)=>{
            if(err){
                return next(err);
            }

            res.render('topic/edit', {
                topic:result,    //当前话题
                topics          //话题类型
            });
        });
        
    });
}
exports.topicUpdate = (req, res, next)=>{
    const id = req.params.topicID;
    const body = req.body;
    topic.update(id, body, (err, result)=>{
        if(err){
            return next(err);
        }
        return res.status(200).json({
            code:0,
            data:{
                redirect:`/topic/${id}`
            },
            message:'success '
        });
    });
    
}
exports.topicDelete = (req, res, next)=>{
    // res.send(req.params.topicID);
    // const id = req.params.topicID;
    // // 根据id查询出话题，判断当前用户的id是否匹配话题的所有者id
    // topic.getById(id,(err, result)=>{
    //     if(err){
    //         return next(err);
    //     }
    //     if(!result){
    //         return res.status(200).json({
    //             code:1,
    //             message:'资源不存在'
    //         });
    //     }
    //     if(result.userId !== req.session.user.id ){
    //         return res.status(200).json({
    //             code:2,
    //             message:'Bad Boy'
    //         });
    //     }
        
    // });
    // 
        topic.delete(id, (err, result)=>{
            if(err){
                return next(err);
            }
            res.status(200).json({
                code:0, 
                message:'success'
            });
        });
}