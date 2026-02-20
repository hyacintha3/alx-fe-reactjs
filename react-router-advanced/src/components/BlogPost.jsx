import React from "react";
import { useParams } from "react-router-dom";

function BlogPost() {
  const { postId } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Blog Post</h1>
      <p>You are viewing blog post with ID: <strong>{postId}</strong></p>
    </div>
  );
}

export default BlogPost;