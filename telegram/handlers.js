import {forEach} from './db.js'
import bot from './index.js'

export const sendToChats = (msg) => {
  forEach('chats', (chatId, isAllowed) => {
    if (isAllowed) {
      bot.sendMessage(chatId, msg);
    }
  })
}
