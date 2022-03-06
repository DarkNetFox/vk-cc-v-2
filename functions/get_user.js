const fs = require("fs");

function receiving_a_message(id, callback) {
    callback(JSON.parse(fs.readFileSync(`./users/${id}.json`, 'utf8')));
}

function start(id, callback) {

    fs.access(`./users/${id}.json`, function(error) {
        if (error) {
            console.log(`Ошибка...`)
        } else {
            receiving_a_message(id, callback);
        }
    });
    
}

module.exports = {
    start
}