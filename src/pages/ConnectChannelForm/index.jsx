import './connectChannelForm.css'
import { useState } from 'react'
import Button from 'components/Button/index'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from 'constants/index'

const ConnectChannelForm = () => {
  const navigate = useNavigate()
  const [channelName, setChannelName] = useState('')
  const [userName, setUserName] = useState('')
  const [invalidChannelErrorMsg, setInvalidChannelError] = useState('')
  const [invalidUserNameErrorMsg, setInvalidUserNameError] = useState('')

  const handleConnect = (e) => {
    const trimmedChannelName = channelName.trim()
    const trimmedUserName = channelName.trim()
    if (trimmedChannelName === '') {
      e.preventDefault()
      setInvalidChannelError("Channel name can't be empty.")
      setChannelName('')
    }
    if (trimmedUserName === '') {
      e.preventDefault()
      setInvalidUserNameError("User name can't be empty.")
      setUserName('')
    }
    if (trimmedUserName && trimmedChannelName) {
      const exactRoute = ROUTE_PATHS.LIVE_CHANNEL.split(':')[0]
      navigate(`${exactRoute}${channelName}`, {
        state:
        { userName: userName }
      })
    }
  }

  return (
    <form onSubmit={handleConnect}>
      <div className='form-group'>
        <div>
          <div className='input-field'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter channel name to join meeting'
              value={channelName}
              onChange={(e) => {
                setChannelName(e.target.value)
                setInvalidChannelError('')
              }}
            />
            {invalidChannelErrorMsg && <span className='error-msg'> {invalidChannelErrorMsg} </span>}
          </div>
          <div className='input-field mt-1'>
            <input
              type='text'
              className='form-control'
              placeholder='Enter Unique UserName to join meeting'
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value)
                setInvalidUserNameError('')
              }}
            />
            {invalidUserNameErrorMsg && <span className='error-msg'> {invalidUserNameErrorMsg} </span>}
          </div>
          <br />
          <Button variant='default' value='Join Channel' />
        </div>
      </div>
    </form>
  )
}

export default ConnectChannelForm
