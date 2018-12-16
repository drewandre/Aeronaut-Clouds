let initialState = {
    currentScreenName: ''
}

const navigation = (state = initialState, action) => {
    switch (action.type) {
        case 'STORE_CURRENT_SCREEN_NAME':
            return {
                ...state,
                currentScreenName: action.name
            }
        default:
            return state
    }
}

export default navigation
