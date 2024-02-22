import Button from 'components/Button/index'
import './notFound.css'
import { ROUTE_PATHS } from 'constants/index'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
  const navigate = useNavigate()
  const handleBackToHome = () => {
    navigate(ROUTE_PATHS.HOME)
  }

  return (
    <div className='not-found'>
      <div>
        <h1>404: Page Not Found !</h1>
        <br /><br />
        <Button variant='default' value='Back To Home' handleClick={handleBackToHome} />
      </div>
    </div>
  )
}

export default NotFoundPage
