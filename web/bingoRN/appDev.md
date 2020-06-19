# Application develop

You can find the code in `app/container/Home/homePage/index.js`

## How to get account

In redux store, we store the account info.

```javascript
const reduxStoreData = this.props.ReduxStore;
const { address, keystore } = reduxStoreData;
```

## How to init contract

In root `config.js`, you can set key `contractNames` and `contractAddressedNeedInit`.

We will init the contract, and you can get the instance of contract in the redux store.

```javascript
const reduxStoreData = this.props.ReduxStore;
const { address, contracts } = reduxStoreData;
```

## How to call contract

Same as call contract by aelf-sdk.js.

docs: https://github.com/AElfProject/aelf-sdk.js

```javascript
// For example
const { address, contracts } = reduxStoreData;
// tokenContract is config in ./config.js
const { tokenContract } = contracts;
if (address && tokenContract && tokenContract.GetBalance) {
    const balance = await tokenContract.GetBalance.call({
        symbol: 'ELF',
        owner: address
    });
} else {
  //...
}
```

## How to create new Page

In `app/container/root.js`, you can set bottom bar.

In `app/container/Mine/index.js`, you can set normal page and router.

You can find more information in [react-navigation](https://reactnavigation.org/);
