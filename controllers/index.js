const controller = require('koa-router')();
const model = require('../models/model');
const config = require('../config/system');
const moment = require('moment');
const func = require('../lib/func');
const r360 = require('../lib/r360');
const sms = require('../lib/sms');

// 社保公积金查询入口
controller.get('/index', async (ctx, next) => {
    try{
        let sign = ctx.query.sign || '';
        let city_id = ctx.query.city_id || 110100;
        let type = ctx.query.type || 1;
        let flush = ctx.query.flush || 0;
        let is_app = ctx.query.is_app || '';
        let search_id = ctx.query.search_id || '';
        let cid = func.decrypt(sign);
        if ( !cid) throw({code: 500, msg: '签名验证失败'});

        let log = await model('log').findOne({where: {cid: cid, city_id: city_id, type: type, status: 5}, order: [['id','desc']]});
        if (log && !flush) return ctx.redirect('/callback?outUniqueId='+func.encrypt(log.id)+'&is_app='+is_app);

        //  创建一条查询记录并向融360发起请求
        let time = moment().unix();
        log = await model('log').create({created_at: time, updated_at: time, cid: cid, city_id: city_id, type: type});
        let bizData = {
            platform: 'web',
            outUniqueId: func.encrypt(log.id),
            userId: sign,
            cityCode: city_id,
            type: config.r360.format[type],
            refreshId: search_id,
            returnUrl: config.web.domain + '/callback?is_app='+is_app,
            notifyUrl: config.web.domain + '/notify',
        };
        let ret = await r360(bizData, 'tianji.api.tianjireport.collectuser');
        if (ret.error == 200) {
            return ctx.redirect(ret.tianji_api_tianjireport_collectuser_response.redirectUrl);
        }else{
            throw({code: 500, msg: '请求繁忙，请稍后再试'});
        }
    }catch(e){
        return ctx.body = e;
    }
});

//  融360同步回调
controller.get('/callback', async (ctx, next) => {
    try{
        let outUniqueId = ctx.query.outUniqueId || '';
        let is_app = ctx.query.is_app || '';
        let id = func.decrypt(outUniqueId);
        if ( !id) throw({code: 500, msg: '签名验证失败'});
        let log = await model('log').findOne({where: {id: id}});
        let data = {
            sign: func.encrypt(log.cid), 
            userId: log.uid ? func.encrypt(log.uid) : '', 
            city_id: log.city_id, 
            type: log.type,
            flush: log.status == 5 ? 0 : 1,
            is_app: is_app,
            group: log.cid.toString().substr(0, 3) != 102,
            time: moment().unix(),
        };
        return ctx.render(config.r360.format[log.type], data);
    }catch(e){
        return ctx.body = e;
    }
});

//  获取用户数据
controller.get('/get_user_info', async (ctx, next) => {
    try{
        let sign = ctx.query.sign || '';
        let userId = ctx.query.userId || '';
        let city_id = ctx.query.city_id || 110100;
        let type = ctx.query.type || 1;
        let flush = ctx.query.flush || 0;
        let is_app = ctx.query.is_app || '';
        let cid = func.decrypt(sign);
        if ( !cid) throw({code: 500, msg: '签名验证失败'});

        let where = {cid: cid, city_id: city_id, type: type};
        if (userId) where.uid = func.decrypt(userId);
        if ( !flush) where.status = 5;
        let log = await model('log').findOne({where: where, order: [['updated_at','desc']]});
        if (log.status != 5) throw({code: 204, msg: '暂无数据'});

        let data = {
            outUniqueId: func.encrypt(log.id),
            updated_at: moment(log.updated_at * 1000).format('YYYY-MM-DD HH:mm:ss'),
            userId: func.encrypt(log.uid),
            name: log.name,
            idcard: log.idcard,
            city_name: log.city_name,
            month: log.month ? moment(log.month+'01').format('YYYY-MM') : '暂无',
            company_name: log.company_name, 
            pay_type: log.pay_type, 
            total: log.total,  
            old_balance: log.old_balance,
            fund_account: log.fund_account,  
            fund_balance: log.fund_balance,  
            status: log.status 
        };
        throw({code: 200, msg: 'ok', data: data});
    }catch(e){
        return ctx.body = e;
    }
});

