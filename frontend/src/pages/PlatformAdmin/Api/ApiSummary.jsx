import SummaryCards from "../../../components/ui/SummaryCards/SummaryCards";

const ApiSummary = ({ total, enabled, healthy, offline }) => (
    <SummaryCards
        ariaLabel="API summary"
        className="api-summary-grid"
        cardClassName="api-summary-card"
        items={[
            { label: "Total APIs", value: total },
            { label: "Enabled", value: enabled },
            { label: "Healthy", value: healthy },
            { label: "Offline", value: offline },
        ]}
    />
);

export default ApiSummary;
