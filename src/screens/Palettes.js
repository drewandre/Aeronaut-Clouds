import React, { Component } from 'react'
import {
  View,
  FlatList,
} from 'react-native'

import { SlidersColorPicker } from '../shared/components/sliders/SlidersColorPicker'

import _ from 'lodash'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setPalette } from '../redux/actions/status'
import {
  setColorPickerVisibility,
  addToFavorites,
  deleteFromFavorites,
  setColor
} from '../redux/actions/colorPicker'

import SelectTile from '../shared/components/SelectTile/SelectTile.js'

import { ScaledSheet } from 'react-native-size-matters'
import Colors from '../assets/styles/Colors'

import PALETTES from '../shared/mock_data/mockData'
import { Header, Footer } from '../navigation/constants'
import Metrics from '../assets/styles/Metrics';
import mockData from '../shared/mock_data/mockData';
export class Palettes extends Component {
  state = {
    selectedTileId: null
  }

  setSelectedTile = palette => {
    this.setState({ selectedTileId: palette.id })
    this.props.actions.setPalette(palette.id)
  }

  render() {

    console.log('PALETTES.length', PALETTES.length)
    return (
      <View style={styles.container}>
        <FlatList
          // ListHeaderComponent={<View style={{ height: Header.HEADER_HEIGHT }} />}
          // ListFooterComponent={<View style={{ height: Footer.FOOTER_HEIGHT + 20 }} />}
          style={styles.scrollContainer}
          indicatorStyle='white'
          contentContainerStyle={styles.contentContainerStyle}
          data={PALETTES}
          keyExtractor={item => `palette_${item.id}`}
          renderItem={({ item, index }) => {
            if (!item.isColorPicker) {
              return (
                <SelectTile
                  index={index}
                  disabled={!this.props.status.connected}
                  blur={false}
                  palette={item}
                  selected={this.state.selectedTileId === item.id}
                  onPress={() => this.setSelectedTile(item)}
                  key={`color-palette-tile:${item.name}`}
                  navigator={this.props.navigator}
                />
              )
            } else {
              return <SelectTile
                index={index}
                blur={false}
                isColorPicker={true}
                selected={this.state.selectedTileId === 99}
                favorites={this.props.colorPicker.favorites}
                color={this.props.colorPicker.color}
                key={'color-picker-tile'}
                navigator={this.props.navigator}
                onPress={() => {
                  this.setSelectedTile({ id: 99 })
                  this.props.actions.setColorPickerVisibility(true)
                }}
              />
            }
          }}
        />
        <SlidersColorPicker
          visible={this.props.colorPicker.colorPickerVisible}
          swatches={this.props.colorPicker.favorites}
          addToFavorites={this.props.actions.addToFavorites}
          deleteFromFavorites={this.props.actions.deleteFromFavorites}
          setColor={color => this.props.actions.setColor(color)}
          color={this.props.colorPicker.color}
          returnMode={'hex'}
          onCancel={() => this.props.actions.setColorPickerVisibility(false)}
          onColorChange={colorHex => {
            console.log('received color: ', colorHex)
            this.setState({
              color: colorHex
            })
          }}
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      setColor,
      setPalette,
      addToFavorites,
      deleteFromFavorites,
      setColorPickerVisibility
    }, dispatch)
  }
}

const mapStateToProps = state => ({
  meta: state.meta,
  status: state.status,
  colorPicker: state.colorPicker
})

export default connect(mapStateToProps, mapDispatchToProps)(Palettes)

const styles = ScaledSheet.create({
  container: {
    top: Header.HEADER_HEIGHT,
    height: Metrics.screenHeight - Footer.FOOTER_HEIGHT - Header.HEADER_HEIGHT,
    backgroundColor: Colors.blurredBlack
  },
  contentContainerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: PALETTES.length * 100,
    backgroundColor: Colors.blurredBlack
  }
})
