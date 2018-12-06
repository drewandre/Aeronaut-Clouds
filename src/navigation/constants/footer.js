import { isIphoneX } from '../../assets/styles/Metrics'

const Footer = {
    FOOTER_HEIGHT: isIphoneX() ? 90 : 60
}

export default Footer