import React, { Component } from 'react'
import {
  View,
  Text,
  Slider,
  TouchableOpacity
} from 'react-native'

import Config from 'react-native-config'

import Communications from 'react-native-communications'

import axios from 'axios'

import IonIcon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pingPhoton } from '../redux/actions/status'

import { ScaledSheet } from 'react-native-size-matters'
import Metrics from '../assets/styles/Metrics'
import Colors from '../assets/styles/Colors'

import { Header, Footer } from '../navigation/constants'

import ConnectButton from '../shared/components/buttons/ConnectButton'
import AutoHeightImage from 'react-native-auto-height-image'


export class Status extends Component {
  setMasterBrightness = value => {
    axios({
      baseURL: 'https://api.particle.io/v1',
      url: `/devices/${Config.DEVICE_ID}/brightness`,
      data: {
        'arg': value.toString()
      },
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Config.AUTH_TOKEN}`
      },
      timeout: 10000
    }).then(response => {
      console.log('success!', response)
    }).catch(errors => {
      console.log('error', errors)
    })
  }

  render() {
    const disabled = !this.props.status.connected
    return (
      <View style={styles.container}>
        <View style={styles.controlContainer}>
          <View style={{ height: Header.HEADER_HEIGHT }} />
          <View style={styles.brightnessContainer}>
            <Slider
              step={1}
              disabled={disabled}
              value={this.props.status.brightness}
              maximumValue={255}
              style={styles.brightnessSlider}
              onSlidingComplete={value => this.setMasterBrightness(value)}
            />
            <IonIcon name='ios-sunny' color={!disabled ? Colors.white : Colors.iOSdisabled} size={35} />
          </View>
          <Text style={styles.brightnessText}>Master Brightness</Text>
        </View>
        <View style={styles.signatureContainer}>
          <AutoHeightImage
            style={styles.signaturePhoto}
            source={require('../assets/images/signature.png')}
            width={Metrics.screenWidth * 0.75}
          />
          <View style={styles.nameContainer}>
            <TouchableOpacity onPress={() => Communications.web(Config.PORTFOLIO_URL)}>
              <MaterialCommunityIcon name='web' color={Colors.white} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Communications.web(Config.INSTAGRAM_URL)}>
              <Icon name='instagram' color={Colors.white} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Communications.email([Config.EMAIL_ADDRESS], null, null, 'Aeronaut Clouds', null)}>
              <FeatherIcon name='mail' color={Colors.white} size={30} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Communications.text(Config.PHONE_NUMBER)}>
              <MaterialIcon name='textsms' color={Colors.white} size={30} />
            </TouchableOpacity>
          </View>
          <View style={{ height: Footer.FOOTER_HEIGHT }} />
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      pingPhoton
    }, dispatch)
  }
}

const mapStateToProps = state => ({
  meta: state.meta,
  status: state.status
})

export default connect(mapStateToProps, mapDispatchToProps)(Status)

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: Colors.blurredBlack,
    paddingHorizontal: 20
  },
  controlContainer: {
    marginTop: 20
  },
  brightnessContainer: {
    alignSelf: 'center',
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brightnessSlider: {
    width: '80%'
  },
  signatureContainer: {
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },
  signatureText: {
    fontFamily: 'DINNextW01-Light',
    fontSize: 20,
    color: Colors.white,
    textAlign: 'center'
  },
  brightnessText: {
    fontFamily: 'DINNextW01-Light',
    fontSize: 20,
    marginVertical: 10,
    color: Colors.white,
    textAlign: 'center'
  },
  signaturePhoto: {
    alignSelf: 'center'
  },
  nameContainer: {
    width: '65%',
    marginVertical: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
})
