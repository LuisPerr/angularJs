var http = require('http'),
	conf = require('./conf'),
	expressServer = require('./app/expressServer'),
	socketIO = require('./app/socketIO');

var Workers = function(config){
	config = config || {}

	
	console.log('Inicia conexión');

	var app = new expressServer({parameters : conf });

	this.server = http.createServer(app.expressServer);

	var Io = new socketIO({server:this.server});
}

Workers.prototype.run = function(){
	this.server.listen(conf.port);
}

if(module.parent){
	module.exports = Workers;
} else {
	var workers = new Workers();
	workers.run();
	console.log('Modo debug');
}