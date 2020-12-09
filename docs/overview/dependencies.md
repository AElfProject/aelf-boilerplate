# Common dependencies

This section is divided into two sub sections: the first concerns the common dependencies that are needed for running a node. The second shows the extra dependencies needed for building the sources and/or smart contract development.

## Pre-setup for Windows users

A convenient tool for Windows users is **Chocolatey** for installing dependencies. Follow the installation instructions below (see here for more details [**Chocolatey installation**](https://chocolatey.org/install)):

Open and [administrative Powershell](https://www.digitalcitizen.life/ways-launch-powershell-windows-admin) and enter the following commands:
```Powershell
Set-ExecutionPolicy AllSigned
or
Set-ExecutionPolicy Bypass -Scope Process

Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

Later, **Chocolatey** can be very useful for installing dependencies on Windows systems.

## Pre-setup for macOS users

It is highly recommended that you install **Homebrew (or simply Brew)** to quickly and easily setup dependencies (see here for more details [**Homebrew install page**](https://brew.sh/)). Open a terminal and execute the following command:
```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

## Node js

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
