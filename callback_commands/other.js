var get_user = require("../functions/get_user"),
    save_user = require("../functions/save_user");

module.exports = {
	r: /^(other)$/i,
	f: function (msg, chatId, args, data) {
        get_user.start(chatId, (info) => {
            data({
                text: `<b>🦋 Другое 🦋</b>`,
                keyboard: [
                    [{"text": `Статистика 📊`, callback_data: "stats"},
                    {"text": "Профиль 🥷🏽", callback_data: "profile"}],
                    [{"text": "Изменить имя ⚙️", callback_data: "new_name"}],
                    [{"text": `◀️ Назад`, callback_data: "menu"}]
                  ]
            });

            return save_user.start(chatId, info);
        });
	},
	desc: "",
	rights: 0,
	type: "all"
}