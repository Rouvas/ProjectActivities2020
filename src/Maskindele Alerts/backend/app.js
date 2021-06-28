const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const User = require('./models/User');
const Messages = require('./models/Messages');

const VkBot = require('node-vk-bot-api');
const Scene = require('node-vk-bot-api/lib/scene');
const Session = require('node-vk-bot-api/lib/session');
const Stage = require('node-vk-bot-api/lib/stage');

const app = express();

app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/user', require('./routes/user.routes'));

// app.use('/api/admin', require('./routes/admin.routes'));
//
// app.use('/api/projects', require('./routes/projects.router'));
//
// app.use('/api/posts', require('./routes/posts.routes'));
//
// app.use('/api/feedback', require('./routes/feedback.routes'));


const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`Maskindele Alerts backend has been started on port ${PORT}...`))
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();

// Bot settings

const bot = new VkBot("18614b7401348a2e78551d2a96425f4bbab362b8cb1edd702afe532ff1a8a527fcac4336b6d8710be71ae");

const scene = new Scene('meet',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Напиши Токен ВК');
    },
    (ctx) => {
        ctx.session.vk_token = ctx.message.text;
        ctx.session.vkid = ctx.message.from_id;

        User.findOneAndUpdate({"vkToken": ctx.session.vk_token}, {"vkId": ctx.session.vkid}).then((res) => {
            if (res) {
                ctx.reply(`Спасибо, бот успешно подключен`);
            } else {
                ctx.reply(`К сожалению, ваш токен недействителен`)
            }
        });

        ctx.scene.leave();
    }
);

const stage = new Stage(scene);
const session = new Session();

bot.use(session.middleware());
bot.use(stage.middleware());

Messages.watch()
    .on('change', async data => {
        try {
            const user = await User.findById({_id: data.fullDocument.user});

            bot.sendMessage(user.vkId, data.fullDocument.text)
        } catch (e) {
            console.log(e)
        }
    });

bot.command('/meet', (ctx) => {
    ctx.scene.enter('meet');
});

bot.startPolling(() => {
    console.log('Bot is running...')
});
