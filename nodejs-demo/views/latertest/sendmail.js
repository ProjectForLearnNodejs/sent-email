var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    host: 'mail.xxx.com',
    port: 25,
    auth: {
        user: 'user',          // 用户名
        pass: 'pass'      // 密码
    }
}));

transporter.sendMail({
    from: 'xxx@xxx.com',
    to: 'xxx@xxxx.com;xxx@qq.com',         // 主送
    cc: 'xxx@xxx.com;xxx@xxx.com',    // 抄送
    bcc:'xxx@xxx.com;xxx@xxx.com', // 密送
    contentType: 'text/html',
    subject: '这是一封测试邮件！',                              // 邮件主题
    html:'<b>this  is a test mail!</b><br/>Embedded image: <img src="cid:00000001"/>',
    attachments: [
        {
            filename: 'text0.txt',                              // 文件text0.txt，以字符串，做为文件正文内容。
            content: 'hello world!'
        },
        {
            filename: 'text1.txt',                             // 文件text1.txt，读取本地文件，做为文件正文内容。
            path: './attach/text1.txt',                               // 文件所在路径
        },
        {
            filename: 'pic01.jpg',
            path: './attach/pic01.jpg',                         // 图片路径
            cid: '00000001'                                     // 设置图片cid，html的正文中，
        }                                                       // img标签src属性指向00000001的cid就可以在邮件中显示了
    ]
});