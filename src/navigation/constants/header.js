import { isIphoneX } from '../../assets/styles/Metrics'

const Header = {
    HEADER_HEIGHT: isIphoneX() ? 140 : 120
}

export default Header