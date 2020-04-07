/*
 * File: fcm-notify.js
 * Project: firebase-node
 * File Created: Monday, 6th April 2020 3:41:52 pm
 * Author: digvijay (rathore.digvijay10@gmail.com)
 */

// Add the SDK
const fcm_admin = require('firebase-admin');
var serviceAccount = require("./fcmConfig.json");
// var token = "czh7BEAcMOD2ed9xTzHOaP:APA91bFC3QHbwCUaQtrS-XCnliom74i38ckAu3_96AjZw0CQCq1ZzUtitohkw_NOqTtYU7ll7zByjuiKO8lbvHFe2TI-H7oTmXNPZSP5KV6_tv3ZZRc8OLnJ9TGkukzG3sq-oDwF2Nbi";
var token = "abcdfres";
/**
 * Initialize the SDK
 */
function initializeFcm() {
    // without Authorization
    // fcm_admin.initializeApp();
    
    //with Authorization
    // fcm_admin.initializeApp({
    //     credential: admin.credential.applicationDefault(),
    //     databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
    // });
    fcm_admin.initializeApp({
        credential: fcm_admin.credential.cert(serviceAccount),
        databaseURL: "https://slots-push-notification-test1.firebaseio.com"
    });
}

/**
 * This message send the notification to specified users whose registration token is placed here.
 * For ref: https://firebase.google.com/docs/reference/admin/node/admin.messaging.Messaging
 * @param {Array | String} registrationTokens A device registration token or an array of device registration tokens to which the message should be sent.
 * @param {Object} payload Message Object
 * @param {Object} options Optional, for options while sending message
 */
function sendToDevice(registrationTokens, payload, options) {
    console.log("push notification in fcm-notify");
    fcm_admin.messaging().sendToDevice(token, payload, options)
        .then(function (response) {
            console.log("Successfully sent message:", response);
        })
        .catch(function (error) {
            console.log("Error sending message:", error);
        });
}

/**
 * This method is exported and used to send the notification
 * @param {Object} params Object which must contain receivers, title and body.
 */
function sendNotification(params) {
    try {
        if (!params || !params.receivers || !params.title || !params.body) {
            throw "Missing Keys";
        }
        initializeFcm();
        let payload = {
            notification: {
                title: params.title,
                body: params.body
            }
        };
        sendToDevice(params.receivers, payload, params.options);
    } catch (error) {
        console.error("Error while sending Notification", error);
    }
}

module.exports = {
    notify: sendNotification
};