//  获取社保列表页
controller.get('/insure_detail', async (ctx, next) => {
    try{
        let userId = ctx.query.userId || '';
        let city_id = ctx.query.city_id || 110100;
        let type = ctx.query.type || 1;
        let is_app = ctx.query.is_app || '';
        let data = {userId: userId, city_id: city_id, type: type, is_app: is_app, title: config.r360.title[type], time: moment().unix()};
        return ctx.render('insure_detail', data);
    }catch(e){
        return ctx.body = e;
    }
});

//  获取社保数据
controller.get('/get_insure_list', async (ctx, next) => {
    try{
        let userId = ctx.query.userId || '';
        let city_id = ctx.query.city_id || 110100;
        let type = ctx.query.type || 1;
        let page = ctx.query.page || 1;
        let uid = func.decrypt(userId);
        if ( !uid) throw({code: 500, msg: '签名验证失败'});

        let offset = (page > 0 ? page - 1 : 0) * 15;
        let insure_list = await model('insure').findAll({where: {uid: uid, city_id: city_id, type: type}, order: [['month','desc']], offset: offset, limit: 15});
        throw({code: 200, msg: 'ok', data: insure_list});
    }catch(e){
        return ctx.body = e;
    }
});

//  获取公积金列表页
controller.get('/fund_detail', async (ctx, next) => {
    try{
        let userId = ctx.query.userId || '';
        let city_id = ctx.query.city_id || 110100;
        let type = ctx.query.type || 2;
        let is_app = ctx.query.is_app || '';
        let data = {userId: userId, city_id: city_id, type: type, is_app: is_app, time: moment().unix()};
        return ctx.render('fund_detail', data);
    }catch(e){
        return ctx.body = e;
    }
});

//  获取公积金数据
controller.get('/get_fund_list', async (ctx, next) => {
    try{
        let userId = ctx.query.userId || '';
        let city_id = ctx.query.city_id || 110100;
        let type = ctx.query.type || 2;
        let page = ctx.query.page || 1;
        let uid = func.decrypt(userId);
        if ( !uid) throw({code: 500, msg: '签名验证失败'});

        let offset = (page > 0 ? page - 1 : 0) * 10;
        let fund_list = await model('fund').findAll({where: {uid: uid, city_id: city_id}, order: [['month','desc']], offset: offset, limit: 10});
        throw({code: 200, msg: 'ok', data: fund_list});
    }catch(e){
        return ctx.body = e;
    }
});

//  获取账号列表页
controller.get('/account', async (ctx, next) => {  
    try{
        let sign = ctx.query.sign || '';
        let city_id = ctx.query.city_id || 110100;
        let type = ctx.query.type || 1;
        let is_app = ctx.query.is_app || '';
        let cid = func.decrypt(sign);

        if ( !cid) thorw({code: 500, msg: '签名验证失败'});
        let data = {sign: sign, city_id: city_id, type: type, is_app: is_app, time: moment().unix()};
        return ctx.render('account', data);
    }catch(e){
        return ctx.body = e;
    }
});

//  获取账号页面数据
controller.get('/get_account_list', async (ctx, next) => {  
    try{
        let sign = ctx.query.sign || '';
        let city_id = ctx.query.city_id || 110100;
        let type = ctx.query.type || 1;
        let cid = func.decrypt(sign);
        if ( !cid) throw({code: 500, msg: '签名验证失败'});

        //  获取账号列表
        let key_list = [];
        let log_list = [];
        let log = await model('log').findAll({where: {cid: cid, type: type, status: 5}, order: [['id','desc']]});
        for (let i in log) {
            let key = log[i].uid + log[i].city_id;
            if ( !key_list.includes(key)) {
                let data = {
                    outUniqueId: func.encrypt(log[i].id),
                    updated_at: moment(log[i].updated_at * 1000).format('YYYY-MM-DD'),
                    city_id: log[i].city_id,
                    userId: func.encrypt(log[i].uid),
                    name: log[i].name,
                    idcard: log[i].idcard,
                    city_name: log[i].city_name,
                    month: log[i].month ? moment(log[i].month+'10').format('YYYY-MM') : '暂无',
                    company_name: log[i].company_name, 
                    pay_type: log[i].pay_type, 
                    total: log[i].total,  
                    old_balance: log[i].old_balance,
                    fund_account: log[i].fund_account,  
                    fund_balance: log[i].fund_balance,  
                    status: log[i].status 
                }
                key_list.push(key);
                log_list.push(data);
            }
        }
        throw({code: 200, msg: 'ok', data: log_list});
    }catch(e){
        return ctx.body = e;
    }
});

