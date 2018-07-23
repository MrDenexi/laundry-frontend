var http = require('http');
var Httpdispatcher = require('httpdispatcher');
var dispatcher = new Httpdispatcher();
const port = 8080;
var static = require('node-static');
var reactpage = new static.Server('./client/build'); // the react client page

function handleRequest(req, res){
    try{
        console.log(req.url); //log request
        dispatcher.dispatch(req, res); //dispatch
    } catch(err){
        console.log(err);
    }
}

var happyServer = http.createServer(handleRequest);

//fancy routing
dispatcher.onGet('/api', function(req, res){ // '/api' -> getting the api call.
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1> This is api </h1>')
})
dispatcher.onGet('/', function(req,res){ //'/' react page
    reactpage.serve(req, res);
})
dispatcher.onError(function(req, res){ // error stuff
    res.writeHead(404);
    res.end("Error, page doesn't exist");
})

//start happyserver
happyServer.listen(port, function(){
    // Hello houston.
    console.log("Server listening on: http://localhost:%s", port);
})