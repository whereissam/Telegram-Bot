import { Telegraf } from "telegraf";

const token = process.env.TGTOKEN;

const bot = new Telegraf(token);
const { buttons, characters, getRandomQuote } = require("./data.js");

let context = "";
let characterContext = "";


bot.start(async (ctx) => {
   bot.telegram.sendMessage(
     ctx.chat.id,
     `Legendary greetings, ${ctx.from.first_name}! 🍻
 Inspired by the iconic TV show 'How I Met Your Mother', I'm your personal source of legendary quotes from the HIMYM gang. Whether you need a dose of Barney's wit, Ted's romantic musings, Marshal's wisdom, Lily's advice, or Robin's fearless spirit, I've got you covered!
 So suit up, grab a drink, and let's embark on an epic journey of memorable quotes together! Cheers! 🌟🍹"!`,
     {
       reply_markup: {
         inline_keyboard: [
           [{ text: characters[0], callback_data: characters[0] }],
           [{ text: characters[1], callback_data: characters[1] }],
           [{ text: characters[2], callback_data: characters[2] }],
           [{ text: characters[3], callback_data: characters[3] }],
           [{ text: characters[4], callback_data: characters[4] }],
           [{ text: characters[5], callback_data: characters[5] }],
         ],
       },
     }
   );
 });
 
 bot.command("random", (ctx) => {
   const randomCharacter = characters[Math.floor(Math.random() * 4)];
   const quoteData = getRandomQuote(randomCharacter);
   bot.telegram.sendMessage(
     ctx.chat.id,
     `${quoteData.name.split(" ")[0]}: ${quoteData.quote}`,
     {
       reply_markup: {
         keyboard: [[{ text: characters[5] }]],
         resize_keyboard: true,
         is_persistent: true,
       },
     }
   );
 });
 
 bot.on("callback_query", (ctx) => {
   context = ctx.callbackQuery.data;
   if (context === characters[5]) {
     const randomCharacter = characters[Math.floor(Math.random() * 4)];
     const quoteData = getRandomQuote(randomCharacter);
     bot.telegram.sendMessage(
       ctx.chat.id,
       `${quoteData.name.split(" ")[0]}: ${quoteData.quote}`,
       {
         reply_markup: {
           inline_keyboard: [
             [{ text: buttons[2].button, callback_data: buttons[2].button }],
             [{ text: buttons[3].button, callback_data: buttons[3].button }],
           ],
         },
       }
     );
   } else if (characters.includes(context)) {
     characterContext = context;
     const quoteData = getRandomQuote(characterContext);
     bot.telegram.sendMessage(
       ctx.chat.id,
       `${quoteData.name.split(" ")[0]}: ${quoteData.quote}`,
       {
         reply_markup: {
           inline_keyboard: [
             [{ text: buttons[0].button, callback_data: buttons[0].button }],
             [{ text: buttons[1].button, callback_data: buttons[1].button }],
           ],
         },
       }
     );
   }
   // Next Quote
   else if (buttons[0].button === context) {
     const quoteData = getRandomQuote(characterContext);
     bot.telegram.sendMessage(
       ctx.chat.id,
       `${quoteData.name.split(" ")[0]}: ${quoteData.quote}`,
       {
         reply_markup: {
           inline_keyboard: [
             [{ text: buttons[0].button, callback_data: buttons[0].button }],
             [{ text: buttons[1].button, callback_data: buttons[1].button }],
           ],
         },
       }
     );
   }
   // Change Character
   else if (buttons[1].button === context) {
     bot.telegram.sendMessage(
       ctx.chat.id,
       `Sure, ${ctx.from.first_name}! Which character would you like to hear from?`,
       {
         reply_markup: {
           inline_keyboard: [
             [{ text: characters[0], callback_data: characters[0] }],
             [{ text: characters[1], callback_data: characters[1] }],
             [{ text: characters[2], callback_data: characters[2] }],
             [{ text: characters[3], callback_data: characters[3] }],
             [{ text: characters[4], callback_data: characters[4] }],
             [{ text: characters[5], callback_data: characters[5] }],
           ],
         },
       }
     );
   }
   // Random Quote
   else if (buttons[2].button === context) {
     const randomCharacter = characters[Math.floor(Math.random() * 4)];
     const quoteData = getRandomQuote(randomCharacter);
     bot.telegram.sendMessage(
       ctx.chat.id,
       `${quoteData.name.split(" ")[0]}: ${quoteData.quote}`,
       {
         reply_markup: {
           inline_keyboard: [
             [{ text: buttons[2].button, callback_data: buttons[2].button }],
             [{ text: buttons[3].button, callback_data: buttons[3].button }],
           ],
         },
       }
     );
   }
   // Select Character
   else if (buttons[3].button === context) {
     bot.telegram.sendMessage(
       ctx.chat.id,
       `Sure, ${ctx.from.first_name}! Which character would you like to hear from?`,
       {
         reply_markup: {
           inline_keyboard: [
             [{ text: characters[0], callback_data: characters[0] }],
             [{ text: characters[1], callback_data: characters[1] }],
             [{ text: characters[2], callback_data: characters[2] }],
             [{ text: characters[3], callback_data: characters[3] }],
             [{ text: characters[4], callback_data: characters[4] }],
             [{ text: characters[5], callback_data: characters[5] }],
           ],
         },
       }
     );
   }
 });
 
 bot.hears(characters[5], (ctx) => {
   console.log("bot keyboard");
   const randomCharacter = characters[Math.floor(Math.random() * 4)];
   const quoteData = getRandomQuote(randomCharacter);
   bot.telegram.sendMessage(
     ctx.chat.id,
     `${quoteData.name.split(" ")[0]}: ${quoteData.quote}`,
     {
       reply_markup: {
         inline_keyboard: [
           [{ text: buttons[2].button, callback_data: buttons[2].button }],
           [{ text: buttons[3].button, callback_data: buttons[3].button }],
         ],
       },
     }
   );
 });
 
 bot.on("text", (ctx) => {
   bot.telegram.sendMessage(
     ctx.chat.id,
     `Legendary greetings, ${ctx.from.first_name}! 🍻
 Inspired by the iconic TV show 'How I Met Your Mother', I'm your personal source of legendary quotes from the HIMYM gang. Whether you need a dose of Barney's wit, Ted's romantic musings, Marshal's wisdom, Lily's advice, or Robin's fearless spirit, I've got you covered!
 So suit up, grab a drink, and let's embark on an epic journey of memorable quotes together! Cheers! 🌟🍹"!`,
     {
       reply_markup: {
         inline_keyboard: [
           [{ text: characters[0], callback_data: characters[0] }],
           [{ text: characters[1], callback_data: characters[1] }],
           [{ text: characters[2], callback_data: characters[2] }],
           [{ text: characters[3], callback_data: characters[3] }],
           [{ text: characters[4], callback_data: characters[4] }],
           [{ text: characters[5], callback_data: characters[5] }],
         ],
       },
     }
   );
 });

 bot.help((ctx) => ctx.reply('Send me a sticker'))
 
bot.launch();