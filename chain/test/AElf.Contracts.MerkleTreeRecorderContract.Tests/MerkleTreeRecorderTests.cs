using System.Collections.Generic;
using System.Threading.Tasks;
using AElf.ContractTestBase.ContractTestKit;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using MTRecorder;
using Shouldly;
using Xunit;

namespace AElf.Contracts.MerkleTreeRecorderContract
{
    public class MerkleTreeRecorderTests : MerkleTreeRecorderTestBase
    {
        [Fact]
        public async Task InitializeTest()
        {
            await MerkleTreeRecorderContractStub.Initialize.SendAsync(new Empty());
            var owner = await MerkleTreeRecorderContractStub.GetOwner.CallAsync(new Empty());
            owner.ShouldBe(DefaultAccount.Address);

            var init = await MerkleTreeRecorderContractStub.Initialize.SendWithExceptionAsync(new Empty());
            init.TransactionResult.Error.ShouldContain("Already initialized.");
        }

        [Fact]
        public async Task ChangeOwnerTest()
        {
            await InitializeAsync();
            var stub = GetMerkleTreeRecorderContractStub(SampleAccount.Accounts[1].KeyPair);
            var changeOwner = await stub.ChangeOwner.SendWithExceptionAsync(SampleAccount.Accounts[1].Address);
            changeOwner.TransactionResult.Error.ShouldContain("No permission.");

            await MerkleTreeRecorderContractStub.ChangeOwner.SendAsync(SampleAccount.Accounts[1].Address);
            var owner = await MerkleTreeRecorderContractStub.GetOwner.CallAsync(new Empty());
            owner.ShouldBe(SampleAccount.Accounts[1].Address);
        }

        [Fact]
        public async Task CreateRecorderTest()
        {
            await InitializeAsync();
            // not owner

            {
                var recorderCount = await MerkleTreeRecorderContractStub.GetRecorderCount.CallAsync(new Empty());
                recorderCount.Value.ShouldBe(0);
            }

            var stub = GetMerkleTreeRecorderContractStub(SampleAccount.Accounts[1].KeyPair);
            var createRecorder = await stub.CreateRecorder.SendWithExceptionAsync(new Recorder
            {
                Admin = DefaultAccount.Address,
                MaximalLeafCount = 16
            });
            createRecorder.TransactionResult.Error.ShouldContain("No permission.");

            {
                var lastRecordedLeafIndex = await MerkleTreeRecorderContractStub.GetLastRecordedLeafIndex.CallAsync(
                    new RecorderIdInput
                    {
                        RecorderId = 0
                    });
                lastRecordedLeafIndex.Value.ShouldBe(-2);
            }
            var maximalLeafCount = 16;
            await MerkleTreeRecorderContractStub.CreateRecorder.SendAsync(new Recorder
            {
                Admin = DefaultAccount.Address,
                MaximalLeafCount = maximalLeafCount
            });

            {
                var recorderCount = await MerkleTreeRecorderContractStub.GetRecorderCount.CallAsync(new Empty());
                recorderCount.Value.ShouldBe(1);
            }

            var recorder = await MerkleTreeRecorderContractStub.GetRecorder.CallAsync(new RecorderIdInput
            {
                RecorderId = 0
            });

            recorder.Admin.ShouldBe(DefaultAccount.Address);
            recorder.MaximalLeafCount.ShouldBe(maximalLeafCount);

            {
                var lastRecordedLeafIndex = await MerkleTreeRecorderContractStub.GetLastRecordedLeafIndex.CallAsync(
                    new RecorderIdInput
                    {
                        RecorderId = 0
                    });
                lastRecordedLeafIndex.Value.ShouldBe(-1);
            }
        }

