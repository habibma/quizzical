import './Icon.css';

const Icon = ( { src, alt = "", size = 24, className = "" } ) => (
  <img src={src} alt={alt} width={size} height={size} className={ `icon ${className}` } />
);

export default Icon;