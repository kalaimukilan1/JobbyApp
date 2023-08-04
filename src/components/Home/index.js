import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = () => (
  <div>
    <Header />
    <div className="home-container">
      <h1 className="home-title">Find The Job That Fits Your Life</h1>
      <p className="home-description">
        Millions of people are searching for jobs,salary,information,company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs" className="find-jobs-button-link">
        <button type="button" className="find-job-button">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
