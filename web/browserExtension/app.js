/**
 * @file app.js
 * @author huangzongzhe
 */

const express = require('express');
const app = express();

const port = process.env.port || '3000';

app.get('/', (req, res) => {
    res.sendfile('index.html');
});

app.get('/index.js', (req, res) => {
    res.sendfile('index.js');
});

app.get('/aelf.min.js', (req, res) => {
    res.sendfile('aelf.min.js');
});

app.listen(port, () => {
    console.log('----', port);
});