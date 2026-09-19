import './Button.css'

const Button = ({
  children,
  text,
  className = '',
  variant,
  size,
  loading = false,
  disabled = false,
  type = 'button',
  ...rest
}) => {
  const classes = ['btn', className, variant && `btn-${variant}`, size && `btn-${size}`]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      {...rest}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading && <span className="btn-spinner" aria-hidden="true" />}
      {loading ? 'Loading...' : children ?? text}
    </button>
  )
}

export default Button