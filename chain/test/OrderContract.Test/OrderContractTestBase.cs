using AElf.Contracts.Genesis;
using AElf.Contracts.Order;
using AElf.Contracts.TestKit;

namespace OrderContract.Test
{
    public class OrderContractTestBase : ContractTestBase<OrderContractTestModule>
    {
        internal OrderContractContainer.OrderContractStub OrderContractStub { get; set; }
        internal BasicContractZeroContainer.BasicContractZeroStub BasicContractZeroStub { get; set; }
    }
}