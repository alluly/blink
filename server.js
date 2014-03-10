//	Customization

var appPort = 8080;

// Librairies

var express = require('express'), app = express();
var http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);
  
app.configure(function() {
	app.use(express.static(__dirname + '/public'));
});

server.listen(appPort);
// app.listen(appPort);
console.log("Server listening on port 8080");

//socket stuff
var users = 0; 

io.sockets.on('connection', function (socket) { 

	users += 1; // Add 1 to the count
	reloadUsers(); // Send the count to all the users
	
	socket.on('message', function (data) { // Broadcast the message to all
		var transmit = {date : new Date().toISOString(), location : getLocation(socket), message : data};
		socket.broadcast.emit('message', transmit);
		console.log("user at "+ transmit['location'] +" said \""+data+"\"");
		//save message in mongo?
	});
	socket.on('setLocation', function (data) {
		socket.set('location', data, function(){
			console.log("someone joined at " + data);
			//mongo query for data near this area
		});
	});

	socket.on('disconnect', function () { 
		users -= 1;
		reloadUsers();
	});
});

function reloadUsers() { 
	io.sockets.emit('nbUsers', {"nb": users});
}

function getLocation(socket) {
	var location;
	socket.get('location', function(err, loc) {
		if (loc == null) location = false; 
		else location = loc; 
	});
	
	return location; 
}
