const superAgent = require('superagent')

function handleWitResponse(response) {
    return response.entities;
}

module.exports = function witClient(token) {
    const ask = function talk(msg, cb) {
        superAgent.get('https://api.wit.ai/message')
                  .set('Authorization', 'Bearer ' + token)
                  .query({v : '20180904'})
                  .query({q: msg})
                  .end((err, res) => {
                      if(err) return cb(err);
                      if(res.statusCode != 200) return cb("Didn't get correct response.")
                      const witResponse = handleWitResponse(res.body)
                      return cb(null, witResponse)
                  })
    }

    return {
            ask: ask
        }
}