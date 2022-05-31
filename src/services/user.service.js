import { storageService } from './async-storage.service.js'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
import { httpService } from './http.service.js'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  updateBalance,
}

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'


window.us = userService

async function login(credentials) {

  try{
    const user = await httpService.post('auth/login', credentials)
    if (user) return saveLocalUser(user)
  }catch(err){
    console.log('cannot login', err)
  }
}
async function signup(user) {
  return httpService.post('auth/signup', user)
}
function updateBalance(diff) {
  //   const user = userService.getLoggedinUser()
  //   user.balance += diff
  //   return storageService.put(STORAGE_KEY, user).then((user) => {
  //     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
  //     return user.balance
  //   })
}
async function logout() {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, null)
    return Promise.resolve()
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
  return user
}
function addLikedSong(song) {
  if(!song)return
  const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
  if(user){
    user.likedSongs.push(song)
    httpService.put(`user/${user._id}`,user)
    return saveLocalUser(user)
  }
  return user
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