const cv = require('opencv4nodejs');
var path = require('path');
var express = require('express');
var app = express();
var url = require('url');
const bodyParser = require('body-parser');
var fs = require('fs');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const vCap = new cv.VideoCapture(0);
var red=250*3,green=150,blue=red+2;

//const NodeWebcam = require('node-webcam-master');
app.use(express.static(__dirname));

/*var opts = {

    width: 1280,
    height: 720,
    quality: 100,
    frames: 60,
	delay: 0,
    saveShots: true,
	output: "jpeg",
	device: false,
    callbackReturn: "base64",
    verbose: false
};


var Webcam = NodeWebcam.create( opts );

Webcam.capture( "test_picture", function( err, data ) {} );



var image;*/

//app.use(timeout('10s'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var i=0,oldimage;
//var oldimage = new Buffer(fs.readFile('./Images/image[0].bmp', (err,data)=>{}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    /*NodeWebcam.capture( "test_picture1", opts, function( err, data ) {
        image = "<img src='" + data + "'>";
        res.send(image);
    });*/
	
    //res.write(image);
});

app.post('/image', (req, res) => {
    red=parseInt(req.body.red);
    green=parseInt(req.body.green);
    blue=parseInt(req.body.blue); 
    red=(640*3)-(red*3);
    green=480-green; 
	//fs.writeFile("./Images/image["+i+"].jpg", req.body.data.replace(/^data:image\/[a-z]+;base64,/, ""), {encoding: 'base64'}, function(err){i++;console.log(err)});
	res.sendStatus(200);
});
var sample;
fs.readFile('./Images/sample.bmp', (err,data) =>{sample=data;})
setInterval(vido,1000/2);
function vido() {
    const frame = vCap.read();
    const image = cv.imencode('.bmp',frame);
//    fs.readFile('./Images/image[0].bmp', (err,data) =>{
        //oldimage=data;
    //console.log(oldimage.length,image.length);

    //console.log(oldimage);
    
    j=(640*3*green)-100+red
    for (l=0;l<100;l++){
        temp=j;
        for (j=temp; j<temp+300; j+=3){
            for (i=0;i<3;i++){
                image[j+i]=255-image[j+i]}
        }
        j=j+(540*3);
    }
    io.emit('image',image.toString('base64'));
    fs.writeFile("./Images/image[0].bmp", image, /*{encoding: 'base64'},*/ function(err){});
 //   });
    
//    console.log(image);
//	const image = cv.imencode('.jpg',frame).toString('base64');
	
 //   fs.writeFile("./Images/image[0].bmp", oldimage, /*{encoding: 'base64'},*/ function(err){i++;console.log(err)});
}

server.listen(3030, function () {
    console.log('Listening on http://localhost:3030/');
});