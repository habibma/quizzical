import SummaryCards from '../../../components/ui/SummaryCards/SummaryCards';

const CategorySummary = ({ total, enabled, selectedSource }) => (
  <SummaryCards
    ariaLabel="Category summary"
    className="category-summary"
    cardClassName="category-summary__card"
    items={[
      { label: 'Total categories', value: total },
      { label: 'Enabled', value: enabled },
      { label: 'Disabled', value: total - enabled },
      {
        label: 'API source',
        value: selectedSource || 'Choose an API source',
        className: 'category-summary__card--wide',
      },
    ]}
  />
);

export default CategorySummary;