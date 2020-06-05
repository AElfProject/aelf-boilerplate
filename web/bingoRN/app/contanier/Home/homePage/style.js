import { StyleSheet } from "react-native"
import pTd from "../../../common/utils/unit";

export default StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.fontColor
  },
  divider: {
    backgroundColor: Colors.borderColor,
    marginTop: 8,
    marginBottom: 8
  },
  basicText: {
    marginBottom: 2
  },
  btnStyle: {
    width: 300,
    backgroundColor: "#817AFD",
    ...Gstyle.radiusArg(pTd(6)),
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  lotteryBuyTypeButton: {
    flex: 1,
    width: 120,
    margin: 2,
    backgroundColor: "#817AFD",
  },
  lotteryBuyTypeButtonHide: {
    flex: 1,
    width: 120,
    margin: 2,
    backgroundColor: "#AAA",
  },
  bingoButton: {
    flex: 1,
    width: 66,
    margin: 2,
    backgroundColor: "#817AFD",
  },
  bingoButtonSubmit: {
    flex: 1,
    width: 120,
    margin: 6,
    backgroundColor: "#817AFD",
  },
  drawButton: {
    flex: 1,
    width: 220,
    margin: 6,
    backgroundColor: "#817AFD",
  },
  devButton: {
    width: 240,
    margin: 6,
    backgroundColor: "#817AFD",
  },
  rules: {
    marginLeft: 8,
    marginRight: 8
  },
  inputStyle: {
    margin: 3,
    width: 200,
    height: 40,
    borderColor: "#817AFD",
    borderWidth: 1,
    borderRadius: 3,
    color: '#666'
  }
});
