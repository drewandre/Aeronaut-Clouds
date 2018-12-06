const SHOW_COMPONENT = 'SHOW_COMPONENT'
const RENDER_ALL_SCREENS = 'RENDER_ALL_SCREENS'

export {
    SHOW_COMPONENT,
    RENDER_ALL_SCREENS
}

let showComponent = (bool = true) => {
    return {
        type: SHOW_COMPONENT,
        bool
    }
}

let renderAllScreens = () => {
    return {
        type: RENDER_ALL_SCREENS
    }
}

export {
    showComponent,
    renderAllScreens
}
