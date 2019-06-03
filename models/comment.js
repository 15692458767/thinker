const {query} = require('../utilities/db_helper');
const moment = require('moment');

// 定义一个类
module.exports = class Comment{
    // 定义构造函数(JS中类内所有的函数都这样写)
    constructor({
        content,
        userId,
        topicID,
        createdAt = moment().format("YYYY-MM-DD HH:mm:ss")
    }){
        // 初始化就为实例的属性赋值
        this.content = content,
        this.userId = userId,
        this.topicId = topicID,
        this.createdAt = createdAt
    }
    
    //
    save(callback){
        //想调用保存方法就必须实例化对象 
        //实例化对象就必须保存数据到对象的属性上
        //this就会得到对象的属性
        query("insert into topic_comments set ?", this, callback);
    }
    
    // 根据topicID获取所有的评论
    static getCommentByTopicId(options,callback){
        
        let {topicID, curPage, rowsPerPage} = options;
        // 计算偏移量
        let offset = (curPage - 1) * rowsPerPage;

        query("select * from topic_comments where topicId = ? limit ?,?",[topicID, offset, rowsPerPage], callback);
    }
    
    // static的作用是定义静态方法
    // 获取所有评论不需要通过实例化对象，通过类名就可以调用
    static getAll(callback){
        query("select * from topic_comments", callback);
    }

    // 通过id获取评论
    static getCommentById(id, callback){
        query("select * from topic_comments where id = ?", [id], (err, result)=>{
            if(err){
                return callback(err);
            }
            callback(null, result[0]);
        });
    }

    // 更新评论内容
    static updateContent(id, comment, callback){
        query("update topic_comments set content = ? where id = ?", [comment.content, id],callback);
    }

    // 删除评论
    static remove(id, callback){
        query("delete from topic_comments where id = ?", [id],callback);
    }
}
