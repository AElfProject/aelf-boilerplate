/**
 * @file initAElf.js
 * @author zmh3788
 * @description none
*/

import config from '../config/config';
import '../../node_modules/aelf-sdk/dist/aelf.umd';

const aelf = new window.AElf(
    new window.AElf.providers.HttpProvider(config.defaultChain)
);

export default aelf;

//  const aelf = null;
