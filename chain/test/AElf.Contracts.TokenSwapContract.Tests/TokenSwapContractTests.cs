﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AElf.Contracts.MultiToken;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Kernel;
using AElf.Types;
using Shouldly;
using Tokenswap;
using Xunit;

namespace AElf.Contracts.TokenSwapContract
{
    public class TokenSwapContractTests : TokenSwapContractTestBase
    {
        [Fact]
        public async Task TestCreatSwap()
        {
            await CreatAndIssueDefaultTokenAsync();
            var swapRatio = new SwapRatio
            {
                OriginShare = 10_000_000_000,
                TargetShare = 1
            };
            var originTokenSizeInByte = 32;
            var addSwapPairTx = await TokenSwapContractStub.CreateSwap.SendAsync(new CreateSwapInput()
            {
                OriginTokenSizeInByte = originTokenSizeInByte,
                SwapTargetTokenList =
                {
                    new SwapTargetToken
                    {
                        SwapRatio = swapRatio,
                        TargetTokenSymbol = DefaultSymbol1,
                        DepositAmount = TotalSupply / 2
                    }
                }
            });
            var swapId = addSwapPairTx.Output;
            var swapInfo = await TokenSwapContractStub.GetSwapInfo.CallAsync(swapId);
            swapInfo.SwapId.ShouldBe(swapId);
            swapInfo.Controller.ShouldBe(DefaultSenderAddress);

            var swapPair = await TokenSwapContractStub.GetSwapPair.CallAsync(new GetSwapPairInput
            {
                SwapId = swapId,
                TargetTokenSymbol = DefaultSymbol1
            });
            swapPair.RoundCount.ShouldBe(0);
            swapPair.SwappedAmount.ShouldBe(0);
            swapPair.SwappedTimes.ShouldBe(0);
            swapPair.SwapRatio.ShouldBe(swapRatio);
            swapPair.TargetTokenSymbol.ShouldBe(DefaultSymbol1);
            swapPair.OriginTokenSizeInByte.ShouldBe(originTokenSizeInByte);
        }

        [Fact]
        public async Task TestAddSwapRound()
        {
            await CreatAndIssueDefaultTokenAsync();
            var pairId = await CreateSwapAsync();
            var addSwapRoundInput = new CreateSwapRoundInput
            {
                MerkleTreeRoot =
                    Hash.LoadFromHex("0x3d4fb6567b200fa417a7fd3e38a2c0b43648cbdf42470c045d29fd82e3d50850"),
                SwapId = pairId,
                RoundId = 0
            };
            var blockTimeProvider = GetRequiredService<IBlockTimeProvider>();
            var utcNow = TimestampHelper.GetUtcNow();
            blockTimeProvider.SetBlockTime(utcNow);
            var addSwapRoundTx = await TokenSwapContractStub.CreateSwapRound.SendAsync(addSwapRoundInput);
            var newTokenSwapRoundEvent = SwapRoundUpdated.Parser.ParseFrom(addSwapRoundTx.TransactionResult.Logs
                .First(l => l.Name == nameof(SwapRoundUpdated)).NonIndexed);

            newTokenSwapRoundEvent.MerkleTreeRoot.ShouldBe(addSwapRoundInput.MerkleTreeRoot);
            newTokenSwapRoundEvent.StartTime.ShouldBe(utcNow);
        }


