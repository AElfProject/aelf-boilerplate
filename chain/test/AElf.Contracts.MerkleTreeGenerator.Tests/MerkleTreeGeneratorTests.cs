using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AElf.Contracts.MerkleTreeGeneratorContract;
using AElf.Contracts.TokenLockReceiptMakerContract;
using Google.Protobuf.WellKnownTypes;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Shouldly;
using Xunit;

namespace AElf.Contracts.MerkleTreeGenerator
{
    public class MerkleTreeGeneratorTests : MerkleTreeGeneratorContractTestBase
    {
        [Fact]
        public async Task RegisterReceiptMakerTest()
        {
            await Initialize("ELF");
            await MerkleTreeGeneratorContractStub.RegisterReceiptMaker.SendAsync(new RegisterReceiptMakerInput
            {
                ReceiptMakerAddress = TokenLockReceiptContractAddress,
                MerkleTreeLeafLimit = 1024
            });

            {
                var receiptMaker =
                    await MerkleTreeGeneratorContractStub.GetReceiptMaker.CallAsync(TokenLockReceiptContractAddress);

                receiptMaker.ReceiptMakerAddress.ShouldBe(TokenLockReceiptContractAddress);
                receiptMaker.MerkleTreeLeafLimit.ShouldBe(1024);
            }

            await MerkleTreeGeneratorContractStub.UnRegisterReceiptMaker.SendAsync(TokenLockReceiptContractAddress);
            await MerkleTreeGeneratorContractStub.GetReceiptMaker.CallWithExceptionAsync(
                TokenLockReceiptContractAddress);
        }

        [Fact]
        public async Task GetMerkleTreeTest()
        {
            await Initialize("ELF");
            await MerkleTreeGeneratorContractStub.RegisterReceiptMaker.SendAsync(new RegisterReceiptMakerInput
            {
                ReceiptMakerAddress = TokenLockReceiptContractAddress,
                MerkleTreeLeafLimit = 1024
            });
            await TokenLockReceiptMakerContractStub.Lock.SendAsync(new LockInput
            {
                Amount = 100,
                TargetAddress = "12ab4"
            });
            {
                var error = await MerkleTreeGeneratorContractStub.GetMerkleTree.CallWithExceptionAsync(
                    new GetMerkleTreeInput
                    {
                        ExpectedFullTreeIndex = 0,
                        ReceiptMakerAddress = DefaultAccount.Address
                    });
                error.Value.ShouldContain("Not registered.");
            }
            var tree = await MerkleTreeGeneratorContractStub.GetMerkleTree.CallAsync(new GetMerkleTreeInput
            {
                ExpectedFullTreeIndex = 0,
                ReceiptMakerAddress = TokenLockReceiptContractAddress
            });
            tree.FirstIndex.ShouldBe(0);
            tree.LastIndex.ShouldBe(0);
            tree.IsFullTree.ShouldBeFalse();
            tree.MerkleTreeRoot.ShouldNotBeNull();
        }

        [Fact]
        public async Task GetMerkleTreeTest_MultiReceipts()
        {
            await Initialize("ELF", 100, 100000000);
            await MerkleTreeGeneratorContractStub.RegisterReceiptMaker.SendAsync(new RegisterReceiptMakerInput
            {
                ReceiptMakerAddress = TokenLockReceiptContractAddress,
                MerkleTreeLeafLimit = 1024
            });
            for (int i = 0; i < 1024; i++)
            {
                await TokenLockReceiptMakerContractStub.Lock.SendAsync(new LockInput
                {
                    Amount = 100,
                    TargetAddress = "12ab4"
                });
            }

            {
                var tree = await MerkleTreeGeneratorContractStub.GetMerkleTree.CallAsync(new GetMerkleTreeInput
                {
                    ExpectedFullTreeIndex = 0,
                    ReceiptMakerAddress = TokenLockReceiptContractAddress
                });
                tree.FirstIndex.ShouldBe(0);
                tree.LastIndex.ShouldBe(1023);
                tree.IsFullTree.ShouldBeTrue();
                tree.MerkleTreeRoot.ShouldNotBeNull();
            }

            {
                var error = await MerkleTreeGeneratorContractStub.GetMerkleTree.CallWithExceptionAsync(
                    new GetMerkleTreeInput
                    {
                        ExpectedFullTreeIndex = 1,
                        ReceiptMakerAddress = TokenLockReceiptContractAddress
                    });
                error.Value.ShouldContain("Unable to generate this merkle tree.");
            }

            await TokenLockReceiptMakerContractStub.Lock.SendAsync(new LockInput
            {
                Amount = 100,
                TargetAddress = "12ab4"
            });

            {
                var tree = await MerkleTreeGeneratorContractStub.GetMerkleTree.CallAsync(new GetMerkleTreeInput
                {
                    ExpectedFullTreeIndex = 1,
                    ReceiptMakerAddress = TokenLockReceiptContractAddress
                });
                tree.FirstIndex.ShouldBe(1024);
                tree.LastIndex.ShouldBe(1024);
                tree.IsFullTree.ShouldBeFalse();
                tree.MerkleTreeRoot.ShouldNotBeNull();
            }
        }

