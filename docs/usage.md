# Usage

The main usage of aelf-boilerplate is to develop contracts for AElf blockchains. Once you've downloaded or cloned this project, that process looks something like this:


1. Use **AElf.Boilerplate.sln**, run project **AElf.Boilerplate.Launcher**, and try Greeter project located in `web/greeter` to make sure the AElf blockchain can be run in local machine.

2. Use **AElf.Contracts.BingoContract.sln**, run project **AElf.Boilerplate.BingoContract.Launcher**, and try Bingo Game loclated in `web/ReactNativeBingo`, famaliar with the code of Bingo Game, which is a DApp of the AElf blockchain.

3. Use **AElf.Boilerplate.sln**, modify the `appsettings.json` in project **AElf.Boilerplate.CodeGenerator**, running this project will generate a contract development template as well as a new sln file.

4. With the new sln file you can develop your new contract, and build your new contract project will generate a patched contract dll which can be deployed to AElf TestNet/MainNet.


Besides, we provided demo contracts of most of our AElf Contract Standards(ACS). As shown before, aelf-boilerplate project is enough for you to getting familiar with AElf contract development, but it has to say that aelf-boilerplate is a start point of developing AElf contract, not a destination.

But before you either start try Greeter and Bingo Game, or ready to develop a smart contract, you'll need to install the following tools and frameworks.

For most of these dependencies we provide ready-to-use command line instructions. In case of problems or if you have more complex needs, we provide the official link with full instructions.

## Common dependencies

This section is divided into two sub sections: the first concerns the common dependencies that are needed for running a node. The second shows the extra dependencies needed for building the sources and/or smart contract development.

### Pre-setup for Windows users

