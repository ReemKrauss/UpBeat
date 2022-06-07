import { storageService } from './async-storage.service.js'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
import { httpService } from './http.service.js'
import { socketService } from './socket.service.js'
import { utilService } from './util.service.js'

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
    if (user) {
      socketService.login(user._id)
      return saveLocalUser(user, STORAGE_KEY_LOGGEDIN_USER)
    }
  } catch (err) {
    console.log('cannot login', err)
  }
}
async function signup(user) {
  return httpService.post('auth/signup', user)
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
  const guest = _createGuest()
  socketService.logout()
  socketService.login(guest.id)
  return guest
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
  const guest = { id: utilService.makeId(), fullname: 'Guest', likedSongs: [], likedPlaylists: [], imgUrl: 'https://pbs.twimg.com/profile_images/746460305396371456/4QYRblQD.jpg' }
  sessionStorage.setItem(STORAGE_KEY_GUEST, JSON.stringify(guest))
  return guest
}

function getUserPlaylists(userId) {

}
