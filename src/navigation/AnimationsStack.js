import { createStackNavigator } from 'react-navigation'
import Animations from '../screens/Animations'

const AnimationsStack = createStackNavigator({
    Animations: {
        screen: Animations,
        navigationOptions: ({ navigation }) => ({
            header: null,
            headerTitle: "Animations"
        })
    }
})

export default AnimationsStack
