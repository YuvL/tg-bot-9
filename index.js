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
        $.sendMessage('pong')
    }

    get routes() {
        return {
            'pingCommand': 'pingHandler'
        }
    }
}

tg.router
    .when(new TextCommand('start', 'startCommand'),  GiftController())
    .when(new TextCommand('ping', 'pingCommand'),  PingController());