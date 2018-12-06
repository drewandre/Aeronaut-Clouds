import { createStackNavigator } from 'react-navigation'
import Palettes from '../screens/Palettes'

const PalettesStack = createStackNavigator({
    Palettes: {
        screen: Palettes,
        navigationOptions: ({ navigation }) => ({
            header: null,
            headerTitle: "Palettes"
        })
    }
})

export default PalettesStack