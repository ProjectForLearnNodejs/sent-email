/*
 * 该实例使用的定时模块为node-schedule
 */

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var schedule = require("node-schedule");

var transporter = nodemailer.createTransport(smtpTransport({
    host: 'mail.xxx.com',
    port: 25,
    auth: {
        user: 'user',
        pass: 'pass'
    }
}));

function sendMailService() {

}

/*
 * 功能：发送一封邮件！
 * 注意：from和user的名称必须一致
 */
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
sendMailService.sendmailCyle = function(recive, messageSubject, messageText, stop) {
    var rule = new schedule.RecurrenceRule();
    var times = [];
    for (var i = 1; i < 60; i++) {
        times.push(i);
    }
    rule.second = times;
    var c = 0;
    var j = schedule.scheduleJob(rule, function () {
        c++;
        console.log("发送中...");
        transporter.sendMail({
            from: 'xxx@xxx.com',
            to: recive,
            contentType: 'text/html',
            subject: messageSubject,
            text: messageText
        });
        if(stop) {
            return;
        }
    });
}

/*
 * 设置每个周的某天和某时发送邮件
 */
sendMailService.sendmailCyleDay = function (recive,messageSubject, messageText, stop) {
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(4, 6)];         // 设置的每周4至周六发送邮件
    rule.hour = 17;                                         // 在下午五点整发送
    rule.minute = 0;

    var j = schedule.scheduleJob(rule, function(){
        console.log('发送中!');
        transporter.sendMail({
            from: 'xxx@xxx.com',
            to: recive,
            contentType: 'text/html',
            subject: messageSubject,
            text: messageText
        });
        if(stop) {
            return;
        }
    });
}

module.exports = sendMailService;


