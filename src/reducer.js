export const initialState = {
    user: null,
    playlists: [],
    spotify: null,
    top_50_global: null,
    top_artists: null,
    playing: false,
    item: null,
    token: null,
};

const reducer = (state,action) =>{
//action => type, [payload]
    switch(action.type){
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            };
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists
            };
        case 'SET_TOP_50_GLOBAL':
                return {
                    ...state,
                    top_50_global: action.top_50_global
                };
        case "SET_PLAYING":
                return {
                    ...state,
                    playing: action.playing,
                };
        case "SET_ITEM":
                return {
                    ...state,
                    item: action.item,
                };
      case "SET_TOP_ARTISTS":
                return {
                    ...state,
                    top_artists: action.top_artists,
                };
      case "SET_SPOTIFY":
                return {
                    ...state,
                    spotify: action.spotify,
                };
        default:
            return state;
    }

}

export default reducer;