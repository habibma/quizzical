import RepositoriesList from "./RepositoriesList";
import './Repos.css';

//const RepositoriesList = lazy(() => import("./RepositoriesList"));

const Repositories = () => {
  return (
    <div className="repositories">
        <section className="repositories-header">
            <h1>Repositories</h1>
            <p className="lead">Add or buy repositories!</p>
        </section>
        <section className="repositories-content">
            <RepositoriesList />
        </section>
    </div>
  )
}

export default Repositories