import Button from '../../../components/ui/Button/Button';
import CategoriesFilters from './CategoriesFilters';

const CategoryToolbar = ({
  sources,
  selectedSourceId,
  onSourceChange,
  searchTerm,
  onSearchChange,
  onClear,
  onEnableAll,
  onDisableAll,
  onExport,
  onImport,
}) => (
  <section className="category-toolbar" aria-label="Category controls">
    <div className="category-toolbar__filters">
      <CategoriesFilters
        sources={sources}
        selectedSourceId={selectedSourceId}
        onFilterChange={onSourceChange}
      />
      <div className="category-search">
        <label htmlFor="category-search">Search categories</label>
        <input
          id="category-search"
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search category names"
        />
      </div>
      <Button className="btn-secondary" text="Clear" onClick={onClear} />
    </div>
    <div className="category-toolbar__actions">
      <Button className="btn-secondary" text="Enable all" onClick={onEnableAll} />
      <Button className="btn-secondary" text="Disable all" onClick={onDisableAll} />
      <Button className="btn-secondary" text="Import JSON" onClick={onImport} />
      <Button className="btn-secondary" text="Export JSON" onClick={onExport} />
    </div>
  </section>
);

export default CategoryToolbar;