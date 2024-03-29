import './chatBox.css'
import Button from 'components/Button/index'

const ChatBox = ({
  openChatBox, chatMessages = [], handleChatMsg,
  chatMsg, handleSendMessage, userName
}) => {
  if (!openChatBox) {
    return <></>
  }

  return (
    <div className='chat-root-container'>
      <div className='chat-sub-container'>
        <div className='chat-header'>
          <h4>Chat Box</h4>
        </div>
        <div className='message-box-container'>
          {
            chatMessages.map(item => (
              <div className='message-box' key={item.message}>
                <div className={`${item.userName === userName ? 'user-name-highlighted' : 'message-user-name'}`}>{item?.userName || 'Hidden'}</div>
                <div className='mt-1'>{item.message}</div>
              </div>

            ))
          }
        </div>
        <form onSubmit={handleSendMessage}>
          <div className='chat-box-input-footer'>
            <div className='w-100'>
              <input
                required
                type='text'
                className='input-chat form-control bbl-radius'
                placeholder='Type your message...'
                value={chatMsg}
                onChange={handleChatMsg}
              />
            </div>
            <div>
              <Button
                className='br-none bbr-radius'
                value='Send'
                variant='default'
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatBox
