#**邮件发送定时组件文档说明**


##本次的邮件发送组件的功能分为两部分

* 1、发送邮件
* 2、定时任务

下面将对这两部分分别进行说明

###*一、邮件的发送*

&nbsp;&nbsp;所用到的第三方包有
 * 1、nodemailer
 * 2、smtp-nodemailer-smtp-transport

####目录

* 1、nodemailer介绍
* 2、使用nodemailer发送邮件
* 3、发送邮件的高级使用

#####1、nodemailer介绍
&nbsp;&nbsp;Nodemailer是一个简单易用的Node.js邮件发送组件，Github项目地址为https://github.com/andris9/Nodemailer。
  
 &nbsp;&nbsp;nodemailer的特点：
   * 支持Unicode编码
   * 支持Window系统环境
   * 支持HTML内容和普通文本内容
   * 支持附件(传送大附件)
   * 支持HTML内容中嵌入图片
   * 支持SSL/STARTTLS安全的邮件发送
   * 支持内置的transport方法和其他插件实现的transport方法
   * 支持自定义插件处理消息
   * 支持XOAUTH2登录验证
   
 以上的特点已经满足大多数的邮件使用的要求了。
 
#####2、使用nodemailer发送邮件
  
&nbsp;&nbsp;现在nodemailer最新的版本号是1.4.0版本，官方文档上说的nodemailer从0.7版本升级至1.0版本后便不再支持QQ邮箱系统，在国内google不能访问，那google的Gmaile邮件系统也不能通过nodemailer来发送和接收邮件了！
&nbsp;&nbsp;通过查看官方文档，发现可以通过使用smtp来发送和接收邮件！但要添加一个依赖的包：nodemailer-smtp-transport。

&nbsp;&nbsp;在我们的项目中安装nodemailer和nodemailer-smtp-transport包：
* npm install nodemailer
* npm install nodemailer-smtp-transport

&nbsp;&nbsp;或者通过我们的package.json文件配置安装也可以啦！

好了，废话不多说了，直接上代码吧！

	// 引用依赖包
	var nodemailer = require('nodemailer');
	var smtpTransport = require('nodemailer-smtp-transport');
    
    // 获得transporter对象
    var transporter = nodemailer.createTransport(smtpTransport({
    host: 'mail.xxx.com',  // 主机名
    port: 25,					    // 发送邮件的端口号
    auth: {
        user: 'user', 			    // 用户名，就是我们的邮箱去掉@xxx.com部分
        pass: 'pass'			    // 密码
    }
	}));
    
    // 接下来就可以直接发送邮件啦
    transporter.sendMail({
        from: 'from@xxx.com',  // 发件人邮件地址，注意:发件人地址和user是一致的
        to: 'recive@xxx.com',  // 接收人邮件地址
        contentType: 'text/html',       
        subject: 'messageSubject',      // 邮件主题        
        text: 'messageText'             // 邮件正文
    });
    
 通过测试：公司的邮箱能够向qq邮箱、163、新浪等发送邮件成功！
 
 #####3、发送邮件的高级使用
 
  
&nbsp;&nbsp;Nodemailer提供的，发邮件的高级功能包括：

   * CC和BCC
   * 发送附件
   * 发送HTML格式内容，并嵌入图片
   
 
 ######1)、CC和BCC 
 发邮件时选择收件人，有3个选项，TO,CC,BCC。

   * TO: 是收件人
   * CC: 是抄送，用于通知相关的人，收件人可以看到都邮件都抄送给谁了。一般回报工作或跨部门沟通时，都会CC给收件人的领导一份
   * BCC:是密送，也是用于通知相关的人，但是收件人是看不到邮件被密送给谁了。
   
   好啦，直接上代码吧！
   
          var nodemailer = require('nodemailer');
          var smtpTransport = require('nodemailer-smtp-transport');

          var transporter = nodemailer.createTransport(smtpTransport({
              host: 'mail.xxx.com',
              port: 25,
              auth: {
                  user: 'user',          // 用户名,注意：不要@符号后面的部分
                  pass: 'pass'           // 密码
              }
          }));

          transporter.sendMail({
              from: 'user@xxx.com',
              to: 'xxx@xxx.com;xxx@qq.com',              // 主送
              cc: 'xxx@xxx.com;xxx@xxx.com',    // 抄送
              bcc:'xxx@xxx.com;xxx@xxx.com',    // 密送
              contentType: 'text/html',
              subject: 'subject',                                 // 邮件主题
              text: 'text'                                        // 邮件正文
          });

 ######2)、发送附件
 
 发送附件也是邮件系统的常用功能，Nodemailer支持多种附件策略。接下来，我们测试发送两个文件做为附件。

