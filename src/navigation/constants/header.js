import { isIphoneX } from '../../assets/styles/Metrics'

const Header = {
    HEADER_HEIGHT: isIphoneX() ? 145 : 120
}

export default Header