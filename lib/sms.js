const config  = require('../config/system');
const func  = require('../lib/func');

function sms(mobile, msg) 
{
    let data = {
        account: config.sms.api_account,
        password: config.sms.api_password,
        phone: mobile,
        msg: msg,
        report: false,
    };

    return func.curl(config.sms.API_VARIABLE_URL, 'post', data);
}

module.exports = sms;