import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Multiselect from 'multiselect-react-dropdown'
import { toyService } from '../services/toy.service'
import { setFilter } from '../store/actions/toy.action'

class _ToyFilter extends React.Component {
  state = {
    filterBy: {
      name: '',
      price: '',
      inStock: false,
      labels: [],
    },
  }

  componentDidMount() {
    const queryStringParams = new URLSearchParams(this.props.location.search)
    this.setState(
      {
        filterBy: {
          name: queryStringParams.get('name') || '',
          price: queryStringParams.get('price') || '',
          inStock: queryStringParams.get('inStock') || false,
          labels: JSON.parse(queryStringParams.get('labels')) || [],
        },
      },
      () => this.props.setFilter(this.state.filterBy)
    )
  }

  handleChange = (ev) => {
    const field = ev.target.name
    const value = field === 'inStock' ? ev.target.checked : ev.target.value
    this.setState({ filterBy: { ...this.state.filterBy, [field]: value } }, this.setFilter)
  }

  onChangeLabels = (labels) => {
    this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, labels } }), this.setFilter)
  }

  setFilter = () => {
    this.props.setFilter(this.state.filterBy)
    const { name, price, labels, inStock } = this.state.filterBy
    const queryStringParam = `?name=${name}&price=${price}&inStock=${inStock}&labels=${JSON.stringify(labels)}`
    this.props.history.push(`/toys${queryStringParam}`)
  }

  render() {
    const { name, price, labels, inStock } = this.state.filterBy
    return (
      <div className="filter_container">
        <h2>Filter</h2>
        <form>
          <label>
            Toy name:
            <input onChange={this.handleChange} name="name" value={name} type="text" placeholder="Enter search keywords.." />
          </label>
          <label className="checkbox-container">
            <input onChange={this.handleChange} type="checkbox" name="inStock" checked={JSON.parse(inStock)} />
            In stock
          </label>
          <label>
            Labels:
            <Multiselect selectedValues={labels} name="labels" displayValue="name" onSelect={this.onChangeLabels} onRemove={this.onChangeLabels} options={toyService.getLabels()} />
          </label>
          <label>
            Max price:
            <input onChange={this.handleChange} type="number" name="price" value={price} placeholder="Enter your badget.." />
          </label>
        </form>
      </div>
    )
  }
}

function mapStateToProps(storeState) {
  return {}
}
const mapDispatchToProps = {
  setFilter,
}

const __ToyFilter = connect(mapStateToProps, mapDispatchToProps)(_ToyFilter)

export const ToyFilter = withRouter(__ToyFilter)
