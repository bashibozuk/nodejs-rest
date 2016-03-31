/*
30.03.2016
 */


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const storage = require('./storage');

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

app.get('/bower_components/*', function(request, response) {
    response.sendFile(__dirname + '/' + request.path);
});

app.route('/:collection/')
    .get(function(request, response) {
        response.send(JSON.stringify(storage.list(request.params.collection)));
    })
    .post(function (request, response) {
        console.log(request.body);
        response.send(JSON.stringify(storage.create(request.params.collection, request.body)));
    });

app.route('/:collection/:key')
    .get(function (request, response) {
        response.send(JSON.stringify(storage.read(request.params.collection, request.params.key)));
    })
    .put(function (request, response) {
        response.send(JSON.stringify(storage.update(request.params.collection, request.params.key, request.body)));
    })
    .delete(function (request, response) {
        response.send(JSON.stringify(storage.remove(request.params.collection, request.params.key)));
    });


app.listen(3000, function() {
    console.log('Server running...');
});