import { Dimensions, PixelRatio } from 'react-native'
const { width, height } = Dimensions.get('window')

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350
const guidelineBaseHeight = 680

const baseScale = size => width / guidelineBaseWidth * size
const verticalScale = size => height / guidelineBaseHeight * size
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor

const scale = (size, max = 30) => {
  let fontScale = PixelRatio.getFontScale()
  let adjustedSize = baseScale(size) * fontScale
  if (adjustedSize >= max) adjustedSize = max
  return adjustedSize
}

export {scale, verticalScale, moderateScale}
