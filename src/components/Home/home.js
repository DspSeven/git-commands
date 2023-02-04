import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './home.css'

const Home = props => {
  console.log('home')
  const onClickLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div>
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <div>
          <h1>Home</h1>
          <h1>Jobs</h1>
        </div>
        <button type="button" onClick={onClickLogOut}>
          Logout
        </button>
      </div>
      <div>
        <h1>
          Find The Job That
          <br />
          Fits Your Life
        </h1>
        <p>
          Millions of people are searching for jobs, salary information, company
          reviews. Find the jobs that fits your abilities and potential
        </p>
        <Link to="/job">
          <button type="button">Find Jobs</button>
        </Link>
      </div>
    </div>
  )
}
export default Home
