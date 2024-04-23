import { Composer, Scenes, session, Telegraf } from 'telegraf';

// specify generic type of Telegraf context
// thus Typescript will know that ctx.scene exists
const bot = new Telegraf<Scenes.WizardContext>(process.env.TGTOKEN);

// you can also pass step handlers as Composer
// and attach any methods you need
const stepHandler = new Composer<Scenes.WizardContext>();

stepHandler.command("next", async (ctx) => {
  await ctx.reply("Step 2. Via command");
  return ctx.wizard.next();
});

const scene = new Scenes.WizardScene<Scenes.WizardContext>(
  "sceneId",
  async (ctx) => {
    await ctx.reply("Step 1");
    return ctx.wizard.next();
  },
  stepHandler,
  async (ctx) => {
    await ctx.reply("Step 2");
    return ctx.wizard.next();
  },
  async (ctx) => {
    await ctx.reply("Done");
    return await ctx.scene.leave();
  }
);

// to compose all scenes you use Stage
const stage = new Scenes.Stage<Scenes.WizardContext>([scene]);

bot.use(session());
// this attaches ctx.scene to the global context
bot.use(stage.middleware());

// you can enter the scene only AFTER registering middlewares
// otherwise ctx.scene will be undefined
bot.command('enterScene', ctx => ctx.scene.enter('sceneId'));

bot.launch();