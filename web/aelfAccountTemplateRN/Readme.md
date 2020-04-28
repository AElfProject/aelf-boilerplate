# Readme

React Native: 0.62.4 with expo SDK

AccountTemplate is separated from a third-party project for aelf.

## How to use

```bash
yarn
react-native run-ios # react-native run-android
```

FYI: https://reactnative.cn/docs/getting-started.

## How to run on device

https://reactnative.dev/docs/running-on-device

## How to publish

Please refer to IOS Android compilation and packaging tutorial

## Copy from this project

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

### 2.May you need set react-native-vector-icons manually

https://github.com/oblador/react-native-vector-icons

### 3. face id

https://github.com/naoufal/react-native-touch-id

Todo: use https://www.npmjs.com/package/expo-local-authentication

### How to set splash Screen

https://github.com/crazycodeboy/react-native-splash-screen

Tip: iOS, please check 

```bash
Images.xcassets/LaunchScreen.imageset & Baase.lproj/LaunchScreen.xib
```

## If you want run in your phone

iOS, please config Signing & Capabilities in xCode.

## Q&A

### 1.Pod: CDN: trunk Repo update failed

Run pod install in ./ios
```bash
# CDN: trunk Repo update failed
# Podfile add
# In Mainland https://mirror.tuna.tsinghua.edu.cn/help/CocoaPods/
source 'https://github.com/CocoaPods/Specs.git'
# In Mainland: https://blog.csdn.net/u012265444/article/details/83212038
```
