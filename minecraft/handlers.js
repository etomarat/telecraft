import fs from 'fs';
import sprintf from 'sprintfjs';

import envs from '../envs.js';
import { sendToChats } from '../telegram/handlers.js'
import client from './index.js';

const { LANG_FILE, USERNAME } = envs;

const langFile = JSON.parse(fs.readFileSync(LANG_FILE, 'utf8'));

const eventsStopListForBot = [
  'chat.type.announcement',
  'chat.type.text'
]
const eventsStopListForPlayers = [
  'sleep.players_sleeping',
]

const renderDeepStrings = (jsonMsg, tmplString) => {
  let needDeep = false;
  const {with: withArr, translate} = jsonMsg;
  const textTemplate = tmplString ?? langFile[translate];
  const valuesArr = withArr?.map(ent => {
    if (ent.with) {
      needDeep = ent
    }
    return ent.text ?? langFile[ent.translate]
  }) ?? []
  let result = sprintf(textTemplate, ...valuesArr);
  if (needDeep) {
    result = renderDeepStrings(needDeep, result);
  }
  return result
}

export const onChat = (packet) => {
  client.write('client_command', { payload: 0 })
  var jsonMsg = JSON.parse(packet.message);
  const { translate, with: withArr } = jsonMsg;
  console.log('jsonMsg', packet.message)

  if (eventsStopListForPlayers.includes(translate)) {
    return;
  }

  if (eventsStopListForBot.includes(translate)) {
    const username = jsonMsg.with[0].text;
    if (username === USERNAME) {
      return
    };
  }

  const result = renderDeepStrings(jsonMsg)
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
