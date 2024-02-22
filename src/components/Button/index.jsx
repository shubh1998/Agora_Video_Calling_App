import './button.css'

const Button = ({ variant, value, handleClick, className }) => {
  if (variant === 'default') {
    return (
      <button
        className={className + ' my-button'}
        onClick={handleClick}
      >
        {value}
      </button>
    )
  } else {
    return (
      <button className={className + ' control-btn'} onClick={handleClick}>
        {value}
      </button>
    )
  }
}

export default Button
