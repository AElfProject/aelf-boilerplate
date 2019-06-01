# windows系统下使用protobuf以及执行dotnet build时常见问题

本文档：

运行环境

```bash

 os：windows10 家庭中文版 x64
 node：v10.15.1
 npm: 6.4.1
 dotnet-sdk: 2.2.300
```

硬件环境

```bash

    CPU: Intel Core i5-8250U
    RAM: 8GB
    磁盘空间：256GB
```

## 问题描述

```bash
google/protobuf/timestamp.proto: File not found.
```

通常是因为protobuf下载后，解压缩出来后，protoc文件夹内有个两个文件夹，一个bin 一个include

当仅把 bin\protoc.exe 放到 C:\WINDOWS\ 时，会找不到include对应的依赖，自然就报File not found的错误了。将include文件夹也复制过去即可。

注意：

    1.windows优先寻找 C:\WINDOWS\protoc, 再寻找环境变量中配置的protoc路径，各位开发者请自行判断。

    2. window10下执行ps1需要额外操作，大家自行搜索。

AELF提供了三个简单的解决方案供大家使用，具体脚本和方案如下。

## 1. install.ps1 脚本

运行 ```chain/scripts/install.ps1```

<!-- *有开发者反馈运行脚本后编译找不到proto文件，你可以通过另外两种方式运行，详情见 ```手动安装 protoc & unzip``` ```使用 install_protoc.ps1 脚本``` -->

<!-- 如果你不想自己手动安装protoc 也不想重新下载新的脚本文件，那么你可以通过编辑 install.ps1 脚本文件来实现环境的搭建 -->

```ps1
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

    if(Test-Path C:\protoc\bin\protoc.exe) {
        cp C:\protoc\include C:\WINDOWS\;
        cp C:\protoc\bin\protoc.exe  C:\WINDOWS\;
        protoc --version;
        exit 100;
    }
    else {
        wget https://github.com/protocolbuffers/protobuf/releases/download/v3.7.0/protoc-3.7.0-win64.zip -OutFile C:\protoc-3.7.0-win64.zip;
        Expand-Archive -Path C:\protoc-3.7.0-win64.zip -DestinationPath C:\protoc;
        cp C:\protoc\include C:\WINDOWS\;  // 增加此处
        cp C:\protoc\bin\protoc.exe  C:\WINDOWS\;
        protoc --version;
        exit 0;
    };
```

<!-- 然后删除掉```C:\WINDOWS\``` 目录下的 protoc.exe 重新执行脚本即可。 -->

## 2. 使用 install_protoc.ps1 脚本

你可以在 ```AElf开发社区0群``` 的群共享文件中找到 ```install_protoc.ps1``` 脚本文件，下载它到任意目录（全英文路径），然后执行它。（执行方法与```install.ps1```相同）

在此之前你需要确保 ```C:\WINDOWS``` 目录下不存在 ```protoc.exe``` 与 ```include``` 文件夹，因为windows会默认执行```C:\WINDOWS```目录下的 ```protoc``` 有可能导致你编译失败。

注意：代码库中chain/scripts/install_choco.ps1 脚本和群里install_protoc.ps1 脚本是同一个脚本； choco是windows的包管理工具。

## 3. 手动安装 protoc & unzip

### 1. 手动下载 protoc

下载地址： https://github.com/protocolbuffers/protobuf/releases/tag/v3.7.0

1. 下载 protoc-3.7.0-win64/32 根据系统判断下载哪个版本

2. 解压缩到任意目录（路径需要全英文）

3. 设置环境变量（解压缩目录/bin）

### 2. 手动下载unzip

下载地址： https://sourceforge.net/projects/gnuwin32/files/unzip/5.51-1/unzip-5.51-1.exe/download?use_mirror=nchc&download=

1. 安装到任意目录（路径需要全英文）

2. 设置环境变量 安装目录/bin

## 3. 编译项目

1. 执行

```shell
    cd chain/src/AElf.Boilerplate.Launcher/
    dotnet build
```

编译完成后没有报错则代表编译成功（黄色警告不影响程序运行）

如果出现 xxx 不是内部命令或外部命令请检查你的环境变量是否正确。

如果出现 xxx 被进程占用无法访问，请到任务管理器中关闭所有 dotnet 程序， 然后重新执行上面的命令。

```sell
    dotnet run bin/Debug/netcoreapp2.2/AElf.Boilerplate.Launcher
```

执行该命令如果没有报错则代表执行成功。