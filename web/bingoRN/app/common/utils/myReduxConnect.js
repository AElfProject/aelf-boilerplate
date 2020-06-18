import { connect } from "react-redux";

const mapStateToProps = (state /*, ownProps*/) => {
    return {
      ReduxStore: state
    };
};
function mapDispatchToProps(dispatch) {
    return {
      onLoginSuccess: (data) => dispatch({data:data , type: 'LOGINSUCCESS' }),
      onLogout: (data) => dispatch({data:data , type: 'LOGOUT' }),
      onFreshBalance: (data) => dispatch({ data:data, type: 'FRESH_BALANCE'}),
      onSetTempContracts: (data) => dispatch({data:data, type: 'SET_TEMPCONTRACTS'}),
      onSetBetList: (data) => dispatch({data:data, type: 'SET_BET_LIST'}),
      onSetLotteryList: (data) => dispatch({data:data, type: 'SET_LOTTERY_LIST'}),
      onSetNewBet: (data) => dispatch({data:data, type: 'SET_NEW_BET'})
    }
}



export default connect(mapStateToProps, mapDispatchToProps);
