using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.HaloContract
{
    /// <summary>
    /// The C# implementation of the contract defined in halo_contract.proto that is located in the "protobuf"
    /// folder.
    /// Notice that it inherits from the protobuf generated code. 
    /// </summary>
    public class HaloContract : HaloContractContainer.HaloContractBase
    {
        /// <summary>
        /// The implementation of the Hello method. It takes no parameters and returns on of the custom data types
        /// defined in the protobuf definition file.
        /// </summary>
        /// <param name="input">Empty message (from Protobuf)</param>
        /// <returns>a HelloReturn</returns>
        public override HelloReturn Hello(Empty input)
        {
            return new HelloReturn {Value = "Hello World!"};
        }

        public override HaloReturn Halo(Empty input)
        {
            return new HaloReturn
            {
                Height = Context.CurrentHeight,
                Value = "Have a nice day!"
            };
        }

        public override Empty SetNativeGreeting(StringValue input)
        {
            var nativeGreeting = State.NativeGreetings.Value;
            Assert(string.IsNullOrWhiteSpace(nativeGreeting), "Already set the native greeting...");

            // Should not greet to empty string or white space.
            Assert(!string.IsNullOrWhiteSpace(input.Value), "Invalid name.");
            State.NativeGreetings.Value = input.Value;
            return new Empty();
        }

        public override Empty SetGreeting(GreetingInfo input)
        {
            Assert(string.IsNullOrWhiteSpace(State.GreetingInfos[input.Times]), "Already set the greeting...");

            State.GreetingInfos[input.Times] = input.Greeting;
            // State.GreetedList.Value is null if not initialized.
            var greetList = State.GreetedList.Value ?? new GreetedList();

            // Add input.Value to State.GreetedList.Value if it's new to this list.
            if (!greetList.GreatInfo.Contains(input))
            {
                greetList.GreatInfo.Add(input);
            }

            State.GreetedList.Value = greetList;

            Context.LogDebug(() => $"Set new greeting: {input.Times},{input.Greeting}");
            return new Empty();
        }

        public override StringValue GetNativeGreeting(Empty input)
        {
            return string.IsNullOrWhiteSpace(State.NativeGreetings.Value)
                ? new StringValue()
                : new StringValue
                {
                    Value = State.NativeGreetings.Value
                };
        }

        public override GreetingInfo GetGreetings(StringValue input)
        {
            return string.IsNullOrWhiteSpace(State.GreetingInfos[input.Value])
                ? new GreetingInfo()
                : new GreetingInfo
                {
                    Times = input.Value,
                    Greeting = State.GreetingInfos[input.Value]
                };
        }

        public override GreetedList GetGreetedList(Empty input)
        {
            return State.GreetedList.Value ?? new GreetedList();
        }
    }
}