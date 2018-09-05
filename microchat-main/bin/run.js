const slackClient = require('../server/slackClient')
const service = require('../server/service')
const http = require('http').Server(service)
const PORT = 3000

const witToken = 'INSERT YOUR WIT API KEY HERE';
// A slack access token (from your Slack app or custom integration - usually xoxb)
const slackToken = 'INSERT YOUR SLACK KEY HERE';
const witClient = require('../server/witClient')(witToken)


const serviceRegistry = service.get('serviceRegistry');

// The client is initialized and then started to get an active connection to the platform
const rtm = slackClient.init(slackToken, witClient, serviceRegistry);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => http.listen(PORT, () => console.log(`Listening on ${ PORT }`)))
