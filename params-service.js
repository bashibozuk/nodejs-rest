const DEFAULT_PORT = 3000;

const DEFAULT_STATIC_FOLDER = 'static';

class ParamsService {

    static get DEFAULT_PORT() {
        return DEFAULT_PORT;
    }

    static get DEFAULT_STATIC_FOLDER() {
        return DEFAULT_STATIC_FOLDER;
    }

    static getParams() {

        const params = {
            port: DEFAULT_PORT,
            staticFolder: DEFAULT_STATIC_FOLDER
        }

        process.argv.forEach((value, index, array) => {
            let matches = value.match(/([^=]+)=([^=]+)$/);
            if (!matches) {
                return;
            }

            if (matches[1] === 'port') {
                params.port = matches[2];
            } else if (matches[1] === 'static-folder') {
                params.staticFolder = matches[2];
            } else if(matches[1] === 'fixture-folder') {
                params.fixtureFolder = matches[2];
            }
        });

        return params;
    }
}

module.exports = ParamsService;
