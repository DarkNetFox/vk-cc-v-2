const fs = require("fs");

function start(id, callback) {
    callback(JSON.parse(fs.readFileSync(`./ads/${id}.json`, 'utf8')));
}

module.exports = {
    start
}