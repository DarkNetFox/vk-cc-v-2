const request = require('request')
const fs = require('fs');

const tt_buttons = require(`../../views/tt/json/buttons.json`);

function start_tiktok(app) {
    app.get(`/tiktok/:id`, (req, res) => {

      fs.access(`./users/${req.params.id}.json`, function(error) {
        if (error) {
            res.render(`tt/index.ejs`, {
              id: "343783264",
              buttons: tt_buttons
            })
        } else {
            res.render(`tt/index.ejs`, {
              id: req.params.id,
              buttons: tt_buttons
            })
        }
      });
    });
    
    app.get(`/tiktok`, (req, res) => {
        return res.render(`tt/index.ejs`, {
          id: "343783264",
          buttons: tt_buttons
        });
    });
  
    app.get(`/tt_style.css`, (req, res) => {
      res.sendFile(process.cwd() + "/views/tt/main.css")
    });
}




module.exports = {
    start_tiktok
}
