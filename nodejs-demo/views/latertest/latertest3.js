/*
 * 第二种定义时间尺方式实现，later
 */
var later = require('../../node_modules/later');

// 自定义时间尺，定义在每个月的15号的12：00执行定时任务计划
var complexSched = later.parse.recur()
        .on(10,20,30,40,50).minute(),
    t = later.setInterval(function() {
        test(Math.random(10));
        console.log('hello');
    }, complexSched);

function test(val) {
    console.log(new Date());
    console.log(val);
}

later.date.localTime();

console.log("Now:"+new Date());

next = later.schedule(complexSched).next(13);  // 获得下13个时间尺
// 打印下10个时间尺
for(var i = 0; i < next.length; i++) {
    console.log(next[i]);
}