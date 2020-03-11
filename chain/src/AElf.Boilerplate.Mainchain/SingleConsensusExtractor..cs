using AElf.Kernel;
using AElf.Kernel.Consensus.Application;
using Google.Protobuf;

namespace AElf.Boilerplate.MainChain
{
    public class SingleConsensusExtractor : IConsensusExtraDataExtractor
    {
        public ByteString ExtractConsensusExtraData(BlockHeader header)
        {
            return header.Signature;
        }
    }
}