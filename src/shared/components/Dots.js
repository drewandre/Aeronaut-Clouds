import React from 'react'
import { View, StyleSheet } from 'react-native'

const Dot = (props) => {
  return <View style={styles.dotContainer} />
}

const ActiveDot = (props) => {
  return <View style={styles.activeDotContainer} />
}

const styles = (props) => StyleSheet.create({
    dotContainer: {
        backgroundColor: '#f00',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    activeDotContainer: {
        backgroundColor: '#0f0',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    }
})

export {
    Dot,
    ActiveDot
}