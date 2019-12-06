using AElf.Types;

namespace AElf.Contracts.OrderContract
{
    public class OrderContract: OrderContractContainer.OrderContractBase
    {
        public override SInt64Value CreateOrder(OrderInput orderInput)
        {
            // Check parameters for order input
            CheckOrderInput(orderInput);

            // Build order
            var order = new Order
            {
                Id = orderInput.Id,
                AccountId = orderInput.AccountId,
                Status = OrderStatus.Created,
                Memo = orderInput.Memo,
                CreateTime = orderInput.CreateTime
            };
            foreach (var (key, value) in orderInput.Items)
            {
                order.Items.Add(key, value);
            }

            // Save order
            State.Orders[orderInput.AccountId][orderInput.Id] = order;
            return new SInt64Value {Value = orderInput.Id};
        }

        public override Orders FetchOrders(FetchOrdersInput fetchOrdersInput)
        {
            // Check fetch order input
            CheckFetchOrdersInput(fetchOrdersInput);

            // Fetch orders for account
            var orders = new Orders();
            var endOrderId = fetchOrdersInput.StartOrderId + fetchOrdersInput.Limit + 1;
            for (var i = fetchOrdersInput.StartOrderId; i < endOrderId; i++)
            {
                var order = State.Orders[fetchOrdersInput.AccountId][i];
                if (order != null)
                    orders.Value.Add(order);
            }

            return orders;
        }

        private void CheckOrderInput(OrderInput orderInput)
        {
            Assert(orderInput.Id > 0, "Invalid order id.");
            Assert(orderInput.AccountId > 0, "Invalid account id empty.");
            Assert(orderInput.Items.Count != 0, "Invalid items.");
        }

        private void CheckFetchOrdersInput(FetchOrdersInput fetchOrdersInput)
        {
            Assert(fetchOrdersInput.AccountId > 0, "Invalid account id.");
            Assert(fetchOrdersInput.StartOrderId > 0, "Invalid start order id.");
            Assert(fetchOrdersInput.Limit > 0, "Invalid limit.");
        }
    }
}