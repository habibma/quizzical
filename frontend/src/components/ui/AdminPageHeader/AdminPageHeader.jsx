import './AdminPageHeader.css';

const AdminPageHeader = ({
  as: Component = 'section',
  eyebrow,
  title,
  description,
  actions,
  classNames = {},
}) => (
  <Component className={['admin-page-header', classNames.root].filter(Boolean).join(' ')}>
    <div className={['admin-page-header__content', classNames.content].filter(Boolean).join(' ')}>
      {eyebrow && (
        <p className={['admin-page-header__eyebrow', classNames.eyebrow].filter(Boolean).join(' ')}>
          {eyebrow}
        </p>
      )}
      <h1 className={['admin-page-header__title', classNames.title].filter(Boolean).join(' ')}>
        {title}
      </h1>
      {description && (
        <p className={['admin-page-header__description', classNames.description].filter(Boolean).join(' ')}>
          {description}
        </p>
      )}
    </div>
    {actions && (
      <div className={['admin-page-header__actions', classNames.actions].filter(Boolean).join(' ')}>
        {actions}
      </div>
    )}
  </Component>
);

export default AdminPageHeader;
