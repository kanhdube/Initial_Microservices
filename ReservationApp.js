var express = require('express');
var bodyParser = require('body-parser');
var amqp = require('amqplib/callback_api');
//const axios = require('axios');

var {mongoose} = require('./db/mongooseReservation');
var {Reservation} = require('./models/Reservation');
var {Inhouse} = require('./models/Inhouse');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
console.log('dir is: ', __dirname);
//app.post('/todos', (req,res) => {
//    console.log(req);
//});
app.get('/home.html',(req, res) => {
    res.sendFile('/home.html');
});
app.get('/rsrv_details',(req, res) => {
    res.sendFile('/rsrv_details.html');
});
app.post('/findReservation',(req, res) => {
   var folioForSrch = req.body.folio;
   console.log('In app : ', req.body.folio);
   Reservation.findOne({folioNum : folioForSrch}, function(err, resultRsrv){
       if (err) {return console.log("Error fetching reservation data")}
       console.log(resultRsrv.toJSON());
       res.json(resultRsrv.toJSON());
   })

});
app.post('/reservations',(req, res)=> {
     var rsrv = new Reservation({
        folioNum:req.body.folioNum,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address:req.body.address,
        checkinDate:req.body.checkinDate,
        checkoutDate:req.body.checkoutDate,
        ratePgm:req.body.ratePgm,
        status:req.body.status,
        notes:req.body.notes

     });
     rsrv.save().then((result) =>{
         res.send("result is sent");
     },(e)=> {
         res.status(400).send("error sending response from server");
     });
    amqp.connect('amqp://localhost',function(err,conn) {
	if (err) { console.log('error:', err) }
	else {
		console.log('Connection to RabbitMq is successful');
		conn.createChannel(function(err, ch){
			var q = 'rsrv_q';
			ch.assertQueue(q,{durable:false});
			ch.sendToQueue(q, new Buffer(rsrv.toString()));
			console.log("[x] Sent the rsrv");
		});
	}
	//setTimeout(function() {conn.close(); process.exit(0)}, 500);
  });
})

app.listen(8000, ()=> {
    console.log('Server started on 8000 ...');
})