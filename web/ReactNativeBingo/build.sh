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

npx react-native link && echo "link complete"
sleep 1
npx react-native link react-native-randombytes && echo "npx react-native link react-native-randombytes"
sleep 1
npx rn-nodeify --hack --install && echo "npx rn-nodeify --hack --install"

if [ ${node_modules_action} = "run-ios" ]
then 
    npx react-native run-ios
fi

if [ ${node_modules_action} = "run-android" ]
then
    npx react-native run-android
fi