import Axios from 'axios'

var axios = Axios.create({
  withCredentials: true
})

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/toy' : 'http://localhost:3030/api/toy'
const labels = [
  { name: 'On wheels', id: 1 },
  { name: 'Accessories', id: 2 },
  { name: 'Box game', id: 3 },
  { name: 'Art', id: 4 },
  { name: 'Baby', id: 5 },
  { name: 'Doll', id: 6 },
  { name: 'Puzzle', id: 7 },
  { name: 'Outdoor', id: 8 },
  { name: 'Boys', id: 9 },
  { name: 'Girls', id: 10 },
]

export const toyService = {
  query,
  getById,
  save,
  remove,
  getLabels,
  getToysCountByGender,
  getLabelsNames,
  getLabelsAvgPrice,
}

function query() {
  return axios.get(BASE_URL).then((res) => res.data)
}
function getById(toyId) {
  return axios.get(BASE_URL + `/${toyId}`).then((res) => res.data)
}
function remove(toyId) {
  return axios.delete(BASE_URL + `/${toyId}`).then((res) => res.data)
}
function save(toy) {
  if (toy._id) {
    return axios.put(BASE_URL + `/${toy._id}`, toy).then((res) => res.data)
  } else {
    console.log('hii');
    // toy.owner = userService.getLoggedinUser()
    return axios.post(BASE_URL, toy).then((res) => res.data)
  }
}

function getLabels() {
  return labels
}

function getLabelsNames() {
  return labels
    .map((label) => label.name)
    .sort((a, b) => {
      if (a.toLowerCase() > b.toLowerCase()) return 1
      if (a.toLowerCase() < b.toLowerCase()) return -1
      return 0
    })
}

function getToysCountByGender(toys) {
  const toysByGenderMap = [0, 0, 0]

  toys.forEach((toy) => {
    if (toy.labels.some((label) => label.name === 'Boys')) toysByGenderMap[0] += 1
    if (toy.labels.some((label) => label.name === 'Girls')) toysByGenderMap[1] += 1
    if (toy.labels.some((label) => label.name === 'Baby')) toysByGenderMap[2] += 1
  })

  return toysByGenderMap
}

function getLabelsAvgPrice(toys) {
  const labelByAvgPrice = {}
  toys.forEach((toy) => {
    toy.labels.forEach((label) => {
      if (labelByAvgPrice[label.name]) {
        labelByAvgPrice[label.name].count += 1
        labelByAvgPrice[label.name].priceSum += +toy.price
      } else labelByAvgPrice[label.name] = { count: 0, priceSum: +toy.price }
    })
  })
  for (const label in labelByAvgPrice) {
    labelByAvgPrice[label] = (+labelByAvgPrice[label].priceSum / +labelByAvgPrice[label].count).toFixed(2)
  }
  return Object.values(labelByAvgPrice)
}
