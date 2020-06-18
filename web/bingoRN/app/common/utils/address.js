import { config } from '../utils/config';
const { address } = config;
const { prefix, suffix } = address;

module.exports.format = (addressInput) => {
  return prefix + '_' + addressInput + '_' + suffix;
};
