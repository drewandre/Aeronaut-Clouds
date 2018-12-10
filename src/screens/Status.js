import React, { Component } from 'react'
import {
  View,
  Slider
} from 'react-native'

import Config from 'react-native-config'

import axios from 'axios'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ScaledSheet } from 'react-native-size-matters'
import Colors from '../assets/styles/Colors'

console.log(Config)

export class Status extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: 'red', height: 150 }} />
        <Slider
          step={1}
          maximumValue={255}
          onSlidingComplete={value => {
            axios({
              baseURL: 'https://api.particle.io/v1',
              url: `/devices/${Config.DEVICE_ID}/setRed`,
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
              debugger
              console.log('error', errors)
            })
          }}
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

const mapStateToProps = state => ({
  meta: state.meta
})

export default connect(mapStateToProps, mapDispatchToProps)(Status)

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blurredBlack
  }
})
