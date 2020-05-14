using System.Collections.Generic;
using AElf.Contracts.BingoGameContract;
using AElf.Kernel.SmartContractInitialization;
using AElf.Types;
using Google.Protobuf;

namespace AElf.Boilerplate.DAppContract
{
    public class BingoGameContractInitializationProvider : IContractInitializationProvider
    {
        public List<InitializeMethod> GetInitializeMethodList(byte[] contractCode)
        {
            return new List<InitializeMethod>
            {
                new InitializeMethod
                {
                    MethodName = nameof(BingoGameContractContainer.BingoGameContractStub.Initial),
                    Params = ByteString.Empty
                }
            };
        }

        public Hash SystemSmartContractName => BingoGameSmartContractAddressNameProvider.Name;
        public string ContractCodeName => "AElf.Contracts.BingoGameContract";
    }
}