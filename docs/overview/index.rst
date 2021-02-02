Overview
--------

.. toctree::
   
   Common Dependencies <dependencies>
   Dev Tools <tools>
   Setup Boilerplate <setup>


The main usage of aelf-boilerplate is to develop contracts for AElf blockchains. Once you've downloaded or cloned this project, that process looks something like this:


1. Use **AElf.Boilerplate.sln**, run project **AElf.Boilerplate.Launcher**, and try **Greeter** project located in `web/greeter` to make sure the AElf blockchain can be run in local machine.

2. Use **AElf.Contracts.BingoContract.sln**, run project **AElf.Boilerplate.BingoContract.Launcher**, and try Bingo Game located in `web/ReactNativeBingo`, similar to the code of **Bingo Game**, which is a DApp of the AElf blockchain.

3. Use **AElf.Boilerplate.sln**, modify the `appsettings.json` in project **AElf.Boilerplate.CodeGenerator**, running this project will generate a contract development template as well as a new sln file.

4. With the new sln file you can develop your new contract, and build your new contract project will generate a patched contract dll which can be deployed to AElf TestNet/MainNet.


Besides, we provided demo contracts of most of our **AElf Contract Standards(ACS)**. As shown before, aelf-boilerplate project is enough for you to getting familiar with AElf contract development, but it has to say that aelf-boilerplate is a start point of developing AElf contract, not a destination.

But before you either start try **Greeter** and **Bingo Game**, or ready to develop a smart contract, you'll need to install the following tools and frameworks.

For most of these dependencies we provide ready-to-use command line instructions. In case of problems or if you have more complex needs, we provide the official link with full instructions.

