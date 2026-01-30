// import axios from "axios";

// export const fetchUserData = async (username) => {
//   const response = await axios.get(
//     `https://api.github.com/users/${username}`
//   );
//   return response.data;
// };


// import axios from "axios";

// // Function for advanced GitHub user search
// export const fetchAdvancedUsers = async ({ username, location, minRepos, page }) => {
//   let query = "";

//   if (username) query += `${username} `;
//   if (location) query += `location:${location} `;
//   if (minRepos) query += `repos:>=${minRepos}`;

//   const response = await axios.get("https://api.github.com/search/users", {
//     params: {
//       q: query.trim(),
//       page,
//       per_page: 5,
//     },
//   });

//   return response.data;
// };

// import axios from "axios";

// export const fetchAdvancedUsers = async ({ username, location, minRepos, page }) => {
//   let query = "";
//   if (username) query += `${username} `;
//   if (location) query += `location:${location} `;
//   if (minRepos) query += `repos:>=${minRepos}`;

//   const response = await axios.get("https://api.github.com/search/users", {
//     params: { q: query.trim(), page, per_page: 5 },
//   });

//   return response.data || { items: [] }; // prevents undefined errors
// };


import axios from "axios";

// Fetch users from GitHub API with advanced search
export const fetchAdvancedUsers = async ({ username, location, minRepos, page }) => {
  let query = "";
  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  // Optional: GitHub token to avoid API limit
  const config = {
    headers: {
      Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
  };

  const response = await axios.get("https://api.github.com/search/users", {
    params: { q: query.trim(), page, per_page: 5 },
    ...config,
  });

  return response.data || { items: [] };
};

  
