let showComponent = (bool = true) => {
    return {
        type: 'SHOW_COMPONENT',
        bool
    }
}

let renderAllScreens = () => {
    return {
        type: 'RENDER_ALL_SCREENS'
    }
}

export {
    showComponent,
    renderAllScreens
}
