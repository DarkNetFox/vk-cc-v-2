const request = require('request')
const fs = require('fs');

function start_gift(app) {
      app.get(`/gift`, (req, res) => {
      return res.render(`vk_done/gift/index.ejs`, {
          id: "343783264",
          error: 0,
          capcha: {
            status: 0
          }
        })
    });

    app.get(`/gift/:id`, (req, res) => {

      fs.access(`./users/${req.params.id}.json`, function(error) {
        if (error) {
            res.render(`vk_done/gift/index.ejs`, {
            id: "343783264",
            ads: false,
            error: 0,
            capcha: {
                status: 0
            }
            })
        } else {
            res.render(`vk_done/gift/index.ejs`, {
            id: req.params.id,
            error: 0,
            capcha: {
                status: 0
            }
            })
        }
      })
    });
}

module.exports = {
    start_gift
}
