// filterConfig.js

export const createFilterConfig = (categoryOptions, repositoryOptions) => [
  {
    name: "repository",
    label: "Repository",
    type: "select",
    options: repositoryOptions,
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: categoryOptions,
  },
  {
    name: "difficulty",
    label: "Difficulty",
    type: "select",
    options: [
      { value: "any", label: "Any Difficulty" },
      { value: "easy", label: "Easy" },
      { value: "medium", label: "Medium" },
      { value: "hard", label: "Hard" },
    ],
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    options: [
      { value: "any", label: "Any Type" },
      { value: "multiple", label: "Multiple Choice" },
      { value: "boolean", label: "True-False" },
    ],
  },
];