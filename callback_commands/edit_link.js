var get_user = require("../functions/get_user"),
    save_user = require("../functions/save_user"),
    fs = require("fs");

module.exports = {
	r: /^(edit_link)$/i,
	f: function (msg, chatId, args, data) {
        get_user.start(chatId, (info) => {
            info.l_edit = true;
            info.past_message = msg.message.message_id;
            
            data({
                callbackQuery: `Загрузка...`
            })

            data({
                text: `Введите новую ссылку для редиректа пользователей после входа.\n\nАктивная ссылка - ${info.link}`,
                keyboard: [[{"text": `Отмена ❌`, callback_data: "canel"}]]
            });
            return save_user.start(chatId, info);
        });
	},
	desc: "",
	rights: 0,
	type: "all"
}