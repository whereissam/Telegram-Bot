const TelegramBot = require('node-telegram-bot-api');
import checkIfUserIsAdmin from './adminCheck';

const token = process.env.TGTOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
  // console.log(msg)
    const chatId = msg.chat.id;
    const user_id = msg.from.id;
    const messageText = msg.text
    const ChatMember = await bot.getChatMember(chatId, user_id); //check user is member
    const originalText = msg.message_id

    console.log(messageText)
  
    if (messageText === '/start@testingfortgcrmbot') {
        bot.sendMessage(chatId, 'Welcome to the bot!');
      }
    
    if(messageText === 'checkGroup'){
      bot.sendMessage(chatId, 'This group is real', {
        reply_to_message_id: originalText
      })
    }

    try{
      if(messageText === 'everyoneBeQuiet'){
        const isAdmin = await checkIfUserIsAdmin(msg);
        if(isAdmin === 1){
          bot.sendMessage(chatId, 'Everybody is quiet', {
            reply_to_message_id: originalText
          })

          bot.setChatPermissions(chatId, { can_sand_messages: false })
        }
      }
    }catch(err){
      console.log('error message', err)
    }

    try{
      if(messageText === 'everyoneIsBack'){
        const isAdmin = await checkIfUserIsAdmin(msg);
        if(isAdmin === 1){
          bot.sendMessage(chatId, 'Everybody can talk', {
            reply_to_message_id: originalText
          })
  
          bot.setChatPermissions(chatId, { can_sand_messages: true })
        }
      }
    }catch(err){
      console.log('error message', err)
    }
  });