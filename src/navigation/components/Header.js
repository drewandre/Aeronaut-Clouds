import React from 'react'
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import { BlurView } from 'react-native-blur'

import Colors from '../../assets/styles/Colors'

import { Header as HeaderConfig } from '../constants'
import AutoHeightImage from 'react-native-auto-height-image'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

const LOGO = require('../../assets/images/aeronaut-logo-white.png')

const Header = navigation => {
    return (
        <SafeAreaView style={styles.container}>
            <BlurView
                style={styles.absolute}
                blurType="dark"
                blurAmount={20}
            />
            <View style={styles.headerTitleContainer}>
                <AutoHeightImage source={LOGO} width={200} />
                <Text style={styles.headerSubtitle}>{navigation.navigationState.currentScreenName}</Text>
            </View>
            <TouchableOpacity onPress={() => console.log('power icon pressed')}>
                <MaterialIcon name='power-settings-new' color={Colors.white} size={40} style={styles.powerIcon} color={'#5DC691'} />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HeaderConfig.HEADER_HEIGHT,
        backgroundColor: Colors.transparent,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    absolute: {
        backgroundColor: Colors.transparent,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    headerTitleContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingTop: 20
    },
    headerTitle: {
        fontSize: 20,
        color: Colors.white
    },
    headerSubtitle: {
        paddingVertical: 10,
        fontFamily: 'DINNextW01-Light',
        fontSize: 24,
        color: Colors.white
    },
    powerIcon: {
        shadowColor: '#5DC691',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        marginRight: 20,
        marginTop: 15
    }
})

export default Header