const fs = require('fs');
const express = require('express');
const watch = require('node-watch');

const PORT = 8080;
const HOST = '0.0.0.0';
const CACHE_PATH =  process.argv[2] || '/data';
const FILE_PATH =  CACHE_PATH + '/.last';
const LOG_PATH =  CACHE_PATH + '/.log';

watch(FILE_PATH, {recursive: true}, function(evt, name){

    fs.readFile(FILE_PATH, 'utf8', function(error, data){
        if(error) {throw error};
        data = '\n' + data;
        fs.appendFile(LOG_PATH, data, function(err){
            if(err) throw err;
            console.log('Successfully updated');
        });
    });
});