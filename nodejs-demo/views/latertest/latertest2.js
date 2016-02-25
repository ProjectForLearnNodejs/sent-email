/*
 * nodemailer:发送邮件包！版本号：1.4.0。
 * nodemailer-smtp-transport: 通过smtp协议发送邮件依赖包！版本号:1.0.3
 * later: 用于执行定时计划任务包 版本号：1.1.6
 *
 */
var later = require('../../node_modules/later');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var recive1 = 'xxx@xxx.com';
var messageSubject1 = '你是！';
var messageText1 = '你是';

var transporter = nodemailer.createTransport(smtpTransport({
    host: 'mail.xxx.com',
    port: 25,
    auth: {
        user: 'username',          // 用户名
        pass: 'pass'      // 密码
    }
}));

function sendMailService() {

}

/*
 * 功能：修改邮件发送的收件人，邮件主题和邮件正文！
 * 参数： recive:接收人邮箱，如：xxx@xxx.com,messageSubject为邮件主题
 *        messageText：为邮件正文
 * 注意：from和user的名称必须一致
 */
sendMailService.sendmailchange = function(recive, messageSubject, messageText) {
    recive1 = recive;
    messageSubject1 = messageSubject;
    messageText1 = messageText;
}

// 自定义时间尺，定义在每个月的15号的12：00执行定时任务计划
var complexSched = later.parse.recur()
       /* .on(15).dayOfMonth().on(12).hour().on(0).minute(),*/
       .on(5, 7, 9, 13,16, 17,20,22 ,25,27, 30,32,35,36,39,41,44).minute(),
    // 定时任务执行函数setInterval
    t = later.setInterval(function() {
        test();
    }, complexSched);

// 定时计划任务执行
function test() {
    console.log('邮件发送中！');
    if(recive1 && messageSubject1 && messageText1) {
        transporter.sendMail({
            from: 'xxx@xxx.com',
            to: recive1,
            cc: 'xxx@xxx.com;xxx@xxx.com',
            contentType: 'text/html',
            subject: messageSubject1,
            text: messageText1
        });
    }
}

later.date.localTime();

console.log("Now:"+new Date());

next = later.schedule(complexSched).next(13);  // 获得下13个时间尺
// 打印下10个时间尺
for(var i = 0; i < next.length; i++) {
    console.log(next[i]);
}

module.exports = sendMailService;