        [Fact]
        public async Task TestAddSwapRound_MultiTimes()
        {
            await CreatAndIssueDefaultTokenAsync();
            var pairId = await CreateSwapAsync();
            var addSwapRoundInput = new CreateSwapRoundInput
            {
                MerkleTreeRoot =
                    Hash.LoadFromHex("0x3d4fb6567b200fa417a7fd3e38a2c0b43648cbdf42470c045d29fd82e3d50850"),
                SwapId = pairId,
                RoundId = 0
            };
            var blockTimeProvider = GetService<IBlockTimeProvider>();
            var utcNow = TimestampHelper.GetUtcNow();
            {
                blockTimeProvider.SetBlockTime(utcNow);
                var addSwapRoundTx = await TokenSwapContractStub.CreateSwapRound.SendAsync(addSwapRoundInput);
                var newTokenSwapRoundEvent = SwapRoundUpdated.Parser.ParseFrom(addSwapRoundTx.TransactionResult.Logs
                    .First(l => l.Name == nameof(SwapRoundUpdated)).NonIndexed);
                newTokenSwapRoundEvent.MerkleTreeRoot.ShouldBe(addSwapRoundInput.MerkleTreeRoot);
                newTokenSwapRoundEvent.StartTime.ShouldBe(utcNow);
            }

            {
                var addSwapRoundTx =
                    await TokenSwapContractStub.CreateSwapRound.SendWithExceptionAsync(addSwapRoundInput);
                addSwapRoundTx.TransactionResult.Error.ShouldContain("Round id not matched.");
            }

            {
                var newSwapRoundInput = new CreateSwapRoundInput
                {
                    MerkleTreeRoot =
                        Hash.LoadFromHex("96de8fc8c256fa1e1556d41af431cace7dca68707c78dd88c3acab8b17164c47"),
                    SwapId = pairId,
                    RoundId = 1
                };
                blockTimeProvider.SetBlockTime(utcNow);
                var addSwapRoundTx = await TokenSwapContractStub.CreateSwapRound.SendAsync(newSwapRoundInput);
                var newTokenSwapRoundEvent = SwapRoundUpdated.Parser.ParseFrom(addSwapRoundTx.TransactionResult.Logs
                    .First(l => l.Name == nameof(SwapRoundUpdated)).NonIndexed);
                newTokenSwapRoundEvent.MerkleTreeRoot.ShouldBe(newSwapRoundInput.MerkleTreeRoot);
                newTokenSwapRoundEvent.StartTime.ShouldBe(utcNow);
            }
        }


