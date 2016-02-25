var sendMailService = require('./email-copy');

var recive = 'xxx@xxx.com';
var subject = 'test message';
var messageText = 'this is a test message!这是一封测试邮件';
var time = 100;
var stop = false;
//sendMailService.sendmail(recive, subject, messageText); // 发送一封邮件
//sendMailService.sendmailCyle(recive, subject, messageText, stop); // 定时一秒一直不停发送邮件
sendMailService.sendmailCyleDay(recive, subject, messageText, stop); //设置在每周指定的日子发送邮件