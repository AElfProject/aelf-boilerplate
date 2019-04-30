/**
 * @author zhouminghui
 * @file open.js
 */
const os = require('os');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

let sysType = os.type();
sysType === 'Windows_NT' ? exec('index.html') : spawn('open', ['index.html']);
