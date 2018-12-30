import React, { Component } from 'react'
import {
  View,
  FlatList
} from 'react-native'

import _ from 'lodash'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setAnimation } from '../redux/actions/status'

import SelectTile from '../shared/components/SelectTile/SelectTile.js'

import { ScaledSheet } from 'react-native-size-matters'
import Colors from '../assets/styles/Colors'

import { Header, Footer } from '../navigation/constants'

import { ANIMATIONS } from '../shared/mock_data/mockData'

export class Animations extends Component {
  state = {
    selectedTileId: null
  }

  setSelectedTile = (item, index) => {
    // if (item.id !== this.state.selectedTileId) {
    this.setState({ selectedTileId: item.id })
    this.props.actions.setAnimation(item.id)
    // } else {
    //   this.setState({ selectedTileId: null })
    // }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          ListHeaderComponent={<View style={{ height: Header.HEADER_HEIGHT }} />}
          ListFooterComponent={<View style={{ height: Footer.FOOTER_HEIGHT + 20 }} />}
          style={styles.scrollContainer}
          data={ANIMATIONS}
          keyExtractor={item => `animation_${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <SelectTile
                index={index}
                blur={true}
                audioReactive={item.audioReactive}
                disabled={!this.props.status.connected}
                animation={item}
                selected={this.state.selectedTileId === item.id}
                onPress={() => this.setSelectedTile(item, index)}
                key={`animation-tile:${item.name}`}
                navigator={this.props.navigator}
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
    actions: bindActionCreators({
      setAnimation
    }, dispatch)
  }
}

const mapStateToProps = state => ({
  meta: state.meta,
  status: state.status
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
