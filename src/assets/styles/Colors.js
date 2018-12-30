import { Platform } from 'react-native'

const Colors = {
  statusBar: Platform.OS === 'ios' ? '#F6F6F7' : '#6A1379',
  topBar: Platform.OS === 'ios' ? '#F6F6F7' : '#6A1379',
  black: '#000',
  navBar: '#FAFAFA',
  adkRed: '#DA554B',
  favoritesFilePurple: '#693C9E',
  favoritesLinkGreen: '#5BBCB4',
  darkBlue: '#122B3D',
  darkerBlue: '#173E71',
  lightBlue: '#3666A2',
  lighterBlue: '#6bbaf0',
  limbFillColor: '#10325C',
  torsoFillColor: '#173E71',
  mutedGrey: '#9DA3B2',
  lightGrey: '#D5D8DE',
  backgroundGrey: '#F3F5F8',
  defaultGreyBackground: '#E9E9EE',
  white: '#fff',
  transparent: 'rgba(0,0,0,0)',
  blueSlightTransparent: 'rgba(107, 186, 240, 0.3)',
  transparent_65: 'rgba(0,0,0,0.65)',
  transparent_65__red: 'rgba(255,0,0,0.65)',
  whiteSlightTransparent: 'rgba(255,255,255,0.8)',
  blackSlightTransparent: 'rgba(0,0,0,0.1)',
  shareCTAOrange: '#E1A439',
  addButtonGreen: '#70B650',
  postHeaderReactionBackground: '#F2F4F5',
  postHeaderReactionTextColor: '#9CA9B3',
  blurredBlack: '#171717',
  iOSdisabled: '#8b8b8b'
}

export default Colors
