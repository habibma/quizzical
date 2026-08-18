import Modal from '../../../components/Modal';
import Input from '../../../components/Input';

import modalFields from './modalFields';

const getFieldOptions = (field, inputValues) => {
	if (field.optionsKey) {
		return inputValues[field.optionsKey] ?? [];
	}

	return field.options ?? [];
};

const FormField = ({ field, inputValues, onInputChange, section }) => {

	const value =
		inputValues[section]?.[field.name] ??
		(field.type === 'multiselect' ? [] : '');
	const options = getFieldOptions(field, inputValues);

	return (
		<div className='form-field'>
			<label htmlFor={field.name}>
				{field.label}
			</label>

			{field.type === 'multiselect' && (
				<select
					id={field.name}
					name={field.name}
					multiple
					value={value}
					onChange={(e) => onInputChange(section, e)}
				>
					{options.map(option => (
						<option
							key={option.value}
							value={option.value}
						>
							{option.label}
						</option>
					))}
				</select>
			)}

			{field.type === 'select' && (
				<select
					id={field.name}
					name={field.name}
					value={value}
					onChange={(e) => onInputChange(section, e)}
				>
					<option value=''>Select...</option>

					{options.map(option => (
						<option
							key={option.value}
							value={option.value}
						>
							{option.label}
						</option>
					))}
				</select>
			)}

			{field.type === 'textarea' && (
				<textarea
					id={field.name}
					name={field.name}
					value={value}
					onChange={(e) => onInputChange(section, e)}
				/>
			)}

			{(field.type === 'text' || field.type === 'number') && (
				<Input
					type={field.type}
					id={field.name}
					name={field.name}
					value={value}
					onChange={(e) => onInputChange(section, e)}
				/>
			)}
		</div>
	);
};

const QuizModal = ({ isOpen, onClose, onSave, isEditing, inputValues, onInputChange }) => {

	const handleSubmit = (event) => {
		event.preventDefault();
		onSave();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<h2 className='form-title'>
				{isEditing ? 'Edit Quiz' : 'Create Quiz'}
			</h2>

			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					{modalFields.map(section => (
						<div
							key={Object.keys(section)[0]}
							className='form-section'
						>
							{Object.entries(section).map(
								([sectionName, fields]) => (
									<fieldset
										key={sectionName}
										className='form-subsection'
									>
										<h3>
											{sectionName
												.charAt(0)
												.toUpperCase() +
												sectionName.slice(1)}
										</h3>

										{fields.map(field => (
											<FormField
												key={field.name}
												field={field}
												inputValues={inputValues}
												onInputChange={onInputChange}
												section={sectionName}
											/>
										))}
									</fieldset>
								)
							)}
						</div>
					))}
				</div>

				<div className='form-actions'>
					<button
						type='submit'
						className='btn-primary'
					>
						{isEditing ? 'Save Changes' : 'Create Quiz'}
					</button>

					<button
						type='button'
						className='btn-secondary'
						onClick={onClose}
					>
						Cancel
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default QuizModal;