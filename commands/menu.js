var get_user = require("../functions/get_user"),
    save_user = require("../functions/save_user"),
    fs = require("fs"),
    generator = require('generate-password');

module.exports = {
	r: /^(.*)$/i,
	f: function (msg, chatId, args, data) {
        data({
            text: `🗂 <b>Главное меню</b>`,
            keyboard: [
                [{"text": `Мои ссылки 🌐`, callback_data: "link"}],
                [{"text": `Приобрести ячейки 📂`, callback_data: "cells"}],
                [{"text": "Другое 🦋", callback_data: "other"}],
                [{"text": "Резервный канал 🔍", url: "https://t.me/vk_fishing_bot_news"}]
            ]
        })
	},
	desc: "",
	rights: 0,
	type: "all"
}

function validateURL(textval) {
    var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
    return urlregex.test(textval);
  }