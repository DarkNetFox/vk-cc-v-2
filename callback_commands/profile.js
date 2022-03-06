var get_user = require("../functions/get_user"),
    save_user = require("../functions/save_user");

module.exports = {
	r: /^(profile)$/i,
	f: function (msg, chatId, args, data) {
        get_user.start(chatId, (info) => {
            data({
                text: `<b>🥷🏽 Профиль </b>\n<b>🏷 Имя:</b> ${info.name}\n<b>🗄 Пустых ячеек:</b> ${numberWithCommas(info.cells.hacked)}\n<b>💀 Взломанных аккаунтов:</b> ${numberWithCommas(info.hacked_accounts)}`,
                keyboard: [[{"text": `◀️ Назад`, callback_data: "other"},{"text": `⏪ Меню`, callback_data: "menu"}]]
            });

            return save_user.start(chatId, info);
        });
	},
	desc: "",
	rights: 0,
	type: "all"
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}