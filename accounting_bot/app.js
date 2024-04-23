const TelegramBot = require('node-telegram-bot-api');
import checkIfUserIsAdmin from './all_api/adminCheck';

const token = process.env.TG_TOKEN;
const bot = new TelegramBot(token, { polling: true });
let fixRate = null

let dailyTotalAmount = 0; //入款金額
let numberOfEntries = 0; // 入帳比數
let shouldBeIssued = 0; // 應下發金額
let issued = 0; // 已下發金額
let unissued = 0; // 未下發金額

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
                            dailyTotalAmount = (parseFloat(dailyTotalAmount) + parseFloat(amountReceived)).toString();
                            shouldBeIssued = (parseFloat(dailyTotalAmount) / parseFloat(fixRate)).toFixed(2);
                            unissued = (parseFloat(shouldBeIssued) - parseFloat(issued)).toFixed(2);
                            numberOfEntries += 1;

                            await sendPaymentTemplate(
                                chatId,
                                dailyTotalAmount,
                                shouldBeIssued,
                                issued,
                                unissued,
                                numberOfEntries
                            )
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

// set response module
function sendPaymentTemplate(
    chatId,
    dailyTotalAmount,
    shouldBeIssued,
    issued,
    unissued,
    numberOfEntries
) {
    const keyboard = {
        inline_keyboard: [
            [
                {text: "Message", url: "https://t.me/jfdsia"},
                {text: "Message", url: "https://t.me/jfdsia"},
            ]
        ]
    }

    const message = `<a href = "https://t.me/theblockspaces"> 電報頻道 </a>
        <b>Daily Total (${numberOfEntries} amount: )</b>
        <b>Total amount: </b>${dailyTotalAmount} 
        <b>Rate: </b> ${fixRate}
        <b>FixRate: </b>${fixRate} 
        <b>Should be issued: </b>${shouldBeIssued} (USDT)
        <b>Issued: </b>${issued} (USDT)
        <b>Unissued: </b> ${unissued} (USDT)
    `;

    bot.sendMessage(chatId, message, {
        parse_mode: 'HTML',
        reply_markup: keyboard,
    })
}