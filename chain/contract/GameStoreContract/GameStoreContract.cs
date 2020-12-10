using System.Linq;
using AElf;
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace GameStoreContract
{
    public class GameStoreContract : GameStoreContractContainer.GameStoreContractBase
    {
        public override Empty Initialize(Empty input)
        {
            Assert(!State.Initialized.Value, "Already initialized.");

            // 获取当前第一个区块生产节点
            // 跨合约调用：
            // 1. 设置共识合约地址
            State.AEDPoSContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);
            // 2. 调用 - Call
            var minerPubkey = State.AEDPoSContract.GetCurrentMinerList.Call(new Empty()).Pubkeys.First();
            var minerAddress = Address.FromPublicKey(ByteArrayHelper.HexStringToByteArray(minerPubkey.ToHex()));
            // Send - inline transaction.

            State.TokenContract.Value =
                Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);

            State.Admin.Value = minerAddress;
            State.GameNameList.Value = new StringList();
            State.Initialized.Value = true;
            return new Empty();
        }

        public override Empty AddGame(GameInfo input)
        {
            // Permission check.
            Assert(Context.Sender == State.Admin.Value, "No permission.");

            var nameList = State.GameNameList.Value;
            Assert(!nameList.Value.Contains(input.Name), $"Game {input.Name} already added.");
            nameList.Value.Add(input.Name);

            State.GameInfoMap[input.Name] = input;
            
            Context.Fire(new GameAdded
            {
                Name = input.Name,
                Description = input.Description,
                Price = input.Price,
                Time = input.Time
            });
            return new Empty();
        }

        public override Empty Buy(StringValue input)
        {
            var gameInfo = State.GameInfoMap[input.Value];
            if (gameInfo == null)
            {
                throw new AssertionException($"Game {input.Value} not exists.");
            }

            // TODO: 需要扣除玩家的某种代币
            var price = gameInfo.Price;
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender, // 玩家地址
                To = Context.Self, // 该合约地址，
                Symbol = Context.Variables.NativeSymbol,
                Amount = price
            });

            var boughtGameList = State.BoughtGameMap[Context.Sender] ?? new StringList();
            boughtGameList.Value.Add(input.Value);
            State.BoughtGameMap[Context.Sender] = boughtGameList;

            return new Empty();
        }

        public override GameList GetTotalGameList(Empty input)
        {
            if (State.GameNameList.Value == null)
            {
                throw new AssertionException("Game name list is null.");
            }

            return new GameList
            {
                Value = {State.GameNameList.Value.Value.Select(n => State.GameInfoMap[n] ?? new GameInfo())}
            };
        }

        public override GameList GetOwnGameList(Address input)
        {
            if (State.BoughtGameMap[input] == null)
            {
                throw new AssertionException("Bought game name list is null.");
            }

            return new GameList
            {
                Value = {State.BoughtGameMap[input].Value.Select(n => State.GameInfoMap[n] ?? new GameInfo())}
            };
        }
    }
}