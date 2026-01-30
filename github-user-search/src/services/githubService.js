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

// Fetch GitHub users with advanced search
export const fetchAdvancedUsers = async ({ username, location, minRepos, page }) => {
  let query = "";
  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos}`;

  const config = {
    headers: {
      Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`, // optional token
    },
  };

  // 1️⃣ Search users
  const response = await axios.get("https://api.github.com/search/users", {
    params: { q: query.trim(), page, per_page: 5 },
    ...config,
  });

  const users = response.data.items || [];

  // 2️⃣ Fetch full details for each user (location, public_repos, etc.)
  const detailedUsers = await Promise.all(
    users.map(async (user) => {
      try {
        const res = await axios.get(user.url, config);
        return res.data; // full user object
      } catch {
        return user; // fallback to basic info if error
      }
    })
  );

  return { items: detailedUsers, total_count: response.data.total_count };
};
