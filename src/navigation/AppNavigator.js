import { createStackNavigator } from 'react-navigation'
import FooterNavigator from './FooterNavigator'

const AppNavigator = createStackNavigator({
    Footer: {
        screen: FooterNavigator,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    }
})

export default AppNavigator