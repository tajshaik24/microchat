const express = require('express')();
const serviceRegistry = require('./serviceRegistry');
const ServiceRegistry = new serviceRegistry();

express.set('serviceRegistry', ServiceRegistry);

express.put('/service/:intent/:port', (req, res, next) => {
    const serviceIntent = req.params.intent;
    const servicePort = req.params.port;
    const serviceIP = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
    ServiceRegistry.add(serviceIntent, serviceIP, servicePort);
    res.json({result: `${serviceIntent} at ${serviceIP}:${servicePort}`});
});

module.exports = express;