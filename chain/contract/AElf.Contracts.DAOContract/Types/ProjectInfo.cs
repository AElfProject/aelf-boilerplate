using AElf.Sdk.CSharp;
using AElf.Types;

// ReSharper disable once CheckNamespace
namespace AElf.Contracts.DAOContract
{
    public partial class ProjectInfo
    {
        public Hash GetProjectId()
        {
            return Hash.FromString(CommitId.Append(PullRequestUrl));
        }
    }
}