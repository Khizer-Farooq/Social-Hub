import { useEffect, useState } from "react";
import CommentSection from "../Comments/CommentSection";

function PostCard({ post, user, setPosts, comments, setComments }) {
  const [title, setTitle] = useState(post?.title || "");
  const [body, setBody] = useState(post?.body || "");
  const [isEditing, setIsEditing] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const [commentsError, setCommentsError] = useState("");

  const isOwner = post?.userId === user.id;

  useEffect(() => {
    setTitle(post?.title || "");
    setBody(post?.body || "");
  }, [post]);

  if (!post) return null;

  const deletePost = () => {
  setPosts((previousPosts) =>
    previousPosts.filter((existingPost) => existingPost.id !== post.id)
  );

  const savedPosts =
    JSON.parse(localStorage.getItem("userPosts")) || [];

  const updatedPosts = savedPosts.filter(
    (existingPost) => existingPost.id !== post.id
  );

  localStorage.setItem("userPosts", JSON.stringify(updatedPosts));
};

  const updatePost = () => {
  const trimmedTitle = title.trim();
  const trimmedBody = body.trim();

  if (!trimmedTitle || !trimmedBody) return;

  setPosts((previousPosts) =>
    previousPosts.map((existingPost) =>
      existingPost.id === post.id
        ? { ...existingPost, title: trimmedTitle, body: trimmedBody }
        : existingPost
    )
  );

  const savedPosts =
    JSON.parse(localStorage.getItem("userPosts")) || [];

  const updatedPosts = savedPosts.map((existingPost) =>
    existingPost.id === post.id
      ? { ...existingPost, title: trimmedTitle, body: trimmedBody }
      : existingPost
  );

  localStorage.setItem("userPosts", JSON.stringify(updatedPosts));

  setIsEditing(false);
};

  const fetchComments = async () => {
    if (comments[post.id]) return;

    try {
      setIsFetchingComments(true);
      setCommentsError("");

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
      );

      if (!response.ok) {
        throw new Error("Could not load comments");
      }

      const data = await response.json();
      setComments((previousComments) => ({ ...previousComments, [post.id]: data }));
    } catch {
      setCommentsError("Comments are unavailable right now.");
    } finally {
      setIsFetchingComments(false);
    }
  };

  return (
    <article className="post-card">
      {isEditing ? (
        <div className="edit-layout">
          <input
            className="text-field"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            rows={3}
            className="text-field text-area"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          />
          <div className="post-actions">
            <button className="action-button save" onClick={updatePost}>
              Save
            </button>
            <button className="action-button neutral" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <header className="post-header">
            <h2 className="post-title">{post.title}</h2>
          </header>
          <p className="post-body">{post.body}</p>
        </>
      )}

      {isOwner && (
        <div className="post-actions">
          <button className="action-button warning" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="action-button danger" onClick={deletePost}>
            Delete
          </button>
        </div>
      )}

      <button
        className="action-button subtle"
        onClick={async () => {
          const nextState = !showComments;
          setShowComments(nextState);

          if (nextState) {
            await fetchComments();
          }
        }}
      >
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && (
        <div className="comment-area">
          {isFetchingComments && <p className="muted-text">Loading comments...</p>}
          {commentsError && <p className="form-error">{commentsError}</p>}
          <CommentSection
            postId={post.id}
            comments={comments}
            setComments={setComments}
            user={user}
          />
        </div>
      )}
    </article>
  );
}
export default PostCard;