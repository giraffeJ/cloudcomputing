const fs = require('fs');

const CACHE_PATH = process.argv[2] || '/data';
const FILE_PATH = CACHE_PATH + '/.last';
const LOG_PATH = CACHE_PATH + '/.log';

fs.watch(CACHE_PATH, { recursive: true }, (evt, name) => {
    fs.readFile(FILE_PATH, 'utf8', function (error, data) {
        if (error) { throw error };
        data = '\n' + data;
        fs.appendFile(LOG_PATH, data, function (err) {
            if (err) throw err;
            console.log('Successfully updated');
        });
    });
});
