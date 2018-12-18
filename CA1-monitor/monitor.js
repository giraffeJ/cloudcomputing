const fs = require('fs');
const watch = require('node-watch');

const CACHE_PATH = process.argv[2] || '/data';
const FILE_PATH = CACHE_PATH + '/.last';
const LOG_PATH = CACHE_PATH + '/.log';
function touchSync(path) {
    if (fs.existsSync(path)) return;
    fs.openSync(path, 'w');
}
var check = 0;
fs.appendFile(LOG_PATH, 'empty', function (err) {
    console.log('111');
    try {
        fs.mkdirSync(CACHE_PATH);
    } catch (e) {
        if (e.code != 'EEXIST') throw e;
    }
    touchSync(FILE_PATH);
    touchSync(LOG_PATH);
    watch(FILE_PATH, { recursive: true }, function (evt, name) {
            fs.readFile(FILE_PATH, 'utf8', function (error, data) {
                if (error) { throw error };
                data = data + '\n';
                fs.appendFile(LOG_PATH, data, function (err) {
                    if (err) throw err;
                    console.log('Successfully updated');
                });
            });
    });
});