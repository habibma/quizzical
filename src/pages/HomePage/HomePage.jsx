import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
    return (
        <div className="home-page">

            {/* Hero */}
            <section className="hero">
                <div className="hero-content">
                    <span className="hero-eyebrow">
                        Learn. Play. Progress.
                    </span>

                    <h1>Make learning engaging.</h1>

                    <p className="hero-title-text">
                        Create quizzes. Test knowledge. Earn XP.
                    </p>

                    <p className="hero-description">
                        Quizzical helps teachers, parents, and learners turn
                        assessment into an engaging learning experience.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/get-started" className="btn btn-primary">
                            Get Started
                        </Link>

                        <Link
                            to="/explore-quizzes"
                            className="btn btn-secondary"
                        >
                            Explore Quizzes
                        </Link>
                    </div>
                </div>
            </section>


            {/* Main Features */}
            <section className="features">
                <div className="section-heading">
                    <span className="section-eyebrow">One platform</span>
                    <h2>Everything you need to make learning interactive.</h2>
                </div>

                <div className="features-grid">
                    <div className="feature">
                        <div className="feature-number">01</div>
                        <h3>Create</h3>
                        <p>
                            Build quizzes from question repositories or create
                            your own questions.
                        </p>
                    </div>

                    <div className="feature">
                        <div className="feature-number">02</div>
                        <h3>Evaluate</h3>
                        <p>
                            Track scores, results, and learning progress in one
                            place.
                        </p>
                    </div>

                    <div className="feature">
                        <div className="feature-number">03</div>
                        <h3>Motivate</h3>
                        <p>
                            Reward learners with XP, achievements, and progress
                            they can see.
                        </p>
                    </div>
                </div>
            </section>


            {/* Users */}
            <section className="for-whom">
                <div className="section-heading">
                    <span className="section-eyebrow">Built for everyone</span>
                    <h2>Different goals. One engaging learning experience.</h2>
                </div>

                <div className="for-whom-grid">
                    <div className="for-whom-item">
                        <h3>For Teachers</h3>
                        <p>
                            Create quizzes, manage questions, and evaluate your
                            students.
                        </p>
                    </div>

                    <div className="for-whom-item">
                        <h3>For Parents</h3>
                        <p>
                            Create engaging challenges and follow your
                            children's learning progress.
                        </p>
                    </div>

                    <div className="for-whom-item">
                        <h3>For Learners</h3>
                        <p>
                            Test yourself, improve your knowledge, and earn XP,
                            badges, and achievements.
                        </p>
                    </div>
                </div>
            </section>


            {/* NEW: Quiz Experience */}
            <section className="quiz-experience">
                <div className="quiz-experience-content">
                    <span className="section-eyebrow">
                        Experience Quizzical
                    </span>

                    <h2>Ready for a challenge?</h2>

                    <p>
                        Explore quizzes, discover new topics, test your
                        knowledge, and see how learning becomes more engaging.
                    </p>

                    <ul className="experience-list">
                        <li>Explore different subjects</li>
                        <li>Challenge your knowledge</li>
                        <li>Earn XP and rewards</li>
                        <li>Track your progress</li>
                    </ul>

                    <Link
                        to="/explore-quizzes"
                        className="btn btn-primary"
                    >
                        Explore Quizzes →
                    </Link>
                </div>

                {/* Visual preview */}
                <div className="quiz-preview">
                    <div className="quiz-preview-card">
                        <div className="quiz-preview-top">
                            <span>Featured Challenge</span>
                            <span>+50 XP</span>
                        </div>

                        <h3>Physics Fundamentals</h3>

                        <p>
                            Test your knowledge of motion, energy, forces, and
                            the fundamentals of physics.
                        </p>

                        <div className="quiz-preview-meta">
                            <span>20 Questions</span>
                            <span>Medium</span>
                        </div>

                        <div className="quiz-preview-progress">
                            <div className="progress-label">
                                <span>Your progress </span>
                                <span>65%</span>
                            </div>

                            <div className="progress-bar">
                                <div className="progress-value"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* How It Works */}
            <section className="how-it-works">
                <div className="section-heading">
                    <span className="section-eyebrow">Simple workflow</span>
                    <h2>From content to learning in a few steps.</h2>
                </div>

                <ol className="steps">
                    <li className="step">
                        <span className="step-number">01</span>
                        Choose Content
                    </li>

                    <li className="step">
                        <span className="step-number">02</span>
                        Create a Quiz
                    </li>

                    <li className="step">
                        <span className="step-number">03</span>
                        Set Your Rules
                    </li>

                    <li className="step">
                        <span className="step-number">04</span>
                        Students Play
                    </li>

                    <li className="step">
                        <span className="step-number">05</span>
                        Results & XP
                    </li>
                </ol>
            </section>


            {/* Gamification */}
            <section className="gamification">
                <span className="section-eyebrow">Keep progressing</span>

                <h2>Learning is better when progress feels rewarding.</h2>

                <div className="gamification-loop">
                    <span>Learn</span>
                    <span>→</span>
                    <span>Play</span>
                    <span>→</span>
                    <span>Earn XP</span>
                    <span>→</span>
                    <span>Improve</span>
                    <span>→</span>
                    <span>Repeat</span>
                </div>
            </section>


            {/* Repositories */}
            <section className="repositories">
                <div className="section-heading">
                    <span className="section-eyebrow">Content first</span>

                    <h2>
                        Build quizzes from educational content instead of
                        starting from scratch.
                    </h2>
                </div>

                <ul className="repo-benefits">
                    <li>Pre-built question banks</li>
                    <li>Customizable quiz templates</li>
                    <li>Easy-to-use content management</li>
                </ul>
            </section>


            {/* Final CTA */}
            <section className="call-to-action">
                <span className="section-eyebrow">
                    Start your journey
                </span>

                <h2>Ready to make learning more engaging?</h2>

                <p>
                    Create, challenge, learn, and grow with Quizzical.
                </p>

                <div className="cta-buttons">
                    <Link
                        to="/create-account"
                        className="btn btn-primary"
                    >
                        Create your Quizzical account
                    </Link>

                    <Link
                        to="/learn-more"
                        className="btn btn-secondary"
                    >
                        Learn more
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default HomePage;