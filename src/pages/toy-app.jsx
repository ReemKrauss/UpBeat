import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadToys } from '../store/actions/toy.action'
import { ToyList } from '../cmps/toy-list'
import { ToyFilter } from '../cmps/toy-filter'

class _ToyApp extends React.Component {
  getFilteredToys = () => {
    const { toys, filter } = this.props
    let filteredToys = toys

    if (filteredToys.length && filter.name) {
      const regex = new RegExp(filter.name, 'i')
      filteredToys = toys.filter((toy) => regex.test(toy.name))
    }

    if (filteredToys.length && filter.price) filteredToys = filteredToys.filter((toy) => +toy.price <= +filter.price)

    if (filteredToys.length && JSON.parse(filter.inStock)) filteredToys = filteredToys.filter((toy) => toy.inStock)

    if (filteredToys.length && filter.labels)
      filteredToys = filteredToys.filter((toy) => {
        const toyLabels = toy.labels.map((label) => label.name)
        const filterLabels = filter.labels.map((label) => label.name)

        return filterLabels.every((label) => toyLabels.includes(label))
      })

    return filteredToys
  }

  render() {
    const filteredToys = this.props.toys && this.getFilteredToys()
    return (
      <section className="toy-app-container">
        <div className="hero">
          <div className="main-layout">
            <h2>OUR TOYS</h2>
          </div>
        </div>
        <div className="toy-list-container">
          <div className="main-layout">
            <Link to="/toys/update">
              <span className="add-toy-link">Add New Toy</span>
            </Link>
            {!filteredToys && <div className="lds-hourglass"></div>}
            {filteredToys && (
              <div className="filter-and-list">
                <ToyFilter />
                <ToyList toys={filteredToys} />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

function mapStateToProps(storeState) {
  return {
    toys: storeState.toyModule.toys,
    filter: storeState.toyModule.filterBy,
  }
}
const mapDispatchToProps = {
  loadToys,
}

export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp)
