import BigNumber from "big-number"

module.exports.unitConverter = {

    toLower : (n,d)=>{
      let res = new BigNumber(n);
      d = new BigNumber(10).pow(d) ;
      return res.div(d); 
    },

    toHigher : (n,d)=>{
      let res = new BigNumber(n);
      d = new BigNumber(10).pow(d);
      return res.multiply(d); 
    },
    
  };
  