import Button from 'components/Button/index'
import { ROUTE_PATHS } from 'constants/index'
import { useNavigate } from 'react-router-dom'

const InvalidUserName = () => {
  const navigate = useNavigate()
  const handleBackToHome = () => {
    navigate(ROUTE_PATHS.HOME)
  }

  return (
    <div className='not-found'>
      <div>
        <h2 className='error-msg'>Invalid Username !</h2>
        <p>You are trying to join meeting directly without unique username, please try to join meeting with valid username.</p>
        <br />
        <Button variant='default' value='Back To Home' handleClick={handleBackToHome} />
      </div>
    </div>
  )
}

export default InvalidUserName
