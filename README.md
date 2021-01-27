![Node.js CI](https://github.com/Kyonru/just-a-review-app/workflows/Node.js%20CI/badge.svg)

# Retrospectives & Self-evaluations

Productivity app focused on survey reviews.


[<img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" style="float: left; padding-right: 10px;" height="88">](https://play.google.com/store/apps/details?id=com.kyonru.justareviewapp)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Follow this [guide](https://reactnative.dev/docs/environment-setup).

### Installing

```bash
cd just-a-review-app
yarn
cd ios
pod install
```

### Running Android

```bash
cd just-a-review-app
yarn start
yarn android
```

### Running iOS

```bash
cd just-a-review-app
yarn start
yarn ios
```

## Running the tests

### e2e tests

Make sure you have an emulator named: Pixel_3a_API_30_x86 or change the name on `./github/workflows/android.yml` from `Pixel_3a_API_30_x86` to your emulator name.

```bash
yarn build-detox-android
yarn test-detox-android-windows
```

([see windows versions of these commands](https://github.com/Kyonru/just-a-review-app/blob/master/package.json#L13)).

### And coding style tests

Run linter

```bash
yarn lint
```

([see windows versions of these commands](https://github.com/Kyonru/just-a-review-app/blob/master/package.json#L11))

Run unit tests

```bash
yarn test
```

### Upgrading app version

You can upgrade the app version by `patch`, `minor` and `major`.

```bash
yarn bump-patch
```

```bash
yarn bump-minor
```

```bash
yarn bump-major
```

## Built With

- [react-native 0.63.3](https://reactnative.dev/) - App built based on this crossplatform framework.
- [@react-navigation](https://reactnavigation.org/) - Used as a navigation framework.
  - [@react-navigation/drawer](https://rometools.github.io/rome/) - Used to display an drawer menu.
  - [@react-navigation/stack](https://rometools.github.io/rome/) - Used to for drawer options.
- [react-native-dotenv](https://www.npmjs.com/package/react-native-dotenv) - Envi Variable Management.
- [react-native-push-notification](https://github.com/zo0r/react-native-push-notification) - Used for local reminders and notifications.
- [redux](https://redux.js.org/) - Global state management.
  - [@reduxjs/toolkit](https://redux-toolkit.js.org/) - Used to reduce redux boilerplate.
  - [redux-logger](https://github.com/LogRocket/redux-logger) - Used only on development to inspect the redux store.
  - [redux-persist](https://github.com/rt2zz/redux-persist) - Used to persist the data.
  - [redux-thunk](https://github.com/reduxjs/redux-thunk) - Used as middleware for future api support.
  - [reselect](https://github.com/reduxjs/reselect) - Used to get data from the store.
- [react-native-paper](https://callstack.github.io/react-native-paper/) - Used as component library support.
- [typescript](https://www.typescriptlang.org/) - Used with ❤️.

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Kyonru/just-a-review-app/tags).

## Authors

- **Kyonru** - _Initial work_ - [Kyonru](https://www.twitch.tv/kyonru)

See also the list of [contributors](https://github.com/Kyonru/just-a-review-app/graphs/contributors) who participated in this project.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details

## Screenshots

<div style="display: flex; flex-direction: row;">
  <img src="https://i.imgur.com/2ghCBgO.png" alt="First Screen" width="210" height="432" />
  <img src="https://i.imgur.com/YUottHB.png" alt="Review Notification" width="210" height="432" />
  <img src="https://i.imgur.com/JOeQhy2.png" alt="Review Log" width="210" height="432" />
  <img src="https://i.imgur.com/JTMdwPu.png" alt="Review List" width="210" height="432" />
  <img src="https://i.imgur.com/saMcSc3.png" alt="Create Review" width="210" height="432" />
  <img src="https://i.imgur.com/Rl65Upb.png" alt="Review Details" width="210" height="432" />
  <img src="https://i.imgur.com/kq0B5T0.png" alt="Edit Question" width="210" height="432" />
</div>
