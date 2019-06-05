
const  mysql = require('mysql');

const {dbConfig} = require('../config');

const pool = mysql.createPool(dbConfig);

function getConnection(){
    return new Promise((resolve, reject)=>{
        pool.getConnection((err, connection)=>{
            if(err){
                return reject(err);
            }
            resolve(connection);
        });
    });
}

exports.query = async (...args)=>{
    const connection = await getConnection();
    return new Promise((resolve, reject)=>{
        connection.release(); 
        connection.query(...args, (err, result)=>{
            if(err){
                return reject(err)
            }
            resolve(result);
        })
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