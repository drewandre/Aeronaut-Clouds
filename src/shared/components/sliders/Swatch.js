import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Colors from '../../../assets/styles/Colors';

export class Swatch extends Component {
    handlePress = () => {
        if (this.props.deleting) {
            this.props.deleteFromFavorites()
        } else {
            this.props.onPress()
        }
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.handlePress}
                onLongPress={this.props.setDeleting}>
                <View style={[styles.swatch, { backgroundColor: this.props.color }]}>
                    {this.props.deleting && <FontAwesome name='trash' color='#000' size={25} />}
                </View>
            </TouchableOpacity>
        )
    }
}

export default Swatch

const styles = StyleSheet.create({
    swatch: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        height: 50,
        width: 50,
        borderRadius: 3
    }
})