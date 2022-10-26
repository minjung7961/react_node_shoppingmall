// "use strict";
function exec_sql(connection, sql, param) {
    return new Promise((resolve, reject) => {
        if (!param) {
            connection.query(sql, function (err, res) {
                if(err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        } else {
            connection.query(sql, param, function (err, res) {
                if(err) {
                    reject(err)
                } else {
                    resolve(res)
                }
            })
        }
    });
}

module.exports = exec_sql;