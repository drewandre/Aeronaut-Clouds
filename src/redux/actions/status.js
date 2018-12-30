import Config from 'react-native-config'
import axios from 'axios'

import PALETTES, { ANIMATIONS } from '../../shared/mock_data/mockData'
import { DropDown } from '../../App';

// GET
let getMasterBrightness = () => dispatch => {
    dispatch(setMasterBrightnessBegin())
    axios(`https://api.particle.io/v1/devices/${Config.DEVICE_ID}/brightness/?access_token=${Config.AUTH_TOKEN}`, {
        timeout: 10000
    }).then(response => {
        if (response.status !== 200) throw new Error('Error getting master brightness')
        dispatch(setMasterBrightnessSuccess(response.data.result))
        console.log('Master brightness set to', response.data.result)
    }).catch(error => {
        dispatch(setMasterBrightnessError(error))
        console.warn('Could not get master brightness', error)
    })
}

let getAnimation = () => dispatch => {
    dispatch(setAnimationBegin())
    axios(`https://api.particle.io/v1/devices/${Config.DEVICE_ID}/animation/?access_token=${Config.AUTH_TOKEN}`, {
        timeout: 10000
    }).then(response => {
        if (response.status !== 200) throw new Error('Error getting animation')
        dispatch(setAnimationSuccess(response.data.result))
        console.log('Animation set to', response.data.result)
    }).catch(error => {
        dispatch(setAnimationError(error))
        console.warn('Could not get animation', error)
    })
}

let getPalette = () => dispatch => {
    dispatch(setPaletteBegin())
    axios(`https://api.particle.io/v1/devices/${Config.DEVICE_ID}/paletteNum/?access_token=${Config.AUTH_TOKEN}`, {
        timeout: 10000
    }).then(response => {
        if (response.status !== 200) throw new Error('Error getting palette')
        dispatch(setPaletteSuccess(response.data.result))
        console.log('Palette set to', response.data.result)
    }).catch(error => {
        dispatch(setPaletteError(error))
        console.warn('Could not get palette', error)
    })
}

let getEnabled = () => (dispatch, getState) => {
    dispatch(setEnabledBegin())
    axios({
        baseURL: 'https://api.particle.io/v1',
        url: `/devices/${Config.DEVICE_ID}/enabled`,
        headers: { 'Authorization': `Bearer ${Config.AUTH_TOKEN}` },
        timeout: 10000
    }).then(response => {
        if (response.status !== 200) throw new Error('Disconnected')
        console.log(`Clouds enabled: ${!!response.data.result}`)
        dispatch(setEnabledSuccess(!!response.data.result))
    }).catch(errors => {
        dispatch(setEnabledError(errors))
        console.warn('Could not get enabled status', errors)
    })
}

let checkAndTogglePower = () => (dispatch, getState) => {
    axios({
        baseURL: 'https://api.particle.io/v1',
        url: `/devices/${Config.DEVICE_ID}/enabled`,
        headers: { 'Authorization': `Bearer ${Config.AUTH_TOKEN}` },
        timeout: 10000
    }).then(response => {
        if (response.status !== 200) throw new Error('Disconnected')
        dispatch(togglePower(!response.data.result))
    }).catch(errors => {
        dispatch(setEnabledError(errors))
        console.warn('Could not get enabled status', errors)
    })
}

// POST
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
        dispatch(setAnimationError(error))
        console.warn('Could not set animation', error)
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
        dispatch(setPaletteError(error))
        console.warn('Could not get palette', error)
    })
}

let setMasterBrightness = value => dispatch => {
    axios(`https://api.particle.io/v1/devices/${Config.DEVICE_ID}/brightness/?access_token=${Config.AUTH_TOKEN}`, {
        method: 'POST',
        data: { 'args': value.toString() }
    }).then(response => {
        console.log('Set master brightness', response)
    }).catch(error => {
        console.warn('Could not set master brightness', error)
    })
}

let togglePower = bool => (dispatch, getState) => {
    axios(`https://api.particle.io/v1/devices/${Config.DEVICE_ID}/enable/?access_token=${Config.AUTH_TOKEN}`, {
        method: 'POST',
        data: { 'args': bool ? 'ON' : 'OFF' }
    }).then(response => {
        dispatch(setEnabledSuccess(bool))
        console.log('Toggled power', response)
    }).catch(error => {
        console.warn('Could not toggle power', error)
    })
}

// PUT
let pingPhoton = () => (dispatch, getState) => {
    dispatch(pingPhotonBegin())
    axios({
        baseURL: 'https://api.particle.io/v1',
        url: `/devices/${Config.DEVICE_ID}/ping`,
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${Config.AUTH_TOKEN}` },
        timeout: 10000
    }).then(response => {
        console.log('Pinged photon', response.data)
        if (!response.data.ok) throw new Error('Disconnected')
        if (response.data.online) {
            dispatch(pingPhotonSuccess(response))
            dispatch(getEnabled())
        } else {
            throw new Error('Disconnected')
        }
    }).catch(errors => {
        console.warn('Could not connect to cloud', errors)
        dispatch(pingPhotonError(errors))
    })
}

let setMasterBrightnessBegin = () => {
    return {
        type: 'SET_BRIGHTNESS_BEGIN'
    }
}

let setMasterBrightnessSuccess = value => {
    return {
        type: 'SET_BRIGHTNESS_SUCCESS',
        value
    }
}

let setMasterBrightnessError = () => {
    return {
        type: 'SET_BRIGHTNESS_ERROR'
    }
}

let setPaletteBegin = () => {
    return {
        type: 'SET_PALETTE_BEGIN'
    }
}

let setPaletteSuccess = value => {
    return {
        type: 'SET_PALETTE_SUCCESS',
        value
    }
}

let setPaletteError = () => {
    return {
        type: 'SET_PALETTE_ERROR'
    }
}

let setAnimationBegin = () => {
    return {
        type: 'SET_ANIMATION_BEGIN'
    }
}

let setAnimationSuccess = value => {
    return {
        type: 'SET_ANIMATION_SUCCESS',
        value
    }
}

let setAnimationError = () => {
    return {
        type: 'SET_ANIMATION_ERROR'
    }
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

let setEnabledBegin = () => {
    return {
        type: 'SET_ENABLED_BEGIN'
    }
}

let setEnabledSuccess = bool => {
    return {
        type: 'SET_ENABLED_SUCCESS',
        bool
    }
}

let setEnabledError = errors => {
    return {
        type: 'SET_ENABLED_ERROR',
        errors
    }
}

export {
    pingPhoton,
    getEnabled,
    getAnimation,
    getPalette,
    getMasterBrightness,
    setAnimationSuccess,
    setPaletteSuccess,
    setMasterBrightness,
    setMasterBrightnessSuccess,
    setAnimation,
    setPalette,
    checkAndTogglePower
}
