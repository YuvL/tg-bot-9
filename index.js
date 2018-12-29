'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram(process.env.tg_api_key)

class GiftDialog {
    getHelloMessage() {
        return process.env._helloMessage;
    }

    happyBDay() {
        return process.env._happyBDayMessage;
    }
}

class GiftController extends TelegramBaseController {

    startHandler($) {
        $.runMenu({
            message: new GiftDialog().getHelloMessage(),
            options: {
                parse_mode: 'Markdown' // in options field you can pass some additional data, like parse_mode
            },
            'Покажи': {
                message: new GiftDialog().happyBDay(),
                resizeKeyboard: true,
                'Поехать за подарком сейчас': () => {
                    
                },
                'Поехать завтра': () => {
                    
                },
              
            'anyMatch': () => { //will be executed at any other message

            }
            
        })
    }

    get routes() {
        return {
            'startCommand': 'startHandler'
        }
    }
}

class PingController extends TelegramBaseController {

    pingHandler($) {
        $.sendMessage('pong');
    }

    menuHandler($) {
        $.runMenu({
            message: 'Select:',
            options: {
                parse_mode: 'Markdown' // in options field you can pass some additional data, like parse_mode
            },
            'Exit':  () => { $.sendMessage('ddd');},
            'anyMatch': () => { //will be executed at any other message

            }
        })
    }
    
    get routes() {
        return {
            'pingCommand': 'pingHandler',
            'menuCommand': 'menuHandler',
        }
    }
}

tg.router
    .when(new TextCommand('start', 'startCommand'), new GiftController())
    .when(new TextCommand('ping', 'pingCommand'), new PingController())
    .when(new TextCommand('menu', 'menuCommand'), new PingController());