function CommentList({ comments, user, onDelete }) {
  if (comments.length === 0) {
    return <p className="muted-text">No comments yet. Start the conversation.</p>;
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <article key={comment.id} className="comment-item">
          <p className="comment-body">{comment.body}</p>
          <div className="comment-footer">
            <span className="comment-meta">{comment.email}</span>
            {comment.email === user.email  &&  ( 
              <button className="action-button danger small" onClick={() => onDelete(comment.id)}>
                Delete
              </button>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
export default CommentList;