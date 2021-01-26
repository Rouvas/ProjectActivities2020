const {Router} = require('express');
const User = require('../models/User');
const Messages = require('../models/Messages');
const router = Router();
const {check, validationResult} = require('express-validator');

router.post(
    '/pushMessage',
    [
        check('message', 'Не найдено сообщение').exists()
    ],
    async (req, res) => {
        try {

            const {userId} = req.body;

            //Найти юзера не по id а по токену
            const message = new Messages({user: {_id: userId} , text: req.body.message});
            await message.save();

            const user = await User.findById({_id: message.user});
            user.messages.push(message);
            await user.save();

            return res.status(201).json({message: 'Сообщение отправлено'});

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
);

//Сюда приходит токен вк, когда мы рендерим токен
router.post(
    '/addVkToken',
    [
        check('vkToken', 'Не найден токен').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Не найден токен VK'
                })
            }

            const {vkToken, email} = req.body;

            const user = await User.findOneAndUpdate({"email": email}, {"vkToken": vkToken});

            if (user) {
                return res.status(201).json({message: 'vkToken обновлен'})
            } else {
                return res.status(400).json({message: 'Пользователь не найден'})
            }

        } catch (e) {
            res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
        }
    }
);

module.exports = router;