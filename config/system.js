module.exports = {
    // 网站配置
    web: {
        domain: '127.0.0.1',
    },

    // 融360
    r360: {
        getWay: '',
        appId: '',
        format: ['other', 'insure', 'fund'],
        title: ['other', '基本养老保险', '失业保险', '工伤保险', '生育保险', '基本医疗保险'],
        status: ['other', 'init', 'login', 'crawl', 'crawl_fail', 'report', 'report_fail'],
    },
    
    // 创蓝短信
    sms: {
        API_VARIABLE_URL: '',
        api_account: '',
        api_password: '',
    }
}