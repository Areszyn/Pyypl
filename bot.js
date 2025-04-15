const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// WebApp data handler
bot.on('web_app_data', async (ctx) => {
  try {
    const data = JSON.parse(ctx.webAppData.data);

    if (data.status === "success") {
      await ctx.replyWithSticker('CAACAgIAAxkBAAEL3hNmBvZQn4Vl7RkR9QABl3X7Y7WfqQACjBkAAkb7yEsAAXoju3h1RzQE');
      await ctx.reply(`🎉 Payment successful via ${data.method}!\nOrder ID: ${data.orderID}`);
    }
  } catch (err) {
    await ctx.reply(`❌ Error processing payment: ${err.message}`);
  }
});

// Command to open TMA
bot.command('start', (ctx) => {
  ctx.reply('Pay with PayPal:', {
    reply_markup: {
      inline_keyboard: [[{
        text: "Open Checkout",
        web_app: { url: process.env.VERCEL_URL }
      }]]
    }
  });
});

// Start bot
bot.launch();
