const express = require('express')();
const superagent = require('superagent');

express.get('/service/:location', (req, res, next) => {
    
    superagent.get('http://api.openweathermap.org/data/2.5/weather?q=' + 
    req.params.location + '&APPID=INSERT YOUR API KEY HERE&units=imperial', (err, response) => {

        if (err) {
            console.log(err);
            return res.sendStatus(404);
        }

        res.json({result: `${response.body.weather[0].description} at ${response.body.main.temp} degrees`});

    });
});

module.exports = express;