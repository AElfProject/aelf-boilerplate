/**
 * @author zhouminghui
 * @file open.js
 */
const os = require('os');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

let sysType = os.type();
exec('node app.js');
sysType === 'Windows_NT' ? exec('explorer http://localhost:3000/') : spawn('open', ['http://localhost:3000/']);
