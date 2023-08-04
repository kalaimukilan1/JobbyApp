import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import {AiFillStar} from 'react-icons/ai'
import {ImLocation2} from 'react-icons/im'
import {MdWork} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'
import Failure from '../Failure'
import './index.css'

const jobItemDetailApiConstant = {
  inProgress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetail extends Component {
  state = {jobItemDetail: '', apiStatus: jobItemDetailApiConstant.inProgress}

  componentDidMount() {
    this.getJobItemDetail()
  }

  getJobItemDetail = async () => {
    this.setState({apiStatus: jobItemDetailApiConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    const updatedLifeAtCompany = company => ({
      description: company.description,
      imageUrl: company.image_url,
    })

    const updatedSkills = skills =>
      skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

    const updatedJobDetails = jobDetails => ({
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      title: jobDetails.title,
      lifeAtCompany: updatedLifeAtCompany(jobDetails.life_at_company),
      skills: updatedSkills(jobDetails.skills),
    })

    const updatedSimilarJobs = similarJobs =>
      similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

    if (response.ok === true) {
      const updatedData = {
        jobDetails: updatedJobDetails(data.job_details),
        similarJobs: updatedSimilarJobs(data.similar_jobs),
      }
      this.setState({
        jobItemDetail: updatedData,
        apiStatus: jobItemDetailApiConstant.success,
      })
    } else {
      this.setState({apiStatus: jobItemDetailApiConstant.failure})
    }
  }

  renderSkills = () => {
    const {jobItemDetail} = this.state
    const {skills} = jobItemDetail.jobDetails

    return (
      <div>
        <h1 className="job-item-skills-heading">Skills</h1>
        <ul className="skills-list-container">
          {skills.map(each => (
            <li key={each.name} className="skills-list">
              <img
                src={each.imageUrl}
                alt={each.name}
                className="skills-image"
              />
              <p className="skills-name-para">{each.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLifeAtCompany = () => {
    const {jobItemDetail} = this.state
    const {lifeAtCompany} = jobItemDetail.jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <div>
        <h1 className="life-at-company-heading">Life at Company</h1>
        <div className="life-at-company-description-image-container">
          <p className="life-at-company-description">{description}</p>
          <img
            src={imageUrl}
            alt="life at company"
            className="life-at-company-image"
          />
        </div>
      </div>
    )
  }

  similarJobCard = similarJob => {
    const {
      companyLogoUrl,
      employmentType,
      title,
      rating,
      location,
      jobDescription,
      id,
    } = similarJob
    return (
      <li className="similar-job-container" key={id}>
        <div className="job-image-title-rating-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="job-item-company-logo"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="job-rating-container">
              <AiFillStar className="job-rating-icon" />
              <p className="job-rating-para">{rating}</p>
            </div>
          </div>
        </div>

        <div className="job-location-package-container">
          <div className="job-location-and-type-container">
            <div className="job-location-container">
              <ImLocation2 className="job-location-icon" />
              <p className="location-para">{location}</p>
            </div>
            <div className="job-type-container">
              <MdWork className="job-type-icon" />
              <p className="job-type-para">{employmentType}</p>
            </div>
          </div>
        </div>

        <div>
          <h1 className="job-description-heading">Description</h1>
          <p className="job-description-para">{jobDescription}</p>
        </div>
      </li>
    )
  }

  renderSimilarJobs = () => {
    const {jobItemDetail} = this.state
    const {similarJobs} = jobItemDetail

    return (
      <ul className="similar-job-list-container">
        {similarJobs.map(each => this.similarJobCard(each))}
      </ul>
    )
  }

  jobItemDetail = () => {
    const {jobItemDetail} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
    } = jobItemDetail.jobDetails
    return (
      <div className="job-item-details-container">
        <div className="job-item-details-card">
          <div className="job-image-title-rating-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="job-item-company-logo"
            />
            <div>
              <h1 className="job-title">{title}</h1>
              <div className="job-rating-container">
                <AiFillStar className="job-rating-icon" />
                <p className="job-rating-para">{rating}</p>
              </div>
            </div>
          </div>

          <div className="job-location-package-container">
            <div className="job-location-and-type-container">
              <div className="job-location-container">
                <ImLocation2 className="job-location-icon" />
                <p className="location-para">{location}</p>
              </div>
              <div className="job-type-container">
                <MdWork className="job-type-icon" />
                <p className="job-type-para">{employmentType}</p>
              </div>
            </div>
            <p className="package-per-annum-para">{packagePerAnnum}</p>
          </div>
          <hr className="job-hr-line" />
          <div>
            <div className="description-heading-and-visit-link">
              <h1 className="job-item-description-heading">Description</h1>
              <a
                href={companyWebsiteUrl}
                target="_self"
                className="job-detail-visit-link"
              >
                Visit <FiExternalLink className="job-detail-visit-link-icon" />
              </a>
            </div>
            <p className="job-item-description-para">{jobDescription}</p>
            {this.renderSkills()}
            {this.renderLifeAtCompany()}
          </div>
        </div>
        <div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          {this.renderSimilarJobs()}
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="job-item-loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  onClickFailureRetryBtn = () => {
    this.getJobItemDetail()
  }

  renderJobItemDetail = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case jobItemDetailApiConstant.success:
        return this.jobItemDetail()
      case jobItemDetailApiConstant.inProgress:
        return this.renderLoader()
      case jobItemDetailApiConstant.failure:
        return <Failure failureViewRetry={this.onClickFailureRetryBtn} />
      default:
        return ''
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderJobItemDetail()}
      </div>
    )
  }
}

export default JobItemDetail
