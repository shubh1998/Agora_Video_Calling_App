import { Fragment, useEffect, useState } from 'react'
import AudioVideoControlPanel from 'components/AudioVideoControlPanel/index'
import { useParams, useNavigate } from 'react-router-dom'
import {
  useLocalCameraTrack, useLocalMicrophoneTrack, useJoin,
  usePublish, useRemoteUsers, useRemoteAudioTracks, LocalUser, RemoteUser
} from 'agora-rtc-react'
import appConfig from 'config/app.config'
import { ROUTE_PATHS } from 'constants/index'
import ChatBox from '../ChatBox/index'
import AgoraRTM from 'agora-rtm-sdk'

const Meeting = ({ userName }) => {
  const signalingEngine = new AgoraRTM.RTM(appConfig.APP_ID, userName, { token: null })
  const navigate = useNavigate()
  const { channelName } = useParams()
  const [activeConnection, setActiveConnection] = useState(true)
  const [micOn, setMic] = useState(true)
  const [cameraOn, setCamera] = useState(true)
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn)
  const { localCameraTrack } = useLocalCameraTrack(cameraOn)
  const remoteUsers = useRemoteUsers()
  const { audioTracks } = useRemoteAudioTracks(remoteUsers)
  const [openChatBox, setOpenChatBox] = useState(false)
  const [chatMessage, setChatMessage] = useState('')

  useJoin({
    appid: appConfig.APP_ID,
    channel: channelName,
    token: null,
    uid: userName
  }, activeConnection)

  usePublish([localMicrophoneTrack, localCameraTrack])

  audioTracks.forEach((track) => track.play())

  const handleEndCall = (e) => {
    setActiveConnection(false)
    window.history.replaceState({}, '')
    navigate(ROUTE_PATHS.HOME)
  }
  const handleMicClick = () => setMic(a => !a)
  const handleCameraClick = () => setCamera(a => !a)

  const handleChatBox = () => {
    setOpenChatBox(!openChatBox)
  }

  const handleChatMessage = (e) => {
    setChatMessage(e.target.value)
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    const data = JSON.stringify({ userName, message: chatMessage })
    console.log('channel=====', data, signalingEngine)
    // await signalingEngine.publish(
    //   channelName,
    //   data
    // )
  }

  const handleSignalLogin = async () => {
    console.log('result====', signalingEngine)
    try {
      const result = await signalingEngine.login({ uid: userName, token: null })
      console.log('result====', result)
      // const subscribeOptions = {
      //   withMessage: true
      // }
      // await signalingEngine.subscribe(channelName, subscribeOptions)
    } catch (err) {
      console.log('error occurs at login.', err)
    }
  }

  signalingEngine.addEventListener('message', async (eventArgs) => {
    console.log('chala====', `${eventArgs}`)
  })

  useEffect(() => {
    handleSignalLogin()
  }, [])

  return (
    <>
      <div className='remote-video-grid-container my-4'>
        <div className='remote-video-grid'>
          {
              remoteUsers.map(user => {
                return (
                  <div className='remote-video-container' key={user.uid}>
                    <RemoteUser user={user} className='br-10' />
                    <div className='user-name-container'>
                      <p className='user-name-label'>{user.uid}</p>
                    </div>
                  </div>
                )
              })
            }
        </div>
      </div>
      <div className='local-video'>
        {/* <div className='local-video-relative'> */}
        <LocalUser
          className='br-10'
          audioTrack={localMicrophoneTrack}
          videoTrack={localCameraTrack}
          cameraOn={cameraOn}
          micOn={micOn}
          playAudio={micOn}
          playVideo={cameraOn}
        />
        <div className='user-name-container'>
          <p className='user-name-label'>{userName}</p>
        </div>
        {/* </div> */}
      </div>
      <ChatBox
        openChatBox={openChatBox}
        handleChatMessage={handleChatMessage}
        chatMessage={chatMessage}
        handleSendMessage={handleSendMessage}
      />
      <AudioVideoControlPanel
        handleMicClick={handleMicClick}
        handleCameraClick={handleCameraClick}
        handleEndCall={handleEndCall}
        audioOn={micOn}
        videoOn={cameraOn}
        handleChatBox={handleChatBox}
        openChatBox={openChatBox}
      />
    </>
  )
}

export default Meeting
