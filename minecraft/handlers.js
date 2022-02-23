import fs from 'fs';
import sprintf from 'sprintfjs';

import envs from '../envs.js';
import {sendToChats} from '../telegram/handlers.js'
import client from './index.js';

const {LANG_FILE, USERNAME} = envs;

const langFile = JSON.parse(fs.readFileSync(LANG_FILE, 'utf8'));

const eventsStopList = [
  'chat.type.announcement',
  'chat.type.text',
  'death.attack.mob',
  'death.attack.arrow',
]

export const onChat = (packet) => {
  client.write('client_command', { payload: 0 })
  var jsonMsg = JSON.parse(packet.message);
  const {translate, with: withArr} = jsonMsg;
  if(eventsStopList.includes(translate)) {
    const username = jsonMsg.with[0].text;
    if(username === USERNAME) {
      return
    };
  }
  const textTemplate = langFile[translate];
  const valuesArr = withArr?.map(ent => ent.text ?? langFile[ent.translate]) ?? []
  const result = sprintf(textTemplate, ...valuesArr);
  console.log('mc', result);
  sendToChats(result);
  return result;
}

export const sendMessage = (message) => {
  client.write('client_command', { payload: 0 })
  console.log('tg', message);
  if (client.protocolState === 'play') {
    client.write('chat', { message })
  }
}
