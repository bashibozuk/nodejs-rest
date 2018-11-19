const fs = require('fs');
const storage = require('./storage');
const EventEmitter = require('events');

class Fixture {

    get loaded() {
        return this._loaded;
    }

    set loaded(loaded) {
        console.log(loaded);
        this._loaded = loaded;
        if (!this._loaded) {
            console.log('emitting');
            this.onLoaded.emit('loaded');
        }
    }
    constructor(baseDir) {
        this.baseDir = baseDir;
        this._loaded = 0;
        this.onLoaded = new EventEmitter();
    }

    load() {
        console.log('load', this.baseDir);
        fs.readdir(this.baseDir, 'utf8', (er, files) => {
            console.log('files', files);
            if (!files) {
                return;
            }

            files.filter((v) => v.match(/\.json$/))
                .forEach(file => this.loadFile(file));
        });
    }

    loadFile(file) {
        console.log('loading file', file);
        this.loaded++;
        fs.readFile([this.baseDir, file].join('/'), 'utf8', (err, contents) => {
            try{
                console.log('loaded ', file, err, contents);
                const data = JSON.parse(contents);
                const collection = file.replace(/\.[^\.]+$/, '');
                if (data.constructor === Array) {
                    for (const value of data) {
                        storage.create(collection, value);
                    }
                } else {
                    storage.create(collection, data);
                   
                } 
                console.log(storage.dump());
               --this.loaded;
            } catch(e) {
                console.error(e);
            }
            
        })
    }
}

module.exports = Fixture;