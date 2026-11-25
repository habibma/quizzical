import Button from '../Button/Button';
import './PageState.css';

const PageState = ({
  title,
  message,
  variant = 'empty',
  className,
  headingLevel: Heading = 'h3',
  actionLabel,
  onAction,
  role,
}) => (
  <div
    className={[
      'page-state',
      `page-state--${variant}`,
      className,
      className && variant !== 'empty' ? `${className}--${variant}` : '',
    ].filter(Boolean).join(' ')}
    role={role ?? (variant === 'error' ? 'alert' : undefined)}
  >
    {title && <Heading>{title}</Heading>}
    {message && <p>{message}</p>}
    {onAction && <Button onClick={onAction} text={actionLabel || 'Retry'} />}
  </div>
);

export default PageState;
