/**
 * @file initAElf.js
 * @author zmh3788
 * @description none
 */

import config from '../config/config';
import AElf from 'aelf-sdk';

const aelf = new AElf(
  new AElf.providers.HttpProvider(config.defaultChain)
);

export default aelf;