        [Fact]
        public async Task RecordMerkleTreeTest_Success()
        {
            await CreateRecorderAsync(DefaultAccount.Address, 16);
            // tree 0
            await MerkleTreeRecorderContractStub.RecordMerkleTree.SendAsync(
                new RecordMerkleTreeInput
                {
                    LastLeafIndex = 0,
                    MerkleTreeRoot = HashHelper.ComputeFrom("MerkleTreeRoot"),
                    RecorderId = 0
                });
            
            {
                var tree = await MerkleTreeRecorderContractStub.GetMerkleTree.CallAsync(new GetMerkleTreeInput
                {
                    RecorderId = 0,
                    LastLeafIndex = 0
                });
                
                tree.FirstLeafIndex.ShouldBe(0);
                tree.LastLeafIndex.ShouldBe(0);
                tree.MerkleTreeRoot.ShouldBe(HashHelper.ComputeFrom("MerkleTreeRoot"));
            }

            {
                var lastRecordedLeafIndex = await MerkleTreeRecorderContractStub.GetLastRecordedLeafIndex.CallAsync(
                    new RecorderIdInput
                    {
                        RecorderId = 0
                    });
                lastRecordedLeafIndex.Value.ShouldBe(0);
            }

            // tree 0, 1
            await MerkleTreeRecorderContractStub.RecordMerkleTree.SendAsync(
                new RecordMerkleTreeInput
                {
                    LastLeafIndex = 1,
                    MerkleTreeRoot = HashHelper.ComputeFrom("MerkleTreeRoot"),
                    RecorderId = 0
                });

            {
                var tree = await MerkleTreeRecorderContractStub.GetMerkleTree.CallAsync(new GetMerkleTreeInput
                {
                    RecorderId = 0,
                    LastLeafIndex = 1
                });
                
                tree.FirstLeafIndex.ShouldBe(0);
                tree.LastLeafIndex.ShouldBe(1);
                tree.MerkleTreeRoot.ShouldBe(HashHelper.ComputeFrom("MerkleTreeRoot"));
            }

            {
                var lastRecordedLeafIndex = await MerkleTreeRecorderContractStub.GetLastRecordedLeafIndex.CallAsync(
                    new RecorderIdInput
                    {
                        RecorderId = 0
                    });
                lastRecordedLeafIndex.Value.ShouldBe(1);
            }
            
            // tree 0, 1, 14
            await MerkleTreeRecorderContractStub.RecordMerkleTree.SendAsync(
                new RecordMerkleTreeInput
                {
                    LastLeafIndex = 14,
                    MerkleTreeRoot = HashHelper.ComputeFrom("MerkleTreeRoot"),
                    RecorderId = 0
                });

            for (var i = 0; i < 15; i++)
            {
                var leafLocatedTree = await MerkleTreeRecorderContractStub.GetLeafLocatedMerkleTree.CallAsync(
                    new GetLeafLocatedMerkleTreeInput
                    {
                        RecorderId = 0,
                        LeafIndex = i
                    });
                leafLocatedTree.FirstLeafIndex.ShouldBe(0);
                leafLocatedTree.LastLeafIndex.ShouldBe(14);
            }

            for (var i = 2; i < 14; i++)
            {
                var error = await MerkleTreeRecorderContractStub.GetMerkleTree.CallWithExceptionAsync(new GetMerkleTreeInput
                {
                    RecorderId = 0,
                    LastLeafIndex = i
                });
                
                error.Value.ShouldContain("Tree not recorded.");
            }
            
            {
                var tree = await MerkleTreeRecorderContractStub.GetMerkleTree.CallAsync(new GetMerkleTreeInput
                {
                    RecorderId = 0,
                    LastLeafIndex = 14
                });
                
                tree.FirstLeafIndex.ShouldBe(0);
                tree.LastLeafIndex.ShouldBe(14);
                tree.MerkleTreeRoot.ShouldBe(HashHelper.ComputeFrom("MerkleTreeRoot"));
            }
            
            // tree {0, 1, 14, 15}
            await MerkleTreeRecorderContractStub.RecordMerkleTree.SendAsync(
                new RecordMerkleTreeInput
                {
                    LastLeafIndex = 15,
                    MerkleTreeRoot = HashHelper.ComputeFrom("MerkleTreeRoot"),
                    RecorderId = 0
                });

            for (var i = 0; i < 16; i++)
            {
                var leafLocatedTree = await MerkleTreeRecorderContractStub.GetLeafLocatedMerkleTree.CallAsync(
                    new GetLeafLocatedMerkleTreeInput
                    {
                        RecorderId = 0,
                        LeafIndex = i
                    });
                leafLocatedTree.FirstLeafIndex.ShouldBe(0);
                leafLocatedTree.LastLeafIndex.ShouldBe(15);
            }
            
            for (var i = 0; i < 16; i++)
            {
                var tree = await MerkleTreeRecorderContractStub.GetMerkleTree.CallAsync(new GetMerkleTreeInput
                {
                    RecorderId = 0,
                    LastLeafIndex = 14
                });
                
                tree.FirstLeafIndex.ShouldBe(0);
                tree.LastLeafIndex.ShouldBe(15);
                tree.MerkleTreeRoot.ShouldBe(HashHelper.ComputeFrom("MerkleTreeRoot"));
            }

            {
                var leafLocatedTree = await MerkleTreeRecorderContractStub.GetLeafLocatedMerkleTree.CallWithExceptionAsync(
                    new GetLeafLocatedMerkleTreeInput
                    {
                        RecorderId = 1,
                        LeafIndex = 15
                    });
                leafLocatedTree.Value.ShouldContain("Not recorded yet.");
            }
            
            {
                var leafLocatedTree = await MerkleTreeRecorderContractStub.GetLeafLocatedMerkleTree.CallWithExceptionAsync(
                    new GetLeafLocatedMerkleTreeInput
                    {
                        RecorderId = 0,
                        LeafIndex = 16
                    });
                leafLocatedTree.Value.ShouldContain("Not recorded yet.");
            }


            {
                var lastRecordedLeafIndex = await MerkleTreeRecorderContractStub.GetLastRecordedLeafIndex.CallAsync(
                    new RecorderIdInput
                    {
                        RecorderId = 0
                    });
                lastRecordedLeafIndex.Value.ShouldBe(15);
            }

            {
                var satisfiedTreeCount = await MerkleTreeRecorderContractStub.GetSatisfiedTreeCount.CallAsync(
                    new RecorderIdInput
                    {
                        RecorderId = 0
                    });
                satisfiedTreeCount.Value.ShouldBe(1);
            }

            // tree {0, 1, 14, 15}, 16
            {
                await MerkleTreeRecorderContractStub.RecordMerkleTree.SendAsync(
                    new RecordMerkleTreeInput
                    {
                        LastLeafIndex = 16,
                        MerkleTreeRoot = HashHelper.ComputeFrom("MerkleTreeRoot"),
                        RecorderId = 0
                    });

                for (var i = 0; i < 16; i++)
                {
                    var leafLocatedTree = await MerkleTreeRecorderContractStub.GetLeafLocatedMerkleTree.CallAsync(
                        new GetLeafLocatedMerkleTreeInput
                        {
                            RecorderId = 0,
                            LeafIndex = i
                        });
                    leafLocatedTree.FirstLeafIndex.ShouldBe(0);
                    leafLocatedTree.LastLeafIndex.ShouldBe(15);
                }

                {
                    var leafLocatedTree = await MerkleTreeRecorderContractStub.GetLeafLocatedMerkleTree.CallAsync(
                        new GetLeafLocatedMerkleTreeInput
                        {
                            RecorderId = 0,
                            LeafIndex = 16
                        });
                    leafLocatedTree.FirstLeafIndex.ShouldBe(16);
                    leafLocatedTree.LastLeafIndex.ShouldBe(16);
                }

                for (var i = 0; i < 16; i++)
                {
                    var tree = await MerkleTreeRecorderContractStub.GetMerkleTree.CallAsync(new GetMerkleTreeInput
                    {
                        RecorderId = 0,
                        LastLeafIndex = i
                    });

                    tree.FirstLeafIndex.ShouldBe(0);
                    tree.LastLeafIndex.ShouldBe(15);
                    tree.MerkleTreeRoot.ShouldBe(HashHelper.ComputeFrom("MerkleTreeRoot"));
                }

                {
                    var tree = await MerkleTreeRecorderContractStub.GetMerkleTree.CallAsync(new GetMerkleTreeInput
                    {
                        RecorderId = 0,
                        LastLeafIndex = 16
                    });

                    tree.FirstLeafIndex.ShouldBe(16);
                    tree.LastLeafIndex.ShouldBe(16);
                    tree.MerkleTreeRoot.ShouldBe(HashHelper.ComputeFrom("MerkleTreeRoot"));
                }

                {
                    var lastRecordedLeafIndex = await MerkleTreeRecorderContractStub.GetLastRecordedLeafIndex.CallAsync(
                        new RecorderIdInput
                        {
                            RecorderId = 0
                        });
                    lastRecordedLeafIndex.Value.ShouldBe(16);
                }

                {
                    var satisfiedTreeCount = await MerkleTreeRecorderContractStub.GetSatisfiedTreeCount.CallAsync(
                        new RecorderIdInput
                        {
                            RecorderId = 0
                        });
                    satisfiedTreeCount.Value.ShouldBe(1);
                }
            }
            
            // tree {0, 1, 14, 15}, 16, 30

            {
                await MerkleTreeRecorderContractStub.RecordMerkleTree.SendAsync(
                    new RecordMerkleTreeInput
                    {
                        LastLeafIndex = 30,
                        MerkleTreeRoot = HashHelper.ComputeFrom("MerkleTreeRoot"),
                        RecorderId = 0
                    });

                for (var i = 0; i < 16; i++)
                {
                    var leafLocatedTree = await MerkleTreeRecorderContractStub.GetLeafLocatedMerkleTree.CallAsync(
                        new GetLeafLocatedMerkleTreeInput
                        {
                            RecorderId = 0,
                            LeafIndex = i
                        });
                    leafLocatedTree.FirstLeafIndex.ShouldBe(0);
                    leafLocatedTree.LastLeafIndex.ShouldBe(15);
                }

                for (var i = 16; i < 31; i++)
                {
                    var leafLocatedTree = await MerkleTreeRecorderContractStub.GetLeafLocatedMerkleTree.CallAsync(
                        new GetLeafLocatedMerkleTreeInput
                        {
                            RecorderId = 0,
                            LeafIndex = i
                        });
                    leafLocatedTree.FirstLeafIndex.ShouldBe(16);
                    leafLocatedTree.LastLeafIndex.ShouldBe(30);
                }

                {
                    var lastRecordedLeafIndex = await MerkleTreeRecorderContractStub.GetLastRecordedLeafIndex.CallAsync(
                        new RecorderIdInput
                        {
                            RecorderId = 0
                        });
                    lastRecordedLeafIndex.Value.ShouldBe(30);
                }
                
                for (var i = 0; i < 16; i++)
                {
                    var tree = await MerkleTreeRecorderContractStub.GetMerkleTree.CallAsync(new GetMerkleTreeInput
                    {
                        RecorderId = 0,
                        LastLeafIndex = i
                    });

                    tree.FirstLeafIndex.ShouldBe(0);
                    tree.LastLeafIndex.ShouldBe(15);
                    tree.MerkleTreeRoot.ShouldBe(HashHelper.ComputeFrom("MerkleTreeRoot"));
                }
                
                {
                    var tree = await MerkleTreeRecorderContractStub.GetMerkleTree.CallAsync(new GetMerkleTreeInput
                    {
                        RecorderId = 0,
                        LastLeafIndex = 16
                    });

                    tree.FirstLeafIndex.ShouldBe(16);
                    tree.LastLeafIndex.ShouldBe(16);
                    tree.MerkleTreeRoot.ShouldBe(HashHelper.ComputeFrom("MerkleTreeRoot"));
                }
                
                for (var i = 17; i < 30; i++)
                {
                    var error = await MerkleTreeRecorderContractStub.GetMerkleTree.CallWithExceptionAsync(new GetMerkleTreeInput
                    {
                        RecorderId = 0,
                        LastLeafIndex = i
                    });
                    
                    error.Value.ShouldContain("Tree not recorded.");
                }

                {
                    var tree = await MerkleTreeRecorderContractStub.GetMerkleTree.CallAsync(new GetMerkleTreeInput
                    {
                        RecorderId = 0,
                        LastLeafIndex = 30
                    });

                    tree.FirstLeafIndex.ShouldBe(16);
                    tree.LastLeafIndex.ShouldBe(30);
                    tree.MerkleTreeRoot.ShouldBe(HashHelper.ComputeFrom("MerkleTreeRoot"));
                }

                {
                    var satisfiedTreeCount = await MerkleTreeRecorderContractStub.GetSatisfiedTreeCount.CallAsync(
                        new RecorderIdInput
                        {
                            RecorderId = 0
                        });
                    satisfiedTreeCount.Value.ShouldBe(1);
                }
            }
            
            // tree {0, 1, 14, 15}, {16, 30, 31}
            {
                await MerkleTreeRecorderContractStub.RecordMerkleTree.SendAsync(
                    new RecordMerkleTreeInput
                    {
                        LastLeafIndex = 31,
                        MerkleTreeRoot = HashHelper.ComputeFrom("MerkleTreeRoot"),
                        RecorderId = 0
                    });

                for (var i = 0; i < 16; i++)
                {
                    var leafLocatedTree = await MerkleTreeRecorderContractStub.GetLeafLocatedMerkleTree.CallAsync(
                        new GetLeafLocatedMerkleTreeInput
                        {
                            RecorderId = 0,
                            LeafIndex = i
                        });
                    leafLocatedTree.FirstLeafIndex.ShouldBe(0);
                    leafLocatedTree.LastLeafIndex.ShouldBe(15);
                }

                for (var i = 16; i < 32; i++)
                {
                    var leafLocatedTree = await MerkleTreeRecorderContractStub.GetLeafLocatedMerkleTree.CallAsync(
                        new GetLeafLocatedMerkleTreeInput
                        {
                            RecorderId = 0,
                            LeafIndex = i
                        });
                    leafLocatedTree.FirstLeafIndex.ShouldBe(16);
                    leafLocatedTree.LastLeafIndex.ShouldBe(31);
                }
                
                for (var i = 0; i < 16; i++)
                {
                    var tree = await MerkleTreeRecorderContractStub.GetMerkleTree.CallAsync(new GetMerkleTreeInput
                    {
                        RecorderId = 0,
                        LastLeafIndex = i
                    });

                    tree.FirstLeafIndex.ShouldBe(0);
                    tree.LastLeafIndex.ShouldBe(15);
                    tree.MerkleTreeRoot.ShouldBe(HashHelper.ComputeFrom("MerkleTreeRoot"));
                }
                
                for (var i = 16; i < 32; i++)
                {
                    var tree = await MerkleTreeRecorderContractStub.GetMerkleTree.CallAsync(new GetMerkleTreeInput
                    {
                        RecorderId = 0,
                        LastLeafIndex = i
                    });
                    
                    tree.FirstLeafIndex.ShouldBe(16);
                    tree.LastLeafIndex.ShouldBe(31);
                    tree.MerkleTreeRoot.ShouldBe(HashHelper.ComputeFrom("MerkleTreeRoot"));
                }

                {
                    var lastRecordedLeafIndex = await MerkleTreeRecorderContractStub.GetLastRecordedLeafIndex.CallAsync(
                        new RecorderIdInput
                        {
                            RecorderId = 0
                        });
                    lastRecordedLeafIndex.Value.ShouldBe(31);
                }

                {
                    var satisfiedTreeCount = await MerkleTreeRecorderContractStub.GetSatisfiedTreeCount.CallAsync(
                        new RecorderIdInput
                        {
                            RecorderId = 0
                        });
                    satisfiedTreeCount.Value.ShouldBe(2);
                }
            }
        }

