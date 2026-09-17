const CategoriesFilters = ({ sources, selectedSourceId, onFilterChange }) => {

  const options = [
    { value: '', label: 'Select API source' },
    ...sources.map(source => ({ value: String(source.id), label: source.title }))
  ]

  return (
    <div className='categories--table-filter'>
      <label className="label" htmlFor="category-source">API source</label>
      <select
        id="category-source"
        name="source"
        value={selectedSourceId ? String(selectedSourceId) : ''}
        onChange={onFilterChange}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

    </div>
  )
}

export default CategoriesFilters;
