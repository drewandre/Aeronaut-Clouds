let setColor = color => {
    return {
        type: 'SET_COLOR',
        color
    }
}

let setColorPickerVisibility = (bool = false) => {
    return {
        type: 'SET_COLOR_PICKER_VISIBILITY',
        bool
    }
}

let addToFavorites = color => {
    return {
        type: 'ADD_TO_FAVORITES',
        color
    }
}

let deleteFromFavorites = color => {
    return {
        type: 'DELETE_FROM_FAVORITES',
        color
    }
}

export {
    setColor,
    addToFavorites,
    deleteFromFavorites,
    setColorPickerVisibility
}
