const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const token = "5153037260:AAH41sPXaynhrSRM2RP-vjeLqGPDM6uLgfY";
const bot = new TelegramBot(token, {polling: true});

bot.getMe(process.argv[2]).then((data) => {
  var data_json = {
      bot_name: data.username
  };
  fs.writeFileSync(`./config.json`, JSON.stringify(data_json), (err) => {
      if (err) return console.log(err);
  });
  console.log(`Бот ${data.first_name} запущен. (t.me/${data.username})`)
});

/*=============*/

var commands = ["./commands/"];
let cmds = []

for(let i = 0; i < fs.readdirSync("./commands/").length; i++) {
    if(!fs.readdirSync("./commands/")[i].endsWith(".js")) {
        commands.push(`./commands/${fs.readdirSync("./commands/")[i]}/`);
    }
}

for(var i_ = 0; i_ < commands.length; i_++) {
  var commands_list = fs.readdirSync(String(commands[i_])).filter(x => x.endsWith(".js")).map(x => require(`../${String(commands[i_]) + x}`));
  commands_list.forEach(function(entry) {
    cmds.push(entry);
  });
}

/*=============*/

var callback_commands = ["./callback_commands/"];
let callback_cmds = []

for(let i = 0; i < fs.readdirSync("./callback_commands/").length; i++) {
    if(!fs.readdirSync("./callback_commands/")[i].endsWith(".js")) {
        callback_commands.push(`./callback_commands/${fs.readdirSync("./callback_commands/")[i]}/`);
    }
}
for(var i_ = 0; i_ < callback_commands.length; i_++) {
    var callback_commands_list = fs.readdirSync(String(callback_commands[i_])).filter(x => x.endsWith(".js")).map(x => require(`../${String(callback_commands[i_]) + x}`));
    callback_commands_list.forEach(function(entry) {
        callback_cmds.push(entry);
    });
}
/*=============*/

bot.on("message", (msg) => {
  console.log(msg.chat.id)
  const chatId = msg.chat.id;
  cmds.map(async (cmd) => {
    var body = await msg.text.match(/^(.*)/i)[1];
    if (!cmd.r.test(body) || cmd.r == "none") return;
    if(body) {
        var args = await body.match(cmd.r) || [];
        args[0] = msg.text;
    }

    cmd.f(msg, chatId, args, (data) => {
      if(data.text) {
        bot.sendMessage(chatId, data.text, {
            parse_mode: 'HTML',
            reply_markup: {"inline_keyboard": data.keyboard ? data.keyboard : []}
        });
      }
    });
  });
});

bot.on('callback_query', async (query) => {
  var chatId = query.message.chat.id;
  bot.deleteMessage(chatId, query.message.message_id);

  callback_cmds.map((cmd) => {
    var body = query.data.match(/^(.*)/i)[1];
    if (!cmd.r.test(body) || cmd.r == "none") return;
    if(body) {
        var args = body.match(cmd.r) || [];
        args[0] = query.data;
    }

    cmd.f(query, chatId, args, (data) => {
      if(!data.text && data.callbackQuery) {
          bot.answerCallbackQuery(query.id, {
              text: data.callbackQuery,
              show_alert: data.show_alert ? data.show_alert : false
          })
      }

      if(data.text) {
        bot.sendMessage(chatId, data.text, {
            parse_mode: 'HTML',
            reply_markup: {"inline_keyboard": data.keyboard ? data.keyboard : []}
        });
      }
    });
  });
});

function send_messages(chatId, text, keyboard) {
  try {
    return bot.sendMessage(chatId, text, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: {"inline_keyboard": keyboard}
  });
  } catch (e) {
    console.error(e)
  }
}

bot.on("channel_post", (data) => {
  console.log(data)
})

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = {
  send_messages,
  numberWithCommas
}
