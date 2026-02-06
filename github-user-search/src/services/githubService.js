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

// Search users with advanced query
export const fetchAdvancedUsers = async ({ username, location, minRepos, page }) => {
  let query = "";
  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const config = {
    headers: {
      Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
  };

  // Search users
  const response = await axios.get("https://api.github.com/search/users", {
    params: { q: query.trim(), page, per_page: 5 },
    ...config,
  });

  const users = response.data.items || [];

  // Fetch additional details (location, repo count) for each user
  const detailedUsers = await Promise.all(
    users.map(async (user) => {
      try {
        const res = await axios.get(user.url, config); // user.url is https://api.github.com/users/{username}
        return res.data; // full user object with location, public_repos, etc.
      } catch {
        return user; // fallback to basic info if error
      }
    })
  );

  return { items: detailedUsers, total_count: response.data.total_count };
};
