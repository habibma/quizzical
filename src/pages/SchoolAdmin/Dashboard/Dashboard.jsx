import './Dashboard.css';

const data = [
    {
        icon: '👨‍🎓',
        number: '1,234',
        title: 'Studens',
    },
    {
        icon: '👩‍🏫',
        number: '56',
        title: 'Teachers',
    },
    {
        icon: '🏫',
        number: '12',
        title: 'Classes',
    },
    {
        icon: '📚',
        number: '3,456',
        title: 'Courses',
    },
    {
        icon: '📊',
        number: '7,890',
        title: 'Quiz participation',
    }
];

const DashboardCard = ({ icon, number, title }) => {
    return (
        <div className="dashboard-card">
            <div className="dashboard-card-icon">{icon}</div>
            <div className="dashboard-card-number">{number}</div>
            <h2>{title}</h2>
        </div>
    );
};

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <section className="dashboard-header">
                <h1 className="dashboard-header--title">School Admin Dashboard</h1>
                <p className="dashboard-header--description">A central place to manage the school and monitor its progress.</p>
            </section>
            <section className="dashboard-content">
                <div className="dashboard-cards">
                    {data.map((item, index) => (
                        <DashboardCard
                            key={index}
                            icon={item.icon}
                            number={item.number}
                            title={item.title}
                        />
                    ))}
                </div>
                <div className="dashboard-logs">
                    <h2>Recent Activity</h2>
                    <ul>
                        <li>User logged in</li>
                        <li>New student registered</li>
                        <li>Teacher updated profile</li>
                    </ul>
                </div>
            </section>
            <section className="dashboard-footer">
                <p>© 2024 School Admin Dashboard. All rights reserved.</p>
            </section>
        </div>
    );
};

export default Dashboard;