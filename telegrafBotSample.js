const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')

const bot = new Telegraf(process.env.TGTOKEN)
bot.start(async (ctx) => await ctx.reply('Welcome'));
bot.help(async (ctx) => await ctx.reply('Send me a sticker'));
bot.on('sticker', async (ctx) => await ctx.reply('👍'));
bot.hears('hi', async (ctx) => await ctx.reply('Hey there'));
bot.command('enter', async (ctx) => await ctx.reply('Command invoked'));
bot.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log('Response time: %sms', ms);
  })
bot.launch();