import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Animated
} from 'react-native'

import { VibrancyView } from 'react-native-blur'

import LinearGradient from 'react-native-linear-gradient'

import ReactNativeHapticFeedback from 'react-native-haptic-feedback'

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import tinycolor from 'tinycolor2'
import Metrics from '../../../assets/styles/Metrics';

export default class SelectTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      size: new Animated.Value(0),
      name: null,
      selected: false
    }
    this.isPalette = !!this.props.palette
    this.isAnimation = !!this.props.animation
    this.isColorPicker = !!this.props.isColorPicker
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
        style={[styles.innerContainer, this.props.selected && styles.selected]}>
      </LinearGradient>
    )
  }

  renderColor = () => {
    return (
      <View
        style={[
          styles.innerContainer,
          { backgroundColor: tinycolor(this.props.color).toHexString() },
          this.props.selected && styles.selected]}
      />
    )
  }

  // renderBackground = () => {
  //   switch (this.props.animation.name) {
  //     case 'Ball Drop':
  //       return <Image
  //         source={require('../../../assets/images/bubbles.jpg')}
  //         style={[styles.innerContainer, this.props.selected && styles.selected]} />
  //     case 'Splatter':
  //       return <Image
  //         source={require('../../../assets/images/splatter.jpg')}
  //         style={[styles.innerContainer, this.props.selected && styles.selected]} />
  //     default:
  //       return <View style={[styles.innerContainer, styles.defaultBackground]} />

  //   }
  // }

  renderBackground = () => {
    <View
      style={[
        styles.innerContainer,
        this.props.selected && styles.selected]}
    />
  }

  navigateToPaletteDetailScreen = palette => {
    this.props.navigator.navigate('ColorPaletteDetail', {
      palette: palette
    })
  }

  onPress = () => {
    this.setState(state => ({ enlarging: !state.enlarging }))
    this.props.onPress()
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

  returnFavoritesStrip = () => {
    return <View style={styles.favoritesStripContainer}>
      {this.props.favorites.map((favorite, index) => {
        return <View key={`favorite_strip_color_${index}`} style={{ height: 5, flex: 1, backgroundColor: tinycolor(favorite).toHexString() }} />
      })}
    </View>
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.selected !== this.props.selected ||
      nextProps.disabled !== this.props.disabled ||
      nextProps.color !== this.props.color ||
      nextProps.favorites !== this.props.favorites
    )
  }

  render() {
    return (
      <Animated.View
        style={[
          {
            ...styles.container,
            transform: [{
              scale: this.state.size.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.05]
              })
            }]
          }]}>
        <TouchableWithoutFeedback
          onPress={this.onPress}
          style={{ overflow: 'hidden' }}
          disabled={this.props.disabled}>
          <View style={styles.innerTouchable}>
            {this.isPalette ? this.renderGradient() : this.isAnimation ? this.renderBackground() : this.isColorPicker && this.renderColor()}
            <Text style={styles.title} numberOfLines={1}>{this.isPalette ? this.props.palette.name : this.isAnimation ? this.props.animation.name : 'Custom'}</Text>
            {!this.isPalette && !this.isAnimation && <Text style={styles.title} numberOfLines={1}>{tinycolor(this.props.color).toHexString()}</Text>}
            {!this.isPalette && !this.isAnimation && this.returnFavoritesStrip()}
            {this.props.audioReactive && <MaterialIcon name="music-note" size={25} style={styles.title} />}
            {this.props.blur && <VibrancyView
              style={styles.absolute}
              blurType="light"
              blurAmount={5}
            />}
          </View>
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
    width: Metrics.screenWidth * 0.9,
    maxWidth: 700,
    alignSelf: 'center',
    borderRadius: 8,
    marginHorizontal: '5%',
    marginVertical: 10,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.01)'
  },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  innerTouchable: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  favoritesStripContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row'
  },
  innerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8
  },
  selected: {
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)'
  },
  title: {
    zIndex: 1,
    top: 2,
    color: 'rgba(255,255,255,0.9)',
    fontSize: 28,
    fontFamily: 'DINNextW01-Light',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 }
  },
  defaultBackground: {
    backgroundColor: '#202020'
  }
})
