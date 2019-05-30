/**
 * @file initAElf.js
 * @author zmh3788
 * @description none
*/

import config from '../config/config';
import '../../node_modules/aelf-sdk/dist/aelf.js';

// TODO: import 拿不到 AElf 但是window已经被注入
const aelf = new window.AElf(
    new window.AElf.providers.HttpProvider(
        config.defaultChain, // https://127.0.0.1:8000/chain
        null,
        null,
        null,
        [{
            name: 'Accept',
            value: 'text/plain;v=1.0'
        }]
    )
);

export default aelf;

//  const aelf = null;
