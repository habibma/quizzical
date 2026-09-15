import Button from '../../../components/ui/Button';
import QuestionFilters from './QuestionFilters';

const QuestionToolbar = ({
  config,
  values,
  onChange,
  searchTerm,
  onSearchChange,
  onClear,
  resultCount,
  onExport,
  onImport,
}) => (
  <section className="question-toolbar" aria-label="Question filters">
    <div className="question-toolbar__top">
      <div className="question-search">
        <label htmlFor="question-search">Search questions</label>
        <input
          id="question-search"
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search question text"
        />
      </div>
      <span className="question-result-count">{resultCount} results</span>
    </div>
    <div className="question-toolbar__filters">
      <QuestionFilters config={config} values={values} onChange={onChange} />
      <Button className="btn-secondary" text="Clear filters" onClick={onClear} />
    </div>
    {(onImport || onExport) && <div className="question-toolbar__tools">
      {onImport && <Button className="btn-secondary" text="Import JSON" onClick={onImport} />}
      {onExport && <Button className="btn-secondary" text="Export JSON" onClick={onExport} />}
    </div>}
  </section>
);

export default QuestionToolbar;