A convenient tool for Windows users is **Chocolatey** for installing dependencies. Follow the installation instructions below (see here for more details [**Chocolatey installation**](https://chocolatey.org/install)):

Open and [administrative Powershell](https://www.digitalcitizen.life/ways-launch-powershell-windows-admin) and enter the following commands:
```Powershell
Set-ExecutionPolicy AllSigned
or
Set-ExecutionPolicy Bypass -Scope Process

Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

Later, **Chocolatey** can be very useful for installing dependencies on Windows systems.

### Pre-setup for macOS users

It is highly recommended that you install **Homebrew (or simply Brew)** to quickly and easily setup dependencies (see here for more details [**Homebrew install page**](https://brew.sh/)). Open a terminal and execute the following command:
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### Node js

Next install nodejs by following the instructions here (see here for more details [**Nodejs**](https://nodejs.org/en/download/)):

On macOS:
```bash
brew install node
```

On Windows:
```bash
choco install nodejs
```

On Linux:
```bash
sudo apt-get install nodejs
```
## Building sources and development tools

{% hint style="info" %} 
You only need to follow this section if you intend to build aelf from the sources available on Github or if you plan on doing smart contract development.
{% endhint %}

### Windows build tools

A dependency needed to build **AElf** from the command line under Windows is **Visual Studio Build Tools**. The easiest way is to use the **Visual Studio Installer**: 

If you already have an edition of **Visual Studio** installed, open the **Visual Studio Installer** and add the **Desktop development with C++** workload:

<p align="center">
    <img src="pictures/setup-vs-install-workload.png" height="300">
</p>

If you don't have any of the Visual Studio editions installed:

- you can download it here [**Visual Studio Community Edition**](https://visualstudio.microsoft.com/fr/downloads/?rr=https%3A%2F%2Fwww.google.com%2F) for free and after the installation add the **Desktop development with C++** workload.

- or if you don't need or want a full blown installation of **Visual Studio**, you can download the build tools here: [**Download Page**](https://visualstudio.microsoft.com/downloads/#other). Scroll down and under the section *Tools for Visual Studio 2019* download the build tools for Visual Studio:

<p align="center">
    <img src="pictures/setup-build-tools.png" height="100" width="600">
</p>

 After the installation open **Visual Studio Installer**, locate and install the *C++ build tools*.

 <p align="center">
    <img src="pictures/setup-build-tools-2.png" height="50">
</p>

### Git

If you want to run a node or use our custom smart contract environment, at some point you will have to clone (download the source code) from AElf's repository. For this you will have to use **Git** since we host our code on GitHub.

Click the following link to download Git for your platform (see here for more details [**Getting Started - Installing Git**](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)):

On macOS:
```bash 
brew install git
```

On Windows:
```bash
choco install git
```

On Linux:
```bash
sudo apt install git-all
```

### Development framework - dotnet core sdk

Most of AElf is developed with dotnet core, so you will need to download and install the .NET Core SDK before you start:

[**Download .NET Core 3.1**](https://dotnet.microsoft.com/download/dotnet-core/3.1)

For now AElf depends on version 3.1 of the SDK, on the provided link find the download for your platform (for Windows and macOS the installer for x64 is the most convenient if your platform is compatible - most are these days), the page looks like this: 

<p align="center">
    <img src="pictures/setup-dotnet-sdk-dl-link.png" height="200">
</p>

Wait for the download to finish, launch the installer and follow the instructions (for AElf all defaults provided in the installer should be correct).

To check the installation, you can open a terminal and run the ``dotnet`` command. If everything went fine it will show you dotnet options for the command line.

### Protobuf

Depending on your platform, enter one of the following commands (see here for more details [**Protobuf Github**](https://github.com/protocolbuffers/protobuf)):

On Windows, open a **Powershell** and enter the following commands:
```bash
choco install protoc --version=3.11.4 -y
choco upgrade unzip -y
```

On Linux:
```bash
# Make sure you grab the latest version
curl -OL https://github.com/google/protobuf/releases/download/v3.11.4/protoc-3.11.4-linux-x86_64.zip

# Unzip
unzip protoc-3.11.4-linux-x86_64.zip -d protoc3

# Move protoc to /usr/local/bin/
sudo mv protoc3/bin/* /usr/local/bin/

# Move protoc3/include to /usr/local/include/
sudo mv protoc3/include/* /usr/local/include/

# Optional: change owner
sudo chown ${USER} /usr/local/bin/protoc
sudo chown -R ${USER} /usr/local/include/google
```

on macOS:
```bash
brew install protobuf@3.11
brew link --force --overwrite protobuf@3.11
```

## Setup Boilerplate

### Clone the repository

The following command will clone AElf Boilerplate into a **aelf-boilerplate** folder with Boilerplate's code inside it, open a terminal and enter the following command:

```bash
git clone https://github.com/AElfProject/aelf-boilerplate
```

The [**boilerplate repo**](https://github.com/AElfProject/aelf-boilerplate) contains a framework for easy smart contract development as well as examples (some explained in this series of articles).

### Build and run

#### Open the project

If not already done, open vscode and open the **aelf-boilerplate** folder. If asked to add some "required assets" say **yes**. There may also be some dependencies to restore: for all of them, choose **Restore**.

<p align="center">
  <img src="pictures/vscode-dep-autox150.png" width="200">
</p>

Open vscode's **Integrated Terminal** and build the project with the following command. Note: you can find out more about vscode's terminal [**here**](https://code.visualstudio.com/docs/editor/integrated-terminal).

#### Install script

As stated earlier, Boilerplate takes care of the C# code generation and thus has a dependency on protobuf. If you don't already have it installed, run the following script from withing the **aelf-boilerplate** folder:

```bash
# Mac or Linux
sh chain/scripts/install.sh

# Windows
# open a PowerShell console as administrator
chain/scripts/install.ps1
```

{% hint style="info" %}
If you prefer or have problems, you can refer to the following guide to [**manually install**](https://github.com/protocolbuffers/protobuf/blob/master/src/README.md) protobuf on your system.
{% endhint %}

#### Build and run

The next step is to build Boilerplate and all the contracts to ensure everything is working correctly. Once everything is built, we'll run Boilerplate's internal node.

```bash
# enter the Launcher folder and build 
cd chain/src/AElf.Boilerplate.Launcher/

# build
dotnet build

# run the node 
dotnet run --no-build bin/Debug/netcoreapp3.1/AElf.Boilerplate.Launcher
```

{% hint style="warning" %}
 When running Boilerplate, you might see some errors related to an incorrect password, to solve this, you need to backup your `data-dir/keys/` folder and start with an empty keys folder. Once you've cleaned the keys, stop and restart the node with the ```dotnet run``` command shown above.
 {% endhint %}

At this point, the smart contracts have been deployed and are ready to be called (Boilerplate has a functioning API). You should see the node's logs in the terminal and see the node producing blocks. You can now stop the node by killing the process (usually **control-c** or **ctrl-c** in the terminal).

#### Run tests

Boilerplate makes it easy to write unit tests for your contracts. Here we'll take the tests of the Hello World contract included in Boilerplate as an example. To run the tests, navigate to the **AElf.Contracts.HelloWorldContract.Test** folder and run:

```bash
cd ../../test/AElf.Contracts.HelloWorldContract.Test/
dotnet test
```
The output should look somewhat like this, meaning that the tests have successfully executed:
```bash 
Test Run Successful.
Total tests: 1
     Passed: 1
 Total time: 2.8865 Seconds
```

At this point, you have successfully downloaded, built, and run Boilerplate. You have also run the HelloWorld contract's tests that are included in Boilerplate. Later articles will show you how to add a contract and its tests and add it to the deployment process.

### More on Boilerplate

Boilerplate is an environment that is used to develop smart contracts and dApps. After writing and testing your contract on Boilerplate, you can deploy it to a running AElf chain. Internally Boilerplate will run an AElf node that will automatically have your contract deployed on it at genesis.

Boilerplate is composed of two root folders: **chain** and **web**. This series of tutorial articles focuses on contract development so we'll only go into the details of the **chain** part of Boilerplate. Here is a brief overview of the folders:

<!-- 
## chain  // root of the contract development folder
### src 
### contract 
#### AElf.Contracts.HelloWorldContract
##### AElf.Contracts.HelloWorldContract.csproj
##### HelloWorldContract.cs
##### HelloWorldContractState.cs
##### ...
### protobuf 
#### hello_world_contract.proto
#### ...
### test 
#### AElf.Contracts.HelloWorldContract.Test 
##### AElf.Contracts.HelloWorldContract.Test.csproj
##### HelloWorldContractTest.cs
### ...
-->

```
.
└── chain 
    ├── src 
    ├── contract
    │   └── AElf.Contracts.HelloWorldContract
    │       ├── AElf.Contracts.HelloWorldContract.csproj
    │       ├── HelloWorldContract.cs
    │       ├── HelloWorldContractState.cs
    │       └── ...
    ├── protobuf
    │   ├── hello_world_contract.proto
    │   └── ...
    ├── test 
    │   └── AElf.Contracts.HelloWorldContract.Test
    │       ├── AElf.Contracts.HelloWorldContract.Test.csproj
    │       └── HelloWorldContractTest.cs
    └── ...
```

The hello world contract and its tests are split between the following folders:
- **contract**: this folder contains the csharp projects (.csproj) along with the contract implementation (.cs files).
- **protobuf**: contains the .proto definition of the contract.
- **test**: contains the test project and files (basic xUnit test project).

You can use this layout as a template for your future smart contracts. Before you do, we recommend you follow through all the articles of this series.

{% hint style="info" %}
You will also notice the **src** folder. This folder contains Boilerplate's modules and the executable for the node.
{% endhint %}

### Next 

You've just seen a short introduction on how to run a smart contract that is already included in Boilerplate. The next article will show you a complete smart contract and extra content on how to organize your code and test files.

{% hint style="warning" %}
All production contracts (contracts destined to be deployed to a live chain) must go through a complete review process by the contract author and undergo proper testing. It is the author's responsibility to check the validity and security of his contract. The author should not simply copy the contracts contained in Boilerplate; it's the author's responsibility to ensure the security and correctness of his contracts.
{% endhint %}