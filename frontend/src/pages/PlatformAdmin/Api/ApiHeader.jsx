import Button from "../../../components/ui/Button/Button";
import AdminPageHeader from "../../../components/ui/AdminPageHeader/AdminPageHeader";

const ApiHeader = ({ onAddApi }) => (
    <AdminPageHeader
        eyebrow="Platform Admin"
        title="APIs"
        description="Manage and monitor your connected quiz providers."
        actions={<Button className="btn-primary" text="Add API" onClick={onAddApi} />}
        classNames={{
            root: "api-header",
            content: "api-header--content",
            eyebrow: "api-header--eyebrow",
            description: "lead",
            actions: "api-header__actions",
        }}
    />
);

export default ApiHeader;
