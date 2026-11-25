
import AdminPageHeader from '../../../components/ui/AdminPageHeader/AdminPageHeader';

const Dashboard = () => {
    return (
        <div className="teacher-dashboard">
            <AdminPageHeader
                eyebrow="Teacher"
                title="Teacher Dashboard"
                description="Welcome to your dashboard!"
            />
        </div>
    );
};

export default Dashboard;