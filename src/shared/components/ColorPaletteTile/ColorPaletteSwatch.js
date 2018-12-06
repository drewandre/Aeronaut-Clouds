import React from 'react'
import { View, StyleSheet } from 'react-native'

export default ColorPaletteSwatch = (props) => {
  return (
    <View style={!props.horizontal ? styles(props).container : styles(props).horizontalContainer} />
  )
}

ColorPaletteSwatch.defaultProps = {
  horizontal: false
}

const styles = (props) => StyleSheet.create({
  container: {
    backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
    width: `${props.width}%`,
  },
  horizontalContainer: {
    backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
    height: `${props.width}%`,
  }
})