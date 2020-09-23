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
            Assert(input.ResultCount > 0 && input.SeedCount >= input.ResultCount, "Invalid Count Input");
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

            var seedData = input.SeedData;
            foreach (var perData in seedData.PerData)
            {
                perData.State = false;
            }

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

            return projectHash;
        }

        public override Empty EditProject(EditProjectInput input)
        {
            Assert(
                State.UserProjectList[Context.Sender] != null &&
                State.UserProjectList[Context.Sender].ProjectHash.Contains(input.ProjectHash), "Project not exists");
            Assert(input.ResultCount > 0 && input.SeedCount >= input.ResultCount, "Invalid Count Input");
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

            var seedData = input.SeedData;
            foreach (var perData in seedData.PerData)
            {
                perData.State = false;
            }

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
            return new Empty();
        }

        public override RollOutput Roll(RollInput input)
        {
            Assert(
                State.UserProjectList[Context.Sender] != null &&
                State.UserProjectList[Context.Sender].ProjectHash.Contains(input.ProjectHash), "Project not exists");
            Assert(State.UserProjectOverview[input.ProjectHash].IsOn, "Project is closed");
            Assert(State.UserProjectOverview[input.ProjectHash].IsConfirmed != true,
                "Project's roll result is confirmed");
            Assert(
                State.UserProjectOverview[input.ProjectHash].IsRolled != true ||
                State.UserProjectOverview[input.ProjectHash].IsRolled &&
                !State.UserProjectDetail[input.ProjectHash].IsOneTimeRoll, "project has rolled");
            if (State.ConsensusContract.Value == null)
            {
                State.ConsensusContract.Value =
                    Context.GetContractAddressByName(SmartContractConstants.ConsensusContractSystemName);
            }

            var randomHash = State.ConsensusContract.GetRandomHash.Call(new Int64Value
            {
                Value = Context.CurrentHeight
            });

            
            //unfinished
            return base.Roll(input);
        }

        public override GetProjectDetailOutput GetProjectDetail(Hash input)
        {
            Assert(
                State.UserProjectList[Context.Sender] != null &&
                State.UserProjectList[Context.Sender].ProjectHash.Contains(input), "Project not exists");
            return new GetProjectDetailOutput()
            {
                ProjectDetail = State.UserProjectDetail[input]
            };
        }

        public override Empty ProjectRemove(Hash input)
        {
            Assert(
                State.UserProjectList[Context.Sender] != null &&
                State.UserProjectList[Context.Sender].ProjectHash.Contains(input), "Project not exists");
            State.UserProjectList[Context.Sender].ProjectHash.Remove(input);
            State.UserProjectDetail[input] = null;
            State.UserProjectOverview[input] = null;
            return new Empty();
        }

        public override Empty ResultConfirm(Hash input)
        {
            Assert(
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
                foreach (var hash in  State.UserProjectList[Context.Sender].ProjectHash)
                {
                    result.ProjectOverview.Add(State.UserProjectOverview[hash]);
                }
            }
            return result;
        }

        public override Empty SetProjectClose(Hash input)
        {
            Assert(
                State.UserProjectList[Context.Sender] != null &&
                State.UserProjectList[Context.Sender].ProjectHash.Contains(input), "Project not exists");
            State.UserProjectOverview[input].IsOn = false;
            return new Empty();
        }
        
        public override Empty SetProjectOpen(Hash input)
        {
            Assert(
                State.UserProjectList[Context.Sender] != null &&
                State.UserProjectList[Context.Sender].ProjectHash.Contains(input), "Project not exists");
            State.UserProjectOverview[input].IsOn = true;
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