        [Theory]
        [InlineData("0xdef50eb4a4e61443d3b22180740285997f8504c6c6408cf39c9792b5939d46bc",
            "0x94d52cabd83b4dd10e3f9c8e0f719ce63479f9bbb076360fcd227473835dd19c", "false,false,true,true,false,true", "100000000000000", 10000, "izyQqrVvraoDC69HvUX8gEAgNrK3hWq9qhUKh5vh4MfzNjfc6", "0xc03eee8aa25e1b9fd36a28c6d3321bd0d0534a72034c40fcd9d75c70a610037e")]
        [InlineData("0xbd73ac7665fa241ede0419a8caf0585aca88f41169ad2e9b9d3395c69d173aaa",
            "0x19f8e4303fbdecb6cd5094efc70ea76ad766359c39c468c62f7e54d5244a2620,0x76f2fdfb73d2f6216dc0ef6aeb95233f363757216dc37f7459e17cd199257174,0xa6fdf33dd7d6d5b02a90aebad6ef5adb5ee51d9e823450a20426eec78b687043,0xfe4d738d6ddc38542c66fc04d72359bea4726b425325aa0c8c4e7b7b7bf0f56c,0xfb908a14d6c07b07cdd11517a06369110f6d7f455fae54cfbba2b30be9d53a67,0x9b292fcbe9a9462fcbb43ab12fdbe68bcf74803d3e5f0854034eb24cf3a396c8",
            "false,false,true,true,false,true", "100000000000000000000000000", 10000000000000000, "izyQqrVvraoDC69HvUX8gEAgNrK3hWq9qhUKh5vh4MfzNjfc6", "0x5aabc2aaf168131a281aedcee3dea27e214d95e3b97372c78906696f9fe8c45a")]
        [InlineData("0xbd73ac7665fa241ede0419a8caf0585aca88f41169ad2e9b9d3395c69d173aaa",
            "0x2280448889183b975077b6a5d888fe9c87aee328fc680759a7cbae08207a01d3,0xa94bee71bcf4a3b3625555975dc14aa15a476a16e70b96b0f5b8177c57ce86aa,0x3a09159456c60ef9e1cfe54f710d2e443d49b38427943ce3f95aa989a7ce07cd,0xde71cfabd828aec52c95781996a3c47786df4180f215aef57c4494d0adaa7dec,0xcf046e414888408666cb70bae8e6f13abc61b78f860b26742da52631544f7075,0x4626ecc6cbea5460c32531a7d75977cd6ccd2fe80df226c4c749cac62e8cb393",
            "true,false,true,true,true,false", "75033096737", 7, "izyQqrVvraoDC69HvUX8gEAgNrK3hWq9qhUKh5vh4MfzNjfc6", "0x7fe0799f131446599dc86c889010c7dda42ad5bdaa850e066577805c491dd63b")]
        [InlineData("0xbd73ac7665fa241ede0419a8caf0585aca88f41169ad2e9b9d3395c69d173aaa",
            "0x0d68d30af87d89ea73cc3ae6db4d49b3e3d9c4e6edf8817a2b5ec521b085f1c0,0xdcdd5c0279535684a8ddaac73d8db40677d21e4363ca3b3b8d137f0f9a666e19,0x069d268e4b5d110d7f8983a67282f2fcd60493b95d6f276061a096d179c7cde9,0x7da34bb98d6931f452c2cf1d537b9a3901a4af76ee7613f4e5537a1a636fd24b,0xfb908a14d6c07b07cdd11517a06369110f6d7f455fae54cfbba2b30be9d53a67,0x9b292fcbe9a9462fcbb43ab12fdbe68bcf74803d3e5f0854034eb24cf3a396c8",
            "false,false,false,false,false,true", "831414310036", 83, "izyQqrVvraoDC69HvUX8gEAgNrK3hWq9qhUKh5vh4MfzNjfc6", "0x9e0c06b8d5a4f2ed55e74d790830a7e87c8931767aa992e765183c8746ae1f44")]
        [InlineData("0xbd73ac7665fa241ede0419a8caf0585aca88f41169ad2e9b9d3395c69d173aaa",
            "0xe017db847b81e613b2cbfb62323ab41de5c004b3f828e04d381c9d9e97851b78,0xa65ff2ee10da9e8c000c9d9e065b7496e49458fd7e01a47d11b5d36d1ef142e0,0xb574ac17f41967ad4fc1af11112bbc19144d222bfeb1e28a4c831cb02ed0edc1,0x7da34bb98d6931f452c2cf1d537b9a3901a4af76ee7613f4e5537a1a636fd24b,0xfb908a14d6c07b07cdd11517a06369110f6d7f455fae54cfbba2b30be9d53a67,0x9b292fcbe9a9462fcbb43ab12fdbe68bcf74803d3e5f0854034eb24cf3a396c8",
            "true,true,true,false,false,true", "981498618143", 98, "izyQqrVvraoDC69HvUX8gEAgNrK3hWq9qhUKh5vh4MfzNjfc6", "0xe3f66227e36644d1e5cf34802868a8b22709e823709dea17469b066ae32f9221")]
        [InlineData("0xbd73ac7665fa241ede0419a8caf0585aca88f41169ad2e9b9d3395c69d173aaa",
            "0xd675edfab042b6c5dcd9f23e488e410f2fd8ad2fbdf57b04f2101edeae439f92,0xa65ff2ee10da9e8c000c9d9e065b7496e49458fd7e01a47d11b5d36d1ef142e0,0xb574ac17f41967ad4fc1af11112bbc19144d222bfeb1e28a4c831cb02ed0edc1,0x7da34bb98d6931f452c2cf1d537b9a3901a4af76ee7613f4e5537a1a636fd24b,0xfb908a14d6c07b07cdd11517a06369110f6d7f455fae54cfbba2b30be9d53a67,0x9b292fcbe9a9462fcbb43ab12fdbe68bcf74803d3e5f0854034eb24cf3a396c8",
            "false,true,true,false,false,true", "748377827856", 74, "izyQqrVvraoDC69HvUX8gEAgNrK3hWq9qhUKh5vh4MfzNjfc6", "0xd6b08ea633e37f827ce117788ca2a7158319f6914311a06eaa6b78b00e451960")]
        public async Task TestTokenSwap_SingleTargetToken(string root, string nodesInString, string positions, string amountInStr, long expectedAmount, string targetAddress, string receiptIdHash)
        {
            await CreatAndIssueDefaultTokenAsync();
            var swapId = await CreateSwapAsync();
            var merkleTreeRoot =
                Hash.LoadFromHex(root);
            await AddSwapRound(swapId, merkleTreeRoot, 0);
            var receiverAddress = Address.FromBase58(targetAddress); //default sender address
            List<Hash> nodes = nodesInString.Split(',').Select(Hash.LoadFromHex).ToList();
            List<bool> pos = positions.Split(',').Select(p => p == "true").ToList();

            var merklePath = new MerklePath();
            for (int i = 0; i < nodes.Count; i++)
            {
                merklePath.MerklePathNodes.Add(new MerklePathNode
                {
                    Hash = nodes[i],
                    IsLeftChildNode = pos[i]
                });
            }

            var swapTokenInput = new SwapTokenInput
            {
                OriginAmount = amountInStr,
                ReceiverAddress = receiverAddress,
                UniqueId = Hash.LoadFromHex(receiptIdHash),
                MerklePath = merklePath,
                SwapId = swapId
            };
            var swapTokenTx = await TokenSwapContractStub.SwapToken.SendAsync(swapTokenInput);
            var tokenSwapEvent = TokenSwapEvent.Parser.ParseFrom(swapTokenTx.TransactionResult.Logs
                .First(l => l.Name == nameof(TokenSwapEvent)).NonIndexed);
            tokenSwapEvent.Address.ShouldBe(receiverAddress);
            tokenSwapEvent.Symbol.ShouldBe("ELF");
            tokenSwapEvent.Amount.ShouldBe(expectedAmount);

            var tokenTransferredEvent = swapTokenTx.TransactionResult.Logs
                .First(l => l.Name == nameof(Transferred));
            var nonIndexed = Transferred.Parser.ParseFrom(tokenTransferredEvent.NonIndexed);
            nonIndexed.Amount.ShouldBe(expectedAmount);

            Transferred.Parser.ParseFrom(tokenTransferredEvent.Indexed[1]).To.ShouldBe(receiverAddress);
            Transferred.Parser.ParseFrom(tokenTransferredEvent.Indexed[2]).Symbol.ShouldBe("ELF");

            var swapPair = await TokenSwapContractStub.GetSwapPair.CallAsync(new GetSwapPairInput
            {
                SwapId = swapId,
                TargetTokenSymbol = DefaultSymbol1
            });
            swapPair.SwappedTimes.ShouldBe(1);
            swapPair.SwappedAmount.ShouldBe(expectedAmount);

            var swapRound = await TokenSwapContractStub.GetSwapRound.CallAsync(new GetSwapRoundInput
            {
                SwapId = swapId,
                TargetTokenSymbol = DefaultSymbol1,
                RoundId = 0
            });
            swapRound.SwappedAmount.ShouldBe(expectedAmount);
            swapPair.SwappedTimes.ShouldBe(1);

            // swap twice
            var transactionResult = (await TokenSwapContractStub.SwapToken.SendWithExceptionAsync(swapTokenInput))
                .TransactionResult;
            transactionResult.Error.ShouldContain("Already claimed.");
        }

