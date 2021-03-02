using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.OracleContract
{
    public partial class OracleContract
    {
        private void VerifyRequest(Hash requestId, long payment, Address callbackAddress, string methodName,
            Timestamp expiration)
        {
            var commitment = State.Commitments[requestId];
            Assert(commitment != null, $"Request id {requestId} does not exist");
            var paramsHash = GenerateParamHash(payment, callbackAddress, methodName, expiration);
            Assert(commitment.ParamsHash == paramsHash, "Params do not match request ID");
        }

        private void VerifyNode(Hash requestId, Address sender)
        {
            var commitment = State.Commitments[requestId];
            Assert(State.AuthorizedNodes[sender], "Invalid node");
            var nodeList = commitment.DesignatedNodes.NodeList;
            if (nodeList.Count > 0)
            {
                Assert(nodeList.Contains(sender), "Sender is not authorized");
            }
        }
        private Hash GenerateRequestId(Address sender, long nonce)
        {
            var requestId = HashHelper.ComputeFrom(sender);
            var nonceHash = HashHelper.ComputeFrom(nonce);
            requestId = HashHelper.ConcatAndCompute(requestId, nonceHash);
            return requestId;
        }

        private Hash GenerateParamHash(long payment, Address callbackAddress, string methodName,
            Timestamp expiration)
        {
            var paramsHash = HashHelper.ComputeFrom(payment);
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