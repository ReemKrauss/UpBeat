import React from 'react'
import { Formik, Field, Form } from 'formik'
import { Button, TextField } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../store/actions/user.action'

class _Login extends React.Component {
  initialValues = {
    username: '',
    password: '',
  }

  onSubmitUser =  async (user) => {
    try{
      await this.props.login(user)
      
    }catch{
      console.log('couldn\'t');
    }
    finally{
      (this.props.history.push('/'))
    }
    
  }

  render() {
    return (
      <section className="signup-container">
        <div className="hero">
          <div className="main-layout">
            <h2>Login</h2>
          </div>
        </div>
        <div className="form-container">
          <Formik validateOnChange validate={this.onValidate} initialValues={this.initialValues} onSubmit={this.onSubmitUser}>
            {({ errors }) => (
              <Form>
                <Field name="username" type="text" as={TextField} variant="outlined" label="Username" fullWidth />
                {<span className="error">{errors.username}</span>}
                <Field name="password" type="password" as={TextField} variant="outlined" label="Password" fullWidth />
                {<span className="error">{errors.password}</span>}
                <Button type="submit" variant="contained" color="primary" size="large">
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    )
  }
}

function mapStateToProps(storeState) {
  return {
    user: storeState.loggedUser,
  }
}
const mapDispatchToProps = {
  login,
}

const __Login = connect(mapStateToProps, mapDispatchToProps)(_Login)

export const Login = withRouter(__Login)
