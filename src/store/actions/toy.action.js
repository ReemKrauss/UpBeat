import { toyService } from '../../services/toy.service'
export function loadToys() {
  return (dispatch) => {
    return toyService.query().then((toys) => {
      dispatch({ type: 'SET_TOYS', toys })
    })
  }
}

export function removeToy(toyId) {
  try {
    return async (dispatch) => {
      await toyService.remove(toyId)
      return  dispatch({ type: 'REMOVE_TOY', toyId })
    }
  } catch (err) {
    console.log('you got an error', err)
  }
}

export function saveToy(toy) {
  return (dispatch) => {
    return toyService.save(toy).then((toy) => {
      dispatch({ type: 'SAVE_TOY', toy })
    })
  }
}

export function setFilter(filter) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER', filter })
  }
}