        [Fact]
        public async Task GetMerklePathTest()
        {
            await Initialize("ELF", 100, 100000000);
            await MerkleTreeGeneratorContractStub.RegisterReceiptMaker.SendAsync(new RegisterReceiptMakerInput
            {
                ReceiptMakerAddress = TokenLockReceiptContractAddress,
                MerkleTreeLeafLimit = 1024
            });

            await TokenLockReceiptMakerContractStub.Lock.SendAsync(new LockInput
            {
                Amount = 100,
                TargetAddress = "12ab4"
            });

            {
                var path = await MerkleTreeGeneratorContractStub.GetMerklePath.CallAsync(new GetMerklePathInput
                {
                    FirstLeafIndex = 0,
                    LastLeafIndex = 0,
                    ReceiptId = 0,
                    ReciptMaker = TokenLockReceiptContractAddress
                });
                path.MerklePathNodes.Count.ShouldBe(1);
            }

            for (int i = 0; i < 1023; i++)
            {
                await TokenLockReceiptMakerContractStub.Lock.SendAsync(new LockInput
                {
                    Amount = 100,
                    TargetAddress = "12ab4"
                });
            }

            {
                var tree = await MerkleTreeGeneratorContractStub.GetMerkleTree.CallAsync(new GetMerkleTreeInput
                {
                    ExpectedFullTreeIndex = 0,
                    ReceiptMakerAddress = TokenLockReceiptContractAddress
                });
                var path = await MerkleTreeGeneratorContractStub.GetMerklePath.CallAsync(new GetMerklePathInput
                {
                    FirstLeafIndex = 0,
                    LastLeafIndex = 1023,
                    ReceiptId = 0,
                    ReciptMaker = TokenLockReceiptContractAddress
                });
                path.MerklePathNodes.Count.ShouldBe(10);
            }
        }

        [Fact]
        public async Task GetFullTreeCountTest()
        {
            await Initialize("ELF", 100, 100000000);
            await MerkleTreeGeneratorContractStub.RegisterReceiptMaker.SendAsync(new RegisterReceiptMakerInput
            {
                ReceiptMakerAddress = TokenLockReceiptContractAddress,
                MerkleTreeLeafLimit = 1024
            });
            for (int i = 0; i < 1023; i++)
            {
                await TokenLockReceiptMakerContractStub.Lock.SendAsync(new LockInput
                {
                    Amount = 100,
                    TargetAddress = "0x2D4E11221b960E4Ed6D0D2358e26b9c89DfF404a"
                });

                var fullTreeCount =
                    await MerkleTreeGeneratorContractStub.GetFullTreeCount.CallAsync(TokenLockReceiptContractAddress);
                fullTreeCount.Value.ShouldBe(0);
            }

            {
                await TokenLockReceiptMakerContractStub.Lock.SendAsync(new LockInput
                {
                    Amount = 100,
                    TargetAddress = "0x2D4E11221b960E4Ed6D0D2358e26b9c89DfF404a"
                });

                var fullTreeCount =
                    await MerkleTreeGeneratorContractStub.GetFullTreeCount.CallAsync(TokenLockReceiptContractAddress);
                fullTreeCount.Value.ShouldBe(1);
            }
        }

