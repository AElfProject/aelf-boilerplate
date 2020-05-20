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
      onSetTempContracts: (data) => dispatch({data:data, type: 'SET_TEMPCONTRACTS'})
    }
}



export default connect(mapStateToProps, mapDispatchToProps);
