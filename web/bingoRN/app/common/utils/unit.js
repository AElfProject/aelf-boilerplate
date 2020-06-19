import { Dimensions } from 'react-native';

// 设备宽度，单位 dp
const deviceWidthDp = Dimensions.get('window').width;

// 设计稿宽度（这里为750px），单位 px
const uiWidthPx = 750;

// px 转 dp（设计稿中的 px 转 rn 中的 dp）
const pTd = (uiElePx) => {
  return uiElePx * deviceWidthDp / uiWidthPx;
}

export  default pTd