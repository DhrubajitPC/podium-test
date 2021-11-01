const express = require('express');
const fs = require('fs')
const Podlet = require('@podium/podlet');
const path = require('path')


const app = express();

const podlet = new Podlet({
    name: 'reactPod', // required
    version: '1.0.0', // required
    pathname: '/', // required
    manifest: '/manifest.json', // optional, defaults to '/manifest.json'
    content: '/', // optional, defaults to '/'
    development: true, // optional, defaults to false
});


// Read the asset manifest using the node filesystem
let rawdata = fs.readFileSync(path.resolve("../react-demo/build/asset-manifest.json"));
let assets = JSON.parse(rawdata);
// All entrypoint files css and js should be added to the podlet definition.
// Ideally should a CDN host allvstatic files...
// For demonstration purposes, the files are served through the podlet process.
assets.entrypoints.forEach((element, index) => {
  if (element.indexOf(".css") !== -1) {
    podlet.css({ value: "http://localhost:3001/" + element });
  } else if (element.indexOf(".js") !== -1) {
    podlet.js({ value: "http://localhost:3001/" + element, defer: true });
  } 
});

app.use(podlet.middleware());

app.get(podlet.content(), (req, res) => {
	
	res.status(200).podiumSend('<div id="root">ola</div>');

});

app.get(podlet.manifest(), (req, res) => {
	res.status(200).send(podlet);
});


app.listen(7200);
