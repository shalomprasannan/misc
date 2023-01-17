/* global MediaRecorder $ */
/*eslint no-console: 0*/

const record = document.getElementById('record');
const stop = document.getElementById('stop');

if (!navigator.mediaDevices){
  alert('getUserMedia support required to use this page');
}

const chunks = [];

// Not showing vendor prefixes.
navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true
}).then(function(mediaStream) {	
  const recorder = new MediaRecorder(mediaStream);
  recorder.ondataavailable = function(e) { chunks.push(e.data)};
  const video = document.querySelector('video');
  video.srcObject = mediaStream;
  const url = window.URL.createObjectURL(new Blob(chunks, {type: "video/webm"}));
  video.src = url;
  console.log("Hi");
  record.onclick = function(){
    recorder.start();
    document.getElementById('status').innerHTML = 'recorder started';
    console.log(recorder.state);
    console.log('recorder started');
  }

  stop.onclick = ()=> {
	alert("Hi");
    recorder.stop()
    console.log(recorder.state)
    document.getElementById('status').innerHTML = 'recorder started'
    console.log('recorder stopped')
  }

  video.onloadedmetadata = (e) => {
    console.log('onloadedmetadata', e)
  }

  recorder.onstop = (e) => {
    console.log('e', e)
    console.log('chunks', chunks)
    const bigVideoBlob = new Blob(chunks, { 'type' : 'video/mp4; codecs=mp4' })
    let fd = new FormData()
    fd.append('fname', 'test.webm')
    fd.append('data', bigVideoBlob)
    $.ajax({
      type: 'POST',
      url: '/',
      data: fd,
      processData: false,
      contentType: false
    }).done(function(data) {
      console.log(data)
    })
  }
  
}).catch(function(err){
  console.log('error', err)
})
