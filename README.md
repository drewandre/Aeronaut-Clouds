This project is a [Particle Photon](https://www.particle.io/wifi/) [React Native](https://facebook.github.io/react-native/) project built by [Drew André](https://drew-andre.com/) for [Aeronaut Brewey](https://www.aeronautbrewing.com/).

## Table of Contents

* [Environment setup](#environment-setup)
* [How to install](#how-to-install)
* [Running locally](#running-locally)
* [Deploying](#deploying)
* [Changing metadata](#metadata)
* [Troubleshooting](#troubleshooting)

## Environment setup
- Download [Node](https://nodejs.org/en/) and [node package manager](https://www.npmjs.com/) (npm). **ADK Group uses npm, not yarn.**
- Download [React-native cli](react-native-cli)
- Download [Xcode 10.0.1](https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12)
- Open xcode and install the remaining tools (a dialog box will open automatically)
- Install cocoapods `sudo gem install cocoapods`
- This project uses cocoapods, so the project's _workspace_ will need to be used, rather than the `.xcodeproj` file

## How to install
- Clone the repository
- Install node dependencies
`npm install`

_Fastlane setup:_
- Install ruby-version-manager and ruby 2.3.7
`$ curl -sSL https://get.rvm.io | bash -s stable`
`$ rvm install 2.3.7`
- Install [homebrew](https://brew.sh/)
- Install [librsvg](https://github.com/GNOME/librsvg) and [imagemagick](https://www.imagemagick.org/script/command-line-processing.php) for fastlane app icon generation
`$ brew install librsvg && brew install imagemagick`
- Install fastlane
`$ [sudo] gem install fastlane -NV` (See fastlane/README.md for more fastlane installation information.)

## Running locally
- Run the app in either iOS simulator or Android emulator by running
`$ npm run install-ios-dev` or `$ npm run install-android-dev`. _-dev_ can be swapped with either _-beta_ or _-prod_, and will switch all environment variables using the included [react-native-config](https://github.com/luggit/react-native-config) library. See package.json scripts for command examples.
- Appending `-release` to the commands above _for android_ will run the android app in release mode, so javascript will be prebundled and will not rely on the metro bundler. To achieve the same pre-bundled build on iOS, navigate to the edit screen for the desired scheme in xcode
- Optionally build in xcode by running `npm run xcode`, selecting the scheme from the top left menu, and clicking the play button to the left. This will replace environment variables in the same manner as building using the CLI commands.
- Metro bundler should start automatically, but if for whatever reason you want to run it yourself, `npm start` will start the bundler and also reset the cache.
- If running on iOS on hardware rather than the simulator, check "Automatically manage signing" in the xcode project's General tab

## Deploying

This application uses [fastlane](https://fastlane.tools/) for build automation, certificate & profile management, and deployment to the iOS App Store and Google Play.

Assuming fastlane is installed (see [How to install](#how-to-install)), `fastlane ios dev` will push a new version of the app to testflight. Similarly, `fastlane ios beta` will push a new app to testflight but also distribute to external testers defined in App Store Connect. `fastlane ios release` will submit a build for App Store review and you will be notified over email if the build has completed processing. These commands work the same for Android and Google Play when `ios` is replaced with `android`.

## Metadata
- TODO: how to change metadata including app icons

## Troubleshooting
- If you are seeing only a white screen on android, run `npm run adb-reverse`. This helps metro bundler hook into the android localhost webhook.