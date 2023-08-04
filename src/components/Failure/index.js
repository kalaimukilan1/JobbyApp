import './index.css'

const Failure = props => {
  const {failureViewRetry} = props

  const onClickRetryBtn = () => {
    failureViewRetry()
  }

  return (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-view-retry-btn"
        onClick={onClickRetryBtn}
      >
        Retry
      </button>
    </div>
  )
}
export default Failure
