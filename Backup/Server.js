var path = require('path');
var express = require('express');
var app = express();
var url = require('url');
const bodyParser = require('body-parser');
var fs = require('fs');

app.use(express.static(__dirname));


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var i=0;
app.post('/image', (req, res) => {

	fs.writeFile("./Images/image["+i+"].jpg", req.body.data.replace(/^data:image\/[a-z]+;base64,/, ""), {encoding: 'base64'}, function(err){i++;console.log(err)});
	res.sendStatus(200);
});


app.listen(3030, function () {
    console.log('Listening on http://localhost:3030/');
});