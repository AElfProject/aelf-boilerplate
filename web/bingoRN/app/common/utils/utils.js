module.exports.sleep = time => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
//Is it a number
const isNumber = (val) => {
  try {
    var regPos = /^\d+(\.\d+)?$/; //Integer
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //Floating point
    return regPos.test(val) || regNeg.test(val)
  } catch (error) {
    return false
  }
}

export { isNumber }
