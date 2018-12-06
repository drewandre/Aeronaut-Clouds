import Colors from './Colors'
import { moderateScale } from './Fonts'

const base = {
  buttonWidth: '100%',
  buttonHeight: 80,

  buttonBorderRadius: 3,

  buttonHorizontalPadding: 20,
  buttonVerticalPadding: '4%',
  buttonVerticalMargin: 8,
  buttonHorizontalMargin: '5%',

  buttonTextLeftMargin: 15,
  buttonTextFontSize: moderateScale(17),

  buttonTextFontWeight: 'bold',

  screenVerticalPadding: '5%',
  screenHorizontalPadding: '5%',

  sectionSubheaderVerticalMargin: '3%',

  sectionSubheaderFontSize: moderateScale(15),
  sectionSubheaderFontWeight: 'bold',
  sectionSubheaderFontColor: Colors.mutedGrey,

  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 0 },

  largeHitSlopExtend: {
    top: 70,
    bottom: 70,
    left: 70,
    right: 70
  },
  mediumHitSlopExtend: {
    top: 50,
    bottom: 50,
    left: 50,
    right: 50
  },
  smallHitSlopExtend: {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
  },
  extraSmallHitSlopExtend: {
    top: 5,
    bottom: 5,
    left: 5,
    right: 5
  }
}

export default base
