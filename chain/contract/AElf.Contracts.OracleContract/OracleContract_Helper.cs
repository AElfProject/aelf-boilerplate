using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.OracleContract
{
    public partial class OracleContract
    {
        private Hash GenerateRequestId(Address sender, Hash txId)
        {
            var requestId = HashHelper.ComputeFrom(sender);
            requestId = HashHelper.ConcatAndCompute(requestId, txId);
            return requestId;
        }

        private Hash GenerateParamHash(long payment, Address aggregator, Address callbackAddress, string methodName,
            Timestamp expiration)
        {
            var paramsHash = HashHelper.ComputeFrom(payment);
            var aggregatorHash = HashHelper.ComputeFrom(aggregator);
            paramsHash = HashHelper.ConcatAndCompute(paramsHash, aggregatorHash);
            var callbackHash = HashHelper.ComputeFrom(callbackAddress);
            paramsHash = HashHelper.ConcatAndCompute(paramsHash, callbackHash);
            var methodNameHash = HashHelper.ComputeFrom(methodName);
            paramsHash = HashHelper.ConcatAndCompute(paramsHash, methodNameHash);
            var expirationHash = HashHelper.ComputeFrom(expiration.ToBytesValue());
            paramsHash = HashHelper.ConcatAndCompute(paramsHash, expirationHash);
            return paramsHash;
        } 
    }
}