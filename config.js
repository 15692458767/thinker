// 创建数据库连接池的配置文件

module.exports = {
    dbConfig:{
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'guest',
        connectionLimit: 10
    }
}