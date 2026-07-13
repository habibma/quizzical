import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

const Dashboard = () => {
  return (
    <div className='container'>
      <main className='dashboard'>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard. Here you can manage the quiz questions and categories.</p>
        <p> A quick overview of the available actions is provided below.</p>
        <ul>
          <li>Number of Questions {/*questions.length*/}</li>
          <li>Number of Categories {/*categories.length*/}</li>
          <li>Number of Users {/*users.length*/}</li>
          <li>Number of Quizzes Taken {/*quizzesTaken.length*/}</li>
          <li>Recent activities</li>
        </ul>
      </main>
    </div>
  )
}

export default Dashboard