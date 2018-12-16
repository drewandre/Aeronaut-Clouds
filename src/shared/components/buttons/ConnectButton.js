import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

export default class ConnectButton extends Component {
    returnBackgroundColor = () => {
        switch (this.props.connectionStatus) {
            case 'Connected!':
                return styles.success
            case 'Connecting...':
                return styles.warning
            case 'Disconnected':
                return styles.error
            default:
                return styles.warning
        }
    }

    returnTextColor = () => {
        switch (this.props.connectionStatus) {
            case 'Connected!':
                return styles.successTitleColor
            case 'Connecting...':
                return styles.warningTitleColor
            case 'Disconnected':
                return styles.errorTitleColor
            default:
                return styles.warningTitleColor
        }
    }

    render() {
        let { connectionStatus } = this.props
        return (
            <TouchableOpacity
                style={[styles.container, this.returnBackgroundColor()]}
                disabled={((connectionStatus === 'Connected!') || connectionStatus === 'Connecting...')}
                onPress={this.props.pingPhoton}>
                <View style={styles.innerContainer}>
                    <Text style={[styles.title, this.returnTextColor()]}>{connectionStatus}</Text>
                    {connectionStatus === 'Disconnected' && <Text style={[styles.subTitle, this.returnTextColor()]}>Click to connect</Text>}
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    container: {
        width: '80%',
        alignSelf: 'center',
        height: 60,
        borderRadius: 8
    },
    title: {
        fontFamily: 'DINNextW01-Light',
        fontSize: 20
    },
    subTitle: {
        fontFamily: 'DINNextW01-Light',
        top: 2,
        fontSize: 15
    },
    success: {
        backgroundColor: '#00C851'
    },
    warning: {
        backgroundColor: '#ffbb33'
    },
    error: {
        backgroundColor: '#ff4444'
    },
    successTitleColor: {
        color: '#000'
    },
    warningTitleColor: {
        color: '#000'
    },
    errorTitleColor: {
        color: '#000'
    },
})
