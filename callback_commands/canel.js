var get_user = require("../functions/get_user"),
    save_user = require("../functions/save_user");

module.exports = {
	r: /^(canel)$/i,
	f: function (msg, chatId, args, data) {
        get_user.start(chatId, (info) => {
            if(info.l_edit = true) {
              info.l_edit = false;
            }
            if(info.edit_name == true) {
              info.edit_name = false;
            }
    
            data({
                callbackQuery: `Отменено`
            });
            return save_user.start(chatId, info);
        });
	},
	desc: "",
	rights: 0,
	type: "all"
}