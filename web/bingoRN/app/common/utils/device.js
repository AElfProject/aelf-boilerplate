// iPhoneX
import { Dimensions, Platform, StatusBar, PixelRatio } from "react-native";

const X_WIDTH = 375;
const X_HEIGHT = 812;
// screen
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const isIos = Platform.OS === 'ios';

const pixelSize = (function () {
  let pixelRatio = PixelRatio.get();
  if (pixelRatio >= 3) return 0.333;
  else if (pixelRatio >= 2) return 0.5;
  else return 1;
})();

const isIphoneX = (function () {
  return (
    Platform.OS === 'ios' &&
    ((SCREEN_HEIGHT >= X_HEIGHT && SCREEN_WIDTH >= X_WIDTH) ||
      (SCREEN_HEIGHT >= X_WIDTH && SCREEN_WIDTH >= X_HEIGHT))
  )
})();

const statusBarHeight = (function () {
  let BarHeight = StatusBar.currentHeight
  if (isIos) {
    if (isIphoneX) {
      BarHeight = 44
    } else {
      BarHeight = 20
    }
  }
  return BarHeight
})();

export { statusBarHeight, isIphoneX, pixelSize }

