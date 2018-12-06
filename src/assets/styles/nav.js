import { isIphoneX } from './Metrics'
import Colors from './Colors'
import { verticalScale } from 'react-native-size-matters'

const defaultHeaderStyle = {
  borderBottomWidth: 0,
  borderBottomColor: Colors.transparent,
  backgroundColor: Colors.black,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: 150
}

const defaultHeaderTitleStyle = {
  color: Colors.white
}

const defaultFooterStyle = {
  backgroundColor: Colors.transparent,
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: isIphoneX() ? '11%' : verticalScale(55)
}


export {
  defaultHeaderStyle,
  defaultHeaderTitleStyle,
  defaultFooterStyle
}
