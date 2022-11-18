# next-aelf - a minimalistic next framework demo for AELF

This project was bootstrapped with Create Next App.

## Introduction

next-aelf is a collection of demo which allow you to set up your own aelf project in nextjs quickly and easily.\
We have 3 parts related to manage a complete project.

- Example. It will guide you how to interact with wallet, use media query, use redux for managing application state, interact with a local or remote aelf node using a HTTP connection.
- MicroApp. It will guide you how to use aelf in a micro front-end framework.
  The following documentation will guide you through installing and running next-aelf. Of course it's optional.
- Sentry. It will guide you how to add monitor in your project. Of course it's optional. If you cannot install @sentry/nextjs successfully you can use the script `SENTRYCLI_CDNURL=https://github.com/getsentry/sentry-cli/releases/download/ yarn add @sentry/nextjs`.

## How to use

In the project directory, you can run:

### `yarn`

Install dependencies.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `.next` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn start`

Start the application in production mode. The application should be compiled with `yarn build` first.
