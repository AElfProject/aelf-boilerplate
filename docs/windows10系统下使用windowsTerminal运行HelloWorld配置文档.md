# 如何在 Windows Terminal 运行 AElf -- Hello Wolrd

## 1、如何安装 Windows Terminal

支持Windows Terminal 的 win10最低版本为 1903. 目前没有更新版本。

可以通过 Microsoft 官方提供的`微软Windows10易升`软件进行升级。

在CMD中输入如下命令查看当前 Microsoft Windows 版本。

```cmd
    winver
```

### 1、按照文档安装（需自己编译安装）

https://github.com/microsoft/terminal

按照文档进行编译安装。

本文主要讲解如何使用已经编译后的安装文件安装 Windows Terminal。

### 2、直接获取编译后文件安装（可直接安装）

下载链接: `https://pan.baidu.com/s/1FXPB_IlVFN6MkxMw-ckdkQ` 密码:`zgus` 下载 Windows Terminal 安装包。

下载解压缩后，右键点击 `CascadiaPackage_2019.5.6.0_x86_x64_arm64.msixbundle` 文件，然后按顺序执行以下操作，如遇到需要选择证书的情况，选择同路径下的证书即可。

`属性 -> 数字签名 -> 点击签名列表中第一个 -> 详细信息 -> 查看证书 -> 安装证书 -> 选择本地计算机 -> 选择将所有整数都放入下列存储 -> 找到受信任人 确定 ` 然后双击安装即可。

安装完成后，我们可以通过 Windows 菜单找到 Windows Terminal 应用图标。

## 2、安装 Ubuntu 子系统

### 在Windows Terminal中使用 Ubuntu 子系统

如果想要在 Windows Terminal 中使用 Ubuntu，你还需要在 windows 中安装Ubuntu, 安装步骤如下

打开 Windows store 在搜索栏中搜索 Ubuntu 点击获取。

全部安装完成后需要重新启动计算机。进入系统后右键点击 Windows Terminal 选择使用管理员权限开启，输入 Ubuntu 就可以使用 Ubuntu 子系统了。

### 什么是 Windows Terminal ?

Windows Terminal 是近期微软发布的一款重量级产品，相比将命令行工具，Windows Terminal是一款更高效、更快速的命令行工具。

Windows Terminal相比较老的命令行工具增加以下几点新特性：

1、多Tab切换

支持任意数量的多Tab窗口切换，而且每一个选项可以分别使用命令行、Power Shell、Ubuntu 等。

2、富文本展示

Windows Terminal可以展示字体库中的任意文本符号，表情符号，图标等。（减少了乱码的出现）

3、可配置性

Windows Terminal 提供了许多个性化设置和配置选项，我们可以对工具的外观，以及为新选项卡打开的每个shell /配置文件进行大量控制。

Windows Terminal目前来看只是一种包含了cmd、Power Shell、Ubuntu 的终端工具。期望微软在未来的更新中会做的更好。

如果不想使用Windows Terminal直接在 Windows10中运行 Ubuntu 也可以进行下面的操作。但是你可能需要开多个窗口才能完成所有Demo的运行。

## 3. 如何通过 Windows Terminal 在 Ubuntu子系统 中配置环境

### 1. 安装dotnet-core-2.2

https://dotnet.microsoft.com/learn/dotnet/hello-world-tutorial/install

将左侧选项切换到 LINUX，系统版本选择 Ubuntu 18.04，然后按照文档进行安装即可

### 2、安装依赖

```shell
     // 安装可能会用到的依赖
     sudo apt-get install autoconf automake libtool curl make g++ unzip
```

如果通过 install.sh 无法运行的话，那么你就要尝试自己动手安装 protobuf。
安装 protobuf 的方法看下一节。

### 3、安装 oh-my-zsh

```shell

    //  安装 zsh
    sudo apt install zsh
    
    // 安装 oh-my-zsh
    sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

```

