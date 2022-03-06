var get_user = require("../functions/get_user"),
    save_user = require("../functions/save_user"),
    options = require("../json/options.json");

module.exports = {
	r: /^(cells)$/i,
	f: function (msg, chatId, args, data) {
        get_user.start(chatId, (info) => {
            data({
                text: `<b>📂 Информация о покупке ячеек</b>\n<b>🪙 Цена:</b> ${options.price}₽\n<b>🗄 Количество ячеек:</b> ${options.amount}\n\n<b>✅ Доступно ячеек для заполнения:</b> ${numberWithCommas(info.cells.hacked)}`,
                keyboard: [
                    [{"text": `Условия 📃 `, callback_data: "cells_info"}],
                    [{"text": `Приобрести ✅`, callback_data: "get_buy_cells_link"}],
                    [{"text": `◀️ Назад`, callback_data: "menu"}],
                  ]
            })

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