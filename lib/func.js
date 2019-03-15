const fs  = require('fs');
const crypto  = require('crypto');
const request = require('request'); 

const func = {};

//  生成MD5签名
func.md5 = (data) => {
    let md5 = crypto.createHash('md5');
    return md5.update(data, 'utf8').digest('hex');
}

//  生成RSA签名
func.signature = (data, path) => {
    let pem = fs.readFileSync(path).toString();
    return crypto.createSign('RSA-SHA1').update(data, 'utf8').sign(pem, 'base64');
}

//  数字加密
func.encrypt = (data) => {
    if ( !data) return false;
    data = data.toString();

    let key = '';
	let sign  = func.md5(data);
    for (let i = 0; i < 32; i++) {
        if ( !key.includes(sign[i])) key += sign[i];
    }
	for (let i = 0; i < data.length; i++) {
        sign += key[data[i]];
    }
	return sign;
}

//  数字解密
func.decrypt = (data) => {
    if ( !data) return false;
    data = data.toString();
    
    let key = '';
    let clear = '';
    let sign = data.substring(0, 32);
    let cipher = data.substring(32);
    for (let i = 0; i < 32; i++) {
        if ( !key.includes(sign[i])) key += sign[i];
    }
    for (let i = 0; i < cipher.length; i++) {
        clear += key.indexOf(cipher[i]);
    }
    if (func.md5(clear) != sign) return false;
    return clear;	
}

//  请求数据格式化
func.http_build_query = (data) => {
    let str = '';
    let tag = true;
    for (let k in data) {
        if (tag) {
            tag = false;
            str += k + '=' + data[k];
    	}else{
            str += '&' + k + '=' + data[k];
        }
    }
    return str;
}

//  发送GET/POST请求
func.curl = (url, method = 'get', data = '', headers = {}) => {
    return new Promise(function(resolve, reject) {
        request({
            url: url,
            method: method,
            json: true,
            headers: headers,
            body: data,
        }, function(err, res, ret) {
            if (res.statusCode == 200) {
                resolve(ret);
            }else{
                reject(err);
            }
        });
    });
}

module.exports = func;