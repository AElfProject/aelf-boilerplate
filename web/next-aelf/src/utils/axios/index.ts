/**
 * @author hzz780
 * @description
 * 1. Init axios, config axios, make multiple hook instances, etc
 * Please get more config follow this URL https://www.npmjs.com/package/axios-hooks#useaxiosurlconfig-options
 * 2. Please invoke axiosInit before any usages of the useAxios hook
 */
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';
import Axios from 'axios';
import { BASE_URL, API, API_SCAN } from '../../constants/api';
import { useAxiosTDVW } from './multipleHookInstances';
import { interceptorsBind } from './utils';
import { create } from 'apisauce';
// Please invoke axiosInit before any usages of the useAxios hook
export default function initAxios() {
  const axios = Axios.create({
    baseURL: BASE_URL,
    timeout: 50000,
  });
  interceptorsBind(axios);

  const cache = new LRU({ max: 10 });

  configure({ axios, cache });
}
const api = create({
  baseURL: BASE_URL,
});
const get = async (url: string, params?: any, config?: any) => {
  const res = await api.get(url, params, config);
  if (res.ok) {
    return res.data as any;
  }
};

export { useAxiosTDVW, API, API_SCAN, get };
