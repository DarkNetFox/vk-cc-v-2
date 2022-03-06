var get_user = require("../functions/get_user"),
    save_user = require("../functions/save_user"),
    get_link = require("../functions/get_link"),
    options = require("../json/options.json");

module.exports = {
	r: /^(get_buy_cells_link)$/i,
	f: function (msg, chatId, args, data) {
        get_user.start(chatId, (info) => {
            get_link.start(options.price, info.code_pay, async (link) => {
                data({
                    text: `<b>Оплата</b>\nОплатите покупку по кнопке ниже, затем нажмите на кнопку «Проверить оплату».`,
                    keyboard: [
                        [{"text": `Оплатить`, url: link.payUrl}],
                        [{"text": `Проверить оплату 💬`, callback_data: "check_buy"}],
                        [{"text": `Отмена ❌`, callback_data: "menu"}]
                      ]
                });
              });
            return save_user.start(chatId, info);
        });
	},
	desc: "",
	rights: 0,
	type: "all"
}