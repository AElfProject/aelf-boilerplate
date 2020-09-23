using System;
using System.Linq;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.CommonRollContract
{
    public partial class CommonRollContract
    {
        private void ConfirmRoll(Hash hash)
        {
            Assert(State.UserProjectOverview[hash].IsRolled, "Project has not rolled");
            Assert(!State.UserProjectOverview[hash].IsConfirmed, "Project has already been confirmed");
            State.UserProjectOverview[hash].IsConfirmed = true;
            Context.Fire(new ResultConfirmed()
            {
                ProjectHash = hash,
                ResultData =  new RollData()
                {
                    PerData = {State.UserProjectDetail[hash].SeedData.PerData.Where(m => m.State)}
                }
            });
        }
    }
}