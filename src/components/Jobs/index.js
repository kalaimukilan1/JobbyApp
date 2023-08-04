import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import JobItem from '../JobItem'
import Failure from '../Failure'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstant = {
  inProgress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const profileApiStatusConstant = {
  success: 'SUCCESS',
  inProgress: 'PROGRESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileDetail: '',
    profileApiStatus: profileApiStatusConstant.inProgress,
    jobDetails: [],
    employmentId: [],
    salaryRange: '',
    searchInput: '',
    apiStatus: apiStatusConstant.inProgress,
  }

  componentDidMount() {
    this.getJobDetail()
    this.getProfileDetail()
  }

  getJobDetail = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {salaryRange, searchInput, employmentId} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentId}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const jobsData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetails: jobsData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  getProfileDetail = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const dataObj = data.profile_details

      const updatedData = {
        name: dataObj.name,
        profileImageUrl: dataObj.profile_image_url,
        shortBio: dataObj.short_bio,
      }
      this.setState({
        profileDetail: updatedData,
        profileApiStatus: profileApiStatusConstant.success,
      })
    } else {
      this.setState({profileApiStatus: profileApiStatusConstant.failure})
    }
  }

  renderProfileDetail = () => {
    const {profileDetail} = this.state
    const {name, shortBio, profileImageUrl} = profileDetail
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  onClickEmploymentType = event => {
    const {employmentId} = this.state

    if (employmentId.includes(event.target.id) === false) {
      this.setState(
        prevState => ({
          employmentId: [...prevState.employmentId, event.target.id],
        }),
        this.getJobDetail,
      )
    }
  }

  onClickSalaryRange = event => {
    this.setState({salaryRange: event.target.id}, this.getJobDetail)
  }

  renderEmployeeTypes = employment => (
    <li key={employment.employmentTypeId} className="employment-type-list">
      <input
        type="checkbox"
        id={employment.employmentTypeId}
        className="employment-type-checkbox"
        onClick={this.onClickEmploymentType}
      />
      <label
        htmlFor={employment.employmentTypeId}
        value={employment.employmentTypeId}
        className="employment-type-label"
      >
        {employment.label}
      </label>
    </li>
  )

  renderSalaryRange = salary => (
    <li key={salary.salaryRangeId} className="salary-range-list">
      <input
        type="radio"
        id={salary.salaryRangeId}
        className="salary-range-input"
        onClick={this.onClickSalaryRange}
      />
      <label htmlFor={salary.salaryRangeId} className="salary-label">
        {salary.label}
      </label>
    </li>
  )

  onClickProfileRetry = () => {
    this.getProfileDetail()
  }

  profileFailureView = () => (
    <div className="profile-failure-container">
      <button
        type="button"
        onClick={this.onClickProfileRetry}
        className="failure-retry-button"
      >
        Retry
      </button>
    </div>
  )

  renderProfile = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case profileApiStatusConstant.success:
        return this.renderProfileDetail()
      case profileApiStatusConstant.inProgress:
        return this.renderLoader()
      case profileApiStatusConstant.failure:
        return this.profileFailureView()
      default:
        return ''
    }
  }

  renderProfileAndFilters = () => (
    <div className="profile-and-filter-container">
      {this.renderProfile()}

      <div>
        <hr className="hr-line" />
        <ul className="employment-types-list-container">
          <h1 className="employment-types-heading">Type of Employment</h1>
          {employmentTypesList.map(emplomentType =>
            this.renderEmployeeTypes(emplomentType),
          )}
        </ul>
      </div>

      <div>
        <hr className="hr-line" />
        <ul className="salary-range-list-container">
          <h1 className="salary-range-heading">Salary Range</h1>
          {salaryRangesList.map(salaryRange =>
            this.renderSalaryRange(salaryRange),
          )}
        </ul>
      </div>
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobDetail()
    }
  }

  onClickSearchIcon = () => {
    this.getJobDetail()
  }

  renderJobSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          onKeyUp={this.onSearchInput}
        />
        <div className="search-icon-container">
          <button
            type="button"
            data-testid="searchButton"
            className="search-icon-button"
            onClick={this.onClickSearchIcon}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
      </div>
    )
  }

  noJobsView = () => (
    <div className="no-jobs-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-job-image"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobItems = () => {
    const {jobDetails} = this.state
    if (jobDetails.length === 0) {
      return this.noJobsView()
    }
    return (
      <>
        <ul className="job-item-list-container">
          {jobDetails.map(eachJob => (
            <JobItem jobDetail={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  jobFailureRetryBtn = () => {
    this.getJobDetail()
  }

  renderJobDetail = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderJobItems()
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      case apiStatusConstant.failure:
        return <Failure failureViewRetry={this.jobFailureRetryBtn} />
      default:
        return ''
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="jobs-container">
          {this.renderProfileAndFilters()}
          <div className="job-items-container">
            {this.renderJobSearchInput()}
            {this.renderJobDetail()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
