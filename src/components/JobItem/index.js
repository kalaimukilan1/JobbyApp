import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {ImLocation2} from 'react-icons/im'
import {MdWork} from 'react-icons/md'

import './index.css'

const JobItem = props => {
  const {jobDetail} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    id,
  } = jobDetail
  return (
    <Link to={`jobs/${id}`} className="job-item-link">
      <li className="job-item-list">
        <div className="job-image-title-rating-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
          <h1 className="job-description-heading">Description</h1>
          <p className="job-description-para">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
