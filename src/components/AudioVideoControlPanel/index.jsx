import Button from 'components/Button/index'
import './audioVideoControlPanel.css'

const AudioVideoControlPanel = ({
  handleMicClick, handleCameraClick, handleEndCall, meetingLayout,
  audioOn, videoOn, handleChatBox, openChatBox, handleChangeMeetingLayout
}) => {
  return (
    <div className='controller-footer'>
      <div className='control-btn-container'>
        <Button
          handleClick={handleChatBox}
          className={`${openChatBox ? 'disable-control' : ''}`}
          value={
            openChatBox
              ? <i class='fa-solid fa-xmark' />
              : <i class='fa-solid fa-message' />
          }
        />
        <Button
          handleClick={handleMicClick}
          className={`${audioOn ? '' : 'disable-control'}`}
          value={
            audioOn
              ? <i className='fa-solid fa-microphone' />
              : <i class='fa-solid fa-microphone-slash' />
          }
        />
        <Button
          handleClick={handleCameraClick}
          className={`${videoOn ? '' : 'disable-control'}`}
          value={
            videoOn
              ? <i class='fa-solid fa-video' />
              : <i class='fa-solid fa-video-slash' />
          }
        />
        <Button
          handleClick={handleEndCall}
          className='end-call-btn'
          value={
            <i class='fa-solid fa-phone' />
          }
        />
        <Button
          handleClick={handleChangeMeetingLayout}
          className={`${meetingLayout ? '' : 'disable-control'}`}
          value={
            <i class='fa-solid fa-laptop' />
          }
        />
      </div>
    </div>
  )
}

export default AudioVideoControlPanel