        // [Fact]
        // public async Task TestTokenSwap_MultiTargetToken()
        // {
        //     await CreatAndIssueDefaultTokenAsync();
        //     var swapRatio = new SwapRatio
        //     {
        //         OriginShare = 10_000_000_000, //1e18
        //         TargetShare = 1 // 1e8
        //     };
        //     var swapId = await CreateSwapWithMultiTargetTokenAsync(32, true, new[]
        //     {
        //         new SwapTargetToken
        //         {
        //             SwapRatio = swapRatio,
        //             TargetTokenSymbol = DefaultSymbol1,
        //             DepositAmount = TotalSupply / 2
        //         },
        //         new SwapTargetToken
        //         {
        //             SwapRatio = swapRatio,
        //             TargetTokenSymbol = DefaultSymbol2,
        //             DepositAmount = TotalSupply / 2
        //         }
        //     });
        //     var merkleTreeRoot =
        //         Hash.LoadFromHex("0x3d4fb6567b200fa417a7fd3e38a2c0b43648cbdf42470c045d29fd82e3d50850");
        //     await AddSwapRound(swapId, merkleTreeRoot, 0);
        //     var receiverAddress =
        //         Address.FromBase58("2ADXLcyKMGGrRe9aGC7XMXECv8cxz3Tos1z6PJHSfyXguSaVb5");
        //     var amountInStr = "5500000000000000000";
        //     var swapTokenInput = new SwapTokenInput
        //     {
        //         OriginAmount = amountInStr,
        //         ReceiverAddress = receiverAddress,
        //         UniqueId = Hash.LoadFromHex(
        //             "d9147961436944f43cd99d28b2bbddbf452ef872b30c8279e255e7daafc7f946"),
        //         MerklePath = new MerklePath
        //         {
        //             MerklePathNodes =
        //             {
        //                 new MerklePathNode
        //                 {
        //                     Hash = Hash.LoadFromHex(
        //                         "0xd3c078e54709a9329ad7136b9ebf482a9077fe7067ed46f2055a22343a115b5f"),
        //                     IsLeftChildNode = true
        //                 },
        //                 new MerklePathNode
        //                 {
        //                     Hash = Hash.LoadFromHex(
        //                         "0x3d247ec73f65bd010951ca7657139b480ec5a299bf5fc8b6e439518480bfd2c4"),
        //                     IsLeftChildNode = true
        //                 },
        //                 new MerklePathNode
        //                 {
        //                     Hash = Hash.LoadFromHex(
        //                         "0x8394a5d294470004842cc17699e1f9ee17878401a4a47b34af82b881e39a6b42"),
        //                     IsLeftChildNode = false
        //                 }
        //             }
        //         },
        //         SwapId = swapId
        //     };
        //     var swapTokenTx = await TokenSwapContractStub.SwapToken.SendAsync(swapTokenInput);
        //     {
        //         var tokenSwapEvent = TokenSwapEvent.Parser.ParseFrom(swapTokenTx.TransactionResult.Logs
        //             .First(l => l.Name == nameof(TokenSwapEvent)).NonIndexed);
        //         tokenSwapEvent.Address.ShouldBe(receiverAddress);
        //         tokenSwapEvent.Symbol.ShouldBe(DefaultSymbol1);
        //         tokenSwapEvent.Amount.ShouldBe(550000000);
        //     }
        //
        //     {
        //         var tokenSwapEvent = TokenSwapEvent.Parser.ParseFrom(swapTokenTx.TransactionResult.Logs
        //             .Last(l => l.Name == nameof(TokenSwapEvent)).NonIndexed);
        //         tokenSwapEvent.Address.ShouldBe(receiverAddress);
        //         tokenSwapEvent.Symbol.ShouldBe(DefaultSymbol2);
        //         tokenSwapEvent.Amount.ShouldBe(550000000);
        //     }
        //
        //     {
        //         var tokenTransferredEvent = swapTokenTx.TransactionResult.Logs
        //             .First(l => l.Name == nameof(Transferred));
        //         var nonIndexed = Transferred.Parser.ParseFrom(tokenTransferredEvent.NonIndexed);
        //         nonIndexed.Amount.ShouldBe(550000000);
        //         Transferred.Parser.ParseFrom(tokenTransferredEvent.Indexed[1]).To.ShouldBe(receiverAddress);
        //         Transferred.Parser.ParseFrom(tokenTransferredEvent.Indexed[2]).Symbol.ShouldBe(DefaultSymbol1);
        //     }
        //
        //     {
        //         var tokenTransferredEvent = swapTokenTx.TransactionResult.Logs
        //             .Last(l => l.Name == nameof(Transferred));
        //         var nonIndexed = Transferred.Parser.ParseFrom(tokenTransferredEvent.NonIndexed);
        //         nonIndexed.Amount.ShouldBe(550000000);
        //         Transferred.Parser.ParseFrom(tokenTransferredEvent.Indexed[1]).To.ShouldBe(receiverAddress);
        //         Transferred.Parser.ParseFrom(tokenTransferredEvent.Indexed[2]).Symbol.ShouldBe(DefaultSymbol2);
        //     }
        //
        //     // swap twice
        //     var transactionResult = (await TokenSwapContractStub.SwapToken.SendWithExceptionAsync(swapTokenInput))
        //         .TransactionResult;
        //     transactionResult.Error.ShouldContain("Already claimed.");
        // }

