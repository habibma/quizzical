const modalFields = [
	{
		general: [
			{ name: 'title', label: 'Title', type: 'text', required: true },
			{ name: 'description', label: 'Description', type: 'textarea' },
		],
	},
	{
		content: [
			{
				name: 'repositories',
				label: 'Repositories',
				type: 'multiselect',
				optionsKey: 'repositories',
			},
			{
				name: 'categories',
				label: 'Categories',
				type: 'multiselect',
				optionsKey: 'categories',
			},
			{
				name: 'questionIds',
				label: 'My Questions',
				type: 'multiselect',
				optionsKey: 'questionIds',
			},
			{
				name: 'questionCount',
				label: 'Question Count',
				type: 'number',
				min: 1,
				max: 100,
			},
			{
				name: 'questionSelection',
				label: 'Question Selection',
				type: 'select',
				options: [
					{ value: 'random', label: 'Random' },
					{ value: 'sequential', label: 'Sequential' },
				],
			},
		],
	},
	{
		rules: [
			{
				name: 'difficulty',
				label: 'Difficulty',
				type: 'select',
				options: [
					{ value: 'easy', label: 'Easy' },
					{ value: 'medium', label: 'Medium' },
					{ value: 'hard', label: 'Hard' },
				],
			},
			{
				name: 'timeLimit',
				label: 'Time Limit (minutes)',
				type: 'number',
				min: 0,
				max: 240,
			},
			{
				name: 'attempts',
				label: 'Attempts',
				type: 'number',
				min: 0,
			},
			{
				name: 'pointsCorrect',
				label: 'Points for Correct Answer',
				type: 'number',
				min: 0,
			},
			{
				name: 'pointsWrong',
				label: 'Points for Wrong Answer',
				type: 'number',
				min: 0,
			},
			{
				name: 'pointsSkipped',
				label: 'Points for Skipped Question',
				type: 'number',
				min: 0,
			},
			{
				name: 'passingScore',
				label: 'Passing Score (%)',
				type: 'number',
				min: 0,
				max: 100,
			},
		],
	},
	{
		rewards: [
			{
				name: 'completionXP',
				label: 'Completion XP',
				type: 'number',
			},
			{
				name: 'passXP',
				label: 'Pass XP',
				type: 'number',
			},
			{
				name: 'perfectScoreXP',
				label: 'Perfect Score XP',
				type: 'number',
			},
		],
	},
	{
		access: [
			{
				name: 'status',
				label: 'Status',
				type: 'select',
				options: [
					{ value: 'draft', label: 'Draft' },
					{ value: 'published', label: 'Published' },
					{ value: 'archived', label: 'Archived' },
				],
			},
			{
				name: 'visibility',
				label: 'Visibility',
				type: 'select',
				options: [
					{ value: 'public', label: 'Public' },
					{ value: 'private', label: 'Private' },
					{ value: 'class', label: 'Class' },
					{ value: 'school', label: 'School' },
				],
			},
		],
	},
];

export default modalFields;