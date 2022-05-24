import { userService } from '../../services/user.service'
export function login(user) {
  return (dispatch) => {
    return userService.login(user).then((user) => {
      dispatch({ type: 'SET_USER', user })
    })
  }
}
