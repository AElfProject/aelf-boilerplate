using System;
using System.Linq;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.CommonRollContract
{
    public partial class CommonRollContract : CommonRollContractContainer.CommonRollContractBase
    {
        public override Hash CreateProject(CreateProjectInput input)
        {
            DataVerify(input.SeedData, input.SeedCount, input.ResultCount);
            Assert(input.RollTime > Context.CurrentBlockTime, "Invalid RollTime");

            var projectHash = Context.TransactionId;

            var projectList = State.UserProjectList[Context.Sender] ?? new ProjectList();
            projectList.ProjectHash.Add(projectHash);
            State.UserProjectList[Context.Sender] = projectList;

            State.UserProjectOverview[projectHash] = new ProjectOverview()
            {
                ProjectHash = projectHash,
                Theme = input.Theme,
                CreateTime = Context.CurrentBlockTime,
                IsOn = true,
                IsRolled = false,
                IsConfirmed = false
            };

            var seedData = DataStateReset(input.SeedData);

            State.UserProjectDetail[projectHash] = new ProjectDetail()
            {
                Theme = input.Theme,
                Specification = input.Specification,
                SeedData = seedData,
                SeedCount = input.SeedCount,
                ResultName = input.ResultName,
                ResultCount = input.ResultCount,
                RollTime = input.RollTime,
                IsOneTimeRoll = input.IsManualRoll,
                IsManualRoll = input.IsManualRoll
            };

            Context.Fire(new ProjectCreated()
            {
                Address = Context.Sender,
                CreateTime = Context.CurrentBlockTime,
                Hash = projectHash,
                IsManualRoll = input.IsManualRoll,
                IsOneTimeRoll = input.IsOneTimeRoll,
                ResultCount = input.ResultCount,
                ResultName = input.ResultName,
                RollTime = input.RollTime,
                SeedCount = input.SeedCount,
                SeedData = seedData
            });

            return projectHash;
        }

        public override Empty EditProject(EditProjectInput input)
        {
            Assert(input.ProjectHash != null &&
                   State.UserProjectList[Context.Sender] != null &&
                   State.UserProjectList[Context.Sender].ProjectHash.Contains(input.ProjectHash), "Project not exists");
            DataVerify(input.SeedData, input.SeedCount, input.ResultCount);
            Assert(input.RollTime > Context.CurrentBlockTime, "Invalid RollTime");

            State.UserProjectOverview[input.ProjectHash] = new ProjectOverview()
            {
                ProjectHash = input.ProjectHash,
                Theme = input.Theme,
                CreateTime = Context.CurrentBlockTime,
                IsOn = true,
                IsRolled = false,
                IsConfirmed = false
            };

            var seedData = DataStateReset(input.SeedData);

            State.UserProjectDetail[input.ProjectHash] = new ProjectDetail()
            {
                Theme = input.Theme,
                Specification = input.Specification,
                SeedData = seedData,
                SeedCount = input.SeedCount,
                ResultName = input.ResultName,
                ResultCount = input.ResultCount,
                RollTime = input.RollTime,
                IsOneTimeRoll = input.IsManualRoll,
                IsManualRoll = input.IsManualRoll
            };

            Context.Fire(new ProjectEdited()
            {
                Address = Context.Sender,
                EditTime = Context.CurrentBlockTime,
                ProjectHash = input.ProjectHash,
                IsManualRoll = input.IsManualRoll,
                IsOneTimeRoll = input.IsOneTimeRoll,
                ResultCount = input.ResultCount,
                ResultName = input.ResultName,
                RollTime = input.RollTime,
                SeedCount = input.SeedCount,
                SeedData = seedData
            });

            return new Empty();
        }

        public override RollOutput Roll(RollInput input)
        {
            Assert(input.ProjectHash != null &&
                   State.UserProjectList[Context.Sender] != null &&
                   State.UserProjectList[Context.Sender].ProjectHash.Contains(input.ProjectHash), "Project not exists");
            Assert(State.UserProjectOverview[input.ProjectHash].IsOn, "Project is closed");
            Assert(State.UserProjectDetail[input.ProjectHash].RollTime >= Context.CurrentBlockTime, "Invalid RollTime");
            Assert(State.UserProjectOverview[input.ProjectHash].IsConfirmed != true,
                "Project's roll result is confirmed");
            if (State.ConsensusContract.Value == null)
            {
                State.ConsensusContract.Value =
                    Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);
            }

            var seedData = DataStateReset(State.UserProjectDetail[input.ProjectHash].SeedData);
            State.UserProjectDetail[input.ProjectHash].SeedData = seedData;

            var randomHash = State.ConsensusContract.GetRandomHash.Call(new Int64Value
            {
                Value = Context.CurrentHeight
            });

#if DEBUG
            randomHash = HashHelper.ComputeFrom(Context.PreviousBlockHash);
#endif

            var index = Context.ConvertHashToInt64(randomHash, 0,
                State.UserProjectDetail[input.ProjectHash].SeedCount);
            for (var i = 0; i < State.UserProjectDetail[input.ProjectHash].ResultCount; i++)
            {
                //if item already be chosen , update the index until get a new item
                while (State.UserProjectDetail[input.ProjectHash].SeedData.PerData[(int) index].State)
                {
                    var result = State.UserProjectDetail[input.ProjectHash].SeedData.PerData[(int) index].Number;
                    var hashNew = HashHelper.ComputeFrom(result);
                    randomHash = HashHelper.ConcatAndCompute(randomHash, hashNew);
                    index = Context.ConvertHashToInt64(randomHash, 0,
                        State.UserProjectDetail[input.ProjectHash].SeedCount);
                }

                State.UserProjectDetail[input.ProjectHash].SeedData.PerData[(int) index].State = true;
            }

            State.UserProjectOverview[input.ProjectHash].IsRolled = true;
            if (State.UserProjectDetail[input.ProjectHash].IsOneTimeRoll)
            {
                ConfirmRoll(input.ProjectHash);
                State.UserProjectOverview[input.ProjectHash].IsConfirmed = true;
            }

            var resultData = new RollData()
            {
                PerData = {State.UserProjectDetail[input.ProjectHash].SeedData.PerData.Where(m => m.State)}
            };

            Context.Fire(new Roll()
            {
                ProjectHash = input.ProjectHash,
                ResultCount = State.UserProjectDetail[input.ProjectHash].ResultCount,
                RollTime = Context.CurrentBlockTime,
                SeedCount = State.UserProjectDetail[input.ProjectHash].SeedCount,
                SeedData = seedData
            });

            return new RollOutput()
            {
                ResultData = resultData
            };
        }

        public override GetProjectDetailOutput GetProjectDetail(Hash input)
        {
            Assert(input != null &&
                   State.UserProjectList[Context.Sender] != null &&
                   State.UserProjectList[Context.Sender].ProjectHash.Contains(input), "Project not exists");
            return new GetProjectDetailOutput()
            {
                ProjectDetail = State.UserProjectDetail[input]
            };
        }

        public override Empty ProjectRemove(Hash input)
        {
            Assert(input != null &&
                   State.UserProjectList[Context.Sender] != null &&
                   State.UserProjectList[Context.Sender].ProjectHash.Contains(input), "Project not exists");
            State.UserProjectList[Context.Sender].ProjectHash.Remove(input);
            State.UserProjectDetail[input] = null;
            State.UserProjectOverview[input] = null;

            Context.Fire(new ProjectRemoved()
            {
                ProjectHash = input
            });

            return new Empty();
        }

        public override Empty ResultConfirm(Hash input)
        {
            Assert(input != null &&
                   State.UserProjectList[Context.Sender] != null &&
                   State.UserProjectList[Context.Sender].ProjectHash.Contains(input), "Project not exists");
            ConfirmRoll(input);
            return new Empty();
        }

        public override GetProjectListOutput GetProjectList(Empty input)
        {
            var result = new GetProjectListOutput();
            if (State.UserProjectList[Context.Sender].ProjectHash != null)
            {
                foreach (var hash in State.UserProjectList[Context.Sender].ProjectHash)
                {
                    result.ProjectOverview.Add(State.UserProjectOverview[hash]);
                }
            }

            return result;
        }

        public override Empty SetProjectClose(Hash input)
        {
            Assert(input != null &&
                   State.UserProjectList[Context.Sender] != null &&
                   State.UserProjectList[Context.Sender].ProjectHash.Contains(input), "Project not exists");
            State.UserProjectOverview[input].IsOn = false;

            Context.Fire(new ProjectClosed()
            {
                ProjectHash = input
            });

            return new Empty();
        }

        public override Empty SetProjectOpen(Hash input)
        {
            Assert(input != null &&
                   State.UserProjectList[Context.Sender] != null &&
                   State.UserProjectList[Context.Sender].ProjectHash.Contains(input), "Project not exists");
            State.UserProjectOverview[input].IsOn = true;

            Context.Fire(new ProjectOpened()
            {
                ProjectHash = input
            });

            return new Empty();
        }

        public override GetRollResultOutput GetRollResult(Hash input)
        {
            Assert(
                State.UserProjectList[Context.Sender] != null &&
                State.UserProjectList[Context.Sender].ProjectHash.Contains(input), "Project not exists");
            return new GetRollResultOutput()
            {
                ResultData = new RollData()
                {
                    PerData = {State.UserProjectDetail[input].SeedData.PerData.Where(m => m.State)}
                }
            };
        }
    }
}