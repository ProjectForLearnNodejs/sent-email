/*
 * �ڶ��ֶ���ʱ��߷�ʽʵ�֣�later
 */
var later = require('../../node_modules/later');

// �Զ���ʱ��ߣ�������ÿ���µ�15�ŵ�12��00ִ�ж�ʱ����ƻ�
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

next = later.schedule(complexSched).next(13);  // �����13��ʱ���
// ��ӡ��10��ʱ���
for(var i = 0; i < next.length; i++) {
    console.log(next[i]);
}