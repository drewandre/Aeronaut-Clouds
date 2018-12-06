import { Dimensions, Platform, NativeModules } from 'react-native'

const { StatusBarManager } = NativeModules
const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT

const headerHeight = Platform.OS === 'ios' ? 44 : 64
const headerHeightWithStatusBar = headerHeight + statusBarHeight
const footerHeight = Platform.OS === 'ios' ? 64 : 54
const contentTop = statusBarHeight + headerHeight

const { width, height } = Dimensions.get('window')
const screenWidth = width < height ? width : height
const screenHeight = width < height ? height : width
const contentHeight = screenHeight - contentTop - footerHeight

const isIphoneX = () => {
  return Platform.OS === 'ios' && (screenHeight >= 812 || screenWidth >= 812)
}

// Used via Metrics.baseMargin
const Metrics = {
  headerHeightWithStatusBar: headerHeightWithStatusBar,
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: screenWidth,
  screenHeight: screenHeight,
  statusBarHeight: statusBarHeight,
  headerHeight: headerHeight,
  footerHeight: footerHeight,
  contentTop: contentTop,
  contentHeight: contentHeight,
  safeAreaTop: 56,
  safeAreaBottom: 34,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
}

export { isIphoneX }
export default Metrics
