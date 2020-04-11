# AElf-boilerplate - A framework for smart contract and dApp development

BRANCH | AZURE PIPELINES(chain) | AZURE PIPELINES(ios) | AZURE PIPELINES(android)
-------|------------------------|----------------------|-------------------------
MASTER |[![Build Status](https://dev.azure.com/AElfProject/aelf-boilerplate/_apis/build/status/AElfProject.aelf-boilerplate?branchName=master)](https://dev.azure.com/AElfProject/aelf-boilerplate/_build/latest?definitionId=7&branchName=master) | [![Build Status](https://dev.azure.com/AElfProject/aelf-boilerplate/_apis/build/status/AElfProject.aelf-boilerplate%5Bcreate-release%5D?branchName=master)](https://dev.azure.com/AElfProject/aelf-boilerplate/_build/latest?definitionId=12&branchName=master) | [![Build Status](https://dev.azure.com/AElfProject/aelf-boilerplate/_apis/build/status/AElfProject.aelf-boilerplate%5Bcreate-release%5D?branchName=master)](https://dev.azure.com/AElfProject/aelf-boilerplate/_build/latest?definitionId=12&branchName=master)
DEV    |[![Build Status](https://dev.azure.com/AElfProject/aelf-boilerplate/_apis/build/status/AElfProject.aelf-boilerplate?branchName=dev)](https://dev.azure.com/AElfProject/aelf-boilerplate/_build/latest?definitionId=7&branchName=dev) | [![Build Status](https://dev.azure.com/AElfProject/aelf-boilerplate/_apis/build/status/AElfProject.aelf-boilerplate%5Bcreate-release%5D?branchName=dev)](https://dev.azure.com/AElfProject/aelf-boilerplate/_build/latest?definitionId=12&branchName=dev) | [![Build Status](https://dev.azure.com/AElfProject/aelf-boilerplate/_apis/build/status/AElfProject.aelf-boilerplate%5Bcreate-release%5D?branchName=dev)](https://dev.azure.com/AElfProject/aelf-boilerplate/_build/latest?definitionId=12&branchName=dev)

Welcome to AElf Boilerplate's official GitHub repo !

Boilerplate is an environment that is used to develop smart contracts and dApps. Boilerplate shares some code with AElf and internally runs an AElf node.

## Getting Started

You can follow the tutorials [**here**](https://docs.aelf.io/main/main-1) that will get you started with contract development on Boilerplate. This tutorial also will guide you through the needed dependencies.

## Boilerplate

At the top level this repo contains two folders: **chain** and **web**. The chain folder contains code to facilitate contract development whereas the web folder contains the front end part of the dApp.

## chain

The process for developing the smart contract goes somewhat like this: define the smart contract, generate the code from the definition, implement the logic by using the generated code, test it and then deploy it.

The chain folder contains four sub-folders:
- **contract**: the implementation of the contract.
- **protobuf**: the definition of the contract.
- **test**: the unit tests of the contract.
- **src**: Boilerplate's core code, some elements need changing in here for the contract to be deployed.

## Versioning
We use Semantic Versioning (SemVer) for versioning, if you're intereted in closely following AElf's developement please check out the SemVer docs.

## License
AElf Boilerplate is licenced under MIT