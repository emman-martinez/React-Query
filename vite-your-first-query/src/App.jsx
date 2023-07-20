import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import "./App.css";

async function fetchWithError(url, options) {
  const response = await fetch(url, options);

  if (response.status !== 200) {
    throw new Error("Error in request!");
  }

  const result = await response.json();

  if (result.error) {
    throw new Error(result.error);
  }

  return result;
}

function fetchUser(username) {
  return fetch(`https://api.github.com/users/${username}`).then((res) =>
    res.json()
  );
}

function GithubUser({ username }) {
  const userQuery = useQuery([username], () => fetchUser(username));

  const { data, error, isError, isLoading } = userQuery;

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error.message}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

GithubUser.propTypes = {
  username: PropTypes.string.isRequired,
};

function App() {
  return (
    <>
      <GithubUser username="uidotdev" />
    </>
  );
}

export default App;
