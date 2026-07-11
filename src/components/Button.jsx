
const Button = ({ text, onClick, className = "btn", ...rest }) => {
  return (
    <button className={className} onClick={onClick} {...rest}>
      {text}
    </button>
  )
}

export default Button