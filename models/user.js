// 引入
const Sequelize = require('sequelize');

// 引入ORM
const model = require('../utilities/db_orm');

// 定义砸开
module.exports = model.define('users', {
    // attributes定义模型的属性
    email: {type: Sequelize.STRING},
    password: {type: Sequelize.STRING},
    nickname: {type: Sequelize.STRING},
    avatar: {type: Sequelize.STRING},
    bio: {type: Sequelize.STRING},
    gender: {type: Sequelize.BOOLEAN},
    birthday: {type: Sequelize.DATE},
    isDeleted: {type: Sequelize.BOOLEAN,defaultValue:false}
  });





// const {query} = require('../utilities/db_helper');
// const moment = require('moment');

// module.exports = class User{
//     constructor({
//         nickname,
//         password,
//         email,
//         createdAt = moment().format('YYYY-MM-DD HH:mm:ss')
//     }){
//         this.nickname = nickname
//         this.password = password
//         this.email = email
//         this.createdAt = createdAt
//     }
//     static async findByEmail(email){
//         return query("select * from users where email = ?", [email])
//     }

//     static async findByName(nickname){
//         return query("select * from users where nickname = ?", nickname);
//     }

//     async store(){
//         return query("insert into users set id = default,?", this);
//     }
// }











// exports.findByEmail = (email, callback)=>{
//     let sql = "select * from users where email = ?";
//     query(sql,[email],(err,result)=>{
//         if(err){
//             return callback(err);
//         }
//         // console.log(result);
//         return callback(null,result[0]);
//     });
// }

// exports.findByNickname = (nickname, callback)=>{
//     let sql = "select * from users where nickname = ?";
//     query(sql,[nickname],(err,result)=>{
//         if(err){
//             return callback(err);
//         }
//         // console.log(result);
//         return callback(null, result[0]);
//     });
// }

// exports.store = (content,callback)=>{
//     content.createdAt = null;
//     let sql = "insert into users set id = default,?";
//     query(sql,[content],(err,result)=>{
//         if(err){
//             return callback(err);
//         }
//         callback(null, result);
//     });
// }