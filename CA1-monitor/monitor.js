const fs = require('fs');

const CACHE_PATH = '/data';
const FILE_PATH = CACHE_PATH + '/.last';
const LOG_PATH = CACHE_PATH + '/.log';
function touchSync(path) {
    if (fs.existsSync(path)) return;
    fs.openSync(path, 'w');
}
var check = 0;
fs.appendFile(LOG_PATH, 'empty', function (err) {
    try {
        fs.mkdirSync(CACHE_PATH);
    } catch (e) {
        if (e.code != 'EEXIST') throw e;
    }
    touchSync(FILE_PATH);
    touchSync(LOG_PATH);
    fs.watch(FILE_PATH, { recursive: true }, function (evt, name) {
        fs.readFile(FILE_PATH, 'utf8', function (error, data) {
            if (error) { throw error };
            data = data + '\n';
            fs.readFile(LOG_PATH, 'utf8', function (err, data2) {
                if (err) throw err;
                data2 = data2 + '\n' + data;
                fs.writeFile(LOG_PATH, data2, 'utf8', function (err, data) {
                    if (err) throw err;
                    console.log('Successfully updated');
                })
            });
        });
    });
});