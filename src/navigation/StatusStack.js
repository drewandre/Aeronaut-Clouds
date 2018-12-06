import { createStackNavigator } from 'react-navigation'
import Status from '../screens/Status'

const StatusStack = createStackNavigator({
    Status: {
        screen: Status,
        navigationOptions: ({ navigation }) => ({
            header: null,
            headerTitle: "Status"
        })
    }
})

export default StatusStack