        [Fact]
        public async Task RecordMerkleTreeTest_Failed()
        {
            {
                var recordMerkleTree = await MerkleTreeRecorderContractStub.RecordMerkleTree.SendWithExceptionAsync(
                    new RecordMerkleTreeInput
                    {
                        LastLeafIndex = 0,
                        MerkleTreeRoot = HashHelper.ComputeFrom("MerkleTreeRoot"),
                        RecorderId = 0
                    });

                recordMerkleTree.TransactionResult.Error.ShouldContain("Recorder not found.");
            }

            await CreateRecorderAsync(DefaultAccount.Address, 16);

            {
                var stub = GetMerkleTreeRecorderContractStub(ContractTestKit.SampleAccount.Accounts[1].KeyPair);
                var recordMerkleTree = await stub.RecordMerkleTree.SendWithExceptionAsync(
                    new RecordMerkleTreeInput
                    {
                        LastLeafIndex = 0,
                        MerkleTreeRoot = HashHelper.ComputeFrom("MerkleTreeRoot"),
                        RecorderId = 0
                    });

                recordMerkleTree.TransactionResult.Error.ShouldContain("Not admin.");
            }

            {
                var record = await MerkleTreeRecorderContractStub.RecordMerkleTree.SendWithExceptionAsync(
                    new RecordMerkleTreeInput
                    {
                        RecorderId = 0,
                        LastLeafIndex = 16,
                        MerkleTreeRoot = HashHelper.ComputeFrom("MerkleTreeRoot")
                    });
                record.TransactionResult.Error.ShouldContain("Satisfied MerkleTree absent.");
            }
            
            {
                var record = await MerkleTreeRecorderContractStub.RecordMerkleTree.SendWithExceptionAsync(
                    new RecordMerkleTreeInput
                    {
                        RecorderId = 0,
                        LastLeafIndex = 17,
                        MerkleTreeRoot = HashHelper.ComputeFrom("MerkleTreeRoot")
                    });
                record.TransactionResult.Error.ShouldContain("Satisfied MerkleTree absent.");
            }

            await MerkleTreeRecorderContractStub.RecordMerkleTree.SendAsync(new RecordMerkleTreeInput
            {
                RecorderId = 0,
                LastLeafIndex = 14,
                MerkleTreeRoot = HashHelper.ComputeFrom("MerkleTreeRoot")
            });
            
            {
                var record = await MerkleTreeRecorderContractStub.RecordMerkleTree.SendWithExceptionAsync(
                    new RecordMerkleTreeInput
                    {
                        RecorderId = 0,
                        LastLeafIndex = 16,
                        MerkleTreeRoot = HashHelper.ComputeFrom("MerkleTreeRoot")
                    });
                record.TransactionResult.Error.ShouldContain("Unable to record the tree with 16");
            }
            
            await MerkleTreeRecorderContractStub.RecordMerkleTree.SendAsync(new RecordMerkleTreeInput
            {
                RecorderId = 0,
                LastLeafIndex = 15,
                MerkleTreeRoot = HashHelper.ComputeFrom("MerkleTreeRoot")
            });
            
            {
                var record = await MerkleTreeRecorderContractStub.RecordMerkleTree.SendWithExceptionAsync(
                    new RecordMerkleTreeInput
                    {
                        RecorderId = 0,
                        LastLeafIndex = 15,
                        MerkleTreeRoot = HashHelper.ComputeFrom("MerkleTreeRoot")
                    });
                record.TransactionResult.Error.ShouldContain("It is not a new tree.");
            }

            
            {
                var record = await MerkleTreeRecorderContractStub.RecordMerkleTree.SendWithExceptionAsync(
                    new RecordMerkleTreeInput
                    {
                        RecorderId = 0,
                        LastLeafIndex = 14,
                        MerkleTreeRoot = HashHelper.ComputeFrom("MerkleTreeRoot")
                    });
                record.TransactionResult.Error.ShouldContain("It is not a new tree.");
            }
        }

        [Fact]
        public async Task MerkleProofTest()
        {
            var list = new List<Hash>();
            for (int i = 0; i < 1024; i++)
            {
                list.Add(HashHelper.ComputeFrom(i));
            }

            var binaryMerkleTree = BinaryMerkleTree.FromLeafNodes(list);
            
            await CreateRecorderAsync(DefaultAccount.Address, 1024);
            await MerkleTreeRecorderContractStub.RecordMerkleTree.SendAsync(new RecordMerkleTreeInput
            {
                LastLeafIndex = 1023,
                RecorderId = 0,
                MerkleTreeRoot = binaryMerkleTree.Root
            });

            for (int i = 0; i < 1024; i++)
            {
                var merklePath = binaryMerkleTree.GenerateMerklePath(i);
                var merkleProofResult = await MerkleTreeRecorderContractStub.MerkleProof.CallAsync(new MerkleProofInput
                {
                    LeafNode = HashHelper.ComputeFrom(i),
                    MerklePath = merklePath,
                    RecorderId = 0,
                    LastLeafIndex = 1023
                });
                merkleProofResult.Value.ShouldBeTrue();
            }
        }
    }
}