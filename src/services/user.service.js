import { storageService } from './async-storage.service.js'
import Axios from 'axios'

var axios = Axios.create({
  withCredentials: true
})

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/user' : 'http://localhost:3030/api/user'

export const userService = {
  login,
  logout,
  signup,
  getLoggedinUser,
  updateBalance,
}

window.us = userService

function login(credentials) {
  return axios.post('http://localhost:3030/api/auth/login', credentials).then((res) => res.data)
}
function signup(user) {
  return axios.post('http://localhost:3030/api/auth/signup', user).then((res) => res.data)
}
function updateBalance(diff) {
  //   const user = userService.getLoggedinUser()
  //   user.balance += diff
  //   return storageService.put(STORAGE_KEY, user).then((user) => {
  //     sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
  //     return user.balance
  //   })
}
function logout() {
  //   sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
  //   return Promise.resolve()
}

function getLoggedinUser() {
  return axios.get(BASE_URL)
}

// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja', balance: 10000})
// userService.login({username: 'muki', password: 'muki1'})
