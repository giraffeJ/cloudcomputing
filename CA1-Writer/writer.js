
console.log("hello world");

const fs = require('fs');
const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';
const FILE_PATH =  '/data/.last';

const app = express();
app.get('/', (req, res) => {
    res.send("Hello world!\n")
}).get('/:whatever', (req, res) => {
    const msg = `${Date.now()},${req.params.whatever}`;
    console.log(msg)
    fs.writeFile(FILE_PATH, msg, 'utf8', function(error, data){
        if(error) {throw error};
        console.log('Write Complete\n');
        res.send('Data Changed to' + msg);
    });
});

app.listen(PORT, HOST);