        [Fact]
        public void CalculateHash()
        {
            string target = "0x2D4E11221b960E4Ed6D0D2358e26b9c89DfF404a";
            long amount = 0 + 100;
            var amountHash = HashHelper.ComputeFrom(amount);
            var targetAddressHash = HashHelper.ComputeFrom(target);
            long receiptId = 0;
            var receiptIdHash = HashHelper.ComputeFrom(receiptId);

            var hash = HashHelper.ConcatAndCompute(amountHash, targetAddressHash, receiptIdHash);
            ;
        }

        [Fact]
        public async Task WriteInfo()
        {
            await Initialize("ELF", 100, 100000000);
            await MerkleTreeGeneratorContractStub.RegisterReceiptMaker.SendAsync(new RegisterReceiptMakerInput
            {
                ReceiptMakerAddress = TokenLockReceiptContractAddress,
                MerkleTreeLeafLimit = 1024
            });
            string target = "0x2D4E11221b960E4Ed6D0D2358e26b9c89DfF404a";


            long receiptCount = 0;
            var list = new List<int>
            {
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 31, 32, 33, 63, 64, 65, 127, 128, 129, 255,
                256, 257, 511, 512, 513, 1023, 1024
            };
            foreach (var r in list)
            {
                while (receiptCount < r)
                {
                    var tx = await TokenLockReceiptMakerContractStub.Lock.SendAsync(new LockInput
                    {
                        Amount = receiptCount + 100,
                        TargetAddress = target
                    });

                    var receiptCreatedEvent = ReceiptCreatedEvent.Parser.ParseFrom(tx.TransactionResult.Logs
                        .First(l => l.Name.Contains(nameof(ReceiptCreatedEvent))).NonIndexed);
                    receiptCount = receiptCreatedEvent.ReceiptId + 1;
                }

                var tree = await MerkleTreeGeneratorContractStub.GetMerkleTree.CallAsync(new GetMerkleTreeInput
                {
                    ExpectedFullTreeIndex = 0,
                    ReceiptMakerAddress = TokenLockReceiptContractAddress
                });

                var filePath = Path.Combine(Environment.GetEnvironmentVariable("HOME") ?? string.Empty,
                    $".local/share/aelf/json/{receiptCount}.json");
                await using FileStream fs = File.Open(filePath, FileMode.OpenOrCreate, FileAccess.Write);
                await using var writer = new StreamWriter(fs);
                JsonTextWriter jsonTextWriter = new JsonTextWriter(writer) {Formatting = Formatting.Indented};

                JObject jo = new JObject {{"root", tree.MerkleTreeRoot.Value.ToHex(true)}};

                var receiptsJOArray = new JArray();

                for (int i = 0; i < receiptCount; i++)
                {
                    var receiptInfo =
                        await TokenLockReceiptMakerContractStub.GetReceiptInfo.CallAsync(new Int64Value {Value = i});

                    var receiptsJO = new JObject
                    {
                        {"receipt_index", i}, {"receipt_amount", i + 100}, {"receipt_target_address", target},
                        {"receipt_index_hash", receiptInfo.UniqueId.Value.ToHex(true)}
                    };

                    var path = await MerkleTreeGeneratorContractStub.GetMerklePath.CallAsync(new GetMerklePathInput
                    {
                        FirstLeafIndex = 0,
                        LastLeafIndex = receiptCount - 1,
                        ReceiptId = i,
                        ReciptMaker = TokenLockReceiptContractAddress
                    });

                    var receiptPathHashJO = new JArray();
                    var receiptPathIsLeftJO = new JArray();

                    foreach (var node in path.MerklePathNodes)
                    {
                        receiptPathHashJO.Add(node.Hash.Value.ToHex(true));
                        receiptPathIsLeftJO.Add(node.IsLeftChildNode);
                    }

                    var receiptPathJO = new JObject
                    {
                        {"receipt_path_hash", receiptPathHashJO}, {"receipt_path_isLeft", receiptPathIsLeftJO}
                    };
                    receiptsJO.Add("receipts_path", receiptPathJO);
                    receiptsJOArray.Add(receiptsJO);
                }


                jo.Add("receipts", receiptsJOArray);
                await jo.WriteToAsync(jsonTextWriter);
            }
        }
    }
}