using System.Collections.Generic;
using AElf.Client.Dto;
using AElf.Client.MultiToken;
using AElf.Types;
using Google.Protobuf;

namespace AElf.Boilerplate.EventHandler
{
    public static class TransactionFeeExtension
    {
        public static string GetTransactionFeeInfo(this TransactionResultDto transactionResultDto)
        {
            var transactionFees = transactionResultDto.GetResourceTokenFee();
            if (transactionFees.Count == 0)
                return "Fee=0";

            var feeInfo = "Fee: ";
            foreach (var key in transactionFees.Keys) feeInfo += $"{key}={transactionFees[key]} ";

            return feeInfo.Trim();
        }

        public static long GetDefaultTransactionFee(this TransactionResultDto transactionResultDto)
        {
            var eventLogs = transactionResultDto.Logs;
            foreach (var log in eventLogs)
                if (log.Name == "TransactionFeeCharged")
                {
                    var info = TransactionFeeCharged.Parser.ParseFrom(ByteString.FromBase64(log.NonIndexed));
                    return info.Amount;
                }

            return 0;
        }

        public static long GetDefaultTransactionFee(this TransactionResult transactionResult)
        {
            var eventLogs = transactionResult.Logs;
            foreach (var log in eventLogs)
                if (log.Name == "TransactionFeeCharged")
                {
                    var info = TransactionFeeCharged.Parser.ParseFrom(log.NonIndexed);
                    return info.Amount;
                }

            return 0;
        }

        public static Dictionary<string, long> GetResourceTokenFee(this TransactionResultDto transactionResultDto)
        {
            var dic = new Dictionary<string, long>();
            var eventLogs = transactionResultDto.Logs;
            if (transactionResultDto.Logs == null) return dic;
            foreach (var log in eventLogs)
                if (log.Name == "ResourceTokenCharged" || log.Name == "TransactionFeeCharged")
                {
                    var info = TransactionFeeCharged.Parser.ParseFrom(ByteString.FromBase64(log.NonIndexed));
                    dic.Add(info.Symbol, info.Amount);
                }

            return dic;
        }

        public static (string, long) GetTransactionFee(this TransactionResultDto transactionResultDto)
        {
            var eventLogs = transactionResultDto.Logs;
            foreach (var log in eventLogs)
                if (log.Name == "TransactionFeeCharged")
                {
                    var info = TransactionFeeCharged.Parser.ParseFrom(ByteString.FromBase64(log.NonIndexed));
                    return (info.Symbol, info.Amount);
                }

            return ("ELF", 0);
        }
    }
}