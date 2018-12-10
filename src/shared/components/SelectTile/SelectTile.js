import React, { Component } from 'react'
import { StyleSheet, Text, Image, TouchableWithoutFeedback, Animated } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import ReactNativeHapticFeedback from 'react-native-haptic-feedback'
import Colors from '../../../assets/styles/Colors';

export default class SelectTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      size: new Animated.Value(0),
      name: null,
      renderColorSwatches: false,
      selected: false
    }
    this.isPalette = !!this.props.palette
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
        style={styles.innerContainer}>
      </LinearGradient>
    )
  }

  renderBackground = () => {
    return <Image source={require('../../../assets/images/bubbles.jpg')} />
  }

  navigateToPaletteDetailScreen = palette => {
    this.props.navigator.navigate('ColorPaletteDetail', {
      palette: palette
    })
  }

  setSelected = () => {
    this.setState(state => ({ enlarging: !state.enlarging }))
    this.props.setSelectedTile()
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
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.selected !== this.props.selected
  }

  render() {
    return (
      <Animated.View
        style={[
          this.props.selected && styles.selected,
          {
            ...styles.container, transform: [{
              scale: this.state.size.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.05]
              })
            }]
          }]}>
        <Text style={styles.title} numberOfLines={1}>{this.isPalette ? this.props.palette.name : this.props.animation.name}</Text>
        <TouchableWithoutFeedback onPress={this.setSelected} style={{ overflow: 'hidden' }}>
          {this.isPalette ? this.renderGradient() : this.renderBackground()}
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
    height: 80,
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    overflow: 'hidden'
  },
  innerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // overflow: 'hidden',
    borderRadius: 10,
    // padding: 10
  },
  selected: {
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  title: {
    zIndex: 1,
    position: 'absolute',
    top: 25,
    left: 35,
    color: 'rgba(255,255,255,0.95)',
    fontSize: 28,
    fontFamily: 'DINNextW01-Light',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 }
  }
})
