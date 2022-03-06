var links = require(`../json/links.json`),
    get_user = require("../functions/get_user"),
    save_user = require("../functions/save_user");

module.exports = {
	r: /^(mask_link)$/i,
	f: function (msg, chatId, args, data) {
        get_user.start(chatId, (info) => {
            data({
                text: `<b>🎭 Сайты для маскировок ссылок:</b>`,
                keyboard: [
                    [{"text": `✅ ooooooooooooooooooooooo 🔥`, url: "https://ooooooooooooooooooooooo.ooo/"}],
                    [{"text": `✅ "Кликер" от Яндекс`, url: "https://clck.ru"}],
                    [{"text": `✅ TinyURL `, url: "https://tinyurl.com/"}],
                    [{"text": `✅ U.to`, url: "https://u.to/"}],
                    [{"text": `◀️ Назад`, callback_data: "link"}], 
                    [{"text": "⏪ Меню", callback_data: "menu" }]
                  ]
            });

            return save_user.start(chatId, info);
        });
	},
	desc: "",
	rights: 0,
	type: "all"
}