import React, { Component } from 'react'
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Switch,
} from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { checkAndTogglePower } from '../../redux/actions/status'

import { BlurView } from 'react-native-blur'

import AutoHeightImage from 'react-native-auto-height-image'
import { Header as HeaderConfig } from '../constants'

import Colors from '../../assets/styles/Colors'

const LOGO = require('../../assets/images/aeronaut-logo-white.png')

class Header extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <BlurView
                    style={styles.absolute}
                    blurType="dark"
                    blurAmount={20}
                />
                <View style={styles.headerTitleContainer}>
                    <AutoHeightImage source={LOGO} width={200} />
                    <Text style={styles.headerSubtitle}>{this.props.navigationState.currentScreenName}</Text>
                </View>
                <Switch
                    style={styles.powerIcon}
                    onValueChange={this.props.actions.checkAndTogglePower}
                    value={this.props.status.enabled}
                    disabled={!this.props.status.connected} />
            </SafeAreaView>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
            checkAndTogglePower
        }, dispatch)
    }
}

const mapStateToProps = state => ({
    meta: state.meta,
    status: state.status
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)


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
        marginRight: 20,
        marginTop: 20
    }
})