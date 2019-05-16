# 如何配置Android真机测试环境（打包.apk文件）

Android 要求所有应用都有一个数字签名才会被允许安装在用户手机上，所以在把应用发布到类似Google Play store这样的应用市场之前，你需要先生成一个签名的 APK 包。你也可以查看了解更多细节问题[Android Studio 如何给应用签名](https://developer.android.com/studio/publish/app-signing)

## 生成签名密钥

```shell
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

这条命令会要求你输入密钥库（keystore）和对应密钥的密码，然后设置一些发行相关的信息。最后它会生成一个叫做my-release-key.keystore的密钥库文件。

```-validity ``` 后的参数为有效期
```-alias``` 后的参数为别名

因为 -alias 在之后的配置中会使用到，请务必记住别名。

```注意：请记得妥善地保管好你的密钥库文件，一般不要上传到版本库或者其它的地方。因为之后的版本发布都需要使用到该密钥文件。```

## 设置 gradle

将生成好的 ```my-release-key.keystore``` 放置到工程中的 android/app 文件夹下。

编辑 ```~/.gradle/gradle.properties``` 或者 ```工程目录/android/app```，如果没有该文件你可以自行创建一个，添加如下代码

```
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore  对应文件
MYAPP_RELEASE_KEY_ALIAS=my-key-alias 别名
MYAPP_RELEASE_STORE_PASSWORD=***** 设置的密码
MYAPP_RELEASE_KEY_PASSWORD=*****
```

## 将签名配置加入到项目中

编辑项目目录下的 ```android/app/build.gradle```

```
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```

## 打包 .apk

你可以在终端中输入以下代码打包 .apk

```shell
    cd android
    ./gradlew assembleRelease
```

在出现 ```BUILD SUCCESSFUL``` 后代表打包成功
如果出现 ```ERROR``` 你可以查看是否有以下几项，如果没有请提Issues。

### react-native-os Error && react-native-tcp Error

如果错误信息包含 版本等信息，那么很有可能是因为 react-native-os 与 react-native-tcp 中的 build.gradle  与项目中的不一致

解决办法

```
更改 node_modules/react-native-os/android 下的 build.gradle 并使其与项目目录下的     compileSdkVersion buildToolsVersion 保持一致，然后重新执行 ./gradlew assembleRelease 即可
```



