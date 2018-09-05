const superagent = require('superagent')

module.exports.process = function process(intentData, registry, cb) {
    if(intentData.intent[0].value !== 'weather')
        return cb(new Error("Didn't get expected weather intent."));
    if(!intentData.location) 
        return cb(new Error("Missing the location!"));
    
    const location = intentData.location[0].value;
    const service = registry.get('weather');
    if(!service){
        return cb(false, `The service isn't responding.`);
    } 
    superagent.get(`http://${service.ip}:${service.port}/service/${location}`, (err, res) => {
        if(err || res.statusCode != 200 || !res.body.result) {
            console.log(err);
            return cb(false, `I don't know the weather in ${location}!`)
        }
        
        return cb(false, `The current weather in ${location} is ${res.body.result}`);
    });   
}