        [Fact]
        public async Task TestTokenSwap_DepositNotEnough()
        {
            await CreatAndIssueDefaultTokenAsync();
            var depositAmount = 10000 - 1;
            var swapId = await CreateSwapAsync(DefaultSymbol1, 32, null, depositAmount);
            var merkleTreeRoot =
                Hash.LoadFromHex("0xdef50eb4a4e61443d3b22180740285997f8504c6c6408cf39c9792b5939d46bc");
            await AddSwapRound(swapId, merkleTreeRoot, 0);
            var receiverAddress =
                Address.FromBase58("izyQqrVvraoDC69HvUX8gEAgNrK3hWq9qhUKh5vh4MfzNjfc6"); //default sender address
            var amountInStr = "100000000000000";
            var swapTokenInput = new SwapTokenInput
            {
                OriginAmount = amountInStr,
                ReceiverAddress = receiverAddress,
                UniqueId = Hash.LoadFromHex(
                    "0xc03eee8aa25e1b9fd36a28c6d3321bd0d0534a72034c40fcd9d75c70a610037e"),
                MerklePath = new MerklePath
                {
                    MerklePathNodes =
                    {
                        new MerklePathNode
                        {
                            Hash = Hash.LoadFromHex(
                                "0x94d52cabd83b4dd10e3f9c8e0f719ce63479f9bbb076360fcd227473835dd19c"),
                            IsLeftChildNode = false
                        }
                    }
                },
                SwapId = swapId
            };
            var transactionResult = (await TokenSwapContractStub.SwapToken.SendWithExceptionAsync(swapTokenInput))
                .TransactionResult;
            transactionResult.Error.ShouldContain("Deposit not enough.");
        }


