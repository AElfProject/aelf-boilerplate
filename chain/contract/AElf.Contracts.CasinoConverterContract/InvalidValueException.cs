using AElf.Sdk.CSharp;

namespace AElf.Contracts.CasinoConverter
{
    public class InvalidValueException : BaseAElfException
    {
        public InvalidValueException(string message) : base(message)
        {
        }
    }
}