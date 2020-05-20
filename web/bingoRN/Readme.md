# Readme

React Native: 0.62.4 with expo SDK

AccountTemplate is separated from a third-party project for aelf.

## Extra Dependencies

Expo: https://docs.expo.io/

```bash
npm install --global expo-cli
```

## 1.How to dev

Follow this doc: https://reactnative.cn/docs/getting-started.

```bash
yarn
cd ios && pod install
react-native run-ios # react-native run-android
```

You can find some advice about how to write your project by this framework in `appDev.md`.

## 2.How to run on device

https://reactnative.dev/docs/running-on-device

`iOS: please config Signing & Capabilities in xCode.`

## 3.Copy from this project

If you copy the package.json from this project.

```bash
# iOS
FYI AppDelegate.h AppDelegate.h.m Podfile Info.plist Image.scassets
# Android
FYI MainApplication.java android/settings.gradle android/app/build.gradle android/build.gradle AndroidManifest.xml:
# You can get more information of config from the different components docs of this project.
```

```bash
Replace the android/app/google-services.json

https://console.firebase.google.com/
```

### 3.1.Check the version of Expo

Each Expo SDK version depends on a React Native version 

https://docs.expo.io/versions/latest/

### 3.2.Config react-native-unimodules iOS & Android

https://github.com/unimodules/react-native-unimodules

### 3.3.May you need set react-native-vector-icons manually iOS & Android

https://github.com/oblador/react-native-vector-icons

### 3.4. face id  iOS & Android

https://github.com/naoufal/react-native-touch-id

Todo: use https://www.npmjs.com/package/expo-local-authentication

### 3.5. react-native-image-crop-picker

https://www.npmjs.com/package/react-native-image-crop-picker

### 3.6.How to set splash Screen iOS & Android

https://github.com/crazycodeboy/react-native-splash-screen

Tip: iOS, please check 

```bash
Images.xcassets/LaunchScreen.imageset & Baase.lproj/LaunchScreen.xib
```

### 3.7.react-native-camera iOS & Android

https://react-native-community.github.io/react-native-camera/docs/installation.html

If you want to use Face Detection/Text Recognition/BarCode with MLKit

Follow the `Additional installation steps`

Tips:

- Android: You need register your app in Firebase console

### 3.8.others

Please check the components you use.

## 4.Package && Production && Publish

### Android APK

FYI: https://reactnative.dev/docs/signed-apk-android#generating-the-release-apk

We set a default keystore for you in android/app/src

`#file: aelf-template-key.keystore  #password: loveaelf`

### iOS ipa

https://wiki.genexus.com/commwiki/servlet/wiki?34616,HowTo%3A+Create+an+.ipa+file+from+XCode

## 5.Build & Publish (Integrate fastlane & firim)

Make sure you install the dependencies for react-native.

You can follow this doc: https://reactnative.cn/docs/getting-started.

You can find more operations in 
[build&publish.md](https://github.com/AElfProject/aelf-boilerplate/blob/dev/web/aelfAccountTemplateRN/build%26publish.md).

### Install fasltlane

```bash
# Install the latest Xcode command line tools:
xcode-select --install

# Install fastlane using
## Using RubyGems
sudo gem install fastlane -NV
## Alternatively using Homebrew
brew install fastlane
```

### Config and run

```bash
# Navigate to your iOS or Android app and find fastlane
# Android
set your own json_key_file & package_name in Appfile
set your api_token & dingtalk_access_token in Fastfile
# iOS
set your own app_identifier & apple_id & itc_team_id & team_id
set your api_token & dingtalk_access_token in Fastfile
## Check Matchfile, use your own storage to manage certificates & provisioning profiles.
## git_url("https://github.com/hzz780/fastlane-certificates")
```

```bash
# build & publish
npm run firmim
# npm run firim:android
# npm run firim:ios
```

## 6.Q&A

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

### iOS keyboard

https://github.com/rccoder/blog/issues/25

## TODO

1. Complete faceID module.
2. Complete image scan in withdraw page.
3. Interactive experience improvement
    - account QR code in android
    - button click in android
4. Rewrite: use react hook
5. Bug check: componentDidUpdate get the same value when use 
