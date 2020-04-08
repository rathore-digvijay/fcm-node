/*
 * File: index.js
 * Project: firebase-node
 * File Created: Monday, 6th April 2020 2:45:13 pm
 * Author: Digvijay (rathore.digvijay10@gmail.com)
 */

const fcmService = require('./fcm-notify.js'),
schedule = require('node-schedule');
const data = {};
// mandatory, string or array of strings
data.receivers = "web-app"; // OR ["abcdef", "jklmno"]
// mandatory, string, notification title
data.title = "Hello";
// mandatory, string, notification body
data.body = "from server side";

// optional, Object, various options
data.options = {
    priority: "high"
};

// this scheduler will invoke at each hour.
let scheduler = schedule.scheduleJob('0 */1 * * *', function(){         
    console.log('The answer to life, the universe, and everything!',Date.now());
    console.log("next job invokation -->",scheduler.nextInvocation());
    fcmService.notify(data);
});
console.log("next job invokation -->",scheduler.nextInvocation());
