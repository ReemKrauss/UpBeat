import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { toyService } from '../services/toy.service'
import { removeToy } from '../store/actions/toy.action'

class _ToyDetails extends React.Component {
  state = {
    toy: null,
    amount: 0,
  }

  componentDidMount() {
    const { toyId } = this.props.match.params
    toyService.getById(toyId).then((toy) => this.setState({ toy }))
  }

  onChangeAmount = (diff) => {
    const { amount } = this.state
    if (amount + diff < 0) return
    this.setState({ amount: amount + diff })
  }

  onRemoveToy = async (toyId) => {
    try {
      await this.props.removeToy(toyId)
    } catch (err) {
      console.log('You got error')
    } finally {
      this.props.history.push('/toys')
    }
  }

  get toyLabels() {
    return this.state.toy.labels.map((label) => label.name).join(' | ')
  }

  render() {
    const { toy, amount } = this.state
    return (
      <section className="toy-details">
        <div className="hero">
          <div className="main-layout">
            <h2>TOY DETAILS</h2>
          </div>
        </div>
        {!toy && <div className="lds-hourglass"></div>}
        {toy && (
          <section className="main-layout">
            <div className="toy-details-info">
              <div className="img-container">
                <img src={toy.thumbnail} alt="" />
              </div>
              <div className="details">
                <span>{this.toyLabels}</span>
                <h3 className="name">{toy.name}</h3>
                <div className="price-stock-status">
                  <h3 className="price">${toy.price}</h3>
                  <h4 className={toy.inStock ? 'stock Instock' : 'stock Out-Of-Stock'}>{toy.inStock ? 'Instock' : 'Out Of Stock'}</h4>
                </div>
                <p className="desc">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam nesciunt, beatae, laborum vero reiciendis sed veniam inventore, veritatis esse dolorum deserunt quae voluptate. Quas
                  aperiam suscipit nemo aliquid quam accusamus mollitia? Hic reiciendis veniam nesciunt saepe nostrum earum blanditiis perferendis officiis? Ducimus, officiis veritatis id maxime
                  possimus tenetur velit nulla.
                </p>
                <div className="item-counter">
                  <div className="minus btn" onClick={() => this.onChangeAmount(-1)}>
                    -
                  </div>
                  <div className="amount">{amount}</div>
                  <div className="plus btn" onClick={() => this.onChangeAmount(1)}>
                    +
                  </div>
                </div>
                <button className="btn add-to-cart">ADD TO CART</button>
              </div>
            </div>
            <div className="admin-tools">
              <h2>Admin options:</h2>
              <div className="btns-container">
                <button className="btn btn-delete" onClick={() => this.onRemoveToy(toy._id)}>
                  Delete
                </button>
                <Link to={`/toys/update/${toy._id}`}>
                  <button className="btn btn-edit">Edit</button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </section>
    )
  }
}

function mapStateToProps(storeState) {
  return {}
}
const mapDispatchToProps = {
  removeToy,
}

const __ToyDetails = connect(mapStateToProps, mapDispatchToProps)(_ToyDetails)

export const ToyDetails = withRouter(__ToyDetails)
