
const initialState = {
    is_login: false,
    contracts: 0,
    address: 0,
    balance: 0,
    tempContracts: 0,
    keystore: {},
    betList: [],
    lotteryList: [],
    newBet: false
};

const aelf = (state = initialState, action) => {
    const { data, type } = action;
    switch (type) {
        case 'LOGINSUCCESS':
            state.contracts = data.contracts;
            state.is_login = true;
            state.address = data.address;
            state.keystore = data.keystore;
            return state;
        case 'LOGOUT':
            return Object.assign({}, state, {
                contracts: 0,
                is_login: false,
                address: 0,
                keystore: {},
                betList: [],
                lotteryList: [],
                newBet: false,
            });
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
        case 'SET_LOTTERY_LIST':
            return Object.assign({}, state, {
                lotteryList: data.lotteryList
            })
        case 'SET_NEW_BET': {
            return Object.assign({}, state, {
                newBet: data.newBet
            })
        }
        default:
            return state;
    }
};

export default aelf;
