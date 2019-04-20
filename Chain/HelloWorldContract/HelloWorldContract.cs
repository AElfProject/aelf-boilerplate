using System;
using Google.Protobuf.WellKnownTypes;

namespace HelloWorldContract
{
    public partial class HelloWorldContract : HelloWorldContractContainer.HelloWorldContractBase   
    {
        public override HelloReturn Hello(Empty input)
        {
            return new HelloReturn { Value = "Hello world!"};
        }
    }
}