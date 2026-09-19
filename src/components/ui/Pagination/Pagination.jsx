import Button from '../Button/Button';
import './Pagination.css';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  className = '',
}) => {
  if (totalPages <= 1) return null;

  return (
    <nav className={`pagination ${className}`} aria-label="Pagination">
      <Button
        className="btn-secondary"
        text={previousLabel}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label={previousLabel}
      />
      <span className="pagination__status" aria-live="polite">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        className="btn-secondary"
        text={nextLabel}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label={nextLabel}
      />
    </nav>
  );
};

export default Pagination;