        [Fact]
        public async Task TestChangeSwapRatio()
        {
            await CreatAndIssueDefaultTokenAsync();
            var swapId = await CreateSwapAsync();
            {
                var tx = await TokenSwapContractStub.ChangeSwapRatio.SendWithExceptionAsync(new ChangeSwapRatioInput()
                {
                    SwapId = swapId,
                    SwapRatio = new SwapRatio
                    {
                        OriginShare = 1,
                        TargetShare = 0,
                    }
                });
                tx.TransactionResult.Error.ShouldContain("Target token not registered.");
            }

            {
                var tx = await TokenSwapContractStub.ChangeSwapRatio.SendWithExceptionAsync(new ChangeSwapRatioInput
                {
                    SwapId = swapId,
                    SwapRatio = new SwapRatio
                    {
                        OriginShare = 0,
                        TargetShare = 1,
                    },
                    TargetTokenSymbol = DefaultSymbol1
                });
                tx.TransactionResult.Error.ShouldContain("Invalid swap pair.");
            }

            {
                var newStub = GetTokenSwapContractStub(NormalKeyPair);
                var tx = await newStub.ChangeSwapRatio.SendWithExceptionAsync(new ChangeSwapRatioInput()
                {
                    SwapId = swapId,
                    SwapRatio = new SwapRatio
                    {
                        OriginShare = 1,
                        TargetShare = 1,
                    },
                    TargetTokenSymbol = DefaultSymbol1
                });
                tx.TransactionResult.Error.ShouldContain("No permission.");
            }

            {
                await TokenSwapContractStub.ChangeSwapRatio.SendAsync(new ChangeSwapRatioInput()
                {
                    SwapId = swapId,
                    SwapRatio = new SwapRatio
                    {
                        OriginShare = 1,
                        TargetShare = 1,
                    },
                    TargetTokenSymbol = DefaultSymbol1
                });
            }
        }

