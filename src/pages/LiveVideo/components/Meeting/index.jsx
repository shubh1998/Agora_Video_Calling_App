import { Fragment, useState } from 'react'
import AudioVideoControlPanel from 'components/AudioVideoControlPanel/index'
import { useParams, useNavigate } from 'react-router-dom'
import { ROUTE_PATHS } from 'constants/index'
import ChatBox from '../ChatBox/index'
import useAgoraRtm from 'hooks/useAgoraRtm'
import { LocalUser, RemoteUser } from 'agora-rtc-react'
import useAgoraRtc from 'hooks/useAgoraRtc'

const Meeting = ({ userName }) => {
  const navigate = useNavigate()
  const { channelName } = useParams()
  const [micOn, setMic] = useState(true)
  const [cameraOn, setCamera] = useState(true)
  const [chatMsg, setChatMsg] = useState('')
  const [openChatBox, setOpenChatBox] = useState(false)
  const {
    handleDisconnectCall, remoteUsers, localCameraTrack,
    localMicrophoneTrack
  } = useAgoraRtc({ channelName, userName, cameraOn, micOn })
  const { messages, sendChannelMessage } = useAgoraRtm({ userName, channelName })

  const handleEndCall = (e) => {
    e.preventDefault()
    handleDisconnectCall()
    navigate(ROUTE_PATHS.HOME)
  }

  const handleMicClick = () => {
    setMic(a => !a)
  }
  const handleCameraClick = () => {
    setCamera(a => !a)
  }

  const handleChatBox = () => {
    setOpenChatBox(!openChatBox)
  }

  const handleChatMsg = (e) => {
    setChatMsg(e.target.value)
  }

  const handleSendMessage = async (e) => {
    sendChannelMessage(chatMsg)
    setChatMsg('')
    e.preventDefault()
  }

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
      </div>
      <ChatBox
        openChatBox={openChatBox}
        handleChatMsg={handleChatMsg}
        chatMsg={chatMsg}
        handleSendMessage={handleSendMessage}
        chatMessages={messages}
        userName={userName}
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
