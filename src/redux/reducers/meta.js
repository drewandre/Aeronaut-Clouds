let initialState = {
    authenticated: false
}

const meta = (state = initialState, action) => {
    switch (action.type) {
        case 'SAVE_AUTH_STATUS':
            return {
                ...state,
                authenticated: action.bool
            }
        default:
            return state
    }
}

export default meta