        [Fact]
        public async Task TestSwapWithMultiRounds()
        {
            var tokenName = "ELFTEST";
            var symbol = "ELFTEST";
            var totalSupply = 100_000_000_000_000_000;
            await CreateAndApproveTokenAsync(tokenName, symbol, 8, totalSupply, totalSupply);
            var swapId = await CreateSwapAsync(symbol, 4, new SwapRatio
            {
                OriginShare = 1,
                TargetShare = 1
            }, totalSupply, false);

            var addressList = SampleAccount.Accounts.Select(
                account => Address.FromPublicKey(account.KeyPair.PublicKey)).ToList();
            {
                var tokenLocker1 = new TokenLocker(4);
                var amount1 = int.MaxValue;
                var lockId = 0;
                foreach (var address in addressList)
                {
                    tokenLocker1.Lock(DefaultSenderAddress, amount1, false, lockId++);
                }

                tokenLocker1.GenerateMerkleTree();


                var merkleTreeRoot = tokenLocker1.MerkleTreeRoot;
                await AddSwapRound(swapId, merkleTreeRoot, 0);

                var amountInStr = amount1.ToString();
                for (int i = 0; i < addressList.Count; ++i)
                {
                    var address = addressList[i];
                    var swapTokenInput = new SwapTokenInput
                    {
                        MerklePath = tokenLocker1.GetMerklePath(i),
                        OriginAmount = amountInStr,
                        ReceiverAddress = DefaultSenderAddress,
                        SwapId = swapId,
                        UniqueId = HashHelper.ComputeFrom(i),
                        RoundId = 0
                    };

                    var transactionResult = (await TokenSwapContractStub.SwapToken.SendAsync(swapTokenInput))
                        .TransactionResult;
                    // swapTokenInput
                    var tokenSwapEvent = TokenSwapEvent.Parser.ParseFrom(transactionResult.Logs
                        .First(l => l.Name == nameof(TokenSwapEvent)).NonIndexed);
                    tokenSwapEvent.Address.ShouldBe(DefaultSenderAddress);
                    tokenSwapEvent.Symbol.ShouldBe("ELFTEST");
                    tokenSwapEvent.Amount.ShouldBe(amount1);
                }
            }
            {
                // await CreateAndApproveTokenAsync(tokenName, symbol, 8, totalSupply, totalSupply);
                var tokenLocker2 = new TokenLocker(4);

                var amount2 = int.MaxValue - 1;
                var amount2InStr = amount2.ToString();
                var lockId = addressList.Count;

                for (int i = 0; i < addressList.Count; ++i)
                {
                    var address = addressList[i];
                    tokenLocker2.Lock(DefaultSenderAddress, amount2, false, addressList.Count + i);
                }

                tokenLocker2.GenerateMerkleTree();

                var merkleTreeRoot2 = tokenLocker2.MerkleTreeRoot;
                await AddSwapRound(swapId, merkleTreeRoot2, 1);

                for (int i = 0; i < addressList.Count; ++i)
                {
                    var address = addressList[i];
                    var swapTokenInput = new SwapTokenInput
                    {
                        MerklePath = tokenLocker2.GetMerklePath(i),
                        OriginAmount = amount2InStr,
                        ReceiverAddress = DefaultSenderAddress,
                        SwapId = swapId,
                        UniqueId = HashHelper.ComputeFrom(addressList.Count + i),
                        RoundId = 1
                    };

                    var transactionResult = (await TokenSwapContractStub.SwapToken.SendAsync(swapTokenInput))
                        .TransactionResult;
                    // swapTokenInput
                    var tokenSwapEvent = TokenSwapEvent.Parser.ParseFrom(transactionResult.Logs
                        .First(l => l.Name == nameof(TokenSwapEvent)).NonIndexed);
                    tokenSwapEvent.Address.ShouldBe(DefaultSenderAddress);
                    tokenSwapEvent.Symbol.ShouldBe("ELFTEST");
                    tokenSwapEvent.Amount.ShouldBe(amount2);
                }
            }
        }

