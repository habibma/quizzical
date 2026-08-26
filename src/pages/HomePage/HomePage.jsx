
import "./HomePage.css"

const HomePage = () => {
    return (
        <div className="home-page">
            <section className="hero">
                <h1>Make learning engaging.</h1>
                <p>Create quizzes. Test knowledge. Earn XP.</p>
                <p>Quizzical helps teachers, parents, and learners turn assessment into an engaging experience.</p>
                <div className="hero-buttons">
                    <a href="/get-started">Get Started</a>
                    <a href="/explore-quizzes">Explore Quizzes</a>
                </div>
            </section>
            <section className="features">
                <div className="feature">
                    <h2>Create</h2>
                    <p>Build quizzes from question repositories.</p>
                </div>
                <div className="feature">
                    <h2>Evaluate</h2>
                    <p>Track scores and learning progress.</p>
                </div>
                <div className="feature">
                    <h2>Motivate</h2>
                    <p>Reward learners with XP and achievements.</p>
                </div>
            </section>
            <section className="for-whom">
                <div className="for-whom-card">
                    <h2>For Teachers</h2>
                    <p>Create quizzes, manage questions, and evaluate your students.</p>
                </div>
                <div className="for-whom-card">
                    <h2>For Parents</h2>
                    <p>Create engaging challenges and follow your children's progress.</p>
                </div>
                <div className="for-whom-card">
                    <h2>For Learners</h2>
                    <p>Test yourself, improve your knowledge, and earn Badges, XP, and more!</p>
                </div>
            </section>
            <section className="how-it-works">
                <h2>How It Works</h2>
                <ol className="steps">
                    <li className="step">Choose Content</li>
                    <span className="arrow"> → </span>
                    <li className="step">Create a Quiz</li>
                    <span className="arrow"> → </span>
                    <li className="step">Set Your Rules</li>
                    <span className="arrow"> → </span>
                    <li className="step">Students Play</li>
                    <span className="arrow"> → </span>
                    <li className="step">Results & XP</li>
                </ol>
            </section>
            <section className="gamification">
                <h2>Gamification</h2>
                <p>Learn  →  Play  →  Earn XP  →  Improve  →  Repeat</p>
            </section>
            <section className="repositories">
                <h2>Build quizzes from educational content instead of starting from scratch.</h2>
                <ul>
                    <li>Pre-built question banks</li>
                    <li>Customizable quiz templates</li>
                    <li>Easy-to-use content management</li>
               </ul>
            </section>
            <section className="call-to-action">
                <h2>Ready to make learning more engaging?</h2>
                <p>Join thousands of educators and learners using Quizzical.</p>
                <div className="cta-buttons">
                    <a href="/create-account" className="btn btn-primary">Create your Quizzical account</a>
                    <a href="/learn-more" className="btn btn-secondary">Learn more</a>
                </div>
            </section>
        </div>
    )
}

export default HomePage
