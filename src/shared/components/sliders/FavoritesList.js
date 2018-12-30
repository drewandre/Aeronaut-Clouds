import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign'

import tinycolor from 'tinycolor2'

import Swatch from './Swatch'
import Colors from '../../../assets/styles/Colors';


export class FavoritesList extends Component {
    state = {
        deleting: false
    }

    setDeleting = () => this.setState(state => ({ deleting: !state.deleting }))

    render() {
        const { swatches } = this.props

        return (
            <View style={styles.swatchesContainer}>
                <View style={styles.favoritesHeaderContainer}>
                    <Text style={styles.favoritesText}>Favorites</Text>
                    {this.state.deleting && <TouchableOpacity
                        style={styles.doneButton}
                        onPress={this.setDeleting}>
                        <Text style={styles.doneButtonText}>DONE</Text>
                    </TouchableOpacity>}
                </View>
                <FlatList
                    data={swatches}
                    horizontal={true}
                    indicatorStyle='white'
                    ref={ref => this.flatList = ref}
                    style={styles.favoritesContainer}
                    ListEmptyComponent={<TouchableOpacity
                        key={'empty_swatch_element'}
                        onPress={this.props.addToFavorites}
                        style={styles.emptySwatch}>
                        <AntDesign name='plus' color={'rgba(255, 255, 255, 0.2)'} size={20} />
                    </TouchableOpacity>}
                    // onContentSizeChange={(contentWidth, contentHeight) => this.flatList.scrollToEnd()}
                    renderItem={(item, index) => {
                        return (
                            <Swatch
                                key={`swatch_${index}`}
                                deleting={this.state.deleting}
                                setDeleting={this.setDeleting}
                                color={tinycolor(item.item).toHexString()}
                                onPress={() => this.props.onPress(item.item)}
                                deleteFromFavorites={() => this.props.deleteFromFavorites(item.item)}
                            />
                        )
                    }} />
            </View>
        )
    }
}

export default FavoritesList

const styles = StyleSheet.create({
    absolute: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    favoritesHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    favoritesText: {
        marginBottom: 10,
        fontSize: 20,
        letterSpacing: -0.08,
        fontFamily: 'DINNextW01-Light',
        color: '#fff'
    },
    doneButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        width: 70,
        height: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    doneButtonText: {
        top: 2,
        color: Colors.white,
        fontFamily: 'DINNextW01-Light',
        fontSize: 20
    },
    favoritesContainer: {
        height: 60,
        overflow: 'visible'
    },
    emptySwatch: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderRadius: 3,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: 'rgba(255, 255, 255, 0.2)'
    }
})