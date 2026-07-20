
import React from "react"

import './Button.css'

const Button = ({ text, onClick, className = "btn", ...rest }) => {
  return (
    <button type="button" className={className} onClick={onClick} {...rest}>
      {text}
    </button>
  )
}

export default Button