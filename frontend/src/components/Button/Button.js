import "./Button.css";

const Button = ({ margin, color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color, marginBottom: margin }}
      className='btn'
    >
      {text}
    </button>
  )
}

export default Button;