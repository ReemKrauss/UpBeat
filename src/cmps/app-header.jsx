import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'

class _AppHeader extends React.Component {
  render() {
    const { user } = this.props
    return (
      <header className="main-layout">
        <div className="logo-container">
          <h1 className="logo">
            Mister <span>Toy</span>
          </h1>
        </div>
        <div className="nav-info-container">
          <div className="info-login">
            <div className="search-container">
              <form>
                <input type="text" placeholder="Search on site..." />
              </form>
            </div>
            <div className="info">
              <span className="phone info">
                <span>PHONE:</span>+972 54-539-6842
              </span>
              <span className="email info">
                <span>EMAIL: </span>avitech1242@gmail.com
              </span>
            </div>
            <div className="login-container">
              {!user && (
                <div className="btns-container">
                  <Link to="/login">
                    <button className="btn login">LOGIN</button>
                  </Link>
                  <Link to="/signup">
                    <button className="btn sign-up">SIGN UP</button>
                  </Link>
                </div>
              )}
              {user && (
                <div className="wellcome-container">
                  <span>Wellcome {user.fullName}!</span>
                  <Link to="/signup">
                    <button className="btn sign-up">Logout</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="nav-container">
            <nav>
              <NavLink to="/" exact>
                HOME
              </NavLink>
              <NavLink to="/toys" exact>
                TOYS
              </NavLink>
              <NavLink to="/toys/boys">BOYS</NavLink>
              <NavLink to="/toys/girls">GIRLS</NavLink>
              <NavLink to="/toys/newborn">NEWBORN</NavLink>
              <NavLink to="/dashboard">DASHBOARD</NavLink>
              <NavLink to="/about">ABOUT</NavLink>
            </nav>
            <div className="cart-fav">
              <div className="cart-items">
                <div className="badge">
                  <div className="ico">
                    <svg width="20px" height="20px" viewBox="0 0 32 32">
                      <g data-name="Layer 2" id="Layer_2">
                        <path d="M23.52,29h-15a5.48,5.48,0,0,1-5.31-6.83L6.25,9.76a1,1,0,0,1,1-.76H24a1,1,0,0,1,1,.7l3.78,12.16a5.49,5.49,0,0,1-.83,4.91A5.41,5.41,0,0,1,23.52,29ZM8,11,5.11,22.65A3.5,3.5,0,0,0,8.48,27h15a3.44,3.44,0,0,0,2.79-1.42,3.5,3.5,0,0,0,.53-3.13L23.28,11Z" />
                        <path d="M20,17a1,1,0,0,1-1-1V8a3,3,0,0,0-6,0v8a1,1,0,0,1-2,0V8A5,5,0,0,1,21,8v8A1,1,0,0,1,20,17Z" />
                      </g>
                    </svg>
                  </div>
                  3
                </div>
                <span>TOTAL: $1000</span>
              </div>
              <div className="fav-items">
                <div className="badge">
                  <div className="ico">
                    <svg height="16px" width="16px" version="1.1" viewBox="0 0 512 512">
                      <g id="_x31_66_x2C__Heart_x2C__Love_x2C__Like_x2C__Twitter">
                        <g>
                          <path d="M365.4,59.628c60.56,0,109.6,49.03,109.6,109.47c0,109.47-109.6,171.8-219.06,281.271    C146.47,340.898,37,278.568,37,169.099c0-60.44,49.04-109.47,109.47-109.47c54.73,0,82.1,27.37,109.47,82.1    C283.3,86.999,310.67,59.628,365.4,59.628z" />
                        </g>
                      </g>
                      <g id="Layer_1" />
                    </svg>
                  </div>
                  <span>3</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

function mapStateToProps(storeState) {
  return {
    user: storeState.userModule.loggedUser,
  }
}

export const AppHeader = connect(mapStateToProps)(_AppHeader)
