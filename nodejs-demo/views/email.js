var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    host: 'mail.xxxx.com',
    port: 25,
    auth: {
        user: 'user',
        pass: 'pass'
    }
}));

function sendMailService() {

}

// from和user的名称必须一致，
// 页面的编码的问题
sendMailService.sendmail = function(recive, messageSubject, messageText) {
    transporter.sendMail({
        from: 'xxx@xxxx.com',
        to: recive,
        contentType: 'text/html',
        subject: messageSubject,
        text: messageText
    });
}

/*
 * param: recive参数为邮件接收人地址， messageSubject为邮件主题，
 * messageText为邮件正文，time为邮件几秒钟发送一次，stop为停止发送标识位，为true时停止发送
 */
sendMailService.sendmailCyle = function(recive, messageSubject, messageText, time, stop) {
    var oneSecond = 1000 * time; // one second = 1000 x 1 ms
   /* for(var i = 0; i < 10; i++)*/
    while(!stop)
    {
        setTimeout(function() {
            transporter.sendMail({
                from: 'xxx@xxx.com',
                to: recive,
                contentType: 'text/html',
                subject: messageSubject,
                text: messageText
            });
            console.log('发送中...');
        }, oneSecond);
    }
}

module.exports = sendMailService;


