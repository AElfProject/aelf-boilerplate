# Readme

React Native: 0.62.4 with expo SDK

AccountTemplate is separated from a third-party project for aelf.

## How to use

Follow this doc: https://reactnative.cn/docs/getting-started.

```bash
yarn
react-native run-ios # react-native run-android
```

## How to run on device

https://reactnative.dev/docs/running-on-device

## How to publish

Please refer to IOS Android compilation and packaging tutorial

## Copy from this project

If you copy the package.json from this project.

```bash
# iOS
FYI AppDelegate.h AppDelegate.h.m Podfile Info.plist Image.scassets
# Android
FYI MainApplication.java android/settings.gradle android/app/build.gradle android/build.gradle AndroidManifest.xml:
# You can get more information of config from the different components docs of this project.
```

### 0.Check the version of Expo

Each Expo SDK version depends on a React Native version 

https://docs.expo.io/versions/latest/

### 1.Config react-native-unimodules iOS & Android

https://github.com/unimodules/react-native-unimodules

### 2.May you need set react-native-vector-icons manually iOS & Android

https://github.com/oblador/react-native-vector-icons

### 3. face id  iOS & Android

https://github.com/naoufal/react-native-touch-id

Todo: use https://www.npmjs.com/package/expo-local-authentication

### 4. react-native-image-crop-picker

https://www.npmjs.com/package/react-native-image-crop-picker

### 5.How to set splash Screen iOS & Android

https://github.com/crazycodeboy/react-native-splash-screen

Tip: iOS, please check 

```bash
Images.xcassets/LaunchScreen.imageset & Baase.lproj/LaunchScreen.xib
```

### 6.react-native-camera iOS & Android

https://react-native-community.github.io/react-native-camera/docs/installation.html

If you want to use Face Detection/Text Recognition/BarCode with MLKit

Follow the `Additional installation steps`

Tips:

- Android: You need register your app in Firebase console

## If you want run in your phone

iOS, please config Signing & Capabilities in xCode.

## Q&A

### 1.iOS: pod, CDN: trunk Repo update failed

Run pod install in ./ios
```bash
# CDN: trunk Repo update failed
# Podfile add
# In Mainland https://mirror.tuna.tsinghua.edu.cn/help/CocoaPods/
source 'https://github.com/CocoaPods/Specs.git'
# In Mainland: https://blog.csdn.net/u012265444/article/details/83212038
```

### 2.Android: studio-config#setup-proxy

https://developer.android.com/studio/intro/studio-config#setup-proxy

### 3.Android: Tried to register two views with the same name xxx

```javascript
// import ProgressBarAndroid from '../ProgressBarAndroid';
// hava not remove ProgressBarAndroid in 0.62.4 yet. If import the community version,
// It will throw `register two views with the same name`;
import { ProgressBarAndroid } from '@react-native-community/progress-bar-android';
```
## TODO

1. Complete faceID module.
2. Complete image scan in withdraw page.


