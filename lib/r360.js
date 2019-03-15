const moment = require('moment');
const querystring = require('querystring');
const config  = require('../config/system');
const func  = require('../lib/func');

function r360(bizData, method) 
{
    let time = moment().unix();
    let data = {
        app_id: config.r360.appId,
        biz_data: JSON.stringify(bizData),
        format: 'json',
        method: method,
        sign_type: 'RSA',
        timestamp: time,
        version: '1.0',
    };
    data.sign = querystring.escape(func.signature(func.http_build_query(data), './config/rsa_public_key.pem'));
    
    return func.curl(config.r360.getWay, 'post', func.http_build_query(data), 
        {
            'content-type': 'application/x-www-form-urlencoded',
            'content-length': data.length,
        }
    );
}

module.exports = r360;