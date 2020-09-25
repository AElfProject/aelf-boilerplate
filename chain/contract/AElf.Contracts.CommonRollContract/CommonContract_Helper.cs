using System;
using System.Linq;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.CommonRollContract
{
    public partial class CommonRollContract
    {
        /// <summary>
        /// confirm the roll result,once confirm,the project can't roll again
        /// </summary>
        /// <param name="hash">project hash</param>
        private void ConfirmRoll(Hash hash)
        {
            Assert(State.UserProjectOverview[hash].IsRolled, "Project has not rolled");
            Assert(!State.UserProjectOverview[hash].IsConfirmed, "Project has already been confirmed");
            State.UserProjectOverview[hash].IsConfirmed = true;
            Context.Fire(new ResultConfirmed()
            {
                ProjectHash = hash,
                ResultData = new RollData()
                {
                    PerData = {State.UserProjectDetail[hash].SeedData.PerData.Where(m => m.State)}
                }
            });
        }

        /// <summary>
        /// verify the rollData,invalid data will cause assertion
        /// </summary>
        /// <param name="rollData">data for roll</param>
        /// <param name="seedCount"> roll data count</param>
        /// <param name="resultCount">roll result count</param>
        private void DataVerify(RollData rollData, int seedCount, int resultCount)
        {
            Assert(rollData.PerData.Count == seedCount, "Incorrect seedCount");
            Assert(resultCount > 0, "Invalid resultCount");
            Assert(resultCount <= seedCount, "SeedCount should bigger than resultCount");
            Assert(rollData.PerData.Distinct().Count() == seedCount, "Repeating data");
        }

        /// <summary>
        /// set data state to false which present waiting to roll state
        /// </summary>
        /// <param name="seedData">rollData input</param>
        /// <returns>Reseted rollData </returns>
        private static RollData DataStateReset(RollData seedData)
        {
            foreach (var perData in seedData.PerData)
            {
                perData.State = false;
            }

            return seedData;
        }
    }
}