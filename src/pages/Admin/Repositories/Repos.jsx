import React, { lazy } from 'react';
import { useApi } from '../../../context/Admin/ApiContext.jsx';
import { useRepo } from '../../../context/Admin/ReposContext.jsx';
import './Repos.css';

const RepositoriesList = lazy(() => import("./RepositoriesList"));



const Repositories = () => {

  const { repositories } = useRepo();

  console.log("Repositories:", repositories);

  return (
    <div className="repositories">
        <section className="repositories-header">
            <h1>Repositories</h1>
            <p className="lead">Add or buy repositories!</p>
        </section>
        <section className="repositories-content">
            <RepositoriesList repositories={repositories} />
        </section>
    </div>
  )
}

export default Repositories