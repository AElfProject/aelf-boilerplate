/**
 * @author zhouminghui
 * @file open.js
 */
const open = require('open');

(() => {
    console.log('Open http://localhost:8900/index.html');

    setTimeout(() => {
        open('http://localhost:8900/index.html');
    }, 2000);
})();
