import React, { Component } from 'react'
import { StyleSheet, Text, StatusBar } from 'react-native'

import SplashScreen from 'react-native-splash-screen'

// Redux dependencies
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { storeCurrentScreenName } from './redux/actions/navigation'
import { pingPhoton } from './redux/actions/status'

import Config from 'react-native-config'

import DropdownAlert from 'react-native-dropdownalert'

import Colors from './assets/styles/Colors'
import { scale } from './assets/styles/Fonts'

import FooterNavigator from './navigation/FooterNavigator'
import { Header } from './navigation/components'

export class App extends Component {
  constructor(props) {
    super(props)
    if (__DEV__) console.disableYellowBox = true
    let ENV_KEYS = Object.keys(Config)
    if (ENV_KEYS.length === 0) {
      console.error('Unable to ready ENV file from react-native-config')
    }
    console.log(Config)
  }

  componentDidMount() {
    this.props.actions.pingPhoton()
    SplashScreen.hide()
  }

  getActiveRouteName = navigationState => {
    if (!navigationState) return null
    const route = navigationState.routes[navigationState.index]
    if (route.routes) return this.getActiveRouteName(route)
    return route.routeName
  }

  render() {
    return (
      <>
        <StatusBar barStyle='light-content' />
        <FooterNavigator onNavigationStateChange={(previousState, currentState) => this.props.actions.storeCurrentScreenName(this.getActiveRouteName(currentState))} />
        <Header navigationState={this.props.navigationState} />
        <DropdownAlert
          renderTitle={(props, state) => (
            <Text
              style={styles.dropDownTitleStyle}
              allowFontScaling={false}>{state.title}</Text>
          )}
          renderMessage={(props, state) => (
            <Text
              style={styles.dropDownMessageStyle}
              allowFontScaling={false}>{state.message}</Text>
          )}
          inactiveStatusBarStyle='light-content'
          useNativeDriver={true}
          closeInterval={3000}
          sensitivity={1}
          ref={ref => DropDown.setDropDown(ref)}
        />
      </>
    )
  }
}

export class DropDown {
  static setDropDown(dropDown) {
    this.dropDown = dropDown
  }
  static info(title = 'Info', message) {
    this.dropDown.alertWithType('info', title, message)
  }
  static error(title = 'Error', message) {
    this.dropDown.alertWithType('error', title, message)
  }
  static warn(title = 'Warning', message) {
    this.dropDown.alertWithType('warn', title, message)
  }
  static success(title = 'Success', message) {
    this.dropDown.alertWithType('success', title, message)
  }
}

const mapStateToProps = state => ({
  meta: state.meta,
  navigationState: state.navigation,
})

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      pingPhoton,
      storeCurrentScreenName
    }, dispatch)
  }
}

const styles = StyleSheet.create({
  dropDownTitleStyle: {
    fontSize: scale(14, 20),
    color: Colors.white
  },
  dropDownMessageStyle: {
    fontSize: scale(14, 20),
    color: Colors.white
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
