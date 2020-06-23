# 需求分析

## 基本需求

只有一条：用户可以使用ELF对Bingo合约下注一定的额度，然后在预计的时间内得到更多的ELF，或损失一部分之前下注的ELF。

在用户层面，操作步骤为：

1. 使用Token合约的Approve方法对Bingo合约授权一定的ELF额度；
2. 使用Bingo合约下注，Bingo合约此时应返回需要等待的时间或一个未来区块高度，在这个高度，胜负揭晓；
3. 一定时间后，或区块高度达到后，用户可以使用Bingo合约查询结果，同时Bingo合约将一定数量的ELF打给用户（如果此时的金额大于下注金额，则代表用户赢了；反之亦然）。
## API列表

综上，需要两个最基本的接口：

1. Play，对应步骤2；
2. Bingo，对应步骤3。

出于让Bingo合约成为一个更完整的DApp合约考虑，增加另外两个Action方法：

1. Register，为用户建立档案，可以保存用户注册时间，用户的特征值（该特征值参与计算开奖随机数）；
2. Quit，删除用户档案。

除此之外，还有一些仅供查询信息的View方法：

1. GetAward，用于让用户自己查询已经开奖的某次投注的奖金；
2. GetPlayerInformation，用于查询某个用户的信息。

整理：

| 方法   | 参数   | 返回值   | 作用   | 
|:----|:----|:----|:----|
| Register   | Empty   | Empty   | 用户注册，创建玩家信息   | 
| Quit   | Empty   | Empty   | 用户退出，删除玩家信息   | 
| Play   | Int64Value  下注金额   | Int64Value  开奖区块高度   | 下注   | 
| Bingo   | Hash  Play交易的交易Id   | BoolValue  true为赢钱   | 开奖   | 
| GetAward   | Hash  Play交易的交易 Id   | Int64Value  奖金   | 查询开奖情况   | 
| GetPlayerInformation   | Address  玩家地址   | PlayerInformation   | 查询玩家信息   | 

# 编写合约

## 用代码生成器生成合约和测试项目

打开AElf.Boilerplate解决方案中的AElf.Boilerplate.CodeGenerator项目，修改该项目下appsetting.json中的Contents节点：

```json
{
  "Contents": [
    {
      "Origin": "AElf.Contracts.HelloWorldContract",
      "New": "AElf.Contracts.BingoContract"
    },
    {
      "Origin": "HelloWorld",
      "New": "Bingo"
    },
    {
      "Origin": "hello_world",
      "New": "bingo"
    }
  ]
}
```
随后运行AElf.Boilerplate.CodeGenerator项目。
运行成功后，会看到AElf.Boilerplate.sln同目录下会出现一个AElf.Contracts.BingoContract.sln，打开以后，就会看到Bingo合约的合约项目和测试用例项目都已经生成好，并包含在了新的解决方案中。

## 定义Proto文件

基于需求分析中的API列表，bingo_contract.proto文件如下：

```plain
syntax = "proto3";
import "aelf/core.proto";
import "aelf/options.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "google/protobuf/timestamp.proto";
option csharp_namespace = "AElf.Contracts.BingoContract";
service BingoContract {
    option (aelf.csharp_state) = "AElf.Contracts.BingoContract.BingoContractState";
    
    // Actions
    rpc Register (google.protobuf.Empty) returns (google.protobuf.Empty) {
    }
    rpc Play (google.protobuf.Int64Value) returns (google.protobuf.Int64Value) {
    }
    rpc Bingo (aelf.Hash) returns (google.protobuf.BoolValue) {
    }
    rpc Quit (google.protobuf.Empty) returns (google.protobuf.Empty) {
    }
    
    // Views
    rpc GetAward (aelf.Hash) returns (google.protobuf.Int64Value) {
        option (aelf.is_view) = true;
    }
    rpc GetPlayerInformation (aelf.Address) returns (PlayerInformation) {
        option (aelf.is_view) = true;
    }
}
message PlayerInformation {
    aelf.Hash seed = 1;
    repeated BoutInformation bouts = 2;
    google.protobuf.Timestamp register_time = 3;
}
message BoutInformation {
    int64 play_block_height = 1;
    int64 amount = 2;
    int64 award = 3;
    bool is_complete = 4;
    aelf.Hash play_id = 5;
    int64 bingo_block_height = 6;
}
```
## 合约实现

这里只说一下Action方法的大概的思路，具体需要翻代码：

