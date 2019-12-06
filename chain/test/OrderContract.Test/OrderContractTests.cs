using System;
using System.Threading.Tasks;
using AElf.Contracts.Order;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace OrderContract.Test
{
    public class OrderContractTests : OrderContractTestBase
    {
        [Fact]
        public async Task Create_And_Fetch_Orders_Test()
        {
            var orderInput = new OrderInput
            {
                Id = 1000,
                AccountId = 2000,
                CreateTime = Timestamp.FromDateTime(DateTime.UtcNow),
                Memo = "My first block chain order."
            };
            orderInput.Items.Add("book: dotnet core", 100);
            var order = await OrderContractStub.CreateOrder.SendAsync(orderInput);
            order.Output.Value.ShouldBe(1000);

            var fetchOrderInput = new FetchOrdersInput()
            {
                AccountId = 2000,
                StartOrderId = 1000
            };
            orderInput.Items.Add("book: dotnet core", 100);
            var orders = await OrderContractStub.FetchOrders.CallAsync(fetchOrderInput);
            orders.Value[0].Id.ShouldBe(1000);
        }
    }
}