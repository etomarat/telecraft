import TelegramBot from 'node-telegram-bot-api';

import {set, get} from './db.js';
import envs from '../envs.js';
import {sendMessage} from '../minecraft/handlers.js'

const {TELEGRAM_TOKEN} = envs;
const bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});


bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  set('chats', chatId, true)
});
bot.onText(/\/stop/, (msg) => {
  const chatId = msg.chat.id;
  set('chats', chatId, false)
});
bot.onText(/\/reg (.+)/, (msg, match) => {
  const username = match[1];
  const userId = msg.from.id
  set('users', userId, username)
});

bot.onText(/\/say (.+)/, (msg, match) => {
  const {id: userId, username: tgUsername} = msg.from
  const text = match[1];
  const username = get('users', userId) || tgUsername;
  sendMessage(`[${username}] ${text}`)
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  const startCmd = '/start — начать постить из майнкрафта в этот чат'
  const stopCmd = '/stop — перестать постить'
  const sayCmd = '/say сообщение — отправить сообщение в чат майнкрафта'
  const regCmd = '/reg юзернейм — задать своё имя для /say , если не задать то будет username из телеги'
  const extraText1 = 'Бот работает как в чате так и в личке.'
  const extraText2 = 'Принимаются пулл-реквесты: https://github.com/etomarat/telecraft'
  bot.sendMessage(chatId, `${startCmd}\n${stopCmd}\n${sayCmd}\n${regCmd}`);
});

bot.on("polling_error", (msg) => console.log(msg));


export default bot
