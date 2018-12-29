'use strict'

const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const tg = new Telegram.Telegram(process.env.tg_api_key)

class GiftDialog {
    getHelloMessage() {
        return process.env._helloMessage;
    }
}

class GiftController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    startHandler($) {
        $.sendMessage( new GiftDialog().getHelloMessage())
    }

    get routes() {
        return {
            'startCommand': 'startHandler'
        }
    }
}

class PingController extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    pingHandler($) {
        $.sendMessage('pong');
    }

    menuHandler($) {
        $.runMenu({
            message: 'Select:',
            options: {
                parse_mode: 'Markdown' // in options field you can pass some additional data, like parse_mode
            },
            'Exit': {
                message: 'Do you realy want to exit?',
                resizeKeyboard: true,
                'yes': () => {

                },
                'no': () => {

                }
            },
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