        [Fact]
        public async Task TestSwapWithMultiNumericTypes()
        {
            // int
            {
                var tokenName = "ELFTEST";
                var symbol = "ELFTEST";
                var totalSupply = 100_000_000_000_000_000;
                await CreateAndApproveTokenAsync(tokenName, symbol, 8, totalSupply, totalSupply);
                var tokenLocker = new TokenLocker(4);
                var addressList = SampleAccount.Accounts.Select(
                    account => Address.FromPublicKey(account.KeyPair.PublicKey)).ToList();

                var amount = int.MaxValue;
                var lockId = 0;
                foreach (var _ in addressList)
                {
                    tokenLocker.Lock(DefaultSenderAddress, amount, false, lockId++);
                }

                tokenLocker.GenerateMerkleTree();

                var swapId = await CreateSwapAsync(symbol, 4, new SwapRatio
                {
                    OriginShare = 1,
                    TargetShare = 1
                }, totalSupply, false);
                var merkleTreeRoot = tokenLocker.MerkleTreeRoot;
                await AddSwapRound(swapId, merkleTreeRoot, 0);

                var amountInStr = int.MaxValue.ToString();
                for (int i = 0; i < addressList.Count; ++i)
                {
                    var address = addressList[i];
                    var swapTokenInput = new SwapTokenInput
                    {
                        MerklePath = tokenLocker.GetMerklePath(i),
                        OriginAmount = amountInStr,
                        ReceiverAddress = DefaultSenderAddress,
                        SwapId = swapId,
                        UniqueId = HashHelper.ComputeFrom(i)
                    };

                    var transactionResult = (await TokenSwapContractStub.SwapToken.SendAsync(swapTokenInput))
                        .TransactionResult;
                    // swapTokenInput
                    var tokenSwapEvent = TokenSwapEvent.Parser.ParseFrom(transactionResult.Logs
                        .First(l => l.Name == nameof(TokenSwapEvent)).NonIndexed);
                    tokenSwapEvent.Address.ShouldBe(DefaultSenderAddress);
                    tokenSwapEvent.Symbol.ShouldBe("ELFTEST");
                    tokenSwapEvent.Amount.ShouldBe(amount);
                }
            }

            // long 
            {
                var tokenName = "ABC";
                var symbol = "ABC";
                var totalSupply = long.MaxValue;
                await CreateAndApproveTokenAsync(tokenName, symbol, 8, totalSupply, totalSupply);

                var tokenLocker = new TokenLocker(8);
                var addressList = SampleAccount.Accounts.Select(
                    account => Address.FromPublicKey(account.KeyPair.PublicKey)).ToList();

                var amount = long.MaxValue;
                foreach (var _ in addressList)
                {
                    tokenLocker.Lock(DefaultSenderAddress, amount, false);
                }

                tokenLocker.GenerateMerkleTree();

                var swapId = await CreateSwapAsync(symbol, 8, new SwapRatio
                {
                    OriginShare = SampleAccount.Accounts.Count,
                    TargetShare = 1
                }, totalSupply, false);
                var merkleTreeRoot = tokenLocker.MerkleTreeRoot;
                await AddSwapRound(swapId, merkleTreeRoot, 0);

                var amountInStr = long.MaxValue.ToString();
                for (int i = 0; i < addressList.Count; ++i)
                {
                    var address = addressList[i];
                    var swapTokenInput = new SwapTokenInput
                    {
                        MerklePath = tokenLocker.GetMerklePath(i),
                        OriginAmount = amountInStr,
                        ReceiverAddress = DefaultSenderAddress,
                        SwapId = swapId,
                        UniqueId = HashHelper.ComputeFrom(i)
                    };

                    var transactionResult = (await TokenSwapContractStub.SwapToken.SendAsync(swapTokenInput))
                        .TransactionResult;
                    // swapTokenInput
                    var tokenSwapEvent = TokenSwapEvent.Parser.ParseFrom(transactionResult.Logs
                        .First(l => l.Name == nameof(TokenSwapEvent)).NonIndexed);
                    tokenSwapEvent.Address.ShouldBe(DefaultSenderAddress);
                    tokenSwapEvent.Symbol.ShouldBe(symbol);
                    tokenSwapEvent.Amount.ShouldBe(amount / SampleAccount.Accounts.Count);
                }
            }

            // decimal
            {
                var tokenName = "XYZ";
                var symbol = "XYZ";
                var totalSupply = long.MaxValue;
                await CreateAndApproveTokenAsync(tokenName, symbol, 8, totalSupply, totalSupply);

                var bytesCount = 16;
                var tokenLocker = new TokenLocker(bytesCount);
                var addressList = SampleAccount.Accounts.Select(
                    account => Address.FromPublicKey(account.KeyPair.PublicKey)).ToList();

                var amount = decimal.MaxValue;
                foreach (var _ in addressList)
                {
                    tokenLocker.Lock(DefaultSenderAddress, amount, false);
                }

                tokenLocker.GenerateMerkleTree();

                var originShare = 10_000_000_000 * SampleAccount.Accounts.Count;
                var swapId = await CreateSwapAsync(symbol, bytesCount, new SwapRatio
                {
                    OriginShare = originShare,
                    TargetShare = 1
                }, totalSupply, false);
                var merkleTreeRoot = tokenLocker.MerkleTreeRoot;
                await AddSwapRound(swapId, merkleTreeRoot, 0);

                var amountInStr = decimal.MaxValue.ToString();
                for (int i = 0; i < addressList.Count; ++i)
                {
                    var address = addressList[i];
                    var swapTokenInput = new SwapTokenInput
                    {
                        MerklePath = tokenLocker.GetMerklePath(i),
                        OriginAmount = amountInStr,
                        ReceiverAddress = DefaultSenderAddress,
                        SwapId = swapId,
                        UniqueId = HashHelper.ComputeFrom(i)
                    };

                    var transactionResult = (await TokenSwapContractStub.SwapToken.SendAsync(swapTokenInput))
                        .TransactionResult;
                    // swapTokenInput
                    var tokenSwapEvent = TokenSwapEvent.Parser.ParseFrom(transactionResult.Logs
                        .First(l => l.Name == nameof(TokenSwapEvent)).NonIndexed);
                    tokenSwapEvent.Address.ShouldBe(DefaultSenderAddress);
                    tokenSwapEvent.Symbol.ShouldBe(symbol);
                    tokenSwapEvent.Amount.ShouldBe(decimal.ToInt64(amount / originShare));
                }
            }
        }
    }
}