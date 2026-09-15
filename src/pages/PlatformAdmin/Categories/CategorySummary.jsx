const CategorySummary = ({ total, enabled, selectedRepository }) => (
  <section className="category-summary" aria-label="Category summary">
    <div className="category-summary__card">
      <span>Total categories</span>
      <strong>{total}</strong>
    </div>
    <div className="category-summary__card">
      <span>Enabled</span>
      <strong>{enabled}</strong>
    </div>
    <div className="category-summary__card">
      <span>Disabled</span>
      <strong>{total - enabled}</strong>
    </div>
    <div className="category-summary__card category-summary__card--wide">
      <span>Repository</span>
      <strong>{selectedRepository || 'Choose a repository'}</strong>
    </div>
  </section>
);

export default CategorySummary;