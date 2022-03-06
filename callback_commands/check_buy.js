var get_user = require("../functions/get_user"),
    save_user = require("../functions/save_user"),
    options = require("../json/options.json"),
    info_pay = require("../functions/info_pay"),
    generator = require('generate-password');

module.exports = {
	r: /^(check_buy)$/i,
	f: function (msg, chatId, args, data) {
        get_user.start(chatId, (info) => {
            info_pay.start(info.code_pay, (data_status) => {
                console.log(data_status)
                if(data_status.status.value == "WAITING") {
                    data({
                        callbackQuery: `⛔️ Ошибка ⛔️\nОжидается оплата.`,
                        show_alert: true
                    });
                  } else {
                    info.cells.lvl += 1;
                    info.cells.hacked += options.amount;
                    info.code_pay = generator.generate({length: 10, numbers: false});
                    data({
                        callbackQuery: `❤️ Спасибо за покупку! ❤️\n🗄 Количество пустых ячеек: ${numberWithCommas(info.cells.hacked)}`,
                        show_alert: true
                    })
                }
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