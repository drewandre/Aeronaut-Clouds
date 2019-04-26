import { createStackNavigator, createAppContainer } from 'react-navigation'
import FooterNavigator from './FooterNavigator'

const AppNavigator = createAppContainer(createStackNavigator({
    Footer: {
        screen: FooterNavigator,
        navigationOptions: ({ navigation }) => ({
            header: null
        })
    }
}))

export default AppNavigator