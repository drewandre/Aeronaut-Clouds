import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    SafeAreaView,
    View,
    Modal,
    TouchableOpacity
} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { BlurView } from 'react-native-blur'

import FavoritesList from './FavoritesList'

import tinycolor from 'tinycolor2'
import {
    HueSlider,
    SaturationSlider,
    LightnessSlider
} from 'react-native-color'

import Metrics from '../../../assets/styles/Metrics'
import Colors from '../../../assets/styles/Colors'
import base from '../../../assets/styles/base'

export class SlidersColorPicker extends Component {
    updateHue = h => this.props.setColor({ ...this.props.color, h })
    updateSaturation = s => this.props.setColor({ ...this.props.color, s })
    updateLightness = l => this.props.setColor({ ...this.props.color, l })

    addToFavorites = () => {
        //     if (this.props.swatches.includes(this.props.color)) {
        //         this.props.deleteFromFavorites(this.props.color)
        //     } else {
        this.props.addToFavorites(this.props.color)
        //     }
    }

    render() {
        const {
            visible,
            swatches,
            addToFavorites,
            onCancel
        } = this.props

        const colorHex = tinycolor(this.props.color).toHexString()

        const favorited = this.props.swatches.includes(this.props.color)

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onCancel}>
                <BlurView
                    style={styles.absolute}
                    blurType="dark"
                    blurAmount={50}
                />
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity
                            disabled={false}
                            hitSlop={base.mediumHitSlopExtend}
                            style={styles.headerButton}
                            onPress={() => this.props.onCancel()}>
                            <Entypo name='chevron-thin-down' color={Colors.white} size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={false}
                            hitSlop={base.mediumHitSlopExtend}
                            style={styles.headerButton}
                            onPress={() => addToFavorites(this.props.color)}>
                            {favorited
                                ? <FontAwesome name='star' color={Colors.white} size={30} />
                                : <FontAwesome name='star-o' color={Colors.white} size={30} />}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.cloudContainer}>
                            <AntDesign name='cloudo' color={colorHex} size={Metrics.screenWidth * 0.8} style={{
                                ...styles.cloud,
                                shadowColor: colorHex,
                                shadowOpacity: 1,
                                shadowRadius: 20,
                                shadowOffset: { width: 0, height: 0 },
                            }} />
                            <Text style={[styles.colorStringText, { color: colorHex }]}>{colorHex}</Text>
                        </View>
                        <View>
                            <HueSlider
                                style={styles.sliderRow}
                                gradientSteps={100}
                                value={this.props.color.h}
                                onValueChange={this.updateHue}
                            />
                            <SaturationSlider
                                style={styles.sliderRow}
                                gradientSteps={20}
                                value={this.props.color.s}
                                color={this.props.color}
                                onValueChange={this.updateSaturation}
                            />
                            <LightnessSlider
                                style={[styles.sliderRow, { marginBottom: 0 }]}
                                gradientSteps={20}
                                value={this.props.color.l}
                                color={this.props.color}
                                onValueChange={this.updateLightness}
                            />
                        </View>
                        <FavoritesList
                            swatches={swatches}
                            addToFavorites={() => this.props.addToFavorites(this.props.color)}
                            deleteFromFavorites={color => this.props.deleteFromFavorites(color)}
                            onPress={color => this.props.setColor(color)} />
                    </View>
                </SafeAreaView>
            </Modal >
        )
    }
}

export default SlidersColorPicker

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 35,
        marginVertical: 20,
    },
    headerButton: {
        color: '#fff',
        fontSize: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        marginHorizontal: 20
    },
    cloud: {
        top: -5,
        alignSelf: 'center'
    },
    modesRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    mode: {
        paddingHorizontal: 6,
        marginRight: 16
    },
    modeActive: {
        backgroundColor: '#fff',
        borderRadius: 3
    },
    modeText: {
        fontSize: 13,
        letterSpacing: -0.08,
        color: '#fff',
        fontFamily: 'DINNextW01-Light'
    },
    modeTextActive: {
        color: '#000',
        fontFamily: 'DINNextW01-Light'
    },
    sliderRow: {
        marginBottom: 16
    },
    cloudContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    colorStringText: {
        position: 'absolute',
        fontSize: 30,
        color: '#fff',
        fontFamily: 'DINNextW01-Light',
        letterSpacing: 0.75
    },
    favoritesText: {
        fontSize: 20,
        letterSpacing: -0.08,
        fontFamily: 'DINNextW01-Light',
        color: '#fff'
    },
    favoritesContainer: {
        flexDirection: 'column'
    },
    swatchesContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    swatch: {
        flex: 1,
        aspectRatio: 1,
        maxHeight: 100,
        maxWidth: 100,
        borderRadius: 3
    }
})