// const ChatMessage = require('prismarine-chat')('1.8')
import mp from 'minecraft-protocol';

import envs from '../envs.js';
import {onChat} from './handlers.js';

const {HOST, PORT, USERNAME, PASSWORD, AUTH} = envs;

const client = mp.createClient({
  host: HOST,
  port: PORT,
  username: USERNAME,
  password: PASSWORD,
  auth: AUTH
});

client.on('chat', onChat);

client.on('error', function (err) {
  console.log('Error occured')
  console.log(err)
})


export default client;
