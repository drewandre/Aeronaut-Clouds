import Config from 'react-native-config'
import axios from 'axios'

import PALETTES, { ANIMATIONS } from '../../shared/mock_data/mockData'

let setAnimation = index => dispatch => {
    axios(`https://api.particle.io/v1/devices/${Config.DEVICE_ID}/setAnimation/?access_token=${Config.AUTH_TOKEN}`, {
        method: 'POST',
        data: {
            'args': index.toString()
        },
    }).then(response => {
        if (response.status !== 200) throw new Error('Error setting color palette')
        dispatch(setAnimationSuccess(response.data.return_value))
        console.log('Animation changed to', ANIMATIONS[response.data.return_value])
    }).catch(error => {
        dispatch(setAnimationError())
        console.log(error)
    })
}

let setPalette = index => dispatch => {
    axios(`https://api.particle.io/v1/devices/${Config.DEVICE_ID}/setPalette/?access_token=${Config.AUTH_TOKEN}`, {
        method: 'POST',
        data: {
            'args': index.toString()
        },
    }).then(response => {
        if (response.status !== 200) throw new Error('Error setting color palette')
        dispatch(setPaletteSuccess(response.data.return_value))
        console.log('Palette changed to', PALETTES[response.data.return_value])
    }).catch(error => {
        dispatch(setPaletteError())
        console.log(error)
    })
}

let setMasterBrightness = value => dispatch => {
    axios(`https://api.particle.io/v1/devices/${Config.DEVICE_ID}/brightness/?access_token=${Config.AUTH_TOKEN}`, {
        method: 'POST',
        data: {
            'args': value.toString()
        },
    }).then(response => {
        console.log('success: ', response)
    }).catch(error => {
        console.log(error)
    })
}

let checkAndTogglePower = () => (dispatch, getState) => {
    axios({
        baseURL: 'https://api.particle.io/v1',
        url: `/devices/${Config.DEVICE_ID}/enabled`,
        headers: { 'Authorization': `Bearer ${Config.AUTH_TOKEN}` },
        timeout: 3000
    }).then(response => {
        if (response.status !== 200) throw new Error('Disconnected')
        dispatch(togglePower(!response.data.result))
    }).catch(errors => {
        console.warn('Could not get enabled status', errors)
        dispatch(getEnabledError(errors))
    })
}

let togglePower = bool => (dispatch, getState) => {
    axios(`https://api.particle.io/v1/devices/${Config.DEVICE_ID}/enable/?access_token=${Config.AUTH_TOKEN}`, {
        method: 'POST',
        data: {
            'args': bool ? 'ON' : 'OFF'
        },
    }).then(response => {
        dispatch(getEnabledSuccess(bool))
        console.log('success: ', response)
    }).catch(error => {
        console.log(error)
    })
}


let pingPhoton = () => (dispatch, getState) => {
    const transactionId = 'photon_ping_transaction_id'

    dispatch(pingPhotonBegin(transactionId))

    axios({
        baseURL: 'https://api.particle.io/v1',
        url: `/devices/${Config.DEVICE_ID}/ping`,
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${Config.AUTH_TOKEN}` },
        timeout: 3000
    }).then(response => {
        console.log(response.data)
        if (!response.data.ok) throw new Error('Disconnected')
        if (response.data.online) {
            dispatch(pingPhotonSuccess(response, transactionId))
            dispatch(getEnabled())
        } else {
            throw new Error('Disconnected')
        }
    }).catch(errors => {
        console.warn('Could not connect to cloud', errors)
        dispatch(pingPhotonError(errors, transactionId))
    })
}

let getEnabled = () => (dispatch, getState) => {
    dispatch(getEnabledBegin())

    axios({
        baseURL: 'https://api.particle.io/v1',
        url: `/devices/${Config.DEVICE_ID}/enabled`,
        headers: { 'Authorization': `Bearer ${Config.AUTH_TOKEN}` },
        timeout: 3000
    }).then(response => {
        if (response.status !== 200) throw new Error('Disconnected')
        console.log(`Clouds enabled: ${!!response.data.result}`)
        dispatch(getEnabledSuccess(!!response.data.result))
    }).catch(errors => {
        console.warn('Could not get enabled status', errors)
        dispatch(getEnabledError(errors))
    })
}

let pingPhotonBegin = () => {
    return {
        type: 'PING_PHOTON_BEGIN'
    }
}

let pingPhotonSuccess = response => {
    return {
        type: 'PING_PHOTON_SUCCESS',
        response
    }
}

let pingPhotonError = errors => {
    return {
        type: 'PING_PHOTON_ERROR',
        errors
    }
}

let getEnabledBegin = () => {
    return {
        type: 'GET_ENABLED_BEGIN'
    }
}

let getEnabledSuccess = bool => {
    return {
        type: 'GET_ENABLED_SUCCESS',
        bool
    }
}

let getEnabledError = errors => {
    return {
        type: 'GET_ENABLED_ERROR',
        errors
    }
}

let setAnimationSuccess = id => {
    return {
        type: 'SET_ANIMATION_SUCCESS',
        id
    }
}

let setAnimationError = () => {
    return {
        type: 'SET_ANIMATION_ERROR'
    }
}

let setPaletteSuccess = id => {
    return {
        type: 'SET_PALETTE_SUCCESS',
        id
    }
}

let setPaletteError = () => {
    return {
        type: 'SET_PALETTE_ERROR'
    }
}

export {
    pingPhoton,
    getEnabled,
    setMasterBrightness,
    setAnimation,
    setPalette,
    checkAndTogglePower
}
