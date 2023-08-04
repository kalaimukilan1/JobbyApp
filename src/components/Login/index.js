import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', isSubmitError: false, errorMsg: ''}

  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  submitSuccess = jwtToken => {
    const {history} = this.props

    this.setState({isSubmitError: false})
    Cookies.set('jwt_token', jwtToken, {expires: 2})
    history.replace('/')
  }

  onClickSubmitBtn = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const usernameDetail = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(usernameDetail),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.setState({isSubmitError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {isSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-website-logo"
          />
          <form onSubmit={this.onClickSubmitBtn}>
            <div>
              <label htmlFor="username" className="input-label">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="login-input"
                placeholder="Username"
                onChange={this.onChangeUsername}
              />
            </div>

            <div>
              <label htmlFor="Password" className="input-label">
                PASSWORD
              </label>
              <input
                type="password"
                id="Password"
                className="login-input"
                placeholder="Password"
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {isSubmitError ? <p className="error-msg">*{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
