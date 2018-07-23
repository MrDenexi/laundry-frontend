const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build'), {etag: false})); 

// use strict routing
app.enable('strict routing');

// API calls
app.get('/api', (req, res) => {  
    let wat = req.host
    let wat2 = req.body
    let wat3 = req.headers
    let wat4 = req.rawHeaders
    res.send(console.log('zien we dit yo?'));
});

// Handle React routing, return all requests to React app
app.get('/waku', function(req, res) {  
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
app.listen(port, () => console.log(`Listening on port ${port}`));