### 4、手动安装 protobuf

```shell
    // 下载 protobuf v3.7.0 版本
    curl -OL https://github.com/protocolbuffers/protobuf/archive/v3.7.0.zip

    // 解压缩 protobuf
    unzip v3.7.0.zip

    // 进入到刚刚解压过的文件夹内
    cd protobuf-3.7.0
```

在 protobuf-3.7.0 路径下执行

```shell

    // 这里我们将 protobuf 安装到 /usr/protobuf  文件夹下，所有要先建立该路径.
    // 推荐你将protobuf安装到此路径，因为以下的操作都按照该路径进行
    sudo mkdir /usr/protobuf


    // 执行该命令，创建 configure 文件。
    ./autogen.sh

    // 设置安装路径为刚创建的 /usr/protobuf
    ./configure --prefix=/usr/protobuf

    // 编译并安装 此过程比较慢，需要耐心等待
    make
    make check
    make install
```

通过 `protoc --version` 来判断安装是否成功，如果已经成功则不需要操作下面的步骤了。

如果未成功你则需要编辑  `.zshrc 添加如下环境变量。

如果未安装 zsh 那么则需要将环境变量写到 /etc/profile 内（不推荐这么做）

```shell
    // 如果你的安装路径不是 /usr/protobuf/ 则将以下环境变量中的 /usr/protobuf/ 替换为你protobuf安装的路径地址
    export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/protobuf/lib/
    export LIBRARY_PATH=$LIBRARY_PATH:/usr/protobuf/lib/
    export PATH=$PATH:/usr/protobuf/bin/
    export C_INCLUDE_PATH=$C_INCLUDE_PATH:/usr/protobuf/include/
    export CPLUS_INCLUDE_PATH=$CPLUS_INCLUDE_PATH:/usr/protobuf/include/
    export PKG_CONFIG_PATH=/usr/protobuf/lib/pkgconfig/

```

完成后，重启 Windows Terminal , 输入命令 `protoc --version`

如果返回版本号为 3.7.0 则证明安装成功，然后就可以愉快的去Build项目了。

* 注意: 请不要通过 apt 安装 protobuf，因为apt安装的 protobuf 为3.0.0版本 可能导致build不成功，如果已经安装了，使用 `apt remove xxxxx` 卸载即可。

## 4、运行 Demo

方法1：

你也可以在本地找到 Ubuntu 子系统的路径，然后通过 Power Shell 运行其中的 Demo

首先你需要找到你的Windows 用户路径例如：`C:\Users\<windows系统用户名>` 在该路径下，你需要找到一个名为 `AppData`的文件夹（注意：该文件夹是隐藏文件夹，你懂得），然后我们就可以通过该路径找到Ubuntu子系统的文件了。

例如我的linux子系统路径为

```cmd

C:\Users\<windows系统用户名>\AppData\Local\Packages\CanonicalGroupLimited.UbuntuonWindows_79rhkp1fndgsc\LocalState\rootfs\home\<子系统用户名>\aelf-boilerplate

```

在 Windows Terminal 运行节点后，使用快捷键 `Ctrl+T` 创建新窗口，点击右上角下拉箭头选择 Power Shell，然后通过上面的路径输入几个关键字后 使用 `tab`   快捷键补全路径就可以轻松的找到子系统路径，然后通过运行Ubuntu子系统内 aelf-boilerplate\web 路径下的Demo程序即可。（需要节点在启动状态）

方法2：

因为本身在 Windows Terminal 是一个相对独立的环境，你可能无法在 Ubuntu 子系统内完成需要使用浏览器的Demo，所以你可能需要在磁盘任意路径下 Clone 一份新的 AElf-boilerplate ,然后直接运行Demo程序。（需要节点在启动状态）

*这里不需要进行任何网络桥接 Ubuntu子系统中运行的节点在 Windows10 系统下依然可以使用。
