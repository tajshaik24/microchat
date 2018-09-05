const { RTMClient } = require('@slack/client');
const channelID = 'DCLASM66M'
let rtm = null;
let nlp = null;
let registry = null;

function handleOnAuthenticated(rtmStartData){
    console.log(`Logged in as ${rtmStartData.self.name} of ${rtmStartData.team.name}.`)
}

function addAuthenticatedHandler(rtm, handler) {
    rtm.on('authenticated', handler);
}

function handleOnMessage(msg) {
    if(msg.text.toLowerCase().includes("microchat")){
        nlp.ask(msg.text, (err, res) => {
            if(err){
                console.log(err);
                return;
            } 
            try {
                if(!res.intent || !res.intent[0] || !res.intent[0].value){
                    throw new Error("Couldn't extract intent!");
                }
                const intent = require("./intents/" + res.intent[0].value + "Intent")
                intent.process(res, registry, function(error, res){
                    if(error){
                        console.log(error);
                        return;
                    }
                    return rtm.sendMessage(res, msg.channel);
                });
            }
            catch (err) {
                console.log(err);
                console.log(res);
                rtm.sendMessage('We encountered an error!', msg.channel);
            } 
        });
    }   
}

module.exports.init = function slackClient(token, witClient, serviceRegistry) {
    rtm = new RTMClient(token);
    nlp = witClient;
    registry = serviceRegistry;
    addAuthenticatedHandler(rtm, handleOnAuthenticated);
    rtm.on('message', handleOnMessage)
    return rtm;
}

module.exports.addAuthenticatedHandler = addAuthenticatedHandler;