参考代码如下：

    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');

    var transporter = nodemailer.createTransport(smtpTransport({
        host: 'mail.xxx.com',
        port: 25,
        auth: {
            user: 'user',          // 用户名
            pass: 'pass'           // 密码
        }
    }));

    transporter.sendMail({
        from: 'xxx@xxx.com',
        to: 'xxx@xxx.com;xxx@qq.com',           // 主送
        cc: 'xxx@xxx.com;xxx@xxx.com', // 抄送
        bcc:'xxx@xxx.com;xxx@xxx.com', // 密送
        contentType: 'text/html',
        subject: 'subject',                              // 邮件主题
  		text: 'text',									 // 邮件正文
        attachments: [
            {
                filename: 'text0.txt', // 文件text0.txt，以字符串，做为文件正文内容。
                content: 'hello world!'
            },
            {
                filename: 'text1.txt',// 文件text1.txt，读取本地文件，做为文件正文内容。
                path: './attach/text1.txt',   // 文件所在路径
            }
        ]
    });
    
    
######3)、发送HTML格式内容，并嵌入图片

&nbsp;&nbsp;Nodemailer也为我们提供了在HTML的正文中嵌入图片的功能，程序中只要配置cid，作为图片的唯一引用地址就行了。上传本地图片../attach/pic01.jpg，设置cid为00000001，然后在html的正文中，img标签src属性指向00000001的cid就行了。

参考代码如下：
 
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');

    var transporter = nodemailer.createTransport(smtpTransport({
        host: 'mail.xxx.com',
        port: 25,
        auth: {
            user: 'user',          // 用户名
            pass: 'pass'           // 密码
        }
    }));

    transporter.sendMail({
        from: 'xxx@xxx.com',
        to: 'xxx@xxx.com;xxx@qq.com',              // 主送
        cc: 'xxx@xxx.com;xxx@xxx.com',    // 抄送
        bcc:'xxx@xxx.com;xxx@xxx.com',    // 密送
        contentType: 'text/html',
        subject: '这是一封测试邮件！',                       // 邮件主题
        html:'<b>this  is a test mail!</b><br/>Embedded image: <img src="cid:00000001"/>',
        attachments: [
            {
                filename: 'text0.txt',   // 文件text0.txt，以字符串，做为文件正文内容。
                content: 'hello world!'
            },
            {
                filename: 'text1.txt',   // 文件text1.txt，读取本地文件，做为文件正文内容。
                path: './attach/text1.txt',  // 文件所在路径
            },
            {
                filename: 'pic01.jpg',
                path: './attach/pic01.jpg', // 图片路径
                cid: '00000001'             // 设置图片cid，html的正文中，
            }                               // img标签src属性指向00000001的cid就可以在邮件中显示了
        ]
    });
 
###*二、定时任务*

&nbsp;&nbsp;定时任务主要是通过我们的定时任务组件later来完成的！

&nbsp;&nbsp;later是一个强大的定时任务库！它的API很强大！

&nbsp;&nbsp;Later.js官方主页：http://bunkat.github.io/later/index.html

&nbsp;&nbsp;在我们的工程项目中安装Later.js同nodemailer可通过npm安装和package.js安装！

####目录

* 1、Later的基本使用
* 2、Later Schedules - 设置时间表
* 3、时间定义和时间计算
* 4、Later Parsers - 规则解释器
* 5、Later Occurrences - 时间控制
* 6、Later Executing - 启动运行


#####1、Later的基本使用


&nbsp;&nbsp;创建一个每5分钟启动的定时器规则，输出启动时间。

    var later = require('later');
    
    // 定义了一个时间表，每隔五分钟执行
    var sched = later.parse.text('every 5 mins'),
    	// 取下10个有效时间点
        occurrences = later.schedule(sched).next(10);

	// 循环打印时间点
    for(var i=0;i<10;i++){
        console.log(occurrences[i]);
    }
    
 运行该程序在控制台打印：
 
    Thu Dec 26 2013 10:45:00 GMT+0800 (CST)
    Thu Dec 26 2013 10:50:00 GMT+0800 (CST)
    Thu Dec 26 2013 10:55:00 GMT+0800 (CST)
    Thu Dec 26 2013 11:00:00 GMT+0800 (CST)
    Thu Dec 26 2013 11:05:00 GMT+0800 (CST)
    Thu Dec 26 2013 11:10:00 GMT+0800 (CST)
    Thu Dec 26 2013 11:15:00 GMT+0800 (CST)
    Thu Dec 26 2013 11:20:00 GMT+0800 (CST)
    Thu Dec 26 2013 11:25:00 GMT+0800 (CST)
    Thu Dec 26 2013 11:30:00 GMT+0800 (CST)

打印出的时间则是我们的定时任务执行的时间！

