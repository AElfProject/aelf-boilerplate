
import LoginPage from "./LoginPage";
import AccountLogin from "./accountLogin";

import Registered from "./registered";
import GenerateQRCode from "./generateQRCode";

const stackNav = [
    { name: 'LoginPage', component: LoginPage },
    { name: 'GenerateQRCode', component: GenerateQRCode },
    { name: 'AccountLogin', component: AccountLogin },
    { name: 'Registered', component: Registered },
];
export default stackNav;
