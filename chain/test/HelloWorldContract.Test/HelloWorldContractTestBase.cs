using System.IO;
using Acs0;
using AElf.Contracts.Genesis;
using AElf.Contracts.HelloWorldContract;
using AElf.Contracts.TestKit;
using AElf.Kernel;
using AElf.Types;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;
using Volo.Abp.Threading;

namespace HelloWorldContract.Test
{
    public class HelloWorldContractTestBase : ContractTestBase<HelloWorldContractTestModule>
    {
        internal HelloWorldContractContainer.HelloWorldContractStub HelloWorldContractStub { get; set; }
        internal BasicContractZeroContainer.BasicContractZeroStub BasicContractZeroStub { get; set; }

        protected Address HelloWorldContractAddress { get; set; }

        public HelloWorldContractTestBase()
        {
        }
    }
}