const devConfig = require('./development');
const proConfig = require('./production');
const { NODE_ENV } = process.env;

module.exports = NODE_ENV === 'production' ? proConfig : devConfig;
