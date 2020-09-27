using System;
using System.Linq;
using System.Threading.Tasks;
using AElf.CSharp.Core;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.CommonRollContract.Tests
{
    public class CommonRollContractTests : CommonRollContractTestBase
    {
        [Fact]
        public async Task EditProjectTest()
        {
            var hash = await CreateProject(2, 3, true, Timestamp.FromDateTime(DateTime.UtcNow.AddDays(1)));
            //Project not exists
            var existsException = await CommonRollContractStub.EditProject.SendWithExceptionAsync(new EditProjectInput()
            {
                ProjectHash = HashHelper.ComputeFrom("")
            });
            existsException.TransactionResult.Error.ShouldContain("Project not exists");

            //data verify assertion   --Incorrect seedCount
            var seedCountException = await CommonRollContractStub.EditProject.SendWithExceptionAsync(
                new EditProjectInput()
                {
                    ProjectHash = hash,
                    ResultCount = 1,
                    SeedCount = 2,
                    SeedData = new RollData()
                    {
                        PerData =
                        {
                            new PerData() {Index = 1, Name = "li", Number = 123, State = true},
                            new PerData() {Index = 2, Name = "lio", Number = 124, State = false},
                            new PerData() {Index = 3, Name = "lie", Number = 125, State = false}
                        }
                    },
                });
            seedCountException.TransactionResult.Error.ShouldContain("Incorrect seedCount");
            //data verify assertion   --Invalid resultCount
            var resultCountException = await CommonRollContractStub.EditProject.SendWithExceptionAsync(
                new EditProjectInput()
                {
                    ProjectHash = hash,
                    ResultCount = -1,
                    SeedCount = 3,
                    SeedData = new RollData()
                    {
                        PerData =
                        {
                            new PerData() {Index = 1, Name = "li", Number = 123, State = true},
                            new PerData() {Index = 2, Name = "liu", Number = 124, State = false},
                            new PerData() {Index = 3, Name = "lie", Number = 125, State = false}
                        }
                    },
                });
            resultCountException.TransactionResult.Error.ShouldContain("Invalid resultCount");
            //data verify assertion   --SeedCount should bigger than resultCount
            var biggerException = await CommonRollContractStub.EditProject.SendWithExceptionAsync(
                new EditProjectInput()
                {
                    ProjectHash = hash,
                    ResultCount = 4,
                    SeedCount = 3,
                    SeedData = new RollData()
                    {
                        PerData =
                        {
                            new PerData() {Index = 1, Name = "li", Number = 123, State = true},
                            new PerData() {Index = 2, Name = "liu", Number = 124, State = false},
                            new PerData() {Index = 3, Name = "lie", Number = 125, State = false}
                        }
                    },
                });
            biggerException.TransactionResult.Error.ShouldContain("SeedCount should bigger than resultCount");
            //data verify assertion   --Repeating data
            var repeatingDataException = await CommonRollContractStub.EditProject.SendWithExceptionAsync(
                new EditProjectInput()
                {
                    ProjectHash = hash,
                    ResultCount = 1,
                    SeedCount = 3,
                    SeedData = new RollData()
                    {
                        PerData =
                        {
                            new PerData() {Index = 1, Name = "li", Number = 123, State = true},
                            new PerData() {Index = 1, Name = "li", Number = 123, State = true},
                            new PerData() {Index = 3, Name = "lie", Number = 125, State = false}
                        }
                    },
                });
            repeatingDataException.TransactionResult.Error.ShouldContain("Repeating data");
            //Invalid RollTime
            var rollTimeException = await CommonRollContractStub.EditProject.SendWithExceptionAsync(
                new EditProjectInput()
                {
                    ProjectHash = hash,
                    ResultCount = 1,
                    SeedCount = 3,
                    SeedData = new RollData()
                    {
                        PerData =
                        {
                            new PerData() {Index = 1, Name = "li", Number = 123, State = true},
                            new PerData() {Index = 2, Name = "li", Number = 124, State = true},
                            new PerData() {Index = 3, Name = "lie", Number = 125, State = false}
                        }
                    },
                    RollTime = Timestamp.FromDateTime(DateTime.UtcNow.AddDays(-1))
                });
            rollTimeException.TransactionResult.Error.ShouldContain("Invalid RollTime");

            //success
            var timestamp = Timestamp.FromDateTime(DateTime.UtcNow.AddDays(1));
            var result = await CommonRollContractStub.EditProject.SendAsync(new EditProjectInput()
            {
                ProjectHash = hash,
                ResultCount = 1,
                SeedCount = 3,
                SeedData = new RollData()
                {
                    PerData =
                    {
                        new PerData() {Index = 1, Name = "li", Number = 123, State = true},
                        new PerData() {Index = 2, Name = "liu", Number = 124, State = false},
                        new PerData() {Index = 3, Name = "lie", Number = 125, State = false}
                    }
                },
                IsManualRoll = true,
                IsOneTimeRoll = true,
                ResultName = "just roll it",
                RollTime = timestamp,
                Theme = "get the lucky"
            });
            result.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);

            var projectList = await CommonRollContractStub.GetProjectList.CallAsync(new Empty());
            projectList.ProjectOverviews.ShouldContain(x => x.ProjectHash == hash);

            var detail = await CommonRollContractStub.GetProjectDetail.CallAsync(hash);
            //verify the data state ---  should be all false
            var data = detail.ProjectDetail.SeedData;
            foreach (var perData in data.PerData)
            {
                perData.State.ShouldBe(false);
            }

            detail.ProjectDetail.Specification.ShouldBe("");
            detail.ProjectDetail.Theme.ShouldBe("get the lucky");
            detail.ProjectDetail.ResultCount.ShouldBe(1);
            detail.ProjectDetail.SeedCount.ShouldBe(3);
            detail.ProjectDetail.ResultName.ShouldBe("just roll it");
            detail.ProjectDetail.IsManualRoll.ShouldBe(true);
            detail.ProjectDetail.IsOneTimeRoll.ShouldBe(true);
            detail.ProjectDetail.RollTime.ShouldBe(timestamp);
        }


        [Fact]
        public async Task RollTest()
        {
            const int resultCount = 3;
            const int seedCount = 8;
            //Project not exists
            var existsException1 = await CommonRollContractStub.Roll.SendWithExceptionAsync(new RollInput()
            {
                ProjectHash = HashHelper.ComputeFrom("")
            });
            existsException1.TransactionResult.Error.ShouldContain("Project not exists");

            var existsException2 = await CommonRollContractStub.Roll.SendWithExceptionAsync(new RollInput()
            {
                ProjectHash = HashHelper.ComputeFrom("null")
            });
            existsException2.TransactionResult.Error.ShouldContain("Project not exists");

            var hash = await CreateProject(resultCount, seedCount, true,
                Timestamp.FromDateTime(DateTime.UtcNow.AddDays(1)));

            var existsException3 = await CommonRollContractStub.Roll.SendWithExceptionAsync(new RollInput()
            {
                ProjectHash = HashHelper.ComputeFrom("hash")
            });
            existsException3.TransactionResult.Error.ShouldContain("Project not exists");
            //Project is closed
            await CommonRollContractStub.SetProjectClose.SendAsync(hash);
            var closedException = await CommonRollContractStub.Roll.SendWithExceptionAsync(new RollInput()
            {
                ProjectHash = hash
            });
            closedException.TransactionResult.Error.ShouldContain("Project is closed");
            //Invalid RollTime

            //Project's roll result is confirmed
            var hash3 = await CreateProject(resultCount, seedCount, true,
                Timestamp.FromDateTime(DateTime.UtcNow.AddDays(1)));
            await CommonRollContractStub.Roll.SendAsync(new RollInput()
            {
                ProjectHash = hash3
            });
            var confirmedException = await CommonRollContractStub.Roll.SendWithExceptionAsync(new RollInput()
            {
                ProjectHash = hash3
            });
            confirmedException.TransactionResult.Error.ShouldContain("Project's roll result is confirmed");
            //success
            await CommonRollContractStub.SetProjectOpen.SendAsync(hash);
            var result = await CommonRollContractStub.Roll.SendAsync(new RollInput()
            {
                ProjectHash = hash
            });
            result.Output.ResultData.PerData.Count.ShouldBe(resultCount);
            result.Output.ResultData.PerData.Distinct().Count().ShouldBe(resultCount);

            var result1 = await CommonRollContractStub.GetRollResult.CallAsync(hash);
            result1.ResultData.Equals(result.Output.ResultData).ShouldBe(true);
        }

        [Fact]
        public async Task CreateProjectTest()
        {
            //data verify assertion   --Incorrect seedCount
            var seedCountException = await CommonRollContractStub.CreateProject.SendWithExceptionAsync(
                new CreateProjectInput()
                {
                    ResultCount = 1,
                    SeedCount = 2,
                    SeedData = new RollData()
                    {
                        PerData =
                        {
                            new PerData() {Index = 1, Name = "li", Number = 123, State = true},
                            new PerData() {Index = 2, Name = "lio", Number = 124, State = false},
                            new PerData() {Index = 3, Name = "lie", Number = 125, State = false}
                        }
                    },
                });
            seedCountException.TransactionResult.Error.ShouldContain("Incorrect seedCount");
            //data verify assertion   --Invalid resultCount
            var resultCountException = await CommonRollContractStub.CreateProject.SendWithExceptionAsync(
                new CreateProjectInput()
                {
                    ResultCount = -1,
                    SeedCount = 3,
                    SeedData = new RollData()
                    {
                        PerData =
                        {
                            new PerData() {Index = 1, Name = "li", Number = 123, State = true},
                            new PerData() {Index = 2, Name = "liu", Number = 124, State = false},
                            new PerData() {Index = 3, Name = "lie", Number = 125, State = false}
                        }
                    },
                });
            resultCountException.TransactionResult.Error.ShouldContain("Invalid resultCount");
            //data verify assertion   --SeedCount should bigger than resultCount
            var biggerException = await CommonRollContractStub.CreateProject.SendWithExceptionAsync(
                new CreateProjectInput()
                {
                    ResultCount = 4,
                    SeedCount = 3,
                    SeedData = new RollData()
                    {
                        PerData =
                        {
                            new PerData() {Index = 1, Name = "li", Number = 123, State = true},
                            new PerData() {Index = 2, Name = "liu", Number = 124, State = false},
                            new PerData() {Index = 3, Name = "lie", Number = 125, State = false}
                        }
                    },
                });
            biggerException.TransactionResult.Error.ShouldContain("SeedCount should bigger than resultCount");
            //data verify assertion   --Repeating data
            var repeatingDataException = await CommonRollContractStub.CreateProject.SendWithExceptionAsync(
                new CreateProjectInput()
                {
                    ResultCount = 1,
                    SeedCount = 3,
                    SeedData = new RollData()
                    {
                        PerData =
                        {
                            new PerData() {Index = 1, Name = "li", Number = 123, State = true},
                            new PerData() {Index = 1, Name = "li", Number = 123, State = true},
                            new PerData() {Index = 3, Name = "lie", Number = 125, State = false}
                        }
                    },
                });
            repeatingDataException.TransactionResult.Error.ShouldContain("Repeating data");
            //Invalid RollTime
            var rollTimeException = await CommonRollContractStub.CreateProject.SendWithExceptionAsync(
                new CreateProjectInput()
                {
                    ResultCount = 1,
                    SeedCount = 3,
                    SeedData = new RollData()
                    {
                        PerData =
                        {
                            new PerData() {Index = 1, Name = "li", Number = 123, State = true},
                            new PerData() {Index = 2, Name = "li", Number = 124, State = true},
                            new PerData() {Index = 3, Name = "lie", Number = 125, State = false}
                        }
                    },
                    RollTime = Timestamp.FromDateTime(DateTime.UtcNow.AddDays(-1))
                });
            rollTimeException.TransactionResult.Error.ShouldContain("Invalid RollTime");
            //success
            var timestamp = Timestamp.FromDateTime(DateTime.UtcNow.AddDays(1));
            var projectHash = await CommonRollContractStub.CreateProject.SendAsync(new CreateProjectInput()
            {
                ResultCount = 1,
                SeedCount = 3,
                SeedData = new RollData()
                {
                    PerData =
                    {
                        new PerData() {Index = 1, Name = "li", Number = 123, State = true},
                        new PerData() {Index = 2, Name = "liu", Number = 124, State = false},
                        new PerData() {Index = 3, Name = "lie", Number = 125, State = false}
                    }
                },
                IsManualRoll = true,
                IsOneTimeRoll = true,
                ResultName = "just roll it",
                RollTime = timestamp,
                Theme = "get the lucky"
            });
            projectHash.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);

            var projectList = await CommonRollContractStub.GetProjectList.CallAsync(new Empty());
            projectList.ProjectOverviews.ShouldContain(x => x.ProjectHash == projectHash.Output);

            var detail = await CommonRollContractStub.GetProjectDetail.CallAsync(new Hash()
            {
                Value = projectHash.Output.Value
            });
            //verify the data state ---  should be all false     false-- ready for roll     true-- winner after roll 
            var data = detail.ProjectDetail.SeedData;
            foreach (var perData in data.PerData)
            {
                perData.State.ShouldBe(false);
            }

            detail.ProjectDetail.Specification.ShouldBe("");
            detail.ProjectDetail.Theme.ShouldBe("get the lucky");
            detail.ProjectDetail.ResultCount.ShouldBe(1);
            detail.ProjectDetail.SeedCount.ShouldBe(3);
            detail.ProjectDetail.ResultName.ShouldBe("just roll it");
            detail.ProjectDetail.IsManualRoll.ShouldBe(true);
            detail.ProjectDetail.IsOneTimeRoll.ShouldBe(true);
            detail.ProjectDetail.RollTime.ShouldBe(timestamp);
        }

        [Fact]
        public async Task SetProjectStateTest()
        {
            var hash = await CreateProject(2, 3, true, Timestamp.FromDateTime(DateTime.UtcNow.AddDays(1)));

            var resultBefore = await CommonRollContractStub.GetProjectList.CallAsync(new Empty());
            resultBefore.ProjectOverviews[0].IsOn.ShouldBe(true);

            await CommonRollContractStub.SetProjectClose.SendAsync(hash);

            var resultAfterClose = await CommonRollContractStub.GetProjectList.CallAsync(new Empty());
            resultAfterClose.ProjectOverviews[0].IsOn.ShouldBe(false);

            await CommonRollContractStub.SetProjectOpen.SendAsync(hash);

            var resultAfterOpen = await CommonRollContractStub.GetProjectList.CallAsync(new Empty());
            resultAfterOpen.ProjectOverviews[0].IsOn.ShouldBe(true);
        }

        [Fact]
        public async Task ProjectRemoveTest()
        {
            var hash1 = await CreateProject(2, 3, true, Timestamp.FromDateTime(DateTime.UtcNow.AddDays(1)));
            var hash2 = await CreateProject(3, 6, true, Timestamp.FromDateTime(DateTime.UtcNow.AddDays(1)));
            var resultBeforeRemove = await CommonRollContractStub.GetProjectList.CallAsync(new Empty());
            resultBeforeRemove.ProjectOverviews.Any(x => x.ProjectHash == hash1).ShouldBe(true);
            resultBeforeRemove.ProjectOverviews.Any(x => x.ProjectHash == hash2).ShouldBe(true);

            await CommonRollContractStub.ProjectRemove.SendAsync(hash1);

            var resultAfterRemove = await CommonRollContractStub.GetProjectList.CallAsync(new Empty());
            resultAfterRemove.ProjectOverviews.Any(x => x.ProjectHash == hash1).ShouldBe(false);
            resultAfterRemove.ProjectOverviews.Any(x => x.ProjectHash == hash2).ShouldBe(true);
        }

        [Fact]
        public async Task ResultConfirmTest()
        {
            var hash = await CreateProject(3, 10, false, Timestamp.FromDateTime(DateTime.UtcNow.AddDays(1)));

            //Project has not rolled
            var rolledException = await CommonRollContractStub.ResultConfirm.SendWithExceptionAsync(hash);
            rolledException.TransactionResult.Error.ShouldContain("Project has not rolled");

            await CommonRollContractStub.Roll.SendAsync(new RollInput()
            {
                ProjectHash = hash
            });
            var rollResultUnconfirmed = await CommonRollContractStub.Roll.SendAsync(new RollInput()
            {
                ProjectHash = hash
            });

            var projectListBefore = await CommonRollContractStub.GetProjectList.CallAsync(new Empty());
            projectListBefore.ProjectOverviews[0].IsConfirmed.ShouldBe(false);

            await CommonRollContractStub.ResultConfirm.SendAsync(hash);

            var projectListAfter = await CommonRollContractStub.GetProjectList.CallAsync(new Empty());
            projectListAfter.ProjectOverviews[0].IsConfirmed.ShouldBe(true);

            var rollResultConfirmed = await CommonRollContractStub.GetRollResult.CallAsync(hash);
            rollResultUnconfirmed.Output.ResultData.ShouldBe(rollResultConfirmed.ResultData);
            //Project has already been confirmed
            var confirmedException = await CommonRollContractStub.ResultConfirm.SendWithExceptionAsync(hash);
            confirmedException.TransactionResult.Error.ShouldContain("Project has already been confirmed");
        }

        [Fact]
        public async Task GetMethodTest()
        {
            var hash = await CreateProject(3, 10, true, Timestamp.FromDateTime(DateTime.UtcNow.AddDays(1)));
            // Project not exists
            var existsException = await CommonRollContractStub.GetRollResult.CallWithExceptionAsync(Hash.Empty);
            existsException.Value.ShouldContain("Project not exists");
            var existsException1 = await CommonRollContractStub.GetProjectDetail.CallWithExceptionAsync(Hash.Empty);
            existsException1.Value.ShouldContain("Project not exists");

            var result = await CommonRollContractStub.GetRollResult.CallAsync(hash);
            result.ResultData.PerData.Count.ShouldBe(0);

            await CommonRollContractStub.Roll.SendAsync(new RollInput()
            {
                ProjectHash = hash
            });

            var resultAfterRoll = await CommonRollContractStub.GetRollResult.CallAsync(hash);
            resultAfterRoll.ResultData.PerData.Count.ShouldBe(3);
            var detailAfterRoll = await CommonRollContractStub.GetProjectDetail.CallAsync(hash);
            detailAfterRoll.ProjectDetail.SeedData.PerData.Where(x => x.State)
                .ShouldBe(resultAfterRoll.ResultData.PerData);
            var list = await CommonRollContractStub.GetProjectList.CallAsync(new Empty());
            list.ProjectOverviews[0].IsConfirmed.ShouldBe(true);
        }

        private async Task<Hash> CreateProject(int resultCount, int seedCount, bool isOneTimeRoll, Timestamp rollTime)
        {
            var result = await CommonRollContractStub.CreateProject.SendAsync(new CreateProjectInput()
            {
                ResultCount = resultCount,
                SeedCount = seedCount,
                SeedData = GetRollData(seedCount),
                IsManualRoll = true,
                IsOneTimeRoll = isOneTimeRoll,
                ResultName = "just roll it",
                RollTime = rollTime,
                Theme = "get the lucky"
            });

            return result.Output;
        }

        private static RollData GetRollData(int seedCount)
        {
            var rollData = new RollData();
            for (var i = 0; i < seedCount; i++)
            {
                rollData.PerData.Add(new PerData()
                {
                    Index = i.Add(1),
                    Name = "li" + i,
                    Number = 100000 + i
                });
            }

            return rollData;
        }
    }
}