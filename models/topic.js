const {query} = require('../utilities/db_helper');

exports.getAll = callback =>{
    const sql = "select * from topic_category";
    query(sql, callback);
}

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