//  获取城市列表
controller.get('/city', async (ctx, next) => {  
    try{
        let sign = ctx.query.sign || '';
        let type = ctx.query.type || 1;
        let flush = ctx.query.flush || 0;
        let is_app = ctx.query.is_app || '';
        let city_id = ctx.cookies.get('city_id');
        if (city_id && !flush) return ctx.redirect('/index?sign='+sign+'&city_id='+city_id+'&type='+type+'&flush='+flush+'&is_app='+is_app);

        let hot_list = [];
        let first_list = [];
        let letter_list = new Map();
        let where = type == 1 ? {is_insure:1} : {is_fund:1};
        let city_list = await model('city').findAll({where: where, order: [['first_letter','ASC']]});
        for (let i in city_list) {
            //  获取热门城市列表
            if (city_list[i].is_hot == 1) hot_list.push(city_list[i]);

            //  获取字母城市列表
            let temp = letter_list.get(city_list[i].first_letter) || [];
            temp.push(city_list[i]);
            letter_list.set(city_list[i].first_letter, temp);
        }
        letter_list.forEach((v, k) => {first_list.push({letter: k, first: v});});
        let data = {sign: sign, type: type, flush: flush, is_app: is_app, hot_list: hot_list, first_list: first_list, time: moment().unix()};
        return ctx.render('city', data);
    }catch(e){
        return ctx.body = e;
    }
});

