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
        case 'SET_BRIGHTNESS':
            return {
                ...state,
                brightness: action.value
            }
        case 'SET_ANIMATION_SUCCESS':
            return {
                ...state,
                animation: action.id
            }
        case 'SET_ANIMATION_ERROR':
            return { ...state }
        case 'SET_PALETTE_SUCCESS':
            return {
                ...state,
                palette: action.id
            }
        case 'SET_PALETTE_ERROR':
            return { ...state }
        case 'SET_ENABLED':
            return {
                ...state,
                enabled: action.bool
            }
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
        case 'GET_ENABLED_BEGIN':
            return {
                ...state,
                enabled: false
            }
        case 'GET_ENABLED_SUCCESS':
            return {
                ...state,
                enabled: action.bool
            }
        case 'GET_ENABLED_ERROR':
            return {
                ...state,
                enabled: false
            }
        default:
            return state
    }
}

export default status
