using System;
using AElf;
using AElf.Types;

namespace AElf.Boilerplate.EventHandler
{
    public static class TransactionResultStatusExtension
    {
        public static TransactionResultStatus ConvertTransactionResultStatus(this string status)
        {
            return (TransactionResultStatus) Enum.Parse(typeof(TransactionResultStatus), status, true);
        }
    }

    public static class TransactionUtil
    {
        public static string CalculateTxId(string rawTx)
        {
            var byteArray = ByteArrayHelper.HexStringToByteArray(rawTx);
            var transaction = Transaction.Parser.ParseFrom(byteArray);
            return transaction.GetHash().ToHex();
        }
    }
}