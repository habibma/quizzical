import './About.css';

const About = () => {
    return (
        <main className="about-page">

            <section className="about-hero">
                <div className="container">
                    <div className="section-heading">
                        <span className="section-label">ABOUT QUIZZICAL</span>

                        <h1>Learning works better when people want to participate.</h1>
                    </div>

                    <p>
                        Quizzical helps teachers, parents, and learners create
                        engaging quizzes, measure progress, and make learning
                        more rewarding through XP and gamification.
                    </p>
                </div>
            </section>

            <section className="about-intro">
                <div className="container">
                    <div className="section-heading">
                        <span className="section-label">THE PLATFORM</span>
                        <h2>More than just questions and answers.</h2>
                    </div>

                    <p className="about-text">
                        Quizzical is a quiz platform designed to make assessment
                        more interactive. Create quizzes from question
                        repositories, customize the rules, track performance,
                        and reward progress.
                    </p>
                </div>
            </section>

            <section className="about-audience">
                <div className="container">
                    <div className="section-heading">
                        <span className="section-label">WHO IS IT FOR?</span>
                        <h2>Built for everyone involved in learning.</h2>
                    </div>

                    <div className="audience-grid">

                        <article className="audience-card">
                            <h3>Teachers</h3>
                            <p>
                                Create quizzes, manage questions, evaluate
                                performance, and motivate students.
                            </p>
                        </article>

                        <article className="audience-card">
                            <h3>Parents</h3>
                            <p>
                                Create engaging learning challenges and support
                                your children's progress.
                            </p>
                        </article>

                        <article className="audience-card">
                            <h3>Learners</h3>
                            <p>
                                Test your knowledge, improve your skills, earn
                                XP, and work toward new achievements.
                            </p>
                        </article>

                    </div>
                </div>
            </section>

            <section className="about-features">
                <div className="container">

                    <div className="section-heading">
                        <span className="section-label">HOW IT WORKS</span>
                        <h2>Build. Play. Learn. Improve.</h2>
                    </div>

                    <div className="feature-list">

                        <article className="feature-item">
                            <span className="feature-number">01</span>
                            <div>
                                <h3>Repositories</h3>
                                <p>
                                    Repositories organize question sources and
                                    educational content for different subjects
                                    or learning areas.
                                </p>
                            </div>
                        </article>

                        <article className="feature-item">
                            <span className="feature-number">02</span>
                            <div>
                                <h3>Create a Quiz</h3>
                                <p>
                                    Choose your content, select questions, and
                                    configure rules such as difficulty, time,
                                    attempts, and scoring.
                                </p>
                            </div>
                        </article>

                        <article className="feature-item">
                            <span className="feature-number">03</span>
                            <div>
                                <h3>Play and Evaluate</h3>
                                <p>
                                    Learners answer questions while the platform
                                    measures their results and performance.
                                </p>
                            </div>
                        </article>

                        <article className="feature-item">
                            <span className="feature-number">04</span>
                            <div>
                                <h3>Earn XP</h3>
                                <p>
                                    XP and rewards encourage learners to keep
                                    improving and coming back for the next
                                    challenge.
                                </p>
                            </div>
                        </article>

                    </div>
                </div>
            </section>

            <section className="about-xp">
                <div className="container">
                    <div className="section-heading">
                        <span className="section-label">GAMIFICATION</span>

                        <h2>Progress should feel rewarding.</h2>
                    </div>

                    <p>
                        XP turns progress into something visible. Learners can
                        earn rewards for completing quizzes, answering questions
                        correctly, passing challenges, and achieving milestones.
                    </p>

                    <div className="xp-flow">
                        <span>Learn</span>
                        <span>→</span>
                        <span>Play</span>
                        <span>→</span>
                        <span>Earn XP</span>
                        <span>→</span>
                        <span>Improve</span>
                    </div>
                </div>
            </section>

        </main>
    );
};

export default About;