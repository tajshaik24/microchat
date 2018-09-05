const express = require('express')();
const superagent = require('superagent');
const moment = require('moment');

express.get('/service/:location', (req, res, next) => {
    superagent.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + req.params.location + '&key=INSERT YOUR KEY HERE', (err, resp) => {
        if(err){
            console.log(err);
            return res.sendStatus(500);
        } 
        const location = resp.body.results[0].geometry.location;
        const timestamp = +moment().format('X');
        superagent.get("https://maps.googleapis.com/maps/api/timezone/json?location=" + location.lat + "," + location.lng + "&timestamp=" + timestamp  + "&key=INSERT YOUR KEY HERE", (err, resp) => {
            const result = resp.body;
            const timeString = moment.unix(timestamp + result.rawOffset + result.dstOffset).utc().format('dddd, MMMM Do YYYY, h:mm:ss a');
            res.json({result: timeString});
        });
    });
});

module.exports = express;