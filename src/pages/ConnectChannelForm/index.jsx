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
    e.preventDefault()
    const trimmedChannelName = channelName.trim()
    const trimmedUserName = channelName.trim()
    if (trimmedChannelName === '') {
      setInvalidChannelError("Channel name can't be empty.")
      setChannelName('')
    }
    if (trimmedUserName === '') {
      setInvalidUserNameError("User name can't be empty.")
      setUserName('')
    }
    if (trimmedChannelName.length > 10) {
      setInvalidChannelError('Channel name is too long, Max 10 characters are allowed !')
    }
    if (trimmedUserName.length > 10) {
      setInvalidChannelError('Username is too long, Max 10 characters are allowed !')
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
              className='input-join-room form-control'
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
              className='input-join-room form-control'
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
