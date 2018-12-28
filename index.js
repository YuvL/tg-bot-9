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

    formHandler($){
        const form = {
            name: {
                q: 'Send me your name',
                error: 'sorry, wrong input',
                validator: (message, callback) => {
                    if(message.text) {
                        callback(true, message.text) //you must pass the result also
                        return
                    }

                    callback(false)
                }
            },
            age: {
                q: 'Send me your age',
                error: 'sorry, wrong input',
                validator: (message, callback) => {
                    if(message.text && IsNumeric(message.text)) {
                        callback(true, toInt(message.text))
                        return
                    }

                    callback(false)
                }
            }
        }

        $.runForm(form, (result) => {
            console.log(result)
        })
    }
    
    get routes() {
        return {
            'pingCommand': 'pingHandler',
            'formCommand': 'formHandler'
        }
    }
}

tg.router
    .when(new TextCommand('start', 'startCommand'), new GiftController())
    .when(new TextCommand('ping', 'pingCommand'), new PingController())
    .when(new TextCommand('form', 'formCommand'), new PingController())
    .when(new TextCommand('menu', 'menuCommand'), new PingController());