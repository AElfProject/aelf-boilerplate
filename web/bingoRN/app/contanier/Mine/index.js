import FundingDetail from "./fundingDetail/index";
import Recharge from "./recharge/index";
import RechargeDetail from "./rechargeDetail/index";
import Withdraw from "./withdraw/index";
import WithdrawDetail from "./withdrawDetail/index";
import TransactionDetail from "./transactionDetail/index";
import ChangeTransactionPsw from "./changeTransactionPsw/index";
import SetTransactionPsw from "./setTransactionPsw/index";
import BackupQRcode from "./backupQRcode/index";
import ChangeLoginPsw from "./changeLoginPsw/index";
import SecurityCenter from "./securityCenter/index";
import AboutUs from "./aboutUs/index";

const stackNav = [
    { name: 'FundingDetail', component: FundingDetail },
    { name: 'TransactionDetail', component: TransactionDetail },
    { name: 'Recharge', component: Recharge },
    { name: 'RechargeDetail', component: RechargeDetail },
    { name: 'Withdraw', component: Withdraw },
    { name: 'WithdrawDetail', component: WithdrawDetail },
    { name: 'ChangeTransactionPsw', component: ChangeTransactionPsw },
    { name: 'SetTransactionPsw', component: SetTransactionPsw },
    { name: 'BackupQRcode', component: BackupQRcode },
    { name: 'ChangeLoginPsw', component: ChangeLoginPsw },
    { name: 'SecurityCenter', component: SecurityCenter },
    { name: 'AboutUs', component: AboutUs },
];

export default stackNav;
