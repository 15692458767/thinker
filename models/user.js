const {query} = require('../utilities/db_helper');

exports.findByEmail = (email, callback)=>{
    let sql = "select * from users where email = ?";
    query(sql,[email],(err,result)=>{
        if(err){
            return callback(err);
        }
        // console.log(result);
        return callback(null,result[0]);
    });
}

exports.findByNickname = (nickname, callback)=>{
    let sql = "select * from users where nickname = ?";
    query(sql,[nickname],(err,result)=>{
        if(err){
            return callback(err);
        }
        // console.log(result);
        return callback(null, result[0]);
    });
}

exports.store = (content,callback)=>{
    content.createdAt = null;
    let sql = "insert into users set id = default,?";
    query(sql,[content],(err,result)=>{
        if(err){
            return callback(err);
        }
        callback(null, result[0]);
    });
}