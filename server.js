const fetch = require("node-fetch");
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
const loc = 16;

// API calls
app.options("/*", function(req, res, next){ //CORS is strange again. handle OPTIONS request.
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Session');
    res.send(200);
});
app.get('/api', (req, res) => {  
    res.send('<h1> Niks te zien gap </h1>');
});
app.get('/api/start-session', (req, res) => {  
    let url = 'http://mobile.wgls.laundryrestart.com/api/checkout/start-session'
    let headers = {Location: loc}
    fetch(url,{headers: headers}).then(function(response) {
        response.text().then(function(text) {
            console.log('returned', text);
            res.setHeader('content-type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(text);
        });
    });
});
app.get('/api/machines', (req, res) => {  
    let url = 'http://mobile.wgls.laundryrestart.com/api/catalog/machines/1'
    let headers = {Location: loc, Session: req.get('Session')}
    fetch(url,{headers: headers}).then(function(response) {
        response.text().then(function(text) {
            console.log('returned', text);
            res.setHeader('content-type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Session, Datefrom, Dateto');
            res.send(text);
        });
    });
});
app.get('/api/bookings', (req, res) => {  
    let url = 'http://mobile.wgls.laundryrestart.com/api/checkout/extended-bookings-for-location?' +
                'locationId='+loc+'&dateFrom='+req.get('Datefrom');//+'&dateTo='+req.get('dateFrom');
    let headers = {Location: loc}
    fetch(url,{headers: headers}).then(function(response) {
        response.text().then(function(text) {
            console.log('returned', text);
            res.setHeader('content-type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(text);
        });
    });
});

// Handle React routing, return all requests to React app
app.get('/*', function(req, res) {
    let reqfile = req.path;
    if (reqfile == '/') reqfile = '/index.html'
    res.sendFile(path.join(__dirname, 'client/build', reqfile), '', function(err){
        if (err) {
            console.log(err);
            res.sendStatus(404).send();
        }
        else console.log('Requested', reqfile)
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));