[https://github.com/AElfProject/aelf-boilerplate/blob/preview-3/chain/contract/AElf.Contracts.BingoGameContract/BingoGameContract.cs](https://github.com/AElfProject/aelf-boilerplate/blob/preview-3/chain/contract/AElf.Contracts.BingoGameContract/BingoGameContract.cs)

### Register & Quit

注册（Register）：

1. 确定该用户的Seed，Seed是一个哈希值，参与用户开奖所用的随机数的运算，每个用户不一样，以此来保证同一个高度上，不同用户开奖结果不同；
2. 登记一下用户的注册时间。

退出（Quit）：删除该用户的信息即可。

### Play & Bingo

下注（Play）：

1. 使用TransferFrom扣除用户下注金额；
2. 同时为用户添加一个回合（Bount），该Bout初始化时，记录三个信息
  1. PlayId，即这个Play交易的交易Id，用来唯一标识这个Bout（其数据结构见Proto定义中的BoutInformation）；
  2. Amount，记录一下本次下注金额；
  3. PlayBlockHeight，记录一下Play交易打包的区块高度。

开奖（Bingo）：

1. 根据PlayId找到相应的Bout，如果当前区块高度大于PlayBlockHeight + 节点数量 * 8，即可开奖；
2. 使用当前高度和用户的Seed计算出一个随机数，然后将这个哈希值当作bit array，每位相加得到一个范围为0-256的数字；
3. 该数字是否能被2整除，决定用户本次开奖是赢还是输；
4. 该数字的范围，决定用户赢/输的额度，具体看GetKind这个方法的注释。
# 编写测试

本次测试中因为涉及token转移，除了构造bingo合约的stub，还需要token合约的stub，因此csproj中对proto文件引用的代码为：

```plain
<ItemGroup>
  <ContractStub Include="..\..\protobuf\bingo_contract.proto">
    <Link>Protobuf\Proto\bingo_contract.proto</Link>
  </ContractStub>
  <ContractStub Include="..\..\protobuf\token_contract.proto">
    <Link>Protobuf\Proto\token_contract.proto</Link>
  </ContractStub>
</ItemGroup>
```
然后就可以直接在BingoContractTest的Test方法中写测试代码了。
准备上面提及的两个stub：

```c#
// Get a stub for testing.
var keyPair = SampleECKeyPairs.KeyPairs[0];
var stub = GetBingoContractStub(keyPair);
var tokenStub =
    GetTester<TokenContractContainer.TokenContractStub>(
        GetAddress(TokenSmartContractAddressNameProvider.StringName), keyPair);
```
其中stub为bingo合约的stub，tokenStub为token合约的stub。
在单元测试中，默认给了keyPair这个账户一大笔ELF，而bingo合约要想运行，需要一定的奖金池，因此先让该账户给bingo合约转一笔钱：

```c#
// Prepare awards.
await tokenStub.Transfer.SendAsync(new TransferInput
{
    To = DAppContractAddress,
    Symbol = "ELF",
    Amount = 100_00000000
});
```
然后就可以开始使用bingo合约了。
注册：

```c#
await stub.Register.SendAsync(new Empty());
```
注册后看一看PlayInformation的信息：
```c#
// Now I have player information.
var address = Address.FromPublicKey(keyPair.PublicKey);
{
    var playerInformation = await stub.GetPlayerInformation.CallAsync(address);
    playerInformation.Seed.Value.ShouldNotBeEmpty();
    playerInformation.RegisterTime.ShouldNotBeNull();
}
```
下注，不过下注之前需要对bingo合约授权一下额度：
```c#
// Play.
await tokenStub.Approve.SendAsync(new ApproveInput
{
    Spender = DAppContractAddress,
    Symbol = "ELF",
    Amount = 10000
});
await stub.Play.SendAsync(new Int64Value {Value = 10000});
```
下注后看一眼Bout有没有生成：
```c#
Hash playId;
{
    var playerInformation = await stub.GetPlayerInformation.CallAsync(address);
    playerInformation.Bouts.ShouldNotBeEmpty();
    playId = playerInformation.Bouts.First().PlayId;
}
```
由于开奖需要8个区块以后，因此先发7个无效的交易（这七次Bingo交易都会失败，但是区块高度会增长）：
```c#
// Mine 7 more blocks.
for (var i = 0; i < 7; i++)
{
    await stub.Bingo.SendWithExceptionAsync(playId);
}
```
最后开奖，并检查一下Award，不是0就说明开奖成功：
```c#
await stub.Bingo.SendAsync(playId);
var award = await stub.GetAward.CallAsync(playId);
award.Value.ShouldNotBe(0);
```
