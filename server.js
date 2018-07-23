const fetch = require("node-fetch");
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// API calls
app.get('/api', (req, res) => {  
    let wat = req.hostname
    let wat2 = req.body
    let wat3 = req.headers
    let wat4 = req.rawHeaders
    res.send('<h1> yowwwwwwwwwwwwwwwwwwwwwwwwww api hier </h1>');
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

//---------------------// 
//----api functions----//
function getSession(){
    fetch(
        'http://cors-anywhere.herokuapp.com/mobile.wgls.laundryrestart.com/api/checkout/start-session',{
            headers: {'Location': '16'}
        }
    ).then(
        response => {
            console.log(response)
            console.log(typeof(response))
        }
    ).then(
        whoopy => {
            console.log(whoopy)
            return whoopy
        }
    ).catch(err => console.log('There was an error:' + err))
}