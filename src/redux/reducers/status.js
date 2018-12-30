let initialState = {
    photonConnectionStatus: null,
    pinging: true,
    connected: false,
    connectionStatus: 'Disconnected',
    enabled: false,
    brightness: 0,
    animation: 0,
    palette: 0,
    enabled: false
}

const status = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ENABLED_BEGIN':
            return {
                ...state,
                enabled: false
            }
        case 'SET_ENABLED_SUCCESS':
            return {
                ...state,
                enabled: action.bool
            }
        case 'SET_ENABLED_ERROR':
            return {
                ...state,
                enabled: false
            }
        case 'SET_BRIGHTNESS_BEGIN':
            return {
                ...state,
                brightness: -1
            }
        case 'SET_BRIGHTNESS_SUCCESS':
            return {
                ...state,
                brightness: action.value
            }
        case 'SET_BRIGHTNESS_ERROR':
            return {
                ...state,
                brightness: -1
            }
        case 'SET_ANIMATION_BEGIN':
            return {
                ...state,
                animation: -1
            }
        case 'SET_ANIMATION_SUCCESS':
            return {
                ...state,
                animation: action.value
            }
        case 'SET_ANIMATION_ERROR':
            return { ...state }
        case 'SET_PALETTE_BEGIN':
            return {
                ...state,
                palette: -1
            }
        case 'SET_PALETTE_SUCCESS':
            return {
                ...state,
                palette: action.value
            }
        case 'SET_PALETTE_ERROR':
            return { ...state }
        case 'PING_PHOTON_BEGIN':
            return {
                ...state,
                photonConnectionStatus: null,
                pinging: true,
                connected: false,
                connectionStatus: 'Connecting...'
            }
        case 'PING_PHOTON_SUCCESS':
            return {
                ...state,
                photonConnectionStatus: 'CONNECTED',
                pinging: false,
                connected: true,
                connectionStatus: 'Connected!'
            }
        case 'PING_PHOTON_ERROR':
            return {
                ...state,
                photonConnectionStatus: action.errors.message,
                pinging: false,
                connected: false,
                connectionStatus: 'Disconnected'
            }
        default:
            return state
    }
}

export default status
