const fs = require("fs");

function start(id, data) {
    fs.writeFileSync(`./ads/${id}.json`, JSON.stringify(data), (err) => {
        if (err) return console.log(err);
    })
}

module.exports = {
    start
}