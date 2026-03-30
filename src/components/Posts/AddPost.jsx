import { useState } from "react";

function AddPost({ setPosts, user }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const addPost = (event) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle || !trimmedBody) {
      setError("Both title and content are required.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: trimmedTitle,
      body: trimmedBody,
      userId: user.id
    };
    const savedPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
    const updatedPosts = [newPost, ...savedPosts];
    localStorage.setItem("userPosts", JSON.stringify(updatedPosts));
    

    setPosts((previousPosts) => [newPost, ...previousPosts]);
    setTitle("");
    setBody("");
    setError("");
  };
  

  return (
    <section className="section-card compose-card">
      <h2 className="section-title">Create a new post</h2>
      <p className="section-subtitle">Share something short and meaningful with your audience.</p>

      <form className="auth-form" onSubmit={addPost}>
        <div className="field-group">
          <label htmlFor="post-title">Title</label>
          <input
            id="post-title"
            className="text-field"
            placeholder="What is this post about?"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        <div className="field-group">
          <label htmlFor="post-body">Content</label>
          <textarea
            id="post-body"
            className="text-field text-area"
            placeholder="Write your update here..."
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={4}
          />
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="compose-actions">
          <button type="submit" className="primary-button">
            Publish Post
          </button>
        </div>
      </form>
    </section>
  );
}
export default AddPost;