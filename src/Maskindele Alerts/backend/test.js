var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
var app = express();

//Schemas
const User = require('./models/UserModel')
const Message = require('./models/MessageModel')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//VK-bot
const VkBot = require('node-vk-bot-api');
const Scene = require('node-vk-bot-api/lib/scene');
const Session = require('node-vk-bot-api/lib/session');
const Stage = require('node-vk-bot-api/lib/stage');




//connect to mongodb
mongoose
    .connect(process.env.MONGO_CREDS, {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
        // reconnectInterval: 500,
        // connectTimeoutMS: 10000,
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...'))

// Логика
const bot = new VkBot("18614b7401348a2e78551d2a96425f4bbab362b8cb1edd702afe532ff1a8a527fcac4336b6d8710be71ae");

const scene = new Scene('meet',
    (ctx) => {
        ctx.scene.next();
        ctx.reply('Привет, чтобы начать пользоваться этим ботом заполни следеющие данные: напиши своё имя');
    },
    (ctx) => {
        ctx.session.password = ctx.message.text;

        ctx.scene.next();
        ctx.reply('Напиши Токен ВК');
    },
    (ctx) => {
        ctx.session.tg_token = ctx.message.text;
        ctx.session.vkid = ctx.message.from_id
        let user = {
            vk_token: ctx.session.vk_token,
            vkid: ctx.session.vkid
        };

        // User.create(user).then((resolve) => {
        //     console.log('История успешно сохранена')
        // });

        ctx.scene.leave();
        ctx.reply(`Nice to meet you, ${ctx.session.name}`);

    }
);
const stage = new Stage(scene);
const session = new Session();

bot.use(session.middleware());
bot.use(stage.middleware());


Message.watch()
    .on('change', data => {
        bot.sendMessage(485086001, Это сообщение отправляется если я сделал отслеживание изменений в коллекции монги: ${data.fullDocument})
        console.log(data)
    })

bot.command('/meet', (ctx) => {
    ctx.scene.enter('meet');
});

bot.command('/new', (ctx) => {
    Message.create({service: 'хуй', text: 'gui'}).then((resolve) => {
        console.log('История успешно сохранена')
    })
});


bot.startPolling(() => {
    console.log('Bot is running...')
});




// Надстройки
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;