import { SET_SHOW_ONLY_FAVOURITES } from '../actions'

const DEFAULT_CONFIG_STATE = {
    showOnlyFavourites: true
}

export default function config(state = DEFAULT_CONFIG_STATE, action) {

    switch (action.type) {
        case SET_SHOW_ONLY_FAVOURITES:
            return {
                ...state,
                showOnlyFavourites: action.payload
            };

        default:
            return state;
    }
}