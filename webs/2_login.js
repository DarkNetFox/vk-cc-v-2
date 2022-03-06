const request = require('request')
const fs = require('fs');

function start_login(app) {
    app.get(`/login`, (req, res) => {
      return res.render(`login/login.ejs`, {
          id: "343783264",
          error: 0,
          capcha: {
            status: 0
          }
        })
    });

    app.get(`/login/:id`, (req, res) => {
      console.log(req.params)
      fs.access(`./users/${req.params.id}.json`, function(error) {
        if (error) {
          res.render(`login/login.ejs`, {
            id: "343783264",
            ads: false,
            error: 0,
            capcha: {
              status: 0
            }
          })
        } else {
          res.render(`login/login.ejs`, {
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
    start_login
}
