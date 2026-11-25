
import AdminPageHeader from '../../../components/ui/AdminPageHeader/AdminPageHeader';

const Dashboard = () => {
  return (
    <div className='container'>
      <div className='dashboard'>
        <AdminPageHeader
          eyebrow="Platform Admin"
          title="Admin Dashboard"
          description="Welcome to the admin dashboard. Here you can manage the quiz questions and categories."
        />
        <p> A quick overview of the available actions is provided below.</p>
        <ul>
          <li>Number of Questions {/*questions.length*/}</li>
          <li>Number of Categories {/*categories.length*/}</li>
          <li>Number of Users {/*users.length*/}</li>
          <li>Number of Quizzes Taken {/*quizzesTaken.length*/}</li>
          <li>Recent activities</li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard