import './About.css';

const About = () => {
    return (
        <article className="about-page">

            <section className="about-hero">
                <div className="container">
                    <div className="section-heading">
                        <span className="section-label">ABOUT QUIZZICAL</span>

                        <h1>Learning works better when people want to participate.</h1>
                    </div>

                    <p className="about-lead">
                        Quizzical is a quiz and assessment platform for creating,
                        organizing, and completing learning activities. It brings
                        question repositories, configurable quizzes, results,
                        and progression into one place.
                    </p>
                </div>
            </section>

            <section className="about-intro">
                <div className="container">
                    <div className="section-heading">
                        <span className="section-label">THE PLATFORM</span>
                        <h2>A structured way to turn questions into learning activities.</h2>
                    </div>

                    <div className="about-copy">
                        <p>
                            A quiz is only one part of assessment. The surrounding
                            structure determines how useful it is: where questions
                            come from, how a challenge is configured, what feedback
                            is available, and how progress is recorded over time.
                        </p>
                        <p>
                            Quizzical separates these concerns into connected parts.
                            Repositories organize question sources, quiz settings
                            define the activity, and results make performance easier
                            to review. This creates a clearer path from preparing
                            content to understanding what was learned.
                        </p>
                    </div>
                </div>
            </section>

            <section className="about-audience">
                <div className="container">
                    <div className="section-heading">
                        <span className="section-label">WHO IS IT FOR?</span>
                        <h2>Different responsibilities, connected by the same learning activity.</h2>
                    </div>

                    <div className="audience-grid">

                        <article className="audience-card">
                            <h3>Teachers</h3>
                            <p>
                                Prepare question sources, configure quizzes, and
                                review results to understand how learners perform.
                            </p>
                        </article>

                        <article className="audience-card">
                            <h3>Parents</h3>
                            <p>
                                Use structured quiz activities to support practice
                                and stay aware of a learner's progress.
                            </p>
                        </article>

                        <article className="audience-card">
                            <h3>Learners</h3>
                            <p>
                                Complete quizzes, receive a visible result, and use
                                repeated practice to identify areas for improvement.
                            </p>
                        </article>

                    </div>
                </div>
            </section>

            <section className="about-features">
                <div className="container">

                    <div className="section-heading">
                        <span className="section-label">HOW IT WORKS</span>
                        <h2>From a question source to a measurable result.</h2>
                    </div>

                    <div className="feature-list">

                        <article className="feature-item">
                            <span className="feature-number">01</span>
                            <div>
                                <h3>Repositories</h3>
                                <p>
                                    Repositories provide a home for question sources
                                    and keep content organized by subject or topic.
                                </p>
                            </div>
                        </article>

                        <article className="feature-item">
                            <span className="feature-number">02</span>
                            <div>
                                <h3>Create a Quiz</h3>
                                <p>
                                    Select content and configure the rules that shape
                                    the activity, including difficulty and scoring.
                                </p>
                            </div>
                        </article>

                        <article className="feature-item">
                            <span className="feature-number">03</span>
                            <div>
                                <h3>Play and Evaluate</h3>
                                <p>
                                    Learners complete the activity while the platform
                                    records answers, scores, and performance.
                                </p>
                            </div>
                        </article>

                        <article className="feature-item">
                            <span className="feature-number">04</span>
                            <div>
                                <h3>Earn XP</h3>
                                <p>
                                    XP makes progress visible and gives learners a
                                    simple way to recognize continued participation.
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

                        <h2>Progress is easier to understand when it is visible.</h2>
                    </div>

                    <p>
                        XP is Quizzical's progression layer. It can represent activity
                        such as completing quizzes, answering questions correctly,
                        passing challenges, or reaching milestones. The purpose is
                        not to replace feedback with points, but to give progress a
                        consistent and understandable form.
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

        </article>
    );
};

export default About;