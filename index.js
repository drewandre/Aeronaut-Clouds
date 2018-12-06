import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  AppRegistry,
  ActivityIndicator
} from 'react-native'

import App from './src/App'

// Redux dependencies
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import optimist from 'redux-optimist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

// Redux reducers
import meta from './src/redux/reducers/meta'
import status from './src/redux/reducers/status'
import navigation from './src/redux/reducers/navigation'

import Colors from './src/assets/styles/Colors'

const ENABLE_REDUX_LOGGER = true

var reduxMiddleware = [thunk]

/* ================ WARNING ================ */
// THE FOLLOWING VARIABLES ARE EITHER
// MANAGED BY FASTLANE OR ARE ONLY USED FOR
// DEBUGGING AND STORE RESTRUCTURING PURPOSES.
const FREEZE_STORE = true // SHOULD ALWAYS BE TRUE
/* ========================================== */

if (__DEV__ && ENABLE_REDUX_LOGGER) {
  // Add Redux logger for test and development environments
  var reduxLogger = createLogger({ collapsed: true })
  // Add deep freeze to warn if state is ever mutated directly during runtime
  reduxMiddleware.push(reduxLogger)
  if (FREEZE_STORE) {
    const freeze = require('redux-freeze')
    reduxMiddleware.push(freeze)
  }
}

const rootReducer = optimist(combineReducers({
  meta,
  status,
  navigation
}))

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['status']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

var store = createStore(
  persistedReducer,
  applyMiddleware(...reduxMiddleware)
)

var persistor = persistStore(store)

class AeronautCloud extends Component {
  constructor() {
    super()
    if (__DEV__) console.disableYellowBox = true
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<View style={styles.loadingContainer}><ActivityIndicator /></View>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white
  }
})

AppRegistry.registerComponent('AeronautCloud', () => AeronautCloud)
