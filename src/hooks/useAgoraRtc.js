import {
  useLocalCameraTrack, useLocalMicrophoneTrack, useJoin,
  usePublish, useRemoteUsers, useRemoteAudioTracks, useRTCClient
} from 'agora-rtc-react'
import appConfig from 'config/app.config'
import { deleteChatHistoryFromSession } from 'helpers/sessionstorage.helpers'
import { useEffect, useState } from 'react'

const useAgoraRtc = ({ channelName, userName, cameraOn, micOn }) => {
  const [activeConnection, setActiveConnection] = useState(true)
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn)
  const { localCameraTrack } = useLocalCameraTrack(cameraOn)
  const remoteUsers = useRemoteUsers()
  const { audioTracks } = useRemoteAudioTracks(remoteUsers)
  const [activeSpeakers, setActiveSpeakers] = useState([])
  const client = useRTCClient()

  useJoin({
    appid: appConfig.APP_ID,
    channel: channelName,
    token: null,
    uid: userName
  }, activeConnection)

  usePublish([localMicrophoneTrack, localCameraTrack])

  audioTracks.forEach((track) => track.play())

  const handleDisconnectCall = () => {
    setActiveConnection(false)
    deleteChatHistoryFromSession()
    window.history.replaceState({}, '')
  }

  useEffect(() => {
    client.enableAudioVolumeIndicator()
    client.on('volume-indicator', (data) => {
      setActiveSpeakers(data)
    })
  }, [])

  return {
    handleDisconnectCall,
    remoteUsers,
    localCameraTrack,
    localMicrophoneTrack,
    activeSpeakers
  }
}

export default useAgoraRtc
