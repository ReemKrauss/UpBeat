import { storageService } from './async-storage.service.js'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
import { httpService } from './http.service.js'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  toggleLike,
  getLikedSongsPlaylist
}

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_GUEST = 'guest'


window.us = userService

async function login(credentials) {

  try {
    const user = await httpService.post('auth/login', credentials)
    if (user) return saveLocalUser(user, STORAGE_KEY_LOGGEDIN_USER)
  } catch (err) {
    console.log('cannot login', err)
  }
}
async function signup(user) {
  console.log(user)
  return httpService.post('auth/signup', user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  return _createGuest()
}

function getLoggedinUser() { // check logged in user key
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)) || JSON.parse(sessionStorage.getItem(STORAGE_KEY_GUEST)) || _createGuest()
}

function saveLocalUser(user, userType) { //can get which key to save as argument
  sessionStorage.setItem(userType, JSON.stringify(user))
  return user
}
async function toggleLike(value, field) {
  value = { ...value }
  if (field === 'likedSongs')value.addedAt = Date.now()
  const entity = getLoggedinUser() || JSON.parse(sessionStorage.getItem(STORAGE_KEY_GUEST))
  const valueIdx = entity[field].findIndex((currvalue) => {
    if (currvalue.id) return currvalue.id === value.id  
    if (currvalue._id) return currvalue._id === value._id
  })
  console.log(valueIdx)
  if (valueIdx === -1) entity[field].unshift(value)
  else entity[field].splice(valueIdx, 1)
  if (entity._id) {
    httpService.put(`user/${entity._id}`, entity)
    return saveLocalUser(entity, STORAGE_KEY_LOGGEDIN_USER)
  }
  return saveLocalUser(entity, STORAGE_KEY_GUEST)
}

function getLikedSongsPlaylist() {
  const user = getLoggedinUser() || JSON.parse(sessionStorage.getItem(STORAGE_KEY_GUEST))
  return {
    name: 'Liked Songs',
    imgUrl: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
    createdBy: {
      fullname: user.fullname,
      _id: user._id || ''
    },
    songs: user.likedSongs,
    _id: 'liked'
  }
}


function _createGuest() {
  const guest = { fullname: 'Guest', likedSongs: [], likedPlaylists: [], imgUrl: 'https://pbs.twimg.com/profile_images/746460305396371456/4QYRblQD.jpg' }
  sessionStorage.setItem(STORAGE_KEY_GUEST, JSON.stringify(guest))
  return guest
}

function getUserPlaylists(userId) {

}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja', balance: 10000})
// userService.login({username: 'muki', password: 'muki1'})






// const STORAGE_KEY = 'userDB'
// const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'


// export const userService = {
//     login,
//     logout,
//     signup,
//     getLoggedinUser,
//     saveLocalUser,
//     getUsers,
//     getById,
//     remove,
//     update
// }

// window.us = userService

// function getUsers() {
//     // return storageService.query('user')
//     return httpService.get(`user`)
// }

// async function getById(userId) {
//     // const user = await storageService.get('user', userId)
//     const user = await httpService.get(`user/${userId}`)
//     // gWatchedUser = user;
//     return user;
// }
// function remove(userId) {
//     // return storageService.remove('user', userId)
//     return httpService.delete(`user/${userId}`)
// }

// async function update(user) {
//     // await storageService.put('user', user)
//     user = await httpService.put(`user/${user._id}`, user)
//     // Handle case in which admin updates other user's details
//     if (getLoggedinUser()._id === user._id) saveLocalUser(user)
//     return user;
// }

// async function login(userCred) {
//     // const users = await storageService.query('user')
//     // const user = users.find(user => user.username === userCred.username)
//     // return saveLocalUser(user)
//     const user = await httpService.post('auth/login', userCred)
//     if (user) {
//         socketService.login(user._id)
//         return saveLocalUser(user)
//     }
// }

// async function signup(userCred) {
//   // userCred.score = 10000;
//   // const user = await storageService.post('user', userCred)
//   const user = await httpService.post('auth/signup', userCred)
//   socketService.login(user._id)
//   return saveLocalUser(user)
// }
// async function logout() {
//   sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
//   socketService.logout()
//   console.log('logged out')
//   return await httpService.post('auth/logout')
// }

// function saveLocalUser(user) {
//   sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
//   return user
// }

// function getLoggedinUser() {
//   return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
// } 