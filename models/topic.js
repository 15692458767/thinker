const {query} = require('../utilities/db_helper');

/** 
//  注意：解决之前的疏忽，导致的逻辑问题
// 对topic_category的操作应该放在topic_category模型中
// 所以创建topic_category模型，移到其中
// exports.getAll = callback =>{
//     const sql = "select * from topic_category";
//     query(sql, callback);
// }
**/ 

exports.store = (content, callback) =>{
    const sql = "insert into topics set id=default,?";
    query(sql, [content], (err, result)=>{
        if(err){
            return callback(err)
        }
        callback(null, result);
    });
}

exports.getById = (id, callback)=>{
    const sql = "select * from topics where id=?";
    query(sql, [id], (err, result) =>{
        if(err){
            return callback(err);
        }
        callback(null, result[0]);
    });
}

exports.delete = (id, callback)=>{
    const sql = "delete from topics where id=?";
    query(sql, [id], (err, result) =>{
        if(err){
            return callback(err);
        }
        callback(null, result);
    });
}

exports.update = (id, topic, callback)=>{
    const sql = "update topics set title=?,content=?,categoryId=? where id=?";
     
    query(sql, [topic.title,topic.content,topic.categoryId,id], (err, result) =>{
        if(err){
            return callback(err);
        }
        callback(null, result);
    });
}

