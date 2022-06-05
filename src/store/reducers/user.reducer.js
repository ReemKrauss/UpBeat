import { userService } from "../../services/user.service";


const initialState = {
    user: userService.getLoggedinUser(),
}
export function userReducer(state = initialState, action) {
    let newState = state;
    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;
        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break;
        case 'TOGGLE_LIKE':
            newState = {...state, user: {...newState.user, likedSongs : action.likedSongs}}
            break
        default:
    }
    // For debug:
    // window.userState = newState;
    // console.log('State:', newState);
    return newState;

}
