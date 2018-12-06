import React, { Component } from 'react'
import {
  View,
  FlatList
} from 'react-native'

import _ from 'lodash'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ColorPaletteTile from '../shared/components/ColorPaletteTile/ColorPaletteTile.js'

import { ScaledSheet } from 'react-native-size-matters'
import Colors from '../assets/styles/Colors'

import PALETTES from '../shared/mock_data/mockData'
import { Header, Footer } from '../navigation/constants'

export class Palettes extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={<View style={{ height: Header.HEADER_HEIGHT }} />}
          ListFooterComponent={<View style={{ height: Footer.FOOTER_HEIGHT + 20 }} />}
          style={styles.scrollContainer}
          data={PALETTES}
          keyExtractor={item => `palette_${item.id}`}
          renderItem={({ item }) => {
            return (
              <ColorPaletteTile
                palette={item}
                key={`color-palette-tile:${item.name}`}
                navigator={this.props.navigator}
                blur={false}
              />
            )
          }}
        />
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

const mapStateToProps = state => ({
  meta: state.meta
})

export default connect(mapStateToProps, mapDispatchToProps)(Palettes)

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blurredBlack
  },
  scrollContainer: {
    backgroundColor: Colors.blurredBlack
  }
})