//  融360异步回调
controller.post('/notify', async (ctx, next) => {  
    try{
        let outUniqueId = ctx.request.body.outUniqueId || '';
        let search_id = ctx.request.body.search_id || '';
        let state = ctx.request.body.state || '';
        let id = func.decrypt(outUniqueId);
        if ( !id || state != 'report') throw('success');

        let log = await model('log').findOne({where: {id: id}});
        let ret = await r360({user_id: search_id}, 'wd.api.' + config.r360.format[log.type] + '.getDataV2');
        if (ret.error != 200) throw('success');

        let list = log.type == 1 ? ret.wd_api_insure_getDataV2_response.data.data_list[0] : ret.wd_api_fund_getDataV2_response.data.data_list[0];
        if ( !list.user.id_card) throw('success');

        let time = moment().unix();
        let userInfo = await model('user').findOne({where: {idcard: list.user.id_card}});
        if ( !userInfo) userInfo = await model('user').create({created_at: time, updated_at: time, name: list.user.real_name, idcard: list.user.id_card, status: 1});

        let company_list = new Map();
        let last_month = old_balance = 0;
        if (log.type == 1) {
            let data = {
                updated_at: time,
			    sex: list.user.sex,
				nation: list.user.nation,
				birthday: list.user.birthday.replace('-','').replace('-',''),
				acc_prop: list.user.acc_prop,
			    acc_addr: list.user.acc_addr,
				degree: list.user.degree,
				marital_status: list.user.marital_status,
				work_start_day: list.user.work_start_day.replace('-','').replace('-',''),
				worker_nation: list.user.worker_nation,
				live_addr: list.user.live_addr,
				live_postcode: list.user.live_postcode,
				mobile: list.user.cellphone,
				phone: list.user.phone,
				email: list.user.email,
				status: 1,
            };
            //  更新用户基本信息
            model('user').update(data, {where: {id: userInfo.id}});

            let month_list = [];
            let insure_list = await model('insure').findAll({where: {uid: userInfo.id, city_id: log.city_id}});
            for (let i in insure_list) month_list.push(insure_list[i].month);
            for (let i in list.flow) {
                let month = parseInt(list.flow[i].start_date.replace('-', ''));
                if (month > last_month) last_month = month;
                if (list.flow[i].flow_type == 1) if (list.flow[i].per_rmb) old_balance += parseFloat(list.flow[i].per_rmb);
                company_list.set(month, list.flow[i].pay_type ? list.flow[i].pay_type : '正常缴纳');
                if ( !month_list.includes(month)) {
                    let data = {
                        created_at: time,
                        updated_at: time,
                        uid: userInfo.id,
                        city_id: log.city_id,
                        month: month,
                        company_name: list.flow[i].com_name,
                        pay_type: company_list.get(month),
                        type: list.flow[i].flow_type,
                        base: list.flow[i].base_rmb,
                        fee_c: list.flow[i].com_rmb,
                        fee_p: list.flow[i].per_rmb,	
                    };
                    model('insure').create(data);
                }
            }
        }else{
            let month_list = [];
            let fund_list = await model('fund').findAll({where: {uid: userInfo.id, city_id: log.city_id}, field: ['month','input','output']});
            for (let i in fund_list) month_list.push(fund_list[i].month+parseFloat(fund_list[i].input)+parseFloat(fund_list[i].output));
            for (let i in list.flow) {
                let month = parseInt(list.flow[i].start_date.replace('-', ''));
                if (month > last_month) last_month = month;
                company_list.set(month, list.flow[i].pay_type ? list.flow[i].pay_type : '正常缴纳');
                if ( !month_list.includes(month+parseFloat(list.flow[i].in_month_rmb)+parseFloat(list.flow[i].out_month_rmb))) {
                    let data = {
                        created_at: time,
                        updated_at: time,
                        uid: userInfo.id,
                        city_id: log.city_id,
                        month: month,
                        pay_type: company_list.get(month),
                        input: list.flow[i].in_month_rmb,
                        output: list.flow[i].out_month_rmb,
                        balance: list.flow[i].balance_rmb,	
                    };
                    model('fund').create(data);
                }
            }
        }

        //  同步查询日志
        let data = {
            updated_at: time, 
            search_id: search_id, 
            uid: userInfo.id,
            name: list.user.real_name, 
            idcard: list.user.id_card,
            city_name: log.type == 1 ? list.user.insure_city : list.user.fund_city,
            month: last_month,
            company_name: list.user.com_name,
            pay_type: list['flow'] ? company_list.get(last_month) : '暂无数据',
            total: company_list.size,
            old_balance: old_balance,
            status: config.r360.status.indexOf(state),
        };

        //  公积金展示账户和余额
		if (log.type == 2) {data.fund_account = list.user.fund_code; data.fund_balance = list.user.balance;}
        await model('log').update(data, {where: {id: id}});

        //  查询成功发送短信
        let msg = '';
        let url = await func.curl('http://api.t.sina.com.cn/short_url/shorten.json?source=31641035&url_long=http://m.dashebao.com/dsbapi/v1/Ad/rong360/token/' + func.encrypt(log.cid));
        let user = await model('other').query('select mobile from dsb_user where uid = ' + log.cid.toString().substr(3));
        if (log.type == 1) {
            if (log.city_id == 110100) {
                msg = '温馨提示，社保记录并非实时更新，北京地区可以查询上上个月的社保记录。医保报销额度有限？在线申请众安保险来补充 http://t.cn/E57Hq7T 如果有资金需求，我们为为优质社保用户匹配1000-100万上千款产品 ' + url[0].url_short + ' ';
            }else{
                msg = '温馨提示，社保记录并非实时更新，社保局系统会延迟1，2个月。医保报销额度有限？在线申请众安保险来补充 http://t.cn/E57Hq7T 如果有资金需求，我们为为优质社保用户匹配1000-100万上千款产品 ' + url[0].url_short + ' ';
            }
        }else{
            msg = '公积金查询成功！您的余额为：' + list.user.balance + '元。您的征信良好，如有资金需求，可以在线申请 ' + url[0].url_short + ' ';
        }
        await sms(user[0][0].mobile, msg);
        throw('success');
    }catch(e){
        return ctx.body = e;
    }
});

//  获取查询人数
controller.get('/get_count_list', async (ctx, next) => {  
    try{
        let num = await model('user').count();
        throw({code: 200, msg: 'ok', data: {num: num}});
    }catch(e){
        return ctx.body = e;
    }
});

module.exports = controller;
