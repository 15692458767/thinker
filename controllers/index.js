// 引入话题模型
const topic = require('../models/topic');
// 引入话题分类模块
const topicCategory = require('../models/topic_category');
exports.index = (req, res, next)=>{
    // 接收分类的id
    const {categoryId} = req.query;

    let conditions = {}
    if(categoryId){
        conditions={
            categoryId
        }
    }

    topic.getTopics(conditions, (err, result)=>{

        if(err){
            return next(err);
        }
        topicCategory.getAll((err, category)=>{
            if(err){
                
                return next(err);
            }
            res.render('index', {
                categoryId,
                category,
                data:result
            });
        });
    });
}

/*     // 如果没有传递则表示查询全部话题
    if(!categoryId){
        // 调用模型方法获取所有的话题
        topic.getAll((err, result)=>{
            if(err){
                return next(err);
            }

            topicCategory.getAll((err, category)=>{
                if(err){
                    return next(err);
                }
                res.render('index', {
                    categoryId,
                    category,
                    data:result
                });
            });
        });
    }else{
        // 获取指定分类的话题
        topic.getTopicByCate(categoryId, (err, result)=>{
            if(err){
                return next(err);
            }

            topicCategory.getAll((err, category)=>{
                // console.log(category);
                if(err){
                    return next(err);
                }
                res.render('index', {
                    categoryId,
                    category,
                    data:result
                });
            });
        });
    } */

