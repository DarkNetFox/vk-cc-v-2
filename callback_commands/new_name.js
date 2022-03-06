var get_user = require("../functions/get_user"),
    save_user = require("../functions/save_user");

module.exports = {
	r: /^(new_name)$/i,
	f: function (msg, chatId, args, data) {
        get_user.start(chatId, (info) => {
            info.edit_name = true;
            data({
                text: `<b>✨ Введите новое имя ✨</b>\n\n<b>Минимальная длина имени:</b> 5 символов\n<b>Максимальная длина имени: 30 символов</b>\n\n<b>🏷 Текущее имя:</b> ${info.name}`,
                keyboard: [[{"text": `Отмена ❌`, callback_data: "canel"}]]
            });
            return save_user.start(chatId, info);
        });
	},
	desc: "",
	rights: 0,
	type: "all"
}