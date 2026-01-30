// import { useState } from "react";
// import { fetchUserData } from "../services/githubService";

// function Search() {
//   const [username, setUsername] = useState("");
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!username) return;

//     setLoading(true);
//     setError(false);
//     setUser(null);

//     try {
//       const data = await fetchUserData(username);
//       setUser(data);
//     } catch (err) {
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Search GitHub username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <button type="submit">Search</button>
//       </form>

//       {loading && <p>Loading...</p>}
//       {error && <p>Looks like we cant find the user</p>}

//       {user && (
//         <div>
//           <img src={user.avatar_url} alt={user.login} width="100" />
//           <h3>{user.name || user.login}</h3>
//           <a href={user.html_url} target="_blank" rel="noreferrer">
//             View GitHub Profile
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Search;


import { useState } from "react";
import axios from "axios";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  // Function to fetch users from GitHub API
//   const fetchAdvancedUsers = async ({ username, location, minRepos, page }) => {
//     let query = "";
//     if (username) query += `${username} `;
//     if (location) query += `location:${location} `;
//     if (minRepos) query += `repos:>=${minRepos}`;

//     const response = await axios.get("https://api.github.com/search/users", {
//       params: { q: query.trim(), page, per_page: 5 },
//     });

//     return response.data || { items: [] };
//   };
const fetchAdvancedUsers = async ({ username, location, minRepos, page }) => {
    let query = "";
    if (username) query += `${username} `;
    if (location) query += `location:${location} `;
    if (minRepos) query += `repos:>=${minRepos}`;
  
    // GitHub token config (optional)
    const config = {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    };
  
    // Must be inside async function
    const response = await axios.get(
      "https://api.github.com/search/users",
      { params: { q: query.trim(), page, per_page: 5 }, ...config }
    );
  
    return response.data || { items: [] };
  };
  
  

  // Handle search form submit
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setUsers([]);
    setPage(1);

    try {
      const data = await fetchAdvancedUsers({
        username,
        location,
        minRepos: minRepos || undefined,
        page: 1,
      });
      setUsers(data.items || []);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Load more results (pagination)
  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const data = await fetchAdvancedUsers({
        username,
        location,
        minRepos: minRepos || undefined,
        page: nextPage,
      });
      setUsers((prev) => [...prev, ...(data.items || [])]);
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <input
          className="w-full border p-2 rounded"
          placeholder="GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          type="number"
          placeholder="Minimum repositories"
          value={minRepos}
          onChange={(e) =>
            setMinRepos(e.target.value === "" ? "" : Number(e.target.value))
          }
        />
        <button
          type="submit"
          className="w-full bg-black text-white p-2 rounded"
        >
          Search
        </button>
      </form>

      {/* Loading & Error Messages */}
      {loading && <p className="mt-4 text-center">Loading...</p>}
      {error && (
        <p className="mt-4 text-center text-red-600">
          Looks like we can't find the user
        </p>
      )}

      {/* Search Results */}
      <div className="mt-6 space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 p-4 border rounded bg-white"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="font-bold">{user.login}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {users.length > 0 && (
        <button
          onClick={loadMore}
          className="mt-4 w-full border p-2 rounded bg-gray-200 hover:bg-gray-300"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default Search;
