# ReactNative

## 如何启动 BingoGame

在运行BingoGame之前，请先确保你已经按照文档配置好了测试环境。
如果您不知道如何配置测试环境，您可以通过 https://reactnative.cn/docs/getting-started.html
查找你所需的环境配置，或者[点击查看](./docs/EnvironmentBuilding.md), 请确保可以正常运行 Ios模拟器 与 Android 模拟器。

视频教程 (React-native 中文网)

- [macOS iOS](https://ke.qq.com/webcourse/index.html#course_id=197101&term_id=100233637&taid=1220865928921581&vid=a1417i5op7k)

- [macOS Android](https://ke.qq.com/webcourse/index.html#course_id=197101&term_id=100233637&taid=1220870223888877&vid=z1417kmxask)

- [windows Android](https://ke.qq.com/webcourse/index.html#course_id=197101&term_id=100233637&taid=1220874518856173&vid=d1417tgg1ez)


### macOs IOS 如何启动

首先确保 app/config/config.js 中有相应的配置。你不需要进行修改，但是需要注意 IOS模拟器中需要使用 ```defaultChain: 'http://127.0.0.1:1235/chain'```

1. 运行

```shell
    bash build.sh run-ios
```

### macOs Android 如何启动

首先确保 app/config/config.js 中有相应的配置。你不需要进行修改，但是需要注意 IOS模拟器中需要使用 ```defaultChain: 'http://10.0.2.2:1235/chain'``` (Android Studio 模拟器 映射主机地址为 ```10.0.2.2```)

1. 运行

```shell
    bash build.sh run-android
```

# 无法运行

如果您第一次无法运行，请删除 node_modules 重新运行 ```bash build.sh run-xxx``` 如果依旧无法使用，您可以到我们的git上发起 [Issues](https://github.com/AElfProject/aelf-boilerplate/issues) 或者使用 ```broserBingo```


# 配置真机测试环境

## [Link Android](./docs/android.md)