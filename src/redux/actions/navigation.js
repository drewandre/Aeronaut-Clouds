const STORE_CURRENT_SCREEN_NAME = 'STORE_CURRENT_SCREEN_NAME'

export {
    STORE_CURRENT_SCREEN_NAME
}

let storeCurrentScreenName = name => {
    return {
        type: STORE_CURRENT_SCREEN_NAME,
        name
    }
}

export {
    storeCurrentScreenName
}
