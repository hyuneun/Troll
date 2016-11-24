var express = require('express'),
http = require('http'),
path = require("path"),
fs = require('fs');
var app = express();
var server = http.createServer(app).listen(5000, function () {
 console.log('server on !');
 console.log(__dirname);
});

app.use('/resources' , express.static(__dirname + '/resources'));
/*app.use('/resources', function (req , res , next) {
   res.end();
 })*/

 app.get('*',function (req , res ) {
   res.sendfile(__dirname + '/index.html', function (html) {
    if (html) {
     res.send(html);
     res.end();
   }
 });
 });