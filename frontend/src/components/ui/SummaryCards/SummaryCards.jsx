import './SummaryCards.css';

const SummaryCards = ({ items, ariaLabel, className, cardClassName }) => (
  <section className={['summary-cards', className].filter(Boolean).join(' ')} aria-label={ariaLabel}>
    {items.map(({ key, label, value, className: itemClassName }) => (
      <div
        className={['summary-cards__item', cardClassName, itemClassName].filter(Boolean).join(' ')}
        key={key ?? label}
      >
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    ))}
  </section>
);

export default SummaryCards;
