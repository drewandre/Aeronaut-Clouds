let initialState = {
    photonConnectionStatus: 'CONNECTED',
    pinging: true
}

const status = (state = initialState, action) => {
    switch (action.type) {
        case 'PING_PHOTON_BEGIN':
            return {
                ...state,
                pinging: true
            }
        case 'PING_PHOTON_SUCCESS':
            return {
                ...state,
                photonConnectionStatus: 'CONNECTED',
                pinging: false
            }
        case 'PING_PHOTON_ERROR':
            return {
                ...state,
                photonConnectionStatus: action.reponse,
                pinging: false
            }
        default:
            return state
    }
}

export default status
