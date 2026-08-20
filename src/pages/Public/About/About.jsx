import './About.css';

const About = () => {
    return (
        <div className="container">
            <div className="content">
                <h1 className="about-title">About Quizzical</h1>
                <p className="about-description">Quizzical is a platform for teachers, class managers, and parents to create, manage, and deliver quizzes, while making learning more engaging through scoring, XP, and gamification.</p>
                <h2>Who is it for?</h2>
                <p className="about-description">Quizzical is designed for educators, students, and parents who want to make learning more interactive and fun.</p>
                <h2>How does it work?</h2>
                <p className="about-description">Users can create quizzes with multiple-choice questions, set scoring rules, and track progress. Students can take quizzes and earn points based on their performance.</p>
                <h2>What are Repositories?</h2>
                <p className="about-description">Repositories are collections of quiz data and configurations that can be used to store and manage quizzes for different subjects or grade levels.</p>
                <h2>How does Xp work?</h2>
                <p className="about-description">XP (Experience Points) is a gamification feature that rewards students for their performance in quizzes. Students earn XP for correct answers, completing quizzes, and achieving certain milestones.</p>
                <h2>How can teachers use it?</h2>
                <p className="about-description">Teachers can use Quizzical to create customized quizzes, track student progress, and provide feedback. They can also use the gamification features to motivate students and make learning more engaging.</p>
            </div>
        </div>
    )
}

export default About