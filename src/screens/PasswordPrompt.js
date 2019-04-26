import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  TextInput,
  Text
} from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveAuthStatus } from '../redux/actions/meta'

import { ScaledSheet } from 'react-native-size-matters'
import Colors from '../assets/styles/Colors'
import { Header } from '../navigation/constants'
import { DropDown } from '../App'

class PasswordPrompt extends Component {
  state = {
    password: '',
    error: false
  }

  handleSubmit = async () => {
    if (this.state.password === 'nandu') {
      try {
        this.props.actions.saveAuthStatus(true)
      } catch (error) {
        console.warn(error)
      }
    } else {
      this.setState({error: true})
      DropDown.error('Uh oh', 'Incorrect password')
    }
  }
  render() {
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={Header.HEADER_HEIGHT * -1}
        behavior='padding'
        style={styles.container}>
        <TextInput
          keyboardAppearance='dark'
          secureTextEntry
          autoFocus
          selectionColor={Colors.white}
          returnKeyType='done'
          onSubmitEditing={this.handleSubmit}
          style={styles.textInput}
          value={this.state.password}
          onChangeText={password => this.setState({password: password, error: false})}
        />
        {this.state.error ? <Text style={styles.errorText}>Incorrect password 🥺</Text> : null}
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({
      saveAuthStatus
    }, dispatch)
  }
}

const mapStateToProps = state => ({
  meta: state.meta,
  status: state.status,
  colorPicker: state.colorPicker
})

export default connect(mapStateToProps, mapDispatchToProps)(PasswordPrompt)

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blurredBlack
  },
  textInput: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 28,
    fontFamily: 'DINNextW01-Light',
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '50%',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10
  },
  errorText: {
    color: Colors.white,
    marginVertical: 10,
    fontFamily: 'DINNextW01-Light',
    fontSize: 18
  }
})
