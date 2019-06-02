const {query} = require('../utilities/db_helper');

exports.getAll = callback =>{
    const sql = "select * from topic_category";
    query(sql, callback);
} 