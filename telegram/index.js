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
  const startCmd = '/start — start forwarding messages from minecraft chat here'
  const stopCmd = '/stop — stop it'
  const sayCmd = '/say message — send message to minecraft chat'
  const regCmd = '/reg username — set your username for /say , otherwise it will be username from telegram'
  const extraText = 'PRs welcome: https://github.com/etomarat/telecraft'
  bot.sendMessage(chatId, `${startCmd}\n${stopCmd}\n${sayCmd}\n${regCmd}\n${extraText}`);
});

bot.on("polling_error", (msg) => console.log(msg));


export default bot
