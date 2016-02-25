var later = require('../../node_modules/later');

later.date.localTime();

console.log("Now:"+new Date());

var basic = {h: [12], m: [0], D: [15]};
var composite = [
    basic,
    {M: [1,2,3,4,5,6,7,8,9,10,11,12]}
];
var exception = [
    //{M: [12], D: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]}
    { M:[0], D: [15]}
];
later.date.localTime();
var schedule = {
    schedules:composite
    //exceptions:exception
};

later.date.localTime();

console.log("Now:"+new Date());
var occurrences = later.schedule(schedule).next(50);
for(var i = 0; i < occurrences.length; i++) {
    console.log(occurrences[i]);
}

/*
var sched = later.schedule(schedule),
//var sched = later.parse.recur().on(schedu),
    t = later.setInterval(test, sched),
    count = 5;

function test() {
    console.log(new Date());
    if(count <= 0) {
        t.clear();
    }
}*/
