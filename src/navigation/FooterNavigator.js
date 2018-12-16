import React from 'react'
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native'

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import { BlurView } from 'react-native-blur'

import { createBottomTabNavigator } from 'react-navigation-tabs'

import AnimationsStack from './AnimationsStack'
import PalettesStack from './PalettesStack'
import StatusStack from './StatusStack'

import CloudIcon from '../shared/components/CloudIcon'

import Colors from '../assets/styles/Colors'
import { Footer } from './constants';

const FooterTabNavigator = (props) => {
  let currentRouteName = props.navigation.state.routes[props.navigation.state.index].key
  return (
    <SafeAreaView style={styles.container}>
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={20}
      />
      <TouchableOpacity
        activeOpacity={1}
        hitSlop={{
          top: 20,
          bottom: 50,
          left: 50,
          right: 50
        }}
        onPress={() => props.navigation.navigate('Animations')}>
        <View style={styles.iconContainer}>
          {currentRouteName === 'Animations'
            ? <MaterialIcon name="play-circle" size={25} color="#fff" />
            : <MaterialIcon name="play-circle" size={25} color="#aaa" />}
          <Text style={currentRouteName === 'Animations' ? styles.iconTextFocused : styles.iconText}>Animations</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        hitSlop={{
          top: 20,
          bottom: 50,
          left: 50,
          right: 50
        }}
        onPress={() => props.navigation.navigate('Palettes')}>
        <View style={styles.iconContainer}>
          {currentRouteName === 'Palettes'
            ? <MaterialIcon name="palette" size={25} color="#fff" />
            : <MaterialIcon name="palette" size={25} color="#aaa" />}
          <Text style={currentRouteName === 'Palettes' ? styles.iconTextFocused : styles.iconText}>Palettes</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        hitSlop={{
          top: 20,
          bottom: 50,
          left: 50,
          right: 50
        }}
        onPress={() => props.navigation.navigate('Status')}>
        <View style={styles.iconContainer}>
          <CloudIcon focused={currentRouteName === 'Status'} />
          <Text style={currentRouteName === 'Status' ? styles.iconTextFocused : styles.iconText}>Status</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView >
  )
}

const FooterNavigator = createBottomTabNavigator(
  {
    Animations: { screen: AnimationsStack },
    Palettes: { screen: PalettesStack },
    Status: { screen: StatusStack }
  },
  {
    tabBarComponent: props => <FooterTabNavigator {...props} />,
    initialRouteName: 'Animations'
  }
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    height: Footer.FOOTER_HEIGHT,
    bottom: 0,
    left: 0,
    right: 0
  },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  iconContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconText: {
    fontFamily: 'DINNextW01-Light',
    fontSize: 14,
    color: '#888'
  },
  iconTextFocused: {
    fontFamily: 'DINNextW01-Light',
    fontSize: 14,
    color: Colors.white
  }
})

export default FooterNavigator
