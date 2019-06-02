
const  mysql = require('mysql');

const {dbConfig} = require('../config');

const pool = mysql.createPool(dbConfig);

exports.query = (...args)=>{

    const callback = args.pop();

    pool.getConnection((err, connection)=>{
        if(err){
            return callback(err);
        }

        connection.query(...args,(...params)=>{
            // 释放连接
            connection.release();
            
            callback(...params);
        });
    });
}
exports.whereBuilder = (conditions={})=>{
    let where = " where 1=1";
    for(let key in conditions){
        if(conditions[key]){
            where += ` and ${key}='${conditions[key]}'`;
        }
    }
    return where;
}