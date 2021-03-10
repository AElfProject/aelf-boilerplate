using AElf.Standards.ACS2;
using AElf.CSharp.Core;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.ACS2DemoContract
{
    /// <summary>
    /// ACS2 defines one interface to provide resource paths for smart contract parallel executing.
    /// </summary>
    public class ACS2DemoContract : ACS2DemoContractContainer.ACS2DemoContractBase
    {
        public override Empty TransferCredits(TransferCreditsInput input)
        {
            var remainCredits = State.Credits[Context.Sender];
            Assert(remainCredits >= input.Amount, "Insufficient balance.");
            State.Credits[Context.Sender] = remainCredits.Sub(input.Amount);
            State.Credits[input.To] = State.Credits[input.To].Add(input.Amount);
            return new Empty();
        }

        public override ResourceInfo GetResourceInfo(Transaction input)
        {
            if (input.MethodName == nameof(TransferCredits))
            {
                var args = TransferCreditsInput.Parser.ParseFrom(input.Params);
                return new ResourceInfo
                {
                    WritePaths =
                    {
                        GetPath(nameof(ACS2DemoContractState.Credits), input.From.ToString()),
                        GetPath(nameof(ACS2DemoContractState.Credits), args.To.ToString()),
                    }
                };
            }

            return new ResourceInfo {NonParallelizable = true};
        }

        private ScopedStatePath GetPath(params string[] parts)
        {
            return new ScopedStatePath
            {
                Address = Context.Self,
                Path = new StatePath
                {
                    Parts =
                    {
                        parts
                    }
                }
            };
        }
    }
}