using AElf.Types;

namespace AElf.Boilerplate.EventHandler
{
    public static class AddressExtension
    {
        public static Address ConvertAddress(this string address)
        {
            return Address.FromBase58(address);
        }
    }
}