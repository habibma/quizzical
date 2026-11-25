
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button/Button";
import InfoTooltip from "../../../components/ui/InfoTooltip/InfoTooltip";

const QUESTION_MAPPING_FIELDS = [
    { name: "question", label: "Question", placeholder: "results.question" },
    { name: "correctAnswer", label: "Correct Answer", placeholder: "results.correct_answer" },
    { name: "incorrectAnswers", label: "Incorrect Answers", placeholder: "results.incorrect_answers" },
    { name: "category", label: "Category", placeholder: "results.category" },
];

const CATEGORY_MAPPING_FIELDS = [
    { name: "categoryId", label: "Category ID", placeholder: "categories.id" },
    { name: "categoryName", label: "Category Name", placeholder: "categories.name" },
];

const EndpointRow = ({
    index,
    endpoint,
    onChange,
    onMappingChange,
    onRemove,
    onConnect,
    connectionResult,
}) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onChange(index, name, value);
    };

    const mappingFields =
        endpoint.type === "questions"
            ? QUESTION_MAPPING_FIELDS
            : endpoint.type === "categories"
              ? CATEGORY_MAPPING_FIELDS
              : [];

    return (
        <div className="api-form-endpoint">
            <h3>Endpoint {index + 1}</h3>

            <Input
                label="Endpoint Name"
                id={`endpoint-${index}-name`}
                name="name"
                value={endpoint.name || ""}
                onChange={handleInputChange}
            />

            <Input
                as="select"
                label="Endpoint Type"
                id={`endpoint-${index}-type`}
                name="type"
                value={endpoint.type || "other"}
                options={[
                    { value: "categories", label: "Categories" },
                    { value: "questions", label: "Questions" },
                    { value: "other", label: "Other" },
                ]}
                onChange={handleInputChange}
            />

            <Input
                as="select"
                label="Method"
                id={`endpoint-${index}-method`}
                name="method"
                value={endpoint.method || "GET"}
                options={[
                    { value: "GET", label: "GET" },
                    { value: "POST", label: "POST" },
                    { value: "PUT", label: "PUT" },
                    { value: "DELETE", label: "DELETE" },
                ]}
                onChange={handleInputChange}
            />

            <Input
                label="Path"
                id={`endpoint-${index}-path`}
                name="path"
                value={endpoint.path || ""}
                onChange={handleInputChange}
                placeholder="/api/questions"
            />

            <Input
                label="Description"
                id={`endpoint-${index}-description`}
                name="description"
                value={endpoint.description || ""}
                onChange={handleInputChange}
            />

            {mappingFields.length > 0 && (
                <fieldset className="endpoint-mapping">
                    <legend>Response Field Mapping</legend>

                    <InfoTooltip
                        content="Enter the JSON path to each field in the API response. For example, results.question refers to the question field inside the results object."
                    />

                    <p>
                        Map the API response fields to Quizzical's expected
                        data fields.
                    </p>

                    {mappingFields.map((field) => (
                        <Input
                            key={field.name}
                            label={field.label}
                            id={`endpoint-${index}-${field.name}`}
                            name={field.name}
                            value={endpoint.mapping?.[field.name] || ""}
                            onChange={(e) =>
                                onMappingChange(
                                    index,
                                    field.name,
                                    e.target.value
                                )
                            }
                            placeholder={field.placeholder}
                        />
                    ))}
                </fieldset>
            )}

            <div className="endpoint-actions">
                <Button
                    type="button"
                    className="btn-success connect-endpoint"
                    size="sm"
                    text={
                        connectionResult?.loading
                            ? "Testing..."
                            : "Test Connection"
                    }
                    disabled={connectionResult?.loading}
                    onClick={() => onConnect(endpoint)}
                />

                <Button
                    type="button"
                    className="btn-danger remove-endpoint"
                    text="Remove"
                    size="sm"
                    onClick={() => onRemove(index)}
                />
            </div>

            {connectionResult?.error && (
                <p className="connection-error">
                    {connectionResult.error}
                </p>
            )}

            {connectionResult?.connected && (
                <p className="connection-success">
                    HTTP request successful!
                </p>
            )}
        </div>
    );
};

export default EndpointRow;
