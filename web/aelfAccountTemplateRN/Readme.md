# Readme

React Native: 0.62.4

## New one

If you copy the package.json from this project.

```bash
#iOS
cp AppDelegate.h AppDelegate.h.m Podfile Info.plist Image.scassets
```

### 0.Check the version of Expo

Each Expo SDK version depends on a React Native version 

https://docs.expo.io/versions/latest/

### 1.Config react-native-unimodules

https://github.com/unimodules/react-native-unimodules

### 2.Set react-native-vector-icons manually

Not support autolinking in 6.6.0

https://github.com/oblador/react-native-vector-icons

###

https://www.npmjs.com/package/@react-native-community/progress-bar-android

### How to set splash Screen

https://github.com/crazycodeboy/react-native-splash-screen

Tip: iOS, please check 

```bash
Images.xcassets/LaunchScreen.imageset & Baase.lproj/LaunchScreen.xib
```

## Q&A

Make sure you had build your environment for react-native.

https://reactnative.cn/docs/getting-started

```bash
yarn
```

Run pod install in ./ios
```bash
# CDN: trunk Repo update failed
# Podfile add
# In Mainland https://mirror.tuna.tsinghua.edu.cn/help/CocoaPods/
source 'https://github.com/CocoaPods/Specs.git'
# In Mainland: https://blog.csdn.net/u012265444/article/details/83212038
```
