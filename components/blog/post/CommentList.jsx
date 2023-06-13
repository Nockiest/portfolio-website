export default function CommentList({ comments }) {
  return (
    <div className="comment-list">
      <h3>Comments</h3>
      {comments && comments.map((comment) => {
        console.log(comment)
        return (
          <div key={comment.id} className="comment-card">
            <p className="comment-name">Name: {comment.name}</p>
            <p className="comment-text">Comment: {comment.comment}</p>
            <p className="comment-email">Email: {comment.email}</p>
          </div>
        );
      })}
    </div>
  );
}