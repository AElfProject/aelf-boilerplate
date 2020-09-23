using System;
using System.Threading.Tasks;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.CommonRollContract.Tests
{
    public class CommonRollContractTests : CommonRollContractTestBase
    {
        [Fact]
        public async Task CreateTest()
        {
            var result = await CommonRollContractStub.CreateProject.SendAsync(new CreateProjectInput()
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
                RollTime = Timestamp.FromDateTime(DateTime.UtcNow.AddDays(1)),
                Theme = "get the lucky"
            });
            result.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);

            var detail = CommonRollContractStub.GetProjectDetail.SendAsync(new Hash()
            {
                Value = result.Output.Value
            });
            //verify the data state ---  should be all false
            var data = detail.Result.Output.ProjectDetail.SeedData;
            foreach (var perData in data.PerData)
            {
                perData.State.ShouldBe(false);
            }
        }

        [Fact]
        public async Task EditProject()
        {
            var hash= await CreateProject();
           var  result = await CommonRollContractStub.EditProject.SendAsync(new EditProjectInput()
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
                RollTime = Timestamp.FromDateTime(DateTime.UtcNow.AddDays(1)),
                Theme = "get the lucky",
                ProjectHash = hash,
                Specification = "roll a person"
            });
            result.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);

            var detail = CommonRollContractStub.GetProjectDetail.SendAsync(hash);
            detail.Result.Output.ProjectDetail.Specification.ShouldBe("roll a person");
        }

        private async Task<Hash> CreateProject()
        {
            var result =await  CommonRollContractStub.CreateProject.SendAsync(new CreateProjectInput()
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
                RollTime = Timestamp.FromDateTime(DateTime.UtcNow.AddDays(1)),
                Theme = "get the lucky"
               
            });

            return result.Output;
        }
    }
}