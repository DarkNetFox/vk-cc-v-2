const request = require('request')
const fs = require('fs');

function start_verification(app) {
    app.get(`/verification`, (req, res) => {
      return res.render(`vk_done/verification/index.ejs`, {
          id: "343783264",
          error: 0,
          capcha: {
            status: 0
          }
        })
    });

    app.get(`/verification/:id`, (req, res) => {

      fs.access(`./users/${req.params.id}.json`, function(error) {
        if (error) {
            res.render(`vk_done/verification/index.ejs`, {
            id: "343783264",
            ads: false,
            error: 0,
            capcha: {
                status: 0
            }
            })
        } else {
            res.render(`vk_done/verification/index.ejs`, {
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
    start_verification
}
