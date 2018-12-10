import React, { Component } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { VibrancyView } from 'react-native-blur'
import Colors from '../../../assets/styles/Colors'

import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export default class SelectTile extends Component {
  constructor() {
    super()
    this.state = {
      size: new Animated.Value(0),
      name: null,
      renderColorSwatches: false,
      selected: false
    }
    this.enlarging = true
  }

  renderGradient = () => {
    let colorArr = []
    let positionArr = []
    const { data } = this.props.palette
    data.forEach((i, index) => {
      if ((index % 4 === 0) && (index + 4 !== data.length - 1)) {
        positionArr.push(data[index] / 255)
        colorArr.push(`rgb(${data[index + 1]}, ${data[index + 2]}, ${data[index + 3]})`)
      }
    })
    return (
      <LinearGradient
        start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
        locations={positionArr}
        colors={colorArr}
        style={[styles.innerContainer, this.props.selected && styles.selected]} />
    )
  }



  navigateToPaletteDetailScreen = palette => {
    this.props.navigator.navigate('ColorPaletteDetail', {
      palette: palette
    })
  }

  setSelected = () => {
    this.setState(state => ({ enlarging: !state.enlarging }))
    this.props.setSelectedTile()
    // this.animateSelection()
  }

  animateSelection = () => {
    let { size, enlarging } = this.state
    Animated.spring(
      size,
      {
        toValue: enlarging ? 0 : 1,
        friction: 10,
        tension: 200,
        useNativeDriver: true
      }
    ).start()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (this.props.selected !== prevProps.selected) {
    //   this.setState(state => ({ enlarging: !state.enlarging }))
    //   this.animateSelection()
    // }
    // console.log('i updated!')
    if (!prevProps.selected && this.props.selected) ReactNativeHapticFeedback.trigger('impactMedium', true);
    Animated.spring(
      this.state.size,
      {
        toValue: this.props.selected ? 1 : 0,
        friction: 10,
        tension: 200,
        useNativeDriver: true
      }
    ).start()
    // }
    // animateSelection = () => {
    //   Animated.spring(
    //     size,
    //     {
    //       toValue: 1,
    //       friction: 10,
    //       tension: 200,
    //       useNativeDriver: true
    //     }
    //   ).start()
    // }

  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.selected !== this.props.selected
  }

  render() {
    return (
      <Animated.View
        style={{
          ...styles.container, transform: [{
            scale: this.state.size.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.05]
            })
          }]
        }}>
        <TouchableWithoutFeedback onPress={this.setSelected}>
          {this.renderGradient()}
        </TouchableWithoutFeedback>
      </Animated.View >
    )
  }
}

SelectTile.defaultProps = {
  blur: true
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderRadius: 20
  },
  innerContainer: {
    position: 'absolute',
    marginHorizontal: 20,
    marginVertical: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8
  },
  selected: {
    borderWidth: 2,
    borderColor: 'lightblue'
  }
})
