#!/bin/sh
cat << EOT

        |ˉˉˉˉˉˉˉˉˉ\ |ˉˉˉˉˉˉˉˉˉˉ||ˉˉˉ\    |ˉ|  /ˉˉˉˉˉˉ\   /ˉˉˉˉˉˉˉˉ\ 
        | |ˉˉˉˉˉ\ |  ˉˉˉ|  |ˉˉˉ | |\ \   | | / /ˉˉˉˉ\ | / /ˉˉˉˉˉˉ\ \

        |  ˉˉˉˉˉ  /     |  |    | | \ \  | || |      ˉˉ | |      | |
        | |ˉˉˉˉˉ\ \     |  |    | |  \ \ | || |  |ˉˉˉˉˉ|| |      | |
        | |     /  |    |  |    | |   \ \| | \ \  ˉ| |ˉ \ \      / /
        |  ˉˉˉˉˉ  / |ˉˉˉ    ˉˉˉ|| |    \ ˉ |  \ ˉˉˉ /    \ ˉˉˉˉˉˉ /
         ˉˉˉˉˉˉˉˉˉ   ˉˉˉˉˉˉˉˉˉˉ  ˉ      ˉˉˉ    ˉˉˉˉˉ      ˉˉˉˉˉˉˉˉ
EOT

sleep 1

#当变量a为null或为空字符串时则var=b
node_modules_action=${1:-"default"}
echo ${node_modules_action}

if [ ${node_modules_action} = "run-ios" ]
then 
    echo "yarn install"
    yarn install && echo "install done"
    sleep 3
    yarn install && echo "install check done"
    sleep 3
    react-native link && echo "link complete"
    sleep 1
    react-native link react-native-randombytes && echo "react-native link react-native-randombytes"
    sleep 1
    ./node_modules/.bin/rn-nodeify --hack --install && echo "./node_modules/.bin/rn-nodeify --hack --install"
    sleep 1
    react-native run-ios
fi

if [ ${node_modules_action} = "run-android" ]
then
    echo "yarn install"
    yarn install && echo "install done"
    sleep 3
    yarn install && echo "install check done"
    sleep 3
    react-native link && echo "link complete"
    sleep 1
    react-native link react-native-randombytes && echo "react-native link react-native-randombytes"
    sleep 1
    ./node_modules/.bin/rn-nodeify --hack --install && echo "./node_modules/.bin/rn-nodeify --hack --install"
    sleep 1
    react-native run-android
fi