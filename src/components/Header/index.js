import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {MdWork, MdExitToApp} from 'react-icons/md'

import './index.css'

const Header = props => {
  const onClickLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div>
      <nav className="nav-bar-container">
        <Link to="/" className="nav-link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-website-logo"
          />
        </Link>
        <div className="nav-link-and-logout-btn-lg">
          <div>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </div>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogoutBtn}
          >
            Logout
          </button>
        </div>

        <ul className="header-icons-list-container">
          <Link to="/" className="nav-link">
            <li>
              <AiFillHome className="header-icons" />
            </li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li>
              <MdWork className="header-icons" />
            </li>
          </Link>
          <li>
            <button
              type="button"
              className="logout-icon-button"
              onClick={onClickLogoutBtn}
            >
              <MdExitToApp className="header-icons" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default withRouter(Header)
