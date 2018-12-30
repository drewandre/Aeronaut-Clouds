import tinycolor from 'tinycolor2'

let initialState = {
    colorPickerVisible: false,
    favorites: [],
    color: tinycolor('#70c1b3').toHsl()
}

const colorPicker = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_COLOR':
            return {
                ...state,
                color: action.color
            }
        case 'SET_COLOR_PICKER_VISIBILITY':
            return {
                ...state,
                colorPickerVisible: action.bool
            }
        case 'ADD_TO_FAVORITES':
            if (state.favorites.includes(action.color)) return { ...state }
            return {
                ...state,
                favorites: [
                    ...state.favorites,
                    action.color
                ]
            }
        case 'DELETE_FROM_FAVORITES':
            return {
                ...state,
                favorites: state.favorites.filter(x => JSON.stringify(x) !== JSON.stringify(action.color))
            }
        default:
            return state
    }
}

export default colorPicker
