import React, { Component } from 'react'
import {
  View
} from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ScaledSheet } from 'react-native-size-matters'
import Colors from '../assets/styles/Colors'

export class Status extends Component {
  render() {
    return (
      <View style={styles.container} />
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
