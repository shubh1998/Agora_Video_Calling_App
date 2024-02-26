import AgoraRTM from 'agora-rtm-sdk'
import appConfig from 'config/app.config'
import { getChatHistoryFromSession, storeChatHistoryInSession } from 'helpers/sessionstorage.helpers'
import { useEffect, useState, useRef } from 'react'

const useAgoraRtm = ({ userName, channelName }) => {
  const [messages, setMessages] = useState(getChatHistoryFromSession() || [])
  const [currentMessage, setCurrentMessage] = useState()
  const client = AgoraRTM.createInstance(appConfig.APP_ID)
  const channel = useRef(client.createChannel(channelName)).current

  const handleInitializeRtm = async () => {
    await client.login({
      uid: userName,
      token: null
    })
    await channel.join()
    await client.setLocalUserAttributes({
      name: userName
    })
  }

  const handleMessageReceived = async (data, uid) => {
    const user = await client.getUserAttributes(uid)
    if (data.messageType === 'TEXT') {
      const newMessageData = { user, message: data.text }
      setCurrentMessage(newMessageData)
    }
  }

  const sendChannelMessage = async (text) => {
    channel.sendMessage({ text }).then(() => {
      setCurrentMessage({ userName, message: text })
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    handleInitializeRtm()
  }, [])

  useEffect(() => {
    channel.on('ChannelMessage', (data, uid) => {
      handleMessageReceived(data, uid)
    })
  }, [])

  useEffect(() => {
    if (currentMessage) {
      setMessages([...messages, currentMessage])
      storeChatHistoryInSession([...messages, currentMessage])
    }
  }, [currentMessage])

  return { sendChannelMessage, messages }
}
export default useAgoraRtm
