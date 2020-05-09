# Build & Publsih


## fir.im CLI publish test application

If you had build your .apk or .ipa by Android studio or xcode,
you can publish them to fir.im by fir-cli. (You can use other distribution services)

### 1.install fir-cli

Docs: https://github.com/FIRHQ/fir-cli/blob/master/doc/install.md

```bash
$ ruby -v # > 2.6.1
# MacOS Please: brew install ruby
$ gem install fir-cli
```

### 2.Login by api token

Docs: https://github.com/FIRHQ/fir-cli/blob/master/doc/login.md

Get api token：https://www.betaqr.com/apps/apitoken

```bash
$ fir login YOUR_API_TOKEN
$ fir me # Check login information
```

### 3.Publish to fir.im

Docs: https://github.com/FIRHQ/fir-cli/blob/master/doc/publish.md

#### Android Demo

```bash
fir publish /Users/huangzongzhe/workspace/aelf-boilerplate/web/aelfAccountTemplateRN/android/app/build/outputs/apk/release/app-release.apk -D 'Your dingding token' -s anaelfaccountdemo -c 'change log'
```

#### iOS Demo

```bash
fir publish /Users/huangzongzhe/Downloads/test/aelfAccountTemplateRNiOS/aelfAccountTemplateRN.ipa -s iosaelfaccountdemo -D 'Your dingding token'  -s iosaelfaccountdemo  -c 'change log'
```

### 4.Update fir-cli

```bash
fir upgrade
```

## Fastlane

Automatic build and publish.

We integrate fir-cli to publish test app.

If you want to publish to Google Play or AppStore, please follow the docs of fastlane.

### Install fastlane

Docs: https://docs.fastlane.tools/#why-fastlane

```bash
# Install the latest Xcode command line tools:
xcode-select --install

# Install fastlane using
## Using RubyGems
sudo gem install fastlane -NV
## Alternatively using Homebrew
brew install fastlane
```

#### Init fastlane & Add fir_cli

Navigate to your iOS or Android app and run

```bash
fastlane init
fastlane add_plugin fir_cli
```

In Chinese mainland, if you exec `fastlane init`, and `bundle update` slowly.

```bash
# Open Gemfile, change the source
https://gems.ruby-china.com/
```

### Android

#### Android Appfile

Check package_name & json_key_file

#### Android Fastfile

```bash
desc "Deploy a new version to the fir.im"
  lane :fir_im do
    gradle(
      task: "assemble",
      build_type: "Release"
    )

    # Android version: app/build.gradle
    # android.defaultConfig

    # update to fir.im
    fir_cli(
      api_token: "",
      short: "anaelfaccountdemo",
      changelog: "Hello fir.im",
      dingtalk_access_token: "",
    )
  end
```

### iOS

#### Code Signing Guide

If you had code signing identities inside a Git repo, Google Cloud or Amazon S3 ready. Please skip this step.

Docs: http://docs.fastlane.tools/codesigning/getting-started/

Docs: https://docs.fastlane.tools/actions/match/

We recommend `match` to manage certificates & provisioning profiles.

```bash
# Clear your certificates at first
fastlane match nuke development
fastlane match nuke distribution
fastlane match nuke enterprise
```

```bash
# Init new certificates & provisioning profiles in Storage.
fastlane match adhoc
fastlane match appstore
fastlane match development
```

#### Check iOS Appfile

```bash
app_identifier("") # The bundle identifier of your app
apple_id("") # Your Apple email address

itc_team_id("") # App Store Connect Team ID
team_id("") # Developer Portal Team ID
```

#### Fastfile example

```bash
  desc "Push a new release build to the firm"
  lane :fir_im do
    sync_code_signing(
      type: "adhoc",
      readonly: true,
      app_identifier: ["com.aelf.aelfAccountTemplateRN"],
      username: ''
      )
    gym(
      scheme: "aelfAccountTemplateRN",
      export_method: "ad-hoc",
      silent: true,  # 隐藏没有必要的信息
      clean: true,  # 在构建前先clean
    )
    # publish to fir.im
    fir_cli(
      api_token: "",
      short: "iosaelfaccountdemo",
      changelog: "Hello fir.im",
      dingtalk_access_token: "",
    )
  end
```

#### About add UDID

https://developer.apple.com/account/resources/devices/list

#### About Bundle Identifier

In xCode, you can find and change you Bundle Identifier

`Build Settings/Packaging -> Product Bundle Identifier`

And maybe you need create a new app.

https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/ng/app

## Q & A

### iOS profile

```bash
 error: Provisioning profile "iOS Team Provisioning Profile: com.aelf.aelfAccountTemplateRN" doesn't include signing certificate "Apple Development: WEN NIU (8746A3ZJDX)". (in target 'aelfAccountTemplateRN' from project 'aelfAccountTemplateRN')
```

#### 1. clear exist profile and redownload them

https://blog.csdn.net/MinggeQingchun/article/details/70049401

#### 2. more

https://www.jianshu.com/p/a50e4e098a08

## Advanced

You can use one Fastlane file for you ReactNative project.

http://docs.fastlane.tools/getting-started/cross-platform/react-native/
