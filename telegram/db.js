import Dirty from 'dirty';

const chatsDb = new Dirty('./db/chats.db');
const usersDb = new Dirty('./db/users.db');

const dictState = {
  chats: {
    loaded: false,
    db: chatsDb
  },
  users: {
    loaded: false,
    db: usersDb
  },
}

chatsDb.on('load', () => dictState.chats.loaded = true)
usersDb.on('load', () => dictState.users.loaded = true)


export const set = (dbName, key, value) => {
  const {loaded, db} = dictState[dbName];
  if (loaded) {
    db.set(key, value);
  }
}

export const get = (dbName, key, value) => {
  const {loaded, db} = dictState[dbName];
  if (loaded) {
    return db.get(key);
  }
  return false;
}

export const forEach = (dbName, cb) => {
  const {loaded, db} = dictState[dbName];
  if (loaded) {
    db.forEach(cb)
  }
}
