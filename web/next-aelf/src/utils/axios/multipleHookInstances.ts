// Multiple Hook Instances
// Sometimes it is necessary to communicate with different APIs or use different caching strategies for different HTTP interactions.
// export const useAxiosTypeA = makeUseAxios({
import { makeUseAxios } from 'axios-hooks';
import Axios from 'axios';
import { BASE_URL_TDVW } from '../../constants/api';

export const useAxiosTDVW = makeUseAxios({
  axios: Axios.create({ baseURL: BASE_URL_TDVW }),
});
