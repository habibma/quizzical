import Input from '../../../components/Input'

const CategoriesFilters = ({ repositories, selectedRepoId, onFilterChange }) => {

  const options = [
    { value: '', label: 'select repository' },
    ...repositories.map(repo => ({ value: repo.id, label: repo.title }))
  ]

  return (
    <div className='categories--table-filter'>
      <Input
        as="select"
        value={selectedRepoId || ''}
        onChange={onFilterChange}
        options={options}
      />

    </div>
  )
}

export default CategoriesFilters;
