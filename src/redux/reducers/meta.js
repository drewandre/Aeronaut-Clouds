let initialState = {
    showComponent: true,
    appMounted: false
}

const meta = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_COMPONENT':
            return {
                ...state,
                showComponent: action.bool
            }
        case 'RENDER_ALL_SCREENS':
            return {
                ...state,
                appMounted: true
            }
        default:
            return state
    }
}

export default meta
