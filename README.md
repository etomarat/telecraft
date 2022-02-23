# telecraft
A bot that forwards messages from minecraft chat to telegram and vice versa.

# How to install
## Prerequisites

- You need to install Node JS and NPM. see: https://nodejs.org/
- You need to get a telegram token via https://t.me/BotFather

### 1. Installing requirements

- Clone this repo:
```
git clone https://github.com/etomarat/telecraft.git && cd telecraft
```
- Install dependencies
```
npm install
```

### 2. Setting up config file
- Copy example settings
```
cp .env.example .env
```
- Edit `.env` file with you data. For example:
```
HOST=localhost
PORT=25565
USERNAME="чатбот"
PASSWORD=
AUTH=
LANG_FILE="./minecraft/lang/ru_ru.json"
TELEGRAM_TOKEN="YOU TOKEN HERE"
```
  - PASSWORD and AUTH fields can be empty.
  - The USERNAME field supports unicode.
  - telecraft comes with two language packs: en_us and ru_ru. Need more? [see this](https://github.com/InventivetalentDev/minecraft-assets/blob/1.18.1/assets/minecraft/lang/)

### 3. Deploy
- Localy or testing
```
node index.js
```
- On the server side
```
#todo
```
### 4. How to use
- Add your bot to group-chat or text him in a pm
- Available command list:
```
/start — start forwarding messages from minecraft chat here'
/stop — stop it'
/say message — send message to minecraft chat'
/reg username — set your username for /say , otherwise it will be username from telegram'
```
