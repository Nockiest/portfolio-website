export default function CommentList({ comments }) {
  return (
    <div className="comment-list">
      <h3>Comments</h3>
      {comments && comments.map((comment) => {
      //   const commentString = JSON.stringify(comment);
      //   const commentParts = commentString.split(';');
      // console.log(commentParts)
        // Extracting values from comment parts
        // const name = commentParts[0].split(':')[1].trim().replace(/["\\]/g, '');
        // const commentText = commentParts[1].split(':')[1].trim().replace(/["\\]/g, '');
        // const email = commentParts[4].split(':')[1].trim().replace(/["\\]/g, '');

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