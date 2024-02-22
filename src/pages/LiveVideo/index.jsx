import { useLocation } from 'react-router-dom'
import './liveVideo.css'
import Meeting from './components/Meeting/index'
import InvalidUserName from './components/InvalidUserName/index'

const LiveVideo = () => {
  const location = useLocation()
  const userName = location.state?.userName

  return (
    <>
      {userName ? <Meeting userName={userName} /> : <InvalidUserName />}
    </>
  )
}

export default LiveVideo
