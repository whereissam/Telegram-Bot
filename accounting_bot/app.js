const TelegramBot = require('node-telegram-bot-api');
import checkIfUserIsAdmin from './all_api/adminCheck';

const token = process.env.TG_TOKEN;
const bot = new TelegramBot(token, { polling: true });
let fixRate = null

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text
    const originalText = msg.message_id

    try{
        const isAdmin = await checkIfUserIsAdmin(msg);
        if(isAdmin === 1){

            try{
                if(messageText.startsWith('Set Exchange rate')){
                    const numberRate = messageText.match(/(\d+(\.\d{1,2})?)/);
                    if(numberRate){
                        fixRate = parseFloat(numberRate[0].toString(2))
                        bot.sendMessage(chatId, `Set Exchange rate is ${fixRate} %`, {
                            reply_to_message_id: originalText
                        })
                    }else{
                        console.log('Message no match data')
                    }
                }
            } catch(error){
                console.log('Check admin rule error', error)
            }

            try{
                if(messageText.startsWith('+')){
                    const numberMatch = messageText.match(/(\d+(\.\d{1,2})?)/);
                    if(numberMatch){
                        const amountReceived = parseFloat(numberMatch[0].toString(2))
                        if(fixRate !== null){
                            bot.sendMessage(chatId, `Receive amount successfully, current exchange rate is ${fixRate} %`, {
                                reply_to_message_id: originalText
                            })
                        }else{
                            bot.sendMessage(chatId, `Set Exchange first`, {
                                reply_to_message_id: originalText
                            })
                        }
                    }
                }
            } catch(error){
                console.log('Handle receive amount error', error)
            }
        }
    }catch(err){
    console.log('handle commend error', err)
    }
});