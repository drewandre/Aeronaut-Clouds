import axios from 'axios'
import Config from 'react-native-config'

const setParticleAnimation = index => {
    axios(`https://api.particle.io/v1/devices/${Config.DEVICE_ID}/brew/?access_token=5cf68050f520a764c7c2f74505886c320dbe2c15`, {
        method: 'POST',
        data: {
            'args': index.toString()
        },
    })
        .then(response => {
            console.log('success: ', response)
        })
        .catch(error => {
            console.log(error)
        })
}

export { setParticleAnimation }