#####2、Later Schedules - 设置时间表

Schedules模块用来设置定时规则，提供3种规则设置。

   * Basic schedules：基本时间表
   * Composite schedules: 组合时间表
   * Exception schedules: 异常时间表

######1). Basic schedules：基本时间表

设置每日10:15am , 10:45am启动

	var basic = {h: [10], m: [15,45]};


######2). Composite schedules: 组合时间表

设置每日10:15am , 10:45am, 和17:40pm 启动

     var composite = [
        {h: [10], m: [15,45]},
        {h: [17], m: [30]}
      ];

######3). Exception schedules: 异常时间表

用于设置一下无效的日期：设置 每年1月 和 每周一，六，日 时间表无效

    var exception = [
        {M: [1]},
        {dw: [1,6,7]}
    ];

######4). 程序实现

    var later = require('later');

    var basic = {h: [10], m: [15,45]};
    var composite = [
        basic,
        {h: [17], m: [30]}
    ];
    var exception = [
        {M: [1]},
        {dw: [1,6,7]}
    ];

    var sched = {
        schedules:composite,
        exceptions:exception
    };

    later.date.localTime();

    console.log("Now:"+new Date());
    var occurrences = later.schedule(sched).next(10);
    for(var i = 0; i < occurrences.length; i++) {
        console.log(occurrences[i]);
    }
    
    
   运行程序在控制台打印：
   
    Now:Thu Dec 26 2013 11:40:27 GMT+0800 (CST)
    Thu Dec 26 2013 17:30:00 GMT+0800 (CST)
    Mon Dec 30 2013 10:15:00 GMT+0800 (CST)  
    Mon Dec 30 2013 10:45:00 GMT+0800 (CST) 
    Mon Dec 30 2013 17:30:00 GMT+0800 (CST) 
    Tue Dec 31 2013 10:15:00 GMT+0800 (CST) 
    Tue Dec 31 2013 10:45:00 GMT+0800 (CST)
    Tue Dec 31 2013 17:30:00 GMT+0800 (CST) 
    Mon Feb 03 2014 10:15:00 GMT+0800 (CST)
    Mon Feb 03 2014 10:45:00 GMT+0800 (CST) 
    Mon Feb 03 2014 17:30:00 GMT+0800 (CST)
  
  
  #####3、时间定义和时间计算
  
  Time Periods模块用于时间定义和时间计算。

######1). 时间定义

在之前的代码中，我们是这样的定义的

{h: [17], m: [30]}

h代表小时，m代表分钟。

时间定义完整列表：

    Second, s: 秒, 取值范围:[0-59]
    minute, m：分, 取值范围:[0-59]
    hour, h: 时, 取值范围:[0-23]
    time, t: 秒每日, 取值范围:[0-86399]
    day, D: 日, 取值范围:[1-31]
    dayOfWeek, dw, d: 日每周, 取值范围:[1-7]
    dayOfYear, dy: 日每年，取值范围:[1-365]
    weekOfMonth, wm: 周每月，取值范围:[1-5]
    weekOfYear, wy: 周每年，取值范围:[1-52]
    month, M: 月，取值范围:[1-12]
    year, Y: 年，取值范围:[1970-2099]

######2). 时间计算

    name: 名称
    range: 取值范围计数
    val(date): 当前时间段的值
    isValid(date, value): 检验输入是否是当前时间段的值
    extent(date): 取值范围
    start(date): 开始时间点
    end(date): 结束时间点
    next(date, value): value之后的时间点
    prev(date, value): value之前的时间点

######3). 程序实现

    var later = require('later');
    later.date.localTime();

    var d = new Date();

    console.log(d);
    console.log(later.hour.name);
    console.log(later.hour.range);
    console.log(later.hour.val(d));
    console.log(later.hour.isValid(d, 2));
    console.log(later.hour.isValid(d, 12));
    console.log(later.hour.extent());
    console.log(later.hour.start(d));
    console.log(later.hour.end(d));
    console.log(later.hour.next(d, 5));
    console.log(later.hour.prev(d, 21));

运行该程序在控制台打印：

    Thu Dec 26 2013 12:30:42 GMT+0800 (CST)
    hour
    3600
    12
    false
    true
    [ 0, 23 ]
    Thu Dec 26 2013 12:00:00 GMT+0800 (CST)
    Thu Dec 26 2013 12:59:59 GMT+0800 (CST)
    Fri Dec 27 2013 05:00:00 GMT+0800 (CST)
    Wed Dec 25 2013 21:59:59 GMT+0800 (CST)

