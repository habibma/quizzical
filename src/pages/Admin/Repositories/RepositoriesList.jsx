
const listOfRepositories = [
  {
    title: "Repository 1",
    description: "This is the first repository.",
  },
  {
    title: "Repository 2",
    description: "This is the second repository.",
  }
];

const Card = ({ title, description }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

const RepositoriesList = () => {
  return (
    <div className="repositories-list">
        {listOfRepositories.map((repo, index) => (
          <Card key={index} title={repo.title} description={repo.description} />
        ))}
    </div>
  )
}

export default RepositoriesList