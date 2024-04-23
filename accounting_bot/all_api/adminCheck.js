const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TG_TOKEN; // Replace with your own bot token
const bot = new TelegramBot(token);

export default async function checkIfUserIsAdmin(msg){
    const chat_Id = msg.chat.id;
    const user_id = msg.from.id;

    try{
        const ChatMember = await bot.getChatMember(chat_Id, user_id); //check user is member
        if(
            ChatMember.status === 'administrator' || ChatMember.status === 'creator'
        ){
            // bot.sendMessage(chat_Id, 'You are an administrator');
            return 1;
        } else {
            // bot.sendMessage(chat_Id, 'You are not an administrator');
            return 1;
        }
    } catch(err){
        console.log('error message', error)
        throw error;
    }
}