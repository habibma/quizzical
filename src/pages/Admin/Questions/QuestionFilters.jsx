import Input from '../../../components/Input';

const QuestionFilters = ({ config, values, onChange }) => {

    return (
        <div className="question-filters">
            {
                config.map(filter => {
                    if (filter.type === 'select') {
                        return (
                            <Input
                                as="select"
                                key={filter.name}
                                type="select"
                                name={filter.name}
                                label={filter.label}
                                options={filter.options}
                                value={values[filter.name]}
                                onChange={(e) => onChange(filter.name, e.target.value)}
                            />
                        );
                    }
                    return null;
                })
            }
        </div>
    );
}

export default QuestionFilters;