import React from 'react'
import { connect } from 'react-redux'
import Multiselect from 'multiselect-react-dropdown'
import { withRouter } from 'react-router-dom'
import { saveToy } from '../store/actions/toy.action'
import { toyService } from '../services/toy.service'
import { Formik } from 'formik'

class _ToyUpdate extends React.Component {
  state = {
    updatedToy: {
      name: '',
      price: '',
      thumbnail: '',
      inStock: true,
      labels: [],
    },
  }

  componentDidMount() {
    const { toyId } = this.props.match.params
    if (toyId) {
      toyService.getById(toyId).then((toy) => {
        this.setState({
          updatedToy: toy,
        })
      })
    }
  }

  handleChange = (ev) => {
    const value = ev.target.value
    const field = ev.target.name
    this.setState({
      updatedToy: { ...this.state.updatedToy, [field]: value },
    })
  }

  onChangeLabels = (labels) => {
    this.setState((prevState) => ({ updatedToy: { ...prevState.updatedToy, labels } }))
  }

  onUpdateToy = (ev) => {
    ev.preventDefault()
    this.props.saveToy(this.state.updatedToy).then(() => {
      if (this.state.updatedToy._id) this.props.history.push(`/toys/${this.state.updatedToy._id}`)
      else this.props.history.push(`/toys`)
    })
  }

  render() {
    const { name, price, thumbnail, labels } = this.state.updatedToy
    return (
      <section className="toy-update">
        <div className="hero">
          <div className="main-layout">
            <h2>{this.state.updatedToy._id ? 'UPDATE TOY' : 'ADD TOY'}</h2>
          </div>
        </div>
        <div className="toy-update-container">
          <form onSubmit={this.onUpdateToy}>
            <label>
              Name:
              <input onChange={this.handleChange} value={name} name="name" type="text" placeholder="Toy name" />
            </label>
            <label>
              Price:
              <input onChange={this.handleChange} value={price} name="price" type="text" placeholder="Toy price" />
            </label>
            <label>
              Thumbnail:
              <input onChange={this.handleChange} value={thumbnail} name="thumbnail" type="text" placeholder="Photo link..." />
            </label>
            <label>
              Labels:
              <Multiselect selectedValues={labels} name="labels" displayValue="name" onSelect={this.onChangeLabels} onRemove={this.onChangeLabels} options={toyService.getLabels()} />
            </label>
            <button className="btn btn-update" onClick={this.onUpdateToy}>
              {this.state.updatedToy._id ? 'Update' : 'Add'}
            </button>
          </form>
        </div>
      </section>
    )
  }
}

function mapStateToProps(storeState) {
  return {}
}
const mapDispatchToProps = {
  saveToy,
}

const __ToyUpdate = connect(mapStateToProps, mapDispatchToProps)(_ToyUpdate)

export const ToyUpdate = withRouter(__ToyUpdate)
