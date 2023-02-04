import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

const filtersConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class FilterGroup extends Component {
  state = {
    profileInfo: {},
    profileStatus: filtersConstants.initial,
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({profileStatus: filtersConstants.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileInfo: updatedData,
        profileStatus: filtersConstants.success,
      })
    } else {
      this.setState({profileStatus: filtersConstants.failure})
    }
  }

  // success view
  successView = () => {
    const {profileInfo} = this.state
    const {name, profileImageUrl, shortBio} = profileInfo
    return (
      <div>
        <img src={profileImageUrl} alt={name} />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  restart = () => {
    this.setState({profileStatus: filtersConstants.inProgress}, this.getProfile)
  }

  // failure view
  failureView = () => {
    console.log('retry')
    return (
      <div>
        <button type="button" onClick={this.restart}>
          Retry
        </button>
      </div>
    )
  }

  // renderLoader
  renderLoader = () => {
    console.log('loader')
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#000000" height="50" width="50" />
      </div>
    )
  }

  // started switch
  startSwitch = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case filtersConstants.success:
        return this.successView()
      case filtersConstants.failure:
        return this.failureView()
      case filtersConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div>{this.startSwitch()}</div>
  }
}
export default FilterGroup
