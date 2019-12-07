using System;
using System.Threading.Tasks;
using AElf.Contracts.OrderContract;
using AElf.Types;
using Google.Protobuf;
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
            // Test1
            var orderInput = new OrderInput
            {
                Id = 1000,
                AccountId = 2000,
                CreateTime = Timestamp.FromDateTime(DateTime.UtcNow),
                Memo = "My first block chain order."
            };
            orderInput.Items.Add("book: dotnet core", 100);
            var createOrderExecutionResult = await OrderContractStub.CreateOrder.SendAsync(orderInput);
            createOrderExecutionResult.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
            var orderId = new SInt64Value();
            orderId.MergeFrom(createOrderExecutionResult.TransactionResult.ReturnValue);
            orderId.Value.ShouldBe(1000);

            var fetchOrderInput = new FetchOrdersInput()
            {
                AccountId = 2000,
                StartOrderId = 1000,
                Limit = 1
            };
            var fetchOrderExecutionResult = await OrderContractStub.FetchOrders.CallAsync(fetchOrderInput);
            fetchOrderExecutionResult.Value[0].Id.ShouldBe(1000);
            fetchOrderExecutionResult.Value[0].AccountId.ShouldBe(2000);
            fetchOrderExecutionResult.Value.Count.ShouldBe(1);

            // Test2
            orderInput.Id = 1001;
            orderInput.Memo = "My second block chain order.";
            await OrderContractStub.CreateOrder.SendAsync(orderInput);
            fetchOrderExecutionResult = await OrderContractStub.FetchOrders.CallAsync(fetchOrderInput);
            fetchOrderExecutionResult.Value.Count.ShouldBe(1);
            fetchOrderExecutionResult.Value[0].Id.ShouldBe(1000);

            // Test2
            fetchOrderInput.Limit = 2;
            fetchOrderExecutionResult = await OrderContractStub.FetchOrders.CallAsync(fetchOrderInput);
            fetchOrderExecutionResult.Value.Count.ShouldBe(2);
            fetchOrderExecutionResult.Value[0].Id.ShouldBe(1000);
            fetchOrderExecutionResult.Value[1].Memo.ShouldBe("My second block chain order.");
        }
    }
}