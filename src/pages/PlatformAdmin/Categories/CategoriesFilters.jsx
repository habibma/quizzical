const CategoriesFilters = ({ repositories, selectedRepoId, onFilterChange }) => {

  const options = [
    { value: '', label: 'select repository' },
    ...repositories.map(repo => ({ value: String(repo.id), label: repo.title }))
  ]

  return (
    <div className='categories--table-filter'>
      <label className="label" htmlFor="category-repository">Repository</label>
      <select
        id="category-repository"
        name="repository"
        value={selectedRepoId ? String(selectedRepoId) : ''}
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
