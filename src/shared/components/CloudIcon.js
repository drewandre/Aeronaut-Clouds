import React, { Component } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

// Redux dependencies
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export class CloudIcon extends Component {
    returnBackgroundColor = () => {
        switch (this.props.status.photonConnectionStatus) {
            case 'CONNECTED':
                return 'green'
            default:
                return 'red'
        }
    }

    render() {
        return (
            <View>
                <MaterialIcon name="cloud" size={25} color={this.props.focused ? "#fff" : '#888'} />
                {
                    this.props.status.pinging
                        ? <ActivityIndicator style={styles.statusCircle} />
                        : <View style={{ ...styles.statusCircle, backgroundColor: this.returnBackgroundColor() }} />
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    status: state.status
})

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CloudIcon)

const styles = StyleSheet.create({
    statusCircle: {
        position: 'absolute',
        top: 5,
        right: 0,
        width: 10,
        height: 10,
        borderRadius: 100
    }
})
