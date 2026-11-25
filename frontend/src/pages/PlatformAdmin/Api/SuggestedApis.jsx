import Button from "../../../components/ui/Button/Button";

const getButtonLabel = (api) => {
    if (api.adaptor === "opentdb") return "Add OpenTDB API";
    if (api.adaptor === "trivia-api") return "Add Trivia API";
    return `Add ${api.name}`;
};

const SuggestedApis = ({ apis, onAddApi }) => (
    <section className="api-actions" aria-labelledby="suggested-apis-title">
        <div className="api-actions__content">
            <h2 id="suggested-apis-title">Suggested APIs</h2>
            <p>Add a preconfigured quiz provider to get started.</p>
        </div>
        <div className="api-actions__buttons">
            {apis.map(api => (
                <Button
                    key={api.adaptor}
                    className="btn-primary"
                    size="lg"
                    text={getButtonLabel(api)}
                    onClick={() => onAddApi(api)}
                />
            ))}
        </div>
    </section>
);

export default SuggestedApis;
