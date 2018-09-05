const superagent = require('superagent');
const service = require('../server/service');
const http = require('http').Server(service);

http.listen(() => {
    console.log(`Listening on ${http.address().port}.`);

    const announce = () => {
        superagent.put(`http://127.0.0.1:3000/service/weather/${http.address().port}`, (err, res) => {
            if(err) {
                console.log(err);
                console.log("Error connecting to Microchat.");
            }
            console.log(res.body);
        });
    };
    announce();
    setInterval(announce, 15*1000);
});