import {Component} from 'react'
import Cookies from 'js-cookie'
import FilterGroup from '../FilterGroup/filter'
import './job.css'

class Job extends Component {
  onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  header = () => {
    console.log('header')
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <div>
          <h1>Home</h1>
          <h1>Jobs</h1>
        </div>
        <button type="button" onClick={this.onClickLogOut}>
          Logout
        </button>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.header()}
        <FilterGroup />
      </div>
    )
  }
}
export default Job
