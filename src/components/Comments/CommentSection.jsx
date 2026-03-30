import { useState, useEffect } from "react";
import CommentList from "./CommentList";

function CommentSection({ postId, comments, setComments, user }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const currentComments = comments[postId] || [];

  // ✅ 1. LOAD COMMENTS FROM LOCALSTORAGE
  useEffect(() => {
    const storedComments =
      JSON.parse(localStorage.getItem("comments")) || {};

    if (storedComments[postId]) {
      setComments((prev) => ({
        ...prev,
        [postId]: storedComments[postId],
      }));
    }
  }, [postId, setComments]);

  // ✅ 2. ADD COMMENT
  const addComment = (event) => {
    event.preventDefault();

    const trimmedText = text.trim();
    if (!trimmedText) {
      setError("Comment cannot be empty.");
      return;
    }

    const newComment = {
      id: Date.now(),
      body: trimmedText,
      email: user.email,
      username: user.name, // ✅ for display
      postId,
      createdAt: new Date().toISOString()
    };

    const updatedComments = {
      ...comments,
      [postId]: [newComment, ...(comments[postId] || [])]
    };

    // ✅ Update state
    setComments(updatedComments);

    // ✅ Save to localStorage
    localStorage.setItem("comments", JSON.stringify(updatedComments));

    setText("");
    setError("");
  };

  // ✅ 3. DELETE COMMENT
  const deleteComment = (id) => {
    const updatedComments = {
      ...comments,
      [postId]: (comments[postId] || []).filter(
        (comment) => comment.id !== id
      )
    };

    // ✅ Update state
    setComments(updatedComments);

    // ✅ Update localStorage
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };

  return (
    <div className="comment-section">
      <form className="comment-form" onSubmit={addComment}>
        <input
          className="text-field"
          placeholder="Add a comment"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <button className="action-button save" type="submit">
          Add
        </button>
      </form>

      {error && <p className="form-error">{error}</p>}

      <CommentList
        comments={currentComments}
        user={user}
        onDelete={deleteComment}
      />
    </div>
  );
}

export default CommentSection;