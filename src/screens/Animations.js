import React, { Component } from 'react'
import {
  View,
  FlatList
} from 'react-native'

import _ from 'lodash'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SelectTile from '../shared/components/SelectTile/SelectTile.js'

import { ScaledSheet } from 'react-native-size-matters'
import Colors from '../assets/styles/Colors'

import { Header, Footer } from '../navigation/constants'

import PALETTES from '../shared/mock_data/mockData'

export class Animations extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={<View style={{ height: Header.HEADER_HEIGHT }} />}
          ListFooterComponent={<View style={{ height: Footer.FOOTER_HEIGHT + 20 }} />}
          style={styles.scrollContainer}
          data={PALETTES}
          keyExtractor={item => `animation_${item.id}`}
          renderItem={({ item }) => {
            return (
              <SelectTile
                palette={item}
                key={`color-animation-tile:${item.name}`}
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

export default connect(mapStateToProps, mapDispatchToProps)(Animations)

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blurredBlack
  },
  scrollContainer: {
    backgroundColor: Colors.blurredBlack
  }
})
