/*
30.03.2016
 */


const express = require('express');
const bodyParser = require('body-parser');
const paramsService = require('./params-service');
const Fixture = require('./fixture');
const params = paramsService.getParams();
const app = express();
app.use(bodyParser.json());

const storage = require('./storage');

app.use(express.static(params.staticFolder))

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


if (params.fixtureFolder) {
    const fixture = new Fixture(params.fixtureFolder);
    fixture.load();
    fixture.onLoaded.on('loaded', () => {
        app.listen(params.port, function() {
            console.log('Server running...', params);
        });
    })
} else {
    app.listen(params.port, function() {
        console.log('Server running...', params, storage.dump());
        
    });
}