
const initialState = {
    is_login: false,
    contracts: 0,
    address: 0,
    balance: 0,
    tempContracts: 0,
    keystore: {},
    betList: []
};

const aelf = (state = initialState, action) => {
    const {data, type} = action;
    switch (type) {
        case 'LOGINSUCCESS':
            state.contracts = data.contracts;
            state.is_login = true;
            state.address = data.address;
            state.keystore = data.keystore;
            return state;
        case 'LOGOUT':
            state.contracts = 0;
            state.is_login = false;
            state.address = 0;
            state.keystore = {};
            return state;

        case 'FRESH_BALANCE':
            state.balance = state.is_login ? data.balance : 0;
            return state;

        case 'SET_TEMPCONTRACTS':
            state.tempContracts = data.contracts;
            return state;
        case 'SET_BET_LIST':
            return Object.assign({}, state, {
                betList: data.betList
            })
        default:
            return state;
    }
};

export default aelf;
