var tg = require('telegram-node-bot')(procsss.env.tg_api_key);

tg.router.
    when(['ping'], 'PingController');
    
    tg.controller('PingController', ($) => {
        tg.for('ping', () => {
        $.sendMessage('pong')
    });
});