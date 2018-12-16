import React, { Component } from 'react'
import {
  View,
  Slider
} from 'react-native'

import Config from 'react-native-config'

import axios from 'axios'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pingPhoton } from '../redux/actions/status'

import { ScaledSheet } from 'react-native-size-matters'
import Colors from '../assets/styles/Colors'

import ConnectButton from '../shared/components/buttons/ConnectButton'

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
    return (
      <View style={styles.container}>
        <View style={{ height: 150 }} />
        <ConnectButton
          connectionStatus={this.props.status.connectionStatus}
          pingPhoton={this.props.actions.pingPhoton}
        />
        <Slider
          step={1}
          maximumValue={255}
          style={styles.brightnessSlider}
          onSlidingComplete={value => this.setMasterBrightness(value)}
        />
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
    backgroundColor: Colors.blurredBlack
  }
})
