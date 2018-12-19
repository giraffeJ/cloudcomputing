const fs = require('fs');
const watch = require('node-watch');
const path = require('path');

const CACHE_PATH = '/data';
console.log(CACHE_PATH);
const FILE_PATH = CACHE_PATH + '/.last';
console.log(FILE_PATH);
const LOG_PATH = CACHE_PATH + '/.log';
console.log(LOG_PATH);
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
    console.log('222');
    touchSync(FILE_PATH);
    touchSync(LOG_PATH);
    console.log('333');
    fs.watch(FILE_PATH, { recursive: true }, function (evt, name) {
        console.log('444');
        fs.readFile(FILE_PATH, 'utf8', function (error, data) {
            console.log('555');
            if (error) { throw error };
            fs.readFile(LOG_PATH, 'utf8', function (err, data2) {
                console.log('666');
                if (err) throw err;
                data2 = data2 + '\n' + data;
                fs.writeFile(LOG_PATH, data2, 'utf8', function (err, data) {
                    console.log('777');
                    if (err) throw err;
                    console.log('Successfully updated');
                })
            });
        });
    });
});