# next-aelf - a minimalistic next framework demo for AELF

This project was bootstrapped with Create Next App.

## Introduction

next-aelf is a collection of demo which allow you to set up your own aelf project in nextjs quickly and easily.\
We have 3 parts related to manage a complete project.

- Example. It will guide you how to interact with wallet, use media query, use redux for managing application state, interact with a local or remote aelf node using a HTTP connection.
- MicroApp. It will guide you how to use aelf in a micro front-end framework.
  The following documentation will guide you through installing and running next-aelf. Of course it's optional.
- Monitor. It will guide you how to add monitor in your project. Of course it's optional.

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

## Monitor

### Sentry

Features:

- Automatic Error Tracking with source maps for both JavaScript and TypeScript
- Events enriched with device data
- Breadcrumbs created for outgoing HTTP request with XHR and Fetch, and console logs
- Release health for tracking crash-free users and sessions
- Automatic Performance Monitoring for both the client and server, from version 6.5.0

#### Install

If you cannot install @sentry/nextjs successfully maybe because of network error and you can use the script `SENTRYCLI_CDNURL=https://github.com/getsentry/sentry-cli/releases/download/ yarn add @sentry/nextjs`.

#### Rewrite your own config files

- Two files in the root directory of your project, **sentry.client.config.js** and **sentry.server.config.js**.\
  In these files, add your initialization code for the client-side SDK and server-side SDK. See more options detail [here](https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/)

- Use **withSentryConfig** to extend the default Next.js usage of Webpack. The file is in `web/next-aelf/build/plugin.js`.\
  This will do two things:

  - Automatically call the code in sentry.server.config.js and sentry.client.config.js, at server start up and client page load, respectively. Using withSentryConfig is the only way to guarantee that the SDK is initialized early enough to catch all errors and start performance monitoring.
  - Generate and upload source maps to Sentry, so that your stacktraces contain original, demangled code.

- Configure Source Maps. If you want to upload sourcemap to sentry, you need to set the productionBrowserSourceMaps option to true in `web/next-aelf/build/common.js`. If you want to hidden sourcemap, add a sentry object to moduleExports above, and set the hideSourceMaps option to true in `web/next-aelf/build/common.js`.

- Configure sentry-cli. The SentryWebpackPlugin uses sentry-cli to manage releases and source maps. The URL, organization, and project properties identify your organization and project, and the auth tokenIn search, a key-value pair or raw search term. Also, a value used for authorization. authenticates your user account. You need change your own info in the root directory of your project, **.sentryclirc**

### Firebase

Firebase helps you understand how people use your web, Apple, or Android app. At the heart of Firebase is Google Analytics which is an app measurement solution, available at no charge, that provides insight on app usage and user engagement. See more detail [here](https://firebase.google.com/docs/analytics/)

#### Install

The engine "node" expected version ">= 14.20.0".

#### Rewrite your own config files

Initialize Firebase in your app and create a Firebase App object in `web/next-aelf/src/utils/firebase.ts`.

#### Start logging events

After you have initialized the Analytics service, you can begin to log events with the logEvent() method. We show a situationdemonstrates how to log a recommended event to indicate a user has click a button in your app in `web/next-aelf/src/page-components/Monitor/index.tsx`.\

When uing React 18, if you want to gather PageView or UserView data through `useEffect` hook. Take care of that when project's mode is strict, `useEffect` hook is triggered twice just in development mode and only once in production mode.

## Guide

### Codespaces

Features:

- Can spin up Codespaces from any device with internet access.
- Codespaces starts instantly from any repository on GitHub with pre-configured, secure environments.
- Can code, develop models, and collaborate in powerful compute environments that spin up in seconds.
- Fix bugs and secure code right from an issue.

#### Creating your codespace

- Creating your codespace. Navigate to the `https://github.com/AElfProject/aelf-boilerplate` repository.
- Click `Code`, then select `Codespaces`, then click `+`button(Create a codespace on dev).

#### Running the application

Once your codespace is created, the repository will be automatically cloned into it. Now you can run the application and launch it in a browser.

- When the terminal becomes available, enter the command `yarn & yarn dev`. This command runs the script labeled "dev" in the package.json file, which starts up the web application defined in the sample repository.
- When your application starts, the codespace recognizes the port the application is running on and displays a prompt to let you know it has been forwarded.
- Click Open in Browser to view your running application in a new tab.

### AELF chain node

We provide two chains which allow you to interact with a remote aelf node. You can load a wallet, get a system contract address, or get a contract instance by contract address etc.

- MainChain Aelf: https://explorer-test.aelf.io/
- SideChain Aelf: https://explorer-test-side02.aelf.io/
