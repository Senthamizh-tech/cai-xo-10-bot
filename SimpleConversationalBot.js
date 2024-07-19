var botId = "st-724cb5e2-dc8f-520a-abf8-7f6c232e5d36";
var botName = "PokiMon";
var sdk = require("./lib/sdk");

/*
 * This is the most basic example of BotKit.
 *
 * It showcases how the BotKit can intercept the message being sent to the bot or the user.
 *
 * We can either update the message, or chose to call one of 'sendBotMessage' or 'sendUserMessage'
 */
module.exports = {
    botId   : botId,
    botName : botName,

    on_user_message : function(requestId, data, callback) {
        //console.log("Data ===> ", data.context.session.BotUserSession.lastMessage)
        if (data.message === "Hi") {
            data.message = "Hello";
            //console.log("user message",data.message);
            //Sends back 'Hello' to user.
            return sdk.sendUserMessage(data, callback);
        } else if(!data.agent_transfer){
            //Forward the message to bot
            return sdk.sendBotMessage(data, callback);
        } else {
            data.message = "Agent Message";
            return sdk.sendUserMessage(data, callback);
        }
    },
    on_bot_message  : async function(requestId, data, callback) {
        if (data.message === 'hi') {
            data.message = 'The Bot says hello!';
            console.log("bot message",data)
        }
        //Sends back the message to user
        //console.log("bot message",data.message)
        //console.log("Custom Payload ===> ", data.context.session.BotUserSession);
        // const custRes = new Promise(function(resolve, reject) {
        //     sdk.sendUserMessage(data, callback).then(function(res) {
        //         resolve(res);
        //     })
        //     .catch(function(err){
        //         return reject(err);
        //     })
        // });
        
        // var mod_data = {
        //     ...data,
        //    "message":"Spell-corrected message sent by the assistant to the user",
        //     "context": {
        //         ...data.context,
        //         "custom": "Test Variable"
        //     }
        // }
        // console.log("Modified data ===> ", mod_data.context.session.BotUserSession);
        // console.log("Modified data ===> ", mod_data.context.session);
        // console.log("Modified data ===> ", mod_data.context.session.BotUserSession.channels);
        // console.log("Stringified data ===> ", JSON.stringify(mod_data));

        var overrideMessagePayload = {};
        overrideMessagePayload = {
                body: "{\"text\":\"Response1\"}",
                isTemplate: true
        };
         data.overrideMessagePayload = overrideMessagePayload;
        console.log("Stringified data ===> ", JSON.stringify(data));
        const timeOutFn = (data,callback) =>{
          return sdk.sendUserMessage(data, callback)  
        }
        const myTimeout = setTimeout(timeOutFn(data,callback), 25000);
         clearTimeout(myTimeout);
         // return (
                // .then(function () {
                //     //data.message = "Response 2";
                //     overrideMessagePayload = {
                //         body: "{\"text\":\"Response2\"}",
                //         isTemplate: true
                //     };
                //     data.overrideMessagePayload = overrideMessagePayload;
                //     return setTimeout(sdk.sendUserMessage(data, callback), 25000);
                // })
              // );
        // sdk.getSavedData(requestId)
        //     .then(() => {
        //         const payload = {
        //            "taskId":"Dialog task ID",
        //            "nodeId":"Current node ID in the dialog flow",
        //            "channel":"Channel name",
        //            "context": true
        //         }
        //         payload.context.successful = false;
        //         console.log("Context ===> ", data.context);
        //         return sdk.respondToHook(payload);
        //     });
    },
    on_agent_transfer : function(requestId, data, callback){
        return callback(null, data);
    },
    on_event : function (requestId, data, callback) {
        console.log("on_event -->  Event : ", data.event);
        return callback(null, data);
    },
    on_alert : function (requestId, data, callback) {
        console.log("on_alert -->  : ", data, data.message);
        return sdk.sendAlertMessage(data, callback);
    }

};