输出结果的解释：

	 当前时间：2013-12-26 12:30:42
	 以小时定义时间
	 每小时3600个计数点
	 当前时间段的的值是12
	 检查2不是当前时间段的值
	 检查12不是当前时间段的值
	 取值范围[0，23]
	 当前时间段的开始时间点：12:00:00
	 当前时间段的结束时间点：12:59:59
	 下一个周期第5个时间段开始点：2013-12-27 05:00:00
	 上一个周期第21个时间段结束点：2013-12-25 21:59:59
 
 
#####4、Later Parsers - 规则解释器

Parsers模块提供了3种规则解释器，方便定义时间表。

   * Recur: 链式API定义    #（推荐使用这种方式定义执行时间）#
   * Cron Parser: CRON格式定义
   * Text Parser：自然语言定义

######1). Recur: 链式API定义

设置每小时第5分0秒启动

    var sched = later.parse.recur().on(5).minute();

时间定义API

    second();
    minute();
    hour();
    time();
    dayOfWeek();
    dayOfWeekCount();
    dayOfMonth();
    dayOfYear();
    weekOfMonth();
    weekOfYear();
    month();
    year();

时间计算API

    on(vals): 设置时间值
    first(): 最小的时间值
    last(): 最大的时间值
    onWeekend(): 周末，等价于on(1,7).dayOfWeek()
    onWeekday(): 工作日，等价于on(2,3,4,5,6).dayOfWeek()
    every(val): 循环每个时间
    after(val): 在之后
    before(val): 在之前
    startingOn(val): 每个时间段开始的偏移量
    between(start, end): 在两个时间之间
    and():
    except():
    customPeriod(id):
    customModifier(id, vals):

######2). Cron Parser: CRON格式定义

通过原CRON格式进行定义。

设置每小时第5分0秒启动

    var cron = later.parse.cron('5 * * * *');

######3). Text Parser：自然语言定义

通过关键字格式进行定义。

    var text = later.parse.text('every 5th mins');
    
#####5、Later Occurrences - 时间控制

######时区设置

    //默认UTF时区
    later.date.UTC();

    //设置本地时区
    later.date.localTime();

######构造对象

    var schedule = {schedules: [{m: [5]}]};
    var occurrences = later.schedule(schedule);

######时间控制API

    later.schedule(schedule).next(count, start, end): 取下N个有效时间点
    later.schedule(schedule).prev(count, start, end): 取上N个有效时间点
    later.schedule(schedule).nextRange(count, start, end): 取下N个有效时间段
    later.schedule(schedule).prevRange(count, start, end): 取上N个有效时间段

   
 #####6、Later Executing - 启动运行
 
 Executing模块定义了setTimeout和setInterval两种方式，实现运行。

   * setTimeout: 设置一段时间后运行，只运行1次
   * setInterval: 循环运行，直到clear

######1). setTimeout

定义：5秒后运行，只运行一次！

新建文件：settimeout.js


    var later = require('later');
    later.date.localTime();

    console.log("Now:"+new Date());

    var sched = later.parse.recur().every(5).second(),
        t = later.setTimeout(function() {
            test(5);
        }, sched);

    function test(val) {
       console.log(new Date());
       console.log(val);
    }

运行程序控制台打印：

    Now:Thu Dec 26 2013 14:12:36 GMT+0800 (CST)
    Thu Dec 26 2013 14:12:40 GMT+0800 (CST)
    5

######2). setInterval

定义：2秒后运行，循环运行，直到15秒后，clear停止！

新建文件：setinterval.js


    var later = require('later');
    later.date.localTime();

    console.log("Now:"+new Date());

    var sched = later.parse.recur().every(2).second(),
        t = later.setInterval(function() {
            test(Math.random(10));
        }, sched);

    function test(val) {
       console.log(new Date());
       console.log(val);
    }

    setTimeout(function(){
       t.clear();
       console.log("Clear");
    },15*1000);

运行程序，控制台打印：


    Now:Thu Dec 26 2013 14:17:54 GMT+0800 (CST)
    Thu Dec 26 2013 14:17:56 GMT+0800 (CST)
    0.5084630874916911
    Thu Dec 26 2013 14:17:58 GMT+0800 (CST)
    0.47506075259298086
    Thu Dec 26 2013 14:18:00 GMT+0800 (CST)
    0.957129133399576
    Thu Dec 26 2013 14:18:02 GMT+0800 (CST)
    0.7480122991837561
    Thu Dec 26 2013 14:18:04 GMT+0800 (CST)
    0.9212428922764957
    Thu Dec 26 2013 14:18:06 GMT+0800 (CST)
    0.030472515616565943
    Thu Dec 26 2013 14:18:08 GMT+0800 (CST)
    0.9528024469036609
    Clear
    
    
 ###总结：整个邮件定时发送组件中用到的库的介绍就结束啦！具体的代码请看附件！将两个功能的整合代码请看附件！



 



