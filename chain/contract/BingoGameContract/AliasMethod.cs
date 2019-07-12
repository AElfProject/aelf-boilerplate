using System.Collections.Generic;
using System.Linq;

namespace BingoGameContract
{
    /// <summary>
    /// Inspired by http://www.keithschwarz.com/darts-dice-coins/
    /// </summary>
    public class AliasMethod
    {
        private List<int> _alias = new List<int>();
        private List<double> _probability = new List<double>();

        /// <summary>
        /// prob : weight / total_weight
        /// </summary>
        /// <param name="weights"></param>
        /// <param name="randomNumber"></param>
        public AliasMethod(List<int> weights, long randomNumber)
        {
            var totalWeight = weights.Sum();
            var probabilities = new List<double>(weights.Select(w => (double) w / totalWeight));
            var average = 1.0 / probabilities.Count;
        }
    }
}