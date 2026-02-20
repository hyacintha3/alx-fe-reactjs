import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Home Page</h1>
      <nav className="flex gap-4">
        <Link className="text-blue-600 hover:underline" to="/profile/details">Profile</Link>
        <Link className="text-blue-600 hover:underline" to="/blog/1">Blog Post 1</Link>
      </nav>
    </div>
  );
}

export default Home;