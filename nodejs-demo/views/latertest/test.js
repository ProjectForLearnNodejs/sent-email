var send = require('./latertest2');
var recive = 'xxx@xxx.com;xxx@qq.com';
var subject = '这是一封测试邮件!';
var text = 'this is a test mail!';

send.sendmailchange(recive,subject,text);