using System.Collections.Generic;
using AElf.Types;

namespace AElf.Boilerplate.MainChain
{
    public class LotteryOptions
    {
        public Address Sponsor { get; set; } = Address.FromPublicKey(
            ByteArrayHelper.HexStringToByteArray(
                "0484dc77d6b059d50156bc1a803203a2733dc591ae1358d7538c001565380b6c477b268a32baa6e609e41c0920b6b0eff3bee7ac3fc72148a3f89cb6579e256fa5")
        );

        public List<Address> PlayerList { get; set; } = new List<Address>
        {
            Address.FromPublicKey(
                ByteArrayHelper.HexStringToByteArray(
                    "0484dc77d6b059d50156bc1a803203a2733dc591ae1358d7538c001565380b6c477b268a32baa6e609e41c0920b6b0eff3bee7ac3fc72148a3f89cb6579e256fa5")
            )
        };

        public long InitialBalance { get; set; } = 100_000_000_000;

        public string TokenSymbol { get; set; } = "ELF"; //Use ELF token to play lottery by default.
    }
}