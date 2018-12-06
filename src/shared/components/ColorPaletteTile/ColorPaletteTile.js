import React, { Component } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { VibrancyView } from 'react-native-blur'

export default class ColorPaletteTile extends Component {
  state = {
    name: null,
    renderColorSwatches: false,
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
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 40 }}>
          <LinearGradient
            start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
            locations={positionArr}
            colors={colorArr}
            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 4 }} />
          {/* <View style={{ flex: 1, borderRadius: 30 }}>
            <LinearGradient
              start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}
              locations={positionArr}
              colors={colorArr}
              style={{ flex: 1, borderRadius: 30 }} />
          </View> */}
        </View>
        {/* {!this.props.blur ? <VibrancyView
          style={styles.absolute}
          blurType="light"
          blurAmount={10}
        /> : null} */}
      </View>
    )
  }



  navigateToPaletteDetailScreen = palette => {
    this.props.navigator.navigate('ColorPaletteDetail', {
      palette: palette
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.blurContainer}>
          <TouchableWithoutFeedback
          // ref={ref => this.previewRef = ref}
          // onPress={e => console.log('onPress', e)}
          // onPressIn={e => console.log('onPressIn', e)}
          // onPress={() => this.navigateToPaletteDetailScreen(this.props.palette)}
          >
            {this.renderGradient()}
          </TouchableWithoutFeedback>
          {/* {!this.props.blur ? <VibrancyView
            style={styles.absolute}
            blurType="dark"
            blurAmount={10}
          /> : null} */}
        </View>
      </View>
    )
  }
}

ColorPaletteTile.defaultProps = {
  blur: true
}

const styles = StyleSheet.create({
  blurContainer: {
    height: 100,
    flexDirection: 'row',
    padding: 20,
  },
  container: {
    flex: 1,
    borderRadius: 20
  },
  shadowContainer: {
    // shadowColor: '#f00',
    // shadowOffset: baseStyles.shadowOffset,
    // shadowOpacity: 1,
    // shadowRadius: 10
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // borderRadius: 4
  }
})
