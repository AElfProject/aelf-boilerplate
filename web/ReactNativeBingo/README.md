# ReactNative

## Requirements

You have to install `Node`, `Npm` and `Yarn` before going through next steps.

## How to run BingoGame

Please make sure that you are ready to use React Native. [0.59 docs](https://facebook.github.io/react-native/docs/getting-started)

reactnative.cn Tutorial.

- [macOS iOS](https://ke.qq.com/webcourse/index.html#course_id=197101&term_id=100233637&taid=1220865928921581&vid=a1417i5op7k)

- [macOS Android](https://ke.qq.com/webcourse/index.html#course_id=197101&term_id=100233637&taid=1220870223888877&vid=z1417kmxask)

- [windows Android](https://ke.qq.com/webcourse/index.html#course_id=197101&term_id=100233637&taid=1220874518856173&vid=d1417tgg1ez)

### Install dependencies

```bash
yarn
```

or, just choose one tools between `Yarn` and `Npm`

```bash
npm i
```

### iOS

```bash
# app/config/config.js
defaultChain: 'http://127.0.0.1:1235' # match your own api
```

```shell
bash build.sh run-ios
```

### Android

```bash
# app/config/config.js
defaultChain: 'http://10.0.2.2:1235' # match your own api
```

```shell
bash build.sh run-android
```

## Can not run it

1. Find the solution with Googel. Most of the error belongs to React Native.

2. And you can create [issues](https://github.com/AElfProject/aelf-boilerplate/issues) or just use `broserBingo`.

## How to use the RN app in your real phone

Please see [docs of React Native](https://facebook.github.io/react-native/docs/0.59/getting-started).
