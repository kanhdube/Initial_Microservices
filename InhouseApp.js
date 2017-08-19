var express = require('express');
var bodyParser = require('body-parser');
var amqp = require('amqplib/callback_api');
var {mongoose} = require('./db/mongooseInhouse');
//var {Todo} = require('./models/Todo');
var {Inhouse} = require('./models/Inhouse');

var app = express();

//app.use(bodyParser.json());
amqp.connect('amqp://localhost',function(err,conn){
	conn.createChannel(function(err, ch) {
		var q = 'rsrv_q';
		ch.assertQueue(q, {durable:false});
		console.log('Waiting for messages in queue');
		ch.consume(q, function(msg){
		console.log(' [x] Recieved %s', msg.content.toString());
		//global.mesg = msg.content.firstName;
		}, {noAck:true});

		console.log(mesg.content.firstName);		

	});
});

app.listen(8081, ()=> {
    console.log('Client started on 8081 ...');
    
});