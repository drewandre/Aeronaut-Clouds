import Config from 'react-native-config'
import axios from 'axios'

import {
    BEGIN,
    COMMIT,
    REVERT
} from 'redux-optimist'

import { DropDown } from '../../App'

let pingPhoton = () => (dispatch, getState) => {
    const transactionId = 'photon_ping_transaction_id'

    dispatch(pingPhotonBegin(transactionId))

    axios({
        baseURL: 'https://api.particle.io/v1',
        url: `/devices/${Config.DEVICE_ID}/ping`,
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${Config.AUTH_TOKEN}`
        },
        timeout: 3000
    }).then(response => {
        console.log(response.data)
        if (!response.data.ok) throw new Error('Error pinging Photon')
        if (response.data.online) {
            // DropDown.success('Connected!', 'Connected to Aeronaut Cloud')
            dispatch(pingPhotonSuccess(response, transactionId))
        } else {
            throw new Error('Photon not online')
        }
    }).catch(errors => {
        // DropDown.error('Uh oh!', 'Could not connect to cloud')
        console.warn('Could not connect to cloud', errors)
        dispatch(pingPhotonError(errors, transactionId))
    })
}

let pingPhotonBegin = transactionId => {
    return {
        type: 'PING_PHOTON_BEGIN',
        optimist: { type: BEGIN, id: transactionId }
    }
}

let pingPhotonSuccess = (response, transactionId) => {
    return {
        type: 'PING_PHOTON_SUCCESS',
        response,
        optimist: { type: COMMIT, id: transactionId }
    }
}

let pingPhotonError = (errors, transactionId) => {
    return {
        type: 'PING_PHOTON_ERROR',
        errors,
        optimist: { type: REVERT, id: transactionId }
    }
}

export